import snscrape.modules.twitter as snt
import json
import datetime as dt

MAX_RESULTS = 25


def lambda_handler(event, context):
    results = []
    
    if 'queryStringParameters' in event:
        params = event['queryStringParameters']
        query = build_query(params)
        results = execute_query(query)

    return {
        'statusCode': 200,
        'body': json.dumps(results),
    }


def execute_query(q):
    """
    Exectutes a Twitter advanced search query using snscrape.
    Returns a list of tweet objects.
    """

    tweet_generator = snt.TwitterSearchScraper(q).get_items()

    results = []
    for i, tweet in enumerate(tweet_generator):
        if i >= MAX_RESULTS:
            break
        results.append(json.loads(tweet.json()))
    return results


def build_query(params):
    """ Builds a Twitter advanced search query given the parameters.

    Full list of parameter documentation can be found here:
    https://github.com/igorbrigadir/twitter-advanced-search/blob/master/README.md

    Params:
     - content: str = None,
     - users: str = None,  # Comma-separated string of users Ex: "naval,elonmusk"
     - since: str = None,  # Ex: 2022-10-01
     - until: str = None,  # Ex: 2022-11-06
     - within_time: str = None,  # Ex: 2d, 3h, 5m, 30s, etc
     - hide_replies: bool = None,
     - min_faves: int = None,
     - max_faves: int = None,
     - min_retweets: int = None,
     - max_retweets: int = None,
     - min_replies: int = None,
     - max_replies: int = None,
     - location: str = None,  # Ex: New York, The Hague, etc
     - within: str = None,  # Ex: 10km, 5mi, etc
    """

    q = ""

    if 'content' in params:
        q += f"{params['content']} "

    if 'users' in params:
        user_list = params['users'].split(',')
        s = '('
        for user in user_list[:-1]:
            s += f'from:{user} OR '
        s += f'from:{user_list[-1]})'
        q += s

    if 'since' in params:
        q += f"since:{params['since']} "
    
    if 'until' in params:
        # add one day to include tweets posted on end date
        until = (dt.datetime.strptime(params['until'], '%Y-%m-%d') + dt.timedelta(days=1)).strftime('%Y-%m-%d')
        q += f'until:{until} '
    
    if 'within_time' in params:
        q += f"within_time:{params['within_time']} "

    if 'hide_replies' in params:
        q += f'-filter:replies '
    
    if 'min_faves' in params:
        q += f"min_faves:{params['min_faves']} "
    
    if 'max_faves' in params:
        q += f"-min_faves:{params['max_faves']} "

    if 'min_retweets' in params:
        q += f"min_retweets:{params['min_retweets']} "
        
    if 'max_retweets' in params:
        q += f"-min_retweets:{params['max_retweets']} "

    if 'min_replies' in params:
        q += f"min_replies:{params['min_replies']} "
    
    if 'max_replies' in params:
        q += f"-min_replies:{params['max_replies']} "

    if 'location' in params:
        location = params['location']
        q += f'near:"{location}" '

    if 'within' in params:
        q += f"within:{params['within']} "

    return q
