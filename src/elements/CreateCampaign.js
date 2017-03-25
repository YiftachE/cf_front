import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import config from '../config';
import axios from 'axios';

class CreateCampaign extends Component {
  constructor(){
    super();
    this.state = {
      uploadCsvToggle : true,
      runningMethodState : 'keyword',
      countryListValue: 1,
      createVideoToggle : false,
      countries: [],
    }

    this.handleFile = this.handleFile.bind(this);
    this.runningMethodChange = this.runningMethodChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleVideoToggle = this.handleVideoToggle.bind(this);
    this.handleUploadToggle = this.handleUploadToggle.bind(this);
  }

  componentWillMount(){
    var that = this;
    axios.get(config.external.countries)
    .then((res) => that.setState({countries: res.data.countries}))
    .catch((err) => console.error(err));
  }

  handleUploadToggle = () => {
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

  handleCountryChange = (event, index, value) => this.setState({countryListValue:value});

  handleVideoToggle = () => this.setState({createVideoToggle: !this.state.createVideoToggle});

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
              onToggle= {this.handleUploadToggle}
            />
            <div>
              {this.state.uploadCsvToggle ?
                <TextField hintText="enter search words..." style={{marginLeft: '40%'}}/>
                :
                <input type="file" accept=".csv" onChange={this.handleFile} ref='csvFile'/>
              }

            </div>

          <Divider/>
          </div>
        : null}

        {this.state.runningMethodState === "list websites" ?
          <div>
            <Subheader style={{paddingLeft: '45%'}}>upload websites</Subheader>
              <input type="file" accept=".csv" onChange={this.handleFile} ref='csvFile'/>
            <Divider/>
          </div>
        : null}
        <div>
          <Subheader style={{paddingLeft: '45%'}}>Contact Info</Subheader>
          <div style={{marginLeft: '40%'}}>
            <TextField
              hintText="First name"
              floatingLabelText="first name"
            />
            <br />
            <TextField
              hintText="Last name"
              floatingLabelText="Last name"
            />
            <br />
            <TextField
              hintText="email"
              floatingLabelText="email"
            />
            <br />
            <TextField
              hintText="phone number"
              floatingLabelText="phone number"
            />
            <br />
            <TextField
              hintText="company"
              floatingLabelText="company"
            />
            <br />
            <TextField
              hintText="address"
              floatingLabelText="address"
            />
            <br />
            <TextField
              hintText="city"
              floatingLabelText="city"
            />
            <br />
            <SelectField
              floatingLabelText="Country"
              value={this.state.countryListValue}
              onChange={this.handleCountryChange}
            >
              {
                this.state.countries.map((country, index) =>
                <MenuItem value={index} primaryText={country} />
              )}
            </SelectField>
          </div>
          <Divider/>
        </div>

        <div>
          <Subheader style={{paddingLeft: '45%'}}>Advanced</Subheader>
          <div style={{marginLeft:'40%'}}>
          <TextField
            hintText="URL"
            floatingLabelText="URL"
          />
          <br />
          <TextField
            hintText="Job"
            floatingLabelText="Job"
          />
          <br />
          <TextField
            hintText="Message title"
            floatingLabelText="Message title"
          />
          </div>
          <Divider/>
        </div>

        <div>
          <Subheader style={{paddingLeft: '45%'}}>Message</Subheader>
          <div style={{marginLeft: '40%'}}>
            <TextField
              hintText="Message / Comment / Inquiry"
              floatingLabelText="Message / Comment / Inquiry"
              multiLine={true}
              rows={8}
              rowsMax={20}
            />
            <br />
          </div>
          <Divider/>
        </div>

        <div>
          <Subheader style={{paddingLeft: '45%'}}>Create a video</Subheader>
          <Toggle
            label="create a video"
            style={styles.toggle}
            toggle = {this.state.createVideoToggle}
            onToggle= {this.handleVideoToggle}
          />
          <Divider/>
        </div>

        <div>
          <Subheader style={{paddingLeft: '45%'}}>Black list</Subheader>
          <div style={{marginLeft: '40%'}}>
            <TextField
              hintText="Black list"
              floatingLabelText="Black list"
            />
            <br />
            /*black list sites: {this.blacklisted}*/
          </div>
          <Divider/>
        </div>

      </div>
    );
  }
}

export default CreateCampaign;
