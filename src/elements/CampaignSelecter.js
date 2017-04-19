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
      limitValue: 100,
      campgianNames: [],
      limit: 0,
      campaignNamesElements: [],
      storedCampaigns: [],
    }
  }

  componentWillMount(){
    this.getAllCampaignNames();
  }

 handleChange = (event, index, selectFieldValue) => this.setState({selectFieldValue});
 handleLimitChange = (event, index, limitValue) => this.setState({limitValue});

 getAllCampaignNames = () => {
   let storedCampaigns = JSON.parse(localStorage.getItem("campaigns"));
   if(storedCampaigns){
     this.setState({storedCampaigns: storedCampaigns});
     var campaignsTitles = storedCampaigns.map(function(campaign) {
       return campaign.name;
     });

     this.setState({campaignNames: campaignsTitles});
     let campaignNamesElements =   campaignsTitles.map((name, index) =>
       <MenuItem key={name} value={index} primaryText={name} />
     );

     this.setState({campaignNamesElements: campaignNamesElements});
   }
 };

 sendStart = () => {
   let selectedCampaign = JSON.parse(localStorage.getItem("campaigns"))[this.state.selectFieldValue];
   connectionHandler.startAlgo(selectedCampaign, this.state.limitValue)
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
            {this.state.campaignNamesElements}
         </SelectField>
       </div>

       <div style={{marginLeft: '40%'}}>
         <SelectField
            floatingLabelText="limit"
            value={this.state.limitValue}
            onChange={this.handleLimitChange}
          >
            <MenuItem key={100} value={100} primaryText={100} />
            <MenuItem key={200} value={200} primaryText={200} />
            <MenuItem key={300} value={300} primaryText={300} />
            <MenuItem key={400} value={400} primaryText={400} />
            <MenuItem key={500} value={500} primaryText={500} />
            <MenuItem key={600} value={600} primaryText={600} />
            <MenuItem key={700} value={700} primaryText={700} />
            <MenuItem key={800} value={800} primaryText={800} />

         </SelectField>
       </div>

       <div style={{marginLeft: '45%'}}>
       <FlatButton label="Start" style={styles.buttons} onClick={this.sendStart}/>
       </div>

       <Divider/>

       {
         this.state.storedCampaigns[this.state.selectFieldValue]?
         <div>
          <span>search words: {
            this.state.storedCampaigns[this.state.selectFieldValue].keywords.map(function(kw){
              return (kw + ' ,');
            })
          }</span>
          <br />
          <span>first name: {this.state.storedCampaigns[this.state.selectFieldValue].firstName}</span>
          <br />
          <span>lsat name: {this.state.storedCampaigns[this.state.selectFieldValue].lastName}</span>
          <br />
          <span>email: {this.state.storedCampaigns[this.state.selectFieldValue].email}</span>
          <br />
          <span>phone number: {this.state.storedCampaigns[this.state.selectFieldValue].phoneNumber}</span>
          <br />
          <span>company: {this.state.storedCampaigns[this.state.selectFieldValue].company}</span>
          <br />
          <span>address: {this.state.storedCampaigns[this.state.selectFieldValue].address}</span>
          <br />
          <span>city: {this.state.storedCampaigns[this.state.selectFieldValue].city}</span>
          <br />
          <span>country: {this.state.storedCampaigns[this.state.selectFieldValue].country}</span>
          <br />
          <span>URL: {this.state.storedCampaigns[this.state.selectFieldValue].url}</span>
          <br />
          <span>job: {this.state.storedCampaigns[this.state.selectFieldValue].job}</span>
          <br />
          <span>message title: {this.state.storedCampaigns[this.state.selectFieldValue].messageTitle}</span>
         </div>
        :
        null
       }
       </div>
    );
  }
}

export default CampaignSelecter;
