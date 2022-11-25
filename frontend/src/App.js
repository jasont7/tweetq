import React from 'react';
import { Counter } from './components/counter/Counter';
import { UserRecentTweets } from './components/user_recent_tweets/UserRecentTweets';

function App() {
  return (
    <div style={styles.app}>
      <header style={styles.appHeader}>
        {/* <Counter /> */}
        <UserRecentTweets />
      </header>
    </div>
  );
}

const styles = {
  app: {
    textAlign: 'center',
  },
  appHeader: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
  },
}

export default App;
