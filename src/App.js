import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";


var showCompetitors = function(companies) {

  var competitorsToShow = companies;

  return (
    <div>
      {competitorsToShow}
    </div>
  );
}


function showCompetitorMaches(companiesAll, competitors) {

  if (competitors[0] === "") {
    return;
  }

  var competitorMatches = [];

  companiesAll.props.children.forEach(function(company) {

    var companyToCheck = company.company_name;
    var competitorToCompare = competitors;

    for (var j = 0; j < competitors.length; j++) {
      if (companyToCheck == competitors[j] ) {
        competitorMatches.push(
          <div>
             <CompetitorProfile company={company} key={company} />
          </div>
        );
      }
    }

  });

  return (
    <div>
      <h1>Competitor Profiles</h1>
      {competitorMatches}
    </div>
  );
}


class CompetitorProfile extends React.Component {

  render() {

    var logo = <img className='company_logo' src={this.props.company.profile_image_url} alt={this.props.company.name} />
    var name = <h2>{this.props.company.company_name}</h2>
    var primaryRole = <div>{this.props.company.primary_role}</div>
    var location = <div>{this.props.company.location_city}, {this.props.company.location_region}</div>
    var website = <div><a href='{this.props.company.homepage_url}'>{this.props.company.homepage_url}</a></div>
    var description = <div>{this.props.company.short_description}</div>

    return (
      <div>
        {logo}
        {name}
        {primaryRole}
        {location}
        {website}
        {description}
      </div>

    );
  }
};


class CompetitorDetails extends React.Component {

  render() {

    var outcome = showCompetitorMaches( showCompetitors(this.props.companies), competitorProfilesList);

    return (
      <div>
        { outcome }
      </div>
    );
  }

};


//TODO:: maintain state elsewhere
var competitorProfilesList = [];

class CompanyDetails extends React.Component {

  render() {

    var logo = <img className='company_logo' src={this.props.company.profile_image_url} alt={this.props.company.name} />
    var name = <h2>{this.props.company.name}</h2>
    var primaryRole = <div>{this.props.company.primary_role}</div>
    var location = <div>{this.props.company.location_city}, {this.props.company.location_region}</div>
    var website = <div><a href={this.props.company.homepage_url}>{this.props.company.homepage_url}</a></div>
    var description = <div>{this.props.company.short_description}</div>
    var competitorsAll = this.props.company.competitors;

    for (var i = 0; i < competitorsAll.length; i++) {
      competitorProfilesList.push(  this.props.company.competitors[i]  );
    }

    return (
      <div>
        {logo}
        {name}
        {primaryRole}
        {location}
        {website}
        {description}
        { listCompetitors(competitorsAll) }
      </div>
    );
  }

};


function listCompetitors(companyToList) {

  var competitorsAll = companyToList;
  var competitorsListed;

  if (competitorsAll[0] === "") {

    competitorsListed = "No competitors listed. Know of one? Email us their information.";

  } else {

    competitorsListed = [];

    for (var i = 0; i < competitorsAll.length; i++) {
      competitorsListed.push( <li key={i}> {competitorsAll[i]} </li> );
    }
  }

  return (
    <div>
      {competitorsListed}
    </div>
  );

}


class CompanyProfile extends React.Component {

  render() {

    var companyToShow = [];
    var companyToFind = this.props.filterText;

    this.props.companies.forEach(function(company) {

      if (company.company_name == companyToFind) {
        companyToShow.push( <CompanyDetails company={company} key={company} /> );
      }
    });

    return (
      <div>
        <h1>Company Profile</h1>
        {companyToShow}
      </div>
    );
  }

};


class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onUserInput(
      this.filterTextInput.value,
    );
  }

  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." value={this.props.filterText}
          ref={(input) => this.filterTextInput = input}
          onChange={this.handleChange} />
      </form>
    );
  }

};


class FilterableCompanySearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterText: 'facebook'
    };

    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(filterText) {
    this.setState({
      filterText: filterText,
    });
  }

  render() {
    return (
      <div className="App">
        <SearchBar filterText={this.state.filterText} />
        <CompanyProfile companies={this.props.companies} filterText={this.state.filterText} />
        <CompetitorDetails companies={this.props.companies} />
        <showCompetitors/>
      </div>
    );
  }

};


var COMPANIES = [
  {"company_name": "wetpaint", "crunchbase_uuid":"e1393508-30ea-8a36-3f96-dd3226033abd","primary_role":"company","name":"Wetpaint","crunchbase_url":"https://www.crunchbase.com/organization/wetpaint?utm_source=odm_csv&utm_medium=export&utm_campaign=dataset","homepage_domain":"wetpaint-inc.com","homepage_url":"http://wetpaint-inc.com","profile_image_url":"https://www.crunchbase.com/organization/wetpaint/primary-image/raw","facebook_url":"","twitter_url":"http://twitter.com/BachelrWetpaint","linkedin_url":"","stock_symbol":":","location_city":"Seattle","location_region":"Washington","location_country_code":"USA","short_description":"Wetpaint offers an online social publishing platform that helps digital publishers grow their customer base.", "competitors": [ "" ] },
  {"company_name": "digg", "crunchbase_uuid":"5f2b40b8-d1b3-d323-d81a-b7a8e89553d0","primary_role":"company","name":"Digg","crunchbase_url":"https://www.crunchbase.com/organization/digg?utm_source=odm_csv&utm_medium=export&utm_campaign=dataset","homepage_domain":"digg.com","homepage_url":"http://www.digg.com","profile_image_url":"https://www.crunchbase.com/organization/digg/primary-image/raw","facebook_url":"http://www.facebook.com/digg","twitter_url":"http://twitter.com/digg","linkedin_url":"http://www.linkedin.com/company/digg","stock_symbol":":","location_city":"","location_region":"","location_country_code":"","short_description":"Digg Inc. operates a website that enables its users to find, read, and share the most interesting and talked about stories on the internet.", "competitors": [ "twitter", "facebook" ]},
  {"company_name": "facebook", "crunchbase_uuid":"df662812-7f97-0b43-9d3e-12f64f504fbb","primary_role":"company","name":"Facebook","crunchbase_url":"https://www.crunchbase.com/organization/facebook?utm_source=odm_csv&utm_medium=export&utm_campaign=dataset","homepage_domain":"facebook.com","homepage_url":"http://www.facebook.com","profile_image_url":"https://www.crunchbase.com/organization/facebook/primary-image/raw","facebook_url":"https://www.facebook.com/","twitter_url":"https://twitter.com/facebook","linkedin_url":"http://www.linkedin.com/company/facebook","stock_symbol":"NASDAQ:FB","location_city":"Menlo Park","location_region":"California","location_country_code":"USA","short_description":"Facebook is an online social networking service that enables its users to connect with friends and family as well as make new connections.", "competitors": [ "twitter", "digg" ]},
  {"company_name": "fox interactive media", "crunchbase_uuid":"d70777cc-14bd-2416-0692-5a483781b78b","primary_role":"company","name":"Fox Interactive Media","crunchbase_url":"https://www.crunchbase.com/organization/fox-interactive-media?utm_source=odm_csv&utm_medium=export&utm_campaign=dataset","homepage_domain":"newscorp.com","homepage_url":"http://www.newscorp.com","profile_image_url":"https://www.crunchbase.com/organization/fox-interactive-media/primary-image/raw","facebook_url":"http://www.facebook.com/newscorp","twitter_url":"http://twitter.com/twitterapi","linkedin_url":"http://www.linkedin.com/company/2073","stock_symbol":":","location_city":"Beverly Hills","location_region":"California","location_country_code":"USA","short_description":"Fox Interactive Media is a network of companies in the industry of media; news, education, and information services.", "competitors": [ "" ]},
  {"company_name": "twitter", "crunchbase_uuid":"5da6106f-0d27-0d37-e9d7-dcfeccc1f709","primary_role":"company","name":"Twitter","crunchbase_url":"https://www.crunchbase.com/organization/twitter?utm_source=odm_csv&utm_medium=export&utm_campaign=dataset","homepage_domain":"twitter.com","homepage_url":"http://www.twitter.com/","profile_image_url":"https://www.crunchbase.com/organization/twitter/primary-image/raw","facebook_url":"https://www.facebook.com/twitterinc","twitter_url":"http://twitter.com/twitter","linkedin_url":"http://www.linkedin.com/company/twitter","stock_symbol":"NYSE:TWTR","location_city":"San Francisco","location_region":"California","location_country_code":"USA","short_description":"Twitter is a global social networking platform that allows its users to send and read 140-character messages known as “tweets.”", "competitors": [ "digg", "facebook" ]}
];


ReactDOM.render(
  <FilterableCompanySearch companies={COMPANIES} />,
  document.getElementById('company-profile')
);

