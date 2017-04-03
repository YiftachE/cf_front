import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import connectionHandler from '../services/connectionHandler';
import '../styles/campaignSelecter.css';

class CampaignSelecter extends Component {
  constructor(){
    super();
    this.state = {
      selectFieldValue: 1,
      campgianNames: [],
      limit: 0,
    }
  }

  componentWillMount(){
    this.getAllCampaignNames();
  }

 handleChange = (event, index, selectFieldValue) => this.setState({selectFieldValue});

 getAllCampaignNames = () => {
   let storedCampaigns = JSON.parse(localStorage.getItem("campaigns"));
   let campaignsTitles = storedCampaigns.map(function(campaign) {
     return campaign.name;
   });

   this.setState({campaignNames: campaignsTitles});
 };

 sendStart = () => {
   let selectedCampaign = JSON.parse(localStorage.getItem("campaigns"))[this.state.selectFieldValue];
   connectionHandler.startAlgo(selectedCampaign, 10)
   .then(function(){
     console.log('sent to start');
   })
   .catch(function(err){
     if(err){
       console.error(err);
     }
   });
 };
  render() {
    const styles = {
      radioButton: {
        marginBottom: 16,
        width: '40%',
        float: 'left'
      },
      radioButtonGroup: {
        margin: 'auto auto',
        height: '10vh',
        paddingLeft: '30%'
      },
      buttons: {
        borderRadius: '10px',
        backgroundColor: '#BBDEFB',
        margin: '20px'
      }
    };

    return (
      <div id='container'>
      <Subheader style={{paddingLeft: '45%'}}>Select a Campaign</Subheader>
       <RadioButtonGroup
          style={styles.radioButtonGroup}
          id='radioGroup'
          name="shipSpeed"
          defaultSelected="not_light">

        <RadioButton
          value="not_light"
          label="Campaign"
          style={styles.radioButton}
        />
        <RadioButton
          value="light"
          label="Group Campaign"
          style={styles.radioButton}
        />
       </RadioButtonGroup>

       <div style={{marginLeft: '40%'}}>
         <SelectField
            floatingLabelText="Campaigns"
            value={this.state.selectFieldValue}
            onChange={this.handleChange}
          >
            {
              this.state.campaignNames.map((name, index) =>
              <MenuItem key={name} value={index} primaryText={name} />
            )}
         </SelectField>
       </div>

       <div style={{marginLeft: '45%'}}>
       <FlatButton label="Start" style={styles.buttons} onClick={this.sendStart}/>
       </div>

       <Divider/>
      </div>
    );
  }
}

export default CampaignSelecter;
