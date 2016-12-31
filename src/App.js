import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase";


class App extends Component {

  // Initialize constructor, with initial state
  constructor() {
    super();
    this.state = {
      companyName: 'companyName',
      companyRole: 'companyRole',
      companyWebsite: 'companyWebsite',
      companyLogo: 'companyLogo',
      companyState: 'companyState',
      companyCountry: 'companyCountry',
      companyDescription: 'companyDescription',
      companyCompetitors: 'companyCompetitors'
    };
  }

  // Lifecycle method of Component, called only once, right after, it's been rendered to the DOM
  // Contains ref to realtime database
  componentDidMount() {
    const rootRef = firebase.database().ref();
    const organizationRef = rootRef.child('organization');
    // const organizationRoleRef = organizationRef.child('primary_role');
    // const companyRef = organizationRoleRef.child('company');
    // const investorRef = organizationRoleRef.child('investor');

    // company/{insert company name} => convert to lowercase

    const companyToShow = organizationRef.child('facebook');
    const companyName = companyToShow.child('name');
    const companyRole = companyToShow.child('primary_role');
    const companyWebsite = companyToShow.child('homepage_url');
    const companyLogo = companyToShow.child('profile_image_url');
    const companyState = companyToShow.child('location_region');
    const companyCountry = companyToShow.child('location_country_code');
    const companyDescription = companyToShow.child('short_description');
    const companyCompetitors = companyToShow.child('competitors');


    // console.log("company name " + companyName)


    // .on() method is what allows us to synchronize data in realtime
    // ** should always be attached to a reference that points at a spot in the database

    // snap is a callback function, using arrow functions from ES6
    companyName.on('value', snap => {
      this.setState({
        companyName: snap.val()
      });
    });
    companyRole.on('value', snap => {
      this.setState({
        companyRole: snap.val()
      });
    });
    companyWebsite.on('value', snap => {
      this.setState({
        companyWebsite: snap.val()
      });
    });

    companyLogo.on('value', snap => {
      this.setState({
        companyLogo: snap.val()
      });
    });

    companyState.on('value', snap => {
      this.setState({
        companyState: snap.val()
      });
    });

    companyCountry.on('value', snap => {
      this.setState({
        companyCountry: snap.val()
      });
    });

    companyDescription.on('value', snap => {
      this.setState({
        companyDescription: snap.val()
      });
    });

    companyCompetitors.on('value', snap => {
      this.setState({
        companyCompetitors: snap.val()
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2>Clonebase</h2>
        </div>
        <h1> {this.state.companyName} </h1>
        <img className="company_logo" src={this.state.companyLogo}/>
        <p>  Primary role: {this.state.companyRole} </p>
        <p>  Website: <a href={this.state.companyWebsite}>{this.state.companyWebsite}</a> </p>
        <p>  Location: {this.state.companyState}, {this.state.companyCountry} </p>
        <p>  Description: {this.state.companyDescription} </p>
        <p>  Competitors: {this.state.companyCompetitors} </p>

        <CompetitorList/>
      </div>
    );
  }
}

var CompetitorList = React.createClass({

  render: function() {
    return (
      <div>
        Competitors
        <ul>
          <li> Competitor One </li>
          <li> Competitior Two </li>
        </ul>
      </div>
    );
  }
});

export default App;
