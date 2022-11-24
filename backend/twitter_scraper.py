import snscrape.modules.twitter as snt
import json
import datetime as dt
import calendar


class TwitterScraper:

    def __init__(self) -> None:
        pass

    def _execute_query(self, q, max_results, path=None):
        tweet_generator = snt.TwitterSearchScraper(q).get_items()

        if path:
            with open(path, 'a') as fp:
                for i, tweet in enumerate(tweet_generator):
                    if i >= max_results:
                        break
                    fp.write(tweet.json() + '\n')
        else:
            results = []
            for i, tweet in enumerate(tweet_generator):
                if i >= max_results:
                    break
                results.append(json.loads(tweet.json()))
            return results


    def search(
        self,
        content=None,  # Any string
        user=None,  # Ex: naval, elonmusk, etc
        location=None,  # Ex: New York, The Hague, etc
        since=None,  # Ex: 2022-10-01
        until=None,  # Ex: 2022-11-06
        within=None,  # Ex: 2d, 3h, 5m, 30s, etc
        include_rt=None,  # True/False
        include_quote=None,  # True/False
        include_replies=None,  # True/False
        is_media=None,  # True/False (images, videos)
        min_retweets=None,  # Numeric
        min_faves=None,  # Numeric
        min_replies=None,  # Numeric
        max_results=100,
        path=None,
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

        return self._execute_query(q, max_results, path)


    def user_recent_tweets(self, user, max_results=100, path=None):
        """ Get last N tweets from a user """

        q = f'from:{user} -filter:replies'
        return self._execute_query(q, max_results, path)


    def user_historic_tweets(self, user, start_year, start_month, end_year, end_month, max_results=100, path=None):
        """ Get up to N tweets from a user in a time slice """

        start_date = dt.date(start_year, start_month, 1)
        last_day = calendar.monthrange(end_year, end_month)[1]
        end_date = dt.date(end_year, end_month, last_day)  # not inclusive

        q = f'from:{user} since:{start_date} until:{end_date} -filter:replies'
        return self._execute_query(q, max_results, path)


    def _user_info(self, user):
        return self._execute_query(f"from:{user}", 1)[0]["user"]


    def user_popular_tweets(self, user, max_results=100, path=None):
        """ Get popular tweets from a user """

        profile = self._user_info(user)
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
        return self._execute_query(q, max_results, path)

