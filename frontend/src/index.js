import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

const container = document.createElement('div');
container.id = 'foreground';

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${container.id} {
    position: fixed;
    right: 0;
    top: 0;
    width: 300px;
    height: 100vh;
    background: #ffffff;
    border-left: 1px solid #c2c2c2;
    z-index: 999999999;
  }
`;
document.body.appendChild(container);
document.body.appendChild(globalStyles);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
);
