from fastapi import FastAPI
import snscrape.modules.twitter as snt
import json
import datetime as dt
import calendar

app = FastAPI()

MAX_RESULTS = 20


def _execute_query(q, max_results):
    tweet_generator = snt.TwitterSearchScraper(q).get_items()

    results = []
    for i, tweet in enumerate(tweet_generator):
        if i >= max_results:
            break
        results.append(json.loads(tweet.json()))
    return results


@app.get("/search")
async def search(
    content: str = None,
    user: str = None,  # Ex: naval, elonmusk, etc
    location: str = None,  # Ex: New York, The Hague, etc
    since: str = None,  # Ex: 2022-10-01
    until: str = None,  # Ex: 2022-11-06
    within: str = None,  # Ex: 2d, 3h, 5m, 30s, etc
    include_rt: bool = None,
    include_quote: bool = None,
    include_replies: bool = None,
    is_media: bool = None,  # (images, videos)
    min_retweets: int = None,
    min_faves: int = None,
    min_replies: int = None,
    max_results: int = MAX_RESULTS,
):
    """
    Programatically access twitter advanced search. Refer to the link below for
    detailed documentation on how to use advanced search:
    https://github.com/igorbrigadir/twitter-advanced-search/blob/master/README.md
    """
    q = ''

    if content:
        q += f'{content} '
    if user:
        q += f'from:{user} '
    if location:
        q += f'near:"{location}" '
    if since:
        q += f'since:{since} '
    if until:
        q += f'until:{until} '
    if within:
        q += f'within_time:{within} '

    if include_rt == True:
        q += f'filter:nativeretweets '
    elif include_rt == False:
        q += f'-filter:nativeretweets '

    if include_quote == True:
        q += f'filter:quote '
    elif include_quote == False:
        q += f'-filter:quote '

    if include_replies == True:
        q += f'filter:replies '
    elif include_replies == False:
        q += f'-filter:replies '

    if is_media == True:
        q += f'filter:media '
    elif is_media == False:
        q += f'-filter:media '
    
    if min_retweets:
        q += f'min_retweets:{min_retweets} '
    if min_faves:
        q += f'min_faves:{min_faves} '
    if min_replies:
        q += f'min_replies:{min_replies} '

    return _execute_query(q, max_results)


@app.get("/user/recent")
async def user_recent_tweets(user: str, max_results: int = MAX_RESULTS):
    """ Get last N tweets from a user """

    q = f'from:{user} -filter:replies'
    return _execute_query(q, max_results)


@app.get("/user/historic")
async def user_historic_tweets(
    user: str, start_year: int, start_month: int, end_year: int, end_month: int, max_results: int = MAX_RESULTS
):
    """ Get up to N tweets from a user in a time slice """

    start_date = dt.date(start_year, start_month, 1)
    last_day = calendar.monthrange(end_year, end_month)[1]
    end_date = dt.date(end_year, end_month, last_day)  # not inclusive

    q = f'from:{user} since:{start_date} until:{end_date} -filter:replies'
    return _execute_query(q, max_results)


def _user_info(user):
    return _execute_query(f"from:{user}", 1)[0]["user"]


@app.get("/user/popular")
async def user_popular_tweets(user: str, max_results: int = MAX_RESULTS):
    """ Get popular tweets from a user """

    profile = _user_info(user)
    follower_count = profile['followersCount']

    if follower_count >= 250000:
        min_likes = 1000
    elif 100000 <= follower_count < 250000:
        min_likes = 250
    elif 25000 <= follower_count < 100000:
        min_likes = 100
    elif follower_count < 25000:
        min_likes = 50

    q = f'from:{user} min_faves:{min_likes} -filter:replies'
    return _execute_query(q, max_results)

