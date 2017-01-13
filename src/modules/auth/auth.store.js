import _ from 'lodash';
import Cookies from 'js-cookie';
import { extendObservable } from 'mobx';

/**
 * @class AuthStore
 */
export default class AuthStore {

  constructor(request, state = {}) {
    this.request = request;
    extendObservable(this, {
    }, state);
  }

  login(body) {
    return this
      .request('/oauth', { method: 'POST', body: Object.assign({ grant_type: 'password' }, body) })
      .then((result) => {
        Cookies.set('accessToken', result.access_token);
        return result;
      });
  }

  toJSON() {
    return _.omit(this, 'request');
  }
}
