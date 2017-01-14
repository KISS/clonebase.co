import React, { Component } from 'react';
// import logo from './logo.svg';
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

  var CompanyCompetitor = React.createClass({

    render: function() {
      return (
        <li> {this.props.competitor} </li>
      );
    }

  });


  var CompanyCompetitorList = React.createClass({

    render: function() {
      return (
        <ul> {this.props.competitors} </ul>
      );
    }

  });


  var CompanyDetails = React.createClass({

    render: function() {

      var logo = <img className='company_logo' src={this.props.company.companyLogo} alt={this.props.company.companyName} />
      var name = <h2>{this.state.companyName}</h2>
      var primaryRole = <div>{this.props.company.companyRole}</div>
      var location = <div>{this.props.company.companyState}, {this.props.company.companyCountry}</div>
      var website = <div><a href={this.props.company.companyWebsite}>{this.props.company.companyWebsite}</a></div>
      var description = <div>{this.props.company.companyDescription}</div>

      return (
        <div>
          {logo}
          {name}
          {primparyRole}
          {location}
          {website}
          {description}
        </div>
      );
    }

  });


  var CompanyProfile = React.createClass({

    render: function() {

      var competitorList = [];
      var lastCompetitor = null;

      this.props.companies.forEach(function(company) {
        if (company.competitor !== lastCompetitor) {
          competitorList.push(<CompanyCompetitor competitor={company.organization.competitor} key={company.competitor} />);
        }
        lastCategory = company.competitor;
      });

      return (
        <h1>Company Profile</h1>
      );
    }

  });


  var SearchBar = React.createClass({

    render: function() {
      return (
        <form>
          <input type="text" placeholder="Search..." />
        </form>
      );
    }

  });


  var FilterableCompanySearch = React.createClass({

    render: function() {
      return (
        <SearchBar/>
        <CompanyProfile companies={this.props.companies} />
      );
    }

  });



  // DATA
  componentDidMount() {
    const rootRef = firebase.database().ref();
    const organizationRef = rootRef.child('organization');
    const companyToShow = organizationRef.child('digg');
    const companyName = companyToShow.child('name');
    const companyRole = companyToShow.child('primary_role');
    const companyWebsite = companyToShow.child('homepage_url');
    const companyLogo = companyToShow.child('profile_image_url');
    const companyState = companyToShow.child('location_region');
    const companyCountry = companyToShow.child('location_country_code');
    const companyDescription = companyToShow.child('short_description');
    const companyCompetitors = companyToShow.child('competitors');


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

        <FilterableCompanySearch/>

      </div>
    );
  }

}


export default App;


