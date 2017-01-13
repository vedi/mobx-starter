import React from 'react';

import config from 'config/config';
import App from '../../pages/App';

function insertState(stores) {
  return {
    __html: `window.__STATE = ${JSON.stringify(stores, null, process.env.DEV ? 4 : 0)};`,
  };
}

class Html extends React.Component {
  render() {
    const { stores, children } = this.props;
    const devServerURL = !process.env.DEV ? '' : `//${stores.common.hostname.replace(
      config.port, config.devServer.port)}`;

    return (<html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{stores.common.title}</title>
        <meta name="title" content={stores.common.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />

        {/* Bundled CSS */}
        <link href={`${devServerURL}/build/bundle.css`} rel="stylesheet" />

        {/* SSR State*/}

        {
          // eslint-disable-next-line react/no-danger
        } <script dangerouslySetInnerHTML={insertState(stores)} />
      </head>
      <body>
        {/* Our content rendered here */}
        <div id="container">
          <App stores={stores}>
            {children}
          </App>
        </div>

        {/* Bundled JS */}
        <script async src={`${devServerURL}/build/bundle.js`} />
      </body>
    </html>);
  }
}

export default Html;
