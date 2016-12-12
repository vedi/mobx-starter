import React from 'react'
import {observer, inject} from 'mobx-react'

@inject('todos') @observer
class Todo extends React.Component {
  render() {
    const {todos, item} = this.props

    return <li className="todo">
      <div className="view">
        <label>{item.text}</label>
        <button className="destroy" onClick={(e) => todos.remove(item)}/>
      </div>
    </li>
  }
}

export default Todo
