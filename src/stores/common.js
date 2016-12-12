import {extendObservable} from 'mobx'

/**
 * @class Common
 */
export default class Common {

  constructor(request, socket, state = {}) {
    this.request = request;
    this.socket = socket;
    extendObservable(this, {
      title: 'Mobx-starter',
      statusCode: 200,
      hostname: 'localhost',
      backend: 'http://localhost:1340',
      clientId: 'default',
      clientSecret: 'default',
      location: '/'
    }, state)
  }

  setTitle(newTitle) {
    this.title = newTitle
  }

  toJSON() {
    return {
      title: this.title,
      statusCode: this.statusCode,
      hostname: this.hostname,
      backend: this.backend,
      location: this.location,
      clientId: this.clientId,
      clientSecret: this.clientSecret
    }
  }
}
