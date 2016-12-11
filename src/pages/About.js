import React from 'react'
import {observer, inject} from 'mobx-react'

@inject('common') @observer
class About extends React.Component {

  componentWillMount() {
    About.onEnter(this.props);
  }

  // When route is loaded (isomorphic)
  static onEnter({common, location}) {
    common.title = 'About';
    common.location = location;
  }

  render() {
    return <main>
      <h1>mobx-starter</h1>
      <section className="account">
        <p>
          <img src="https://avatars0.githubusercontent.com/u/805022?v=3&s=160"/>
        </p>
        <p>
          Created for the javascript community. May your reign never end!
        </p>
        <p>
          <a href="https://github.com/nightwolfz/mobx-starter" target="_blank">
            https://github.com/nightwolfz/mobx-starter
          </a>
        </p>
      </section>
    </main>
  }
}

export default About
