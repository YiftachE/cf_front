import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import '../styles/campaignSelecter.css';

class CampaignSelecter extends Component {
  constructor(){
    super();
    this.state = {
      selectFieldValue: 1,
    }
  }

 handleChange = (event, index, selectFieldValue) => this.setState({selectFieldValue});

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
            <MenuItem value={1} primaryText="Nirel" />
            <MenuItem value={2} primaryText="Eden" />
            <MenuItem value={3} primaryText="Yair" />
         </SelectField>
       </div>

       <div style={{marginLeft: '30%'}}>
       <FlatButton label="Start" style={styles.buttons}/>
       <FlatButton label="Continue" style={styles.buttons}/>
       <FlatButton label="Stop/Pause" disabled={true} style={styles.buttons}/>
       </div>

       <Divider/>
      </div>
    );
  }
}

export default CampaignSelecter;