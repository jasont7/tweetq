import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

const container = document.createElement('div');
container.id = 'tweetq-chrome-ext';
document.body.appendChild(container);
const root = createRoot(container);

let firstRender = true;
if (firstRender) {
  root.render(
    <Provider store={store}>
      <App url={window.location.href} />
    </Provider>
  );
  firstRender = false;
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === "tab_updated") {
      root.render(
        <Provider store={store}>
          <App url={request.url} />
        </Provider>
      );
    }
  }
);
