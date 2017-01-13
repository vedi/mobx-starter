import _ from 'lodash';
import { extendObservable } from 'mobx';

/**
 * @class Common
 */
export default class Common {

  constructor(request, state = {}) {
    this.request = request;
    extendObservable(this, {
      statusCode: 200,
      location: '/',
    }, state);
  }

  toJSON() {
    return _.omit(this, 'request');
  }
}
