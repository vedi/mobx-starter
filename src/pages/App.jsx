import React from 'react';
import { Match, Miss } from 'react-router';
import { Provider } from 'mobx-react';
import DevTool from 'mobx-react-devtools';

import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';

import Dashboard from './Dashboard';
import { LoginForm } from './../modules/auth';
import userModuleOptions from './../modules/user';
import NotFound from './NotFound';
import Menu from '../components/common/Menu';
import Title from '../components/common/Title';
import ConfirmationDialog from '../components/ConfirmationDialog';
import LastResultSnackbar from '../components/LastResultSnackbar';

injectTapEventPlugin();

class App extends React.Component {
  render() {
    const { stores } = this.props;

    const theme = getMuiTheme({ userAgent: navigator.userAgent });

    // Wrapping with provider gives children access to stores
    return (<Provider {...stores}>
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <DevTool />
          <Menu />
          <Title />
          <div>
            <Match exactly pattern="/" component={Dashboard} />
            <Match exactly pattern="/login" component={LoginForm} />

            <Match
              exactly
              pattern="/users"
              render={matchProps => (
                <userModuleOptions.List {...matchProps} module={userModuleOptions} />
              )}
            />
            <Match
              exactly
              pattern="/users/create"
              render={matchProps => (
                <userModuleOptions.Form {...matchProps} module={userModuleOptions} />
              )}
            />
            <Match
              exactly
              pattern="/users/edit/:id"
              render={matchProps => (
                <userModuleOptions.Form {...matchProps} module={userModuleOptions} />
              )}
            />

            <Miss component={NotFound} />

            <ConfirmationDialog />
            <LastResultSnackbar />
          </div>
        </div>
      </MuiThemeProvider>
    </Provider>);
  }
}

export default App;
