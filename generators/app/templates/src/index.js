import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import App from './components/App';

const render = (Component, containerId) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById(containerId)
  );
};

render(App, 'app-component');

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NewApp = require('./components/App').default;
    render(NewApp, 'app-component');
  });
}
