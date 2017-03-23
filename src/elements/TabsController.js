import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import CampaignSelecter from './CampaignSelecter';
class TabsController extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  render() {
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };

    return (
      <div id='container'>
        <Tabs>
          <Tab label="Select Campaign" >
            <div>
              <CampaignSelecter/>
            </div>
          </Tab>
          <Tab label="Create New Campaign" >

          </Tab>
          <Tab label="Edit Campaign" >

          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default TabsController;
