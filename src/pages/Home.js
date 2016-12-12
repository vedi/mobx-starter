import React from 'react'
import {observer, inject} from 'mobx-react'

@inject('common') @observer
class Home extends React.Component {

  componentWillMount() {
    // TODO: Make it run 1 time. Now it runs twice in server side rendering.
    Home.onEnter(this.props);
  }

  // When route is loaded (isomorphic)
  static onEnter({todos, common}) {
    common.title = 'Home';
  }

  render() {
    return <main>
    </main>
  }
}

export default Home
