// This is the entry point for our client-side logic
import 'isomorphic-fetch';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router';

import 'core/helpers/polyfills';
import 'core/helpers/logger';
import '../assets/css/index.scss';
import stores from './stores';
import autorun from './autorun';
import App from '../pages/App';

// We render our react app into this element
const container = document.getElementById('container');

// React to changes
autorun(stores);

const renderProps = (<App stores={stores} />);

// Render HTML on the browser
render(<BrowserRouter>
  {renderProps}
</BrowserRouter>, container);

// Hot-reloading
if (module.hot) {
  module.hot.accept();
}
