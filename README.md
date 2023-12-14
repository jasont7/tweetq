# [tweetQ](https://chromewebstore.google.com/detail/tweetq-%E2%80%94-enhanced-twitter/kjfhaejeeiomoelkedadbifpincamjde?pli=1) (discontinued)

<img src="https://github.com/jasont7/tweetq/assets/26695415/4194c9e3-a027-4024-98f1-fbce6905bd83" width="600">
<br><br>

This was a small side-project of mine in which I set out to build a Twitter sidebar Chrome extension. I drew inspiration from [Twemex](https://tweethunter.io/twemex) (another Twitter sidebar extension), but found that it wasn't granular enough for my liking w.r.t. filtering/sorting through tweets, so I decided to create my own version.

The goal of TweetQ was to provide an interface where users can easily filter through tweets via number of likes/comments/retweets, date range, author(s), words/phrases, etc. This was in order to combat against the cluttered and disparate system of viewing tweets. You're either on the home page, where you see a never-ending list of tweets by people you follow (or that are simply recommended to you by 'the algorithm'), or you are on someone's profile page in which you can only see their most recent activity.

What if I want to see someone's most liked tweets of all time? What if I want to see what someone was tweeting 2 years ago (and laugh at their horrendous stock picks)? What if I want to see the most popular tweets from the last week, automatically sorted, instead of hoping that 'the algorithm' will recommend them all to me? What if I want to reduce clutter and only see tweets from a specific group of authors?

### Backend
The backend was based on [snscrape](https://github.com/JustAnotherArchivist/snscrape), a very nice Python module that allowed you to programatically access Twitter's advanced search API with virtually no rate limits. Unfortunately, snscrape became obsolete in early 2023 following Twitter's (now X's) overhaul.

### Frontend
The frontend is written in React, and compiled into a pure JS content script with Webpack. The hardest part of this project, by far, was figuring out how Chrome extensions work; specifically, (1) how to compile the React app into the proper pure JS form, and (2) how the background script communicated with the content script to detect changes on the webpage and update the UI accordingly.

This learning curve was exacerbated by the fact that Chrome had recently upgraded their required manifest version to v3, and almost all of the resources/documentation online was based on v2. A lot of the principles in v2 no longer applied in v3, and figuring out these changes proved to be quite a challenge.

### Build
To compile and use the extension:
1) `cd frontend/src`
2) `npm build:prod` - this will compile the project into the `frontend/public` directory.
3) Go to chrome://extensions in your browser, click on Load Unpacked, and upload the `public` directory.

### Conclusion
All in all, I was able to (mostly) figure everything out, and TweetQ was working quite nicely for a short while before Twitter closed off its APIs. Now, the extension is just a UI with no data flowing through it.

A potential fix for the backend is to make the API calls to Twitter on the client side. Since the extension only runs when the user is on https://twitter.com, we don't need to worry about CORS. The only thing that needs to be figured out is what API Twitter uses on their website, and how to apply the various filters with it. This should be possible via devtooling, depending on how secure and/or messy the architecture is.
