import _ from 'lodash';
import Bb from 'bluebird';
import { extendObservable } from 'mobx';

const DEFAULT_CONFIG = {
  baseUrl: '/api',
  perPage: 10,
  idFieldName: '_id',
};

/**
 * @class BaseStore
 */
export default class BaseStore {

  static config = DEFAULT_CONFIG;

  constructor(request, state = {}, options = {}) {
    options = _.merge(options, BaseStore.config);
    this.request = request;
    Object.assign(this, options);
    this.metadata = null;
    extendObservable(this, {
      schema: null,
      listMeta: null,
      formMeta: null,
      list: [],
      isLoading: false,
      currentPage: 0,
      hasMoreItems: true,
      item: null,
      configs: [],
    }, state);
  }

  init(url, module) {
    this.metadata = module.metadata;
    this.listMeta = this.metadata.list;
    this.formMeta = this.metadata.editForm;
    return this.getSchema(url);
  }

  fetchList(url, searchValue, sortValue) {
    const search = searchValue && searchValue.length > 0 ? `&q=${searchValue}` : '';
    let sort = '';
    if (sortValue.fieldName !== null) {
      sort = `&orderBy={"${sortValue.fieldName}": ${sortValue.direction === 'asc' ? '1' : '-1'}}`;
    }
    this.currentPage = this.currentPage + 1;
    this.isLoading = true;
    return this
      .request(
        `${this.getUrl(url)}?perPage=${this.perPage}&page=${this.currentPage}${search}${sort}`)
      .then((result) => {
        this.list = [...this.list, ...result];
        this.isLoading = false;
        this.hasMoreItems = result.length === this.perPage;
        return result;
      });
  }

  fetchOne(id, url) {
    this.item = null;
    return this
      .request(`${this.getUrl(url)}/${id}`)
      .then((result) => {
        this.item = result;
        return result;
      });
  }

  getSchema(url) {
    if (this.schema) {
      return Bb.resolve(this.schema);
    }

    return Bb
      .try(() => {
        if (this.metadata && this.metadata.schema) {
          return this.metadata.schema;
        } else {
          return this.request(`${this.getUrl(url)}/schema`);
        }
      })
      .then((result) => {
        this.schema = result;
        if (!this.listMeta) {
          this.buildListMeta();
        }
        if (!this.formMeta) {
          this.buildFormMeta();
        }
        return result;
      });
  }

  create(body, url) {
    return this
      .request(this.getUrl(url), { method: 'POST', body })
      .then((result) => {
        this.list.push(result);
        return result;
      });
  }

  update(id, body, url) {
    return this
      .request(`${this.getUrl(url)}/${id}`, { method: 'PATCH', body })
      .then((result) => {
        const affectedItem = this.list.find((item => this.getModelId(item) === id));
        if (affectedItem) {
          Object.assign(affectedItem, result);
        }
        return result;
      });
  }

  remove(id, url) {
    return this
      .request(`${this.getUrl(url)}/${id}`, { method: 'DELETE' })
      .then(() => {
        this.list = this.list.filter(item => this.getModelId(item) !== id);
      });
  }

  resetList() {
    this.currentPage = 0;
    this.list = [];
    this.hasMoreItems = true;
  }

  getUrl(url) {
    return `${this.baseUrl || ''}/${url || this.url}`;
  }

  getModelId(model) {
    return model[this.idFieldName];
  }

  buildListMeta() {
    this.listMeta = _.reduce(this.schema.properties, (result, value, key) => {
      result[key] = {};
      return result;
    }, {});
  }

  buildFormMeta() {
    this.formMeta = _.reduce(this.schema.properties, (result, value, key) => {
      result[key] = {};
      return result;
    }, {});
  }

  toJSON() {
    return _.omit(this, 'request');
  }
}
