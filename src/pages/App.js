import React, {PropTypes} from 'react'
import {Match, Miss} from 'react-router'
import {Provider} from 'mobx-react'
import DevTool from 'mobx-react-devtools';

import injectTapEventPlugin from 'react-tap-event-plugin';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';

import Home from './Home'
import About from './About'
import Login from '../components/account/Login'
import Logout from '../components/account/Logout'
import Register from '../components/account/Register'
import NotFound from './NotFound'
import Menu from '../components/common/Menu'
import Title from '../components/common/Title'

injectTapEventPlugin();

const styles = {
  main: {
    marginLeft: 250
  }
};

class App extends React.Component {
  render() {
    const {stores} = this.props;

    const theme = getMuiTheme({userAgent: navigator.userAgent});

    // Wrapping with provider gives children access to stores
    return (<Provider {...stores}>
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <DevTool />
          <Menu/>
          <Title/>
          <div style={styles.main}>
            <Match exactly pattern="/" component={Home}/>
            <Match exactly pattern="/page/about" component={About}/>

            {/* User management */}
            <Match exactly pattern="/page/login" component={Login}/>
            <Match exactly pattern="/page/logout" component={Logout}/>
            <Match exactly pattern="/page/register" component={Register}/>

            <Miss component={NotFound}/>
          </div>
        </div>
      </MuiThemeProvider>
    </Provider>)
  }
}

export default App
