/* eslint-disable */
import 'isomorphic-fetch';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './assets/styles/main.scss';
import Root from './containers/Root';
import configureStore from './store/configureStore';

const store = configureStore();

render(
  <AppContainer>
    <Root
      store={store}
    />
  </AppContainer>,
  document.getElementById('main')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const RootContainer = require('./containers/Root').default;

    render(
      <AppContainer>
        <RootContainer
          store={store}
        />
      </AppContainer>,
      document.getElementById('main')
    );
  });
}
