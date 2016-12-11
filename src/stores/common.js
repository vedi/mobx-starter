import {extendObservable} from 'mobx'

/**
 * @class Common
 */
export default class Common {

  constructor(request, state = {}) {
    this.request = request;
    extendObservable(this, {
      title: 'Mobx-starter',
      statusCode: 200,
      hostname: 'localhost',
      location: '/'
    }, state)
  }

  setTitle(newTitle) {
    this.title = newTitle
  }
}
