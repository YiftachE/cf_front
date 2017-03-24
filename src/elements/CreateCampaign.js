import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';

class CreateCampaign extends Component {
  constructor(){
    super();
    this.state = {
      uploadCsvToggle : true,
      runningMethodState : null,
    }

    this.handleFile = this.handleFile.bind(this);
    this.runningMethodChange = this.runningMethodChange.bind(this);
  }

  handleToggle = () => {
    this.setState({
       uploadCsvToggle : !this.state.uploadCsvToggle
    });
  }

  handleFile = function(){
    console.log('new file');
  }

  runningMethodChange = (event, value) => {
    this.setState({
      runningMethodState : value
    });
  }

  render() {

    const styles = {
      radioButton: {
        marginBottom: 16,
        width: '25%',
        float: 'left',
        padding: '10px'
      },
      radioButtonGroup: {
        margin: 'auto auto',
        height: '15vh',
        paddingLeft: '25%'
      },
      toggle: {
        marginBottom: 16,
        width:'25%',
        marginLeft:'40%',
        backgroundColor: '#E0F2F1',
        borderRadius: '8px',
        padding: '5px'
      },
    };

    return (
      <div id='container'>
        <div>
          <Subheader style={{paddingLeft: '45%'}}>Campaign Info</Subheader>
          <TextField hintText="campaign title" style={{marginLeft: '40%'}}/>
          <br />
          <br />

          <span style={{marginLeft: '45%'}}>Campaign Type</span>
          <br />
          <br />

          <RadioButtonGroup
             style={styles.radioButtonGroup}
             id='radioGroup'
             name="shipSpeed"
             defaultSelected="Applications">

           <RadioButton
             value="Applications"
             label="Applications"
             style={styles.radioButton}
           />
           <RadioButton
             value="Websites"
             label="Websites"
             style={styles.radioButton}
           />
           <RadioButton
             value="Promotional Videos"
             label="Promotional Videos"
             style={styles.radioButton}
           />
          </RadioButtonGroup>

          <Divider/>
        </div>

        <div>
          <Subheader style={{paddingLeft: '45%'}}>Running method</Subheader>
          <RadioButtonGroup
             style={styles.radioButtonGroup}
             id='radioGroup'
             name="keyword"
             defaultSelected="keyword"
             onChange={this.runningMethodChange}
             >

           <RadioButton
             value="keyword"
             label="Run with keyword"
             style={styles.radioButton}
           />
           <RadioButton
             value="list websites"
             label="Run with list websites"
             style={styles.radioButton}
           />
          </RadioButtonGroup>
          <Divider/>
        </div>

        {this.state.runningMethodState === "keyword" ?
          <div>
            <Subheader style={{paddingLeft: '45%'}}>enter search words...</Subheader>
            <Toggle
              label="upload csv file"
              style={styles.toggle}
              toggle = {this.state.uploadCsvToggle}
              onToggle= {this.handleToggle.bind(this)}
            />
            <div>
              {this.state.uploadCsvToggle ?
                <TextField hintText="enter search words..." style={{marginLeft: '40%'}}/>
                :
                <input type="file" accept=".csv" onChange={this.handleFile()} ref='csvFile'/>
              }

            </div>

          <Divider/>
          </div>
        : null}

        {this.state.runningMethodState === "list websites" ?
          <div>
            <Subheader style={{paddingLeft: '45%'}}>upload websites</Subheader>
              <input type="file" accept=".csv" onChange={this.handleFile()} ref='csvFile'/>
            <Divider/>
          </div>
        : null}
      </div>
    );
  }
}

export default CreateCampaign;
