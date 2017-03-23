import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CampaignSelecter from './elements/CampaignSelecter';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <CampaignSelecter/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
