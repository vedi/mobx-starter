import {extendObservable, asFlat} from 'mobx'

/**
 * @class Todos
 */
export default class Todos {

  constructor(request, state = {}) {
    this.request = request
    this.items = []
    extendObservable(this, {
      loading: false,
      items: []
    }, state)
  }

  map(predicate) {
    return this.items.map(predicate)
  }

  add(text) {
    return this.request(`api/todos/add`, {text})
      .then(result => {
        // Add to list
        this.items.push({
          _id: result._id,
          text: result.text
        })
      })
  }

  remove(item) {
    console.warn('Removing', item._id)
    return this.request(`api/todos/remove`, {_id: item._id})
      .then(() => {
        this.items.remove(item)
      })
  }

  browse() {
    return this.request(`api/todos`).then(items => {
      this.items = items
    })
  }
}
