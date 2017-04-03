import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import config from '../config';
import axios from 'axios';
import connectionHandler from '../services/connectionHandler';
import Papa from 'papaparse';
import CustomAlert from './CustomAlert';

class CreateCampaign extends Component {
  constructor(){
    super();
    this.state = {
      uploadCsvToggle : true,
      runningMethodState : 'keyword',
      countryListValue: 1,
      createVideoToggle : false,
      countries: [],
      title: '',
      searchWords: [],
      sites: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      company: '',
      address: '',
      city: '',
      url: '',
      job: '',
      messageTitle: '',
      inquiry: '',
      blackList: '',
      blackListed: []
    }

    this.handleCsvSearchWords = this.handleCsvSearchWords.bind(this);
    this.handleCsvSites = this.handleCsvSites.bind(this);
    this.submitToServer = this.submitToServer.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleUploadToggle = this.handleUploadToggle.bind(this);
    this.addToBlackList = this.addToBlackList.bind(this);
  }

  componentWillMount(){
    var that = this;
    axios.get(config.external.countries)
    .then((res) => that.setState({countries: res.data.countries}))
    .catch((err) => console.error(err));

    connectionHandler.getAllBlackListed()
    .then((res) => that.setState({blackListed: res.data}))
    .catch((err) => console.error(err));

  }

  handleUploadToggle = () => {
    this.setState({
       uploadCsvToggle : !this.state.uploadCsvToggle
    });
  }

  handleCsvSearchWords = function(){
    let that = this;
    let csvFile = this.refs.csvSearchWords.files[0];
    Papa.parse(csvFile, {
    	complete: function(results) {
        that.setState({
          searchWords: results.data
        });
    	}
    });
  }

  handleCsvSites = function(){
    let that = this;
    let csvFile = this.refs.csvSites.files[0];
    Papa.parse(csvFile, {
      complete: function(results) {
        that.setState({
          sites: results.data
        });
      }
    });
  }

  handleCountryChange = (event, index, value) => this.setState({countryListValue:value});

  submitToServer = function(){
    let data = {
      title: this.state.title,
      // searchWords: this.state.searchWords.split(';'),
      sites: this.state.sites,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      company: this.state.company,
      address: this.state.address,
      city: this.state.city,
      url: this.state.url,
      job: this.state.job,
      messageTitle: this.state.messageTitle,
      inquiry: this.state.inquiry,
      blackList: this.state.blackList
    }
    localStorage.setItem('title', data.title);
    localStorage.setItem('sites', data.sites);
    localStorage.setItem('firstName', data.firstName);
    localStorage.setItem('lastName', data.lastName);
    localStorage.setItem('email', data.email);
    localStorage.setItem('phoneNumber', data.phoneNumber);
    localStorage.setItem('company', data.company);
    localStorage.setItem('address', data.address);
    localStorage.setItem('city', data.city);
    localStorage.setItem('url', data.url);
    localStorage.setItem('job', data.job);
    localStorage.setItem('messageTitle', data.messageTitle);
    localStorage.setItem('inquiry', data.inquiry);

    if(data.state.searchWords !== ''){
      localStorage.setItem('searchWords', this.state.searchWords.split(';'));
    }

    // connectionHandler.saveCampaign(data)
    // .then(function (response) {
    //   console.log('nirel');
    //   <CustomAlert content="Saved Successfully!" />
    // })
    // .catch(function (error) {
    //   <CustomAlert content="Error has occured... Check logs!" />
    // });
  }

  addToBlackList = function(){
    var that = this;
    let data = {
      campaign: this.state.campaign,
      site: this.state.blackList
    }
    this.setState({blackList: ''});
    connectionHandler.addToBlackList(data)
    .then(function (response) {
      let prevSites = that.state.blackListed;
      prevSites.push(response.data.site);
      that.setState({blackListed: prevSites});
    })
    .catch(function (err) {
      console.error(err);
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
          <TextField
              hintText="campaign title"
              style={{marginLeft: '40%'}}
              value={this.state.title}
              onChange={(e, val)=>this.setState({title: val})}/>
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
            <Subheader style={{paddingLeft: '45%'}}>enter search words...</Subheader>
            <Toggle
              label="upload csv file"
              style={styles.toggle}
              toggle = {this.state.uploadCsvToggle}
              onToggle= {this.handleUploadToggle}
            />
            <div>
              {this.state.uploadCsvToggle ?
                <TextField hintText="enter search words..." style={{marginLeft: '40%'}} value={this.state.searchWords} onChange={(e, val)=>this.setState({searchWords: val})}/>
                :
                <input type="file" accept=".csv" onChange={this.handleCsvSearchWords} ref="csvSearchWords"/>
              }

            </div>

          <Divider/>
          </div>

        <div>
          <Subheader style={{paddingLeft: '45%'}}>Contact Info</Subheader>
          <div style={{marginLeft: '40%'}}>
            <TextField
              hintText="First name"
              floatingLabelText="first name"
              value={this.state.firstName}
              onChange={(e, val)=>this.setState({firstName: val})}
            />
            <br />
            <TextField
              hintText="Last name"
              floatingLabelText="Last name"
              value={this.state.lastName}
              onChange={(e, val)=>this.setState({lastName: val})}
            />
            <br />
            <TextField
              hintText="email"
              floatingLabelText="email"
              value={this.state.email}
              onChange={(e, val)=>this.setState({email: val})}
            />
            <br />
            <TextField
              hintText="phone number"
              floatingLabelText="phone number"
              value={this.state.phoneNumber}
              onChange={(e, val)=>this.setState({phoneNumber: val})}
            />
            <br />
            <TextField
              hintText="company"
              floatingLabelText="company"
              value={this.state.company}
              onChange={(e, val)=>this.setState({company: val})}
            />
            <br />
            <TextField
              hintText="address"
              floatingLabelText="address"
              value={this.state.address}
              onChange={(e, val)=>this.setState({address: val})}
            />
            <br />
            <TextField
              hintText="city"
              floatingLabelText="city"
              value={this.state.city}
              onChange={(e, val)=>this.setState({city: val})}
            />
            <br />
            <SelectField
              floatingLabelText="Country"
              value={this.state.countryListValue}
              onChange={this.handleCountryChange}
            >
              {
                this.state.countries.map((country, index) =>
                <MenuItem key={country} value={index} primaryText={country} />
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
            value={this.state.url}
            onChange={(e, val)=>this.setState({url: val})}
          />
          <br />
          <TextField
            hintText="Job"
            floatingLabelText="Job"
            value={this.state.job}
            onChange={(e, val)=>this.setState({job: val})}
          />
          <br />
          <TextField
            hintText="Message title"
            floatingLabelText="Message title"
            value={this.state.messageTitle}
            onChange={(e, val)=>this.setState({messageTitle: val})}
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
              value={this.state.inquiry}
              onChange={(e, val)=>this.setState({inquiry: val})}
            />
            <br />
          </div>
          <Divider/>
        </div>

        <div>
          <Subheader style={{paddingLeft: '45%'}}>Black list</Subheader>
          <div style={{marginLeft: '40%'}}>
            <TextField
              hintText="Black list"
              floatingLabelText="Black list"
              value={this.state.blackList}
              onChange={(e, val)=>this.setState({blackList: val})}
            />
            <FloatingActionButton style={{marginLeft: '45%'}} onClick={this.addToBlackList}>
              Add
            </FloatingActionButton>
            <br />
            <ul style={{listStyle:'none'}}>
              {
                this.state.blackListed.map((site, index) =>
                <li key={index}> {site} </li>
              )}
            </ul>
          </div>
          <Divider/>
        </div>
        <FloatingActionButton style={{marginLeft: '45%'}} onClick={this.submitToServer}>
          <SendIcon />
        </FloatingActionButton>
      </div>
    );
  }
}

export default CreateCampaign;
