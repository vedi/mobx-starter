import pathToRegExp from 'path-to-regexp-es6';

import Dashboard from 'src/pages/Dashboard';
import userModule from 'src/modules/user';

// All your server side prefetching is done here
// When a route is matched, the static function is executed
const routes = [
  {
    pattern: '/',
    execute: Dashboard.onEnter,
  },
  {
    pattern: '/users',
    execute: userModule.List.onEnter,
    module: userModule,
  },
];

// Execute server-side async methods to refetch data
export default (stores, url) => {
  const matches = routes.filter(r => !!pathToRegExp(r.pattern).exec(url));
  return Promise.all(matches.map((route) => {
    const props = Object.assign({ module: route.module }, stores);
    return route.execute(props);
  }));
};
