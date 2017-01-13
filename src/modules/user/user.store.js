import { BaseStore } from 'src/modules/base';

/**
 * @class BaseStore
 */
export default class UserStore extends BaseStore {
  constructor(request, state = {}, url = '/api/users') {
    super(request, state, url);
  }
}
