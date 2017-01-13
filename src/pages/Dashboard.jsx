import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('ui')
@observer
class Dashboard extends React.Component {

  // When route is loaded (isomorphic)
  static onEnter({ ui }) {
    ui.title = 'Dashboard';
  }

  componentWillMount() {
    // TODO: Make it run 1 time. Now it runs twice in server side rendering.
    Dashboard.onEnter(this.props);
  }

  render() {
    return (<div>
      Put something here
    </div>);
  }
}

export default Dashboard;
