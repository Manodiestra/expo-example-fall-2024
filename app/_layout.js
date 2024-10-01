import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import App from './index';

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
