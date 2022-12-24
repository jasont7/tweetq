from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import snscrape.modules.twitter as snt
import json
import datetime as dt

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


MAX_RESULTS = 25


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
    users: str = None,  # Comma-separated string of users Ex: "naval,elonmusk"
    since: str = None,  # Ex: 2022-10-01
    until: str = None,  # Ex: 2022-11-06
    within_time: str = None,  # Ex: 2d, 3h, 5m, 30s, etc
    hide_replies: bool = None,
    min_faves: int = None,
    max_faves: int = None,
    min_retweets: int = None,
    max_retweets: int = None,
    min_replies: int = None,
    max_replies: int = None,
    location: str = None,  # Ex: New York, The Hague, etc
    within: str = None,  # Ex: 10km, 5mi, etc
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

    if users:
        user_list = users.split(',')
        s = '('
        for user in user_list[:-1]:
            s += f'from:{user} OR '
        s += f'from:{user_list[-1]})'
        q += s

    if since:
        q += f'since:{since} '
    
    if until:
        # add one day to include tweets posted on end date
        until = (dt.datetime.strptime(until, '%Y-%m-%d') + dt.timedelta(days=1)).strftime('%Y-%m-%d')
        q += f'until:{until} '
    
    if within_time:
        q += f'within_time:{within_time} '

    if hide_replies:
        q += f'-filter:replies '
    
    if min_faves:
        q += f'min_faves:{min_faves} '
    
    if max_faves:
        q += f'-min_faves:{max_faves} '

    if min_retweets:
        q += f'min_retweets:{min_retweets} '
        
    if max_retweets:
        q += f'-min_retweets:{max_retweets} '

    if min_replies:
        q += f'min_replies:{min_replies} '
    
    if max_replies:
        q += f'-min_replies:{max_replies} '

    if location:
        q += f'near:"{location}" '

    if within:
        q += f'within:{within} '

    results = _execute_query(q, max_results)
    return results

