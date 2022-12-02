import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

const container = document.createElement('div');
container.id = 'react-chrome-ext';
document.body.appendChild(container);

let firstRender = true;
if (firstRender) {
  render(
    <Provider store={store}>
      <App url={window.location.href} />
    </Provider>,
    container
  );
  firstRender = false;
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === "tab_updated") {
      render(
        <Provider store={store}>
          <App url={request.url} />
        </Provider>,
        container
      );
    }
  }
);
