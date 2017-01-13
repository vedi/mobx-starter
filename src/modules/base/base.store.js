import _ from 'lodash';
import { extendObservable } from 'mobx';

/**
 * @class BaseStore
 */
export default class BaseStore {

  constructor(request, state = {}, url) {
    this.request = request;
    this.url = url;
    extendObservable(this, {
      list: [],
      item: null,
      configs: [],
    }, state);
  }

  fetchList() {
    return this
      .request(this.url)
      .then((result) => {
        this.list = result;
        return result;
      });
  }

  fetchOne(id) {
    return this
      .request(`${this.url}/${id}`)
      .then((result) => {
        this.item = result;
        return result;
      });
  }

  create(body) {
    return this
      .request(this.url, { method: 'POST', body })
      .then((result) => {
        this.list.push(result);
        return result;
      });
  }

  update(id, body) {
    return this
      .request(`${this.url}/${id}`, { method: 'PATCH', body })
      .then((result) => {
        const affectedItem = this.list.find((item => item._id === id));
        if (affectedItem) {
          Object.assign(affectedItem, result);
        }
        return result;
      });
  }

  remove(id) {
    return this
      .request(`${this.url}/${id}`, { method: 'DELETE' })
      .then(() => {
        this.list = this.list.filter(item => item._id !== id);
      });
  }

  toJSON() {
    return _.omit(this, 'request');
  }

}
