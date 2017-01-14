import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";





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
        lastCompetitor = company.competitor;
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
        <div className="App">
          <SearchBar/>
          <CompanyProfile companies={this.props.companies} />
        </div>
      );
    }

  });


var COMPANIES = [
{
  "organization": {
    "wetpaint": {
      "crunchbase_uuid":"e1393508-30ea-8a36-3f96-dd3226033abd","primary_role":"company","name":"Wetpaint","crunchbase_url":"https://www.crunchbase.com/organization/wetpaint?utm_source=odm_csv&utm_medium=export&utm_campaign=dataset","homepage_domain":"wetpaint-inc.com","homepage_url":"http://wetpaint-inc.com","profile_image_url":"https://www.crunchbase.com/organization/wetpaint/primary-image/raw","facebook_url":"","twitter_url":"http://twitter.com/BachelrWetpaint","linkedin_url":"","stock_symbol":":","location_city":"Seattle","location_region":"Washington","location_country_code":"USA","short_description":"Wetpaint offers an online social publishing platform that helps digital publishers grow their customer base."},
    "zoho": {
      "crunchbase_uuid":"bf4d7b0e-b34d-2fd8-d292-6049c4f7efc7","primary_role":"company","name":"Zoho","crunchbase_url":"https://www.crunchbase.com/organization/zoho?utm_source=odm_csv&utm_medium=export&utm_campaign=dataset","homepage_domain":"zoho.com","homepage_url":"https://www.zoho.com/","profile_image_url":"https://www.crunchbase.com/organization/zoho/primary-image/raw","facebook_url":"http://www.facebook.com/zoho","twitter_url":"http://twitter.com/zoho","linkedin_url":"http://www.linkedin.com/company/zoho-corporation_38373","stock_symbol":":","location_city":"Pleasanton","location_region":"California","location_country_code":"USA","short_description":"Zoho offers a suite of business, collaboration, and productivity applications."},
    "digg": {
      "crunchbase_uuid":"5f2b40b8-d1b3-d323-d81a-b7a8e89553d0","primary_role":"company","name":"Digg","crunchbase_url":"https://www.crunchbase.com/organization/digg?utm_source=odm_csv&utm_medium=export&utm_campaign=dataset","homepage_domain":"digg.com","homepage_url":"http://www.digg.com","profile_image_url":"https://www.crunchbase.com/organization/digg/primary-image/raw","facebook_url":"http://www.facebook.com/digg","twitter_url":"http://twitter.com/digg","linkedin_url":"http://www.linkedin.com/company/digg","stock_symbol":":","location_city":"","location_region":"","location_country_code":"","short_description":"Digg Inc. operates a website that enables its users to find, read, and share the most interesting and talked about stories on the internet.", "competitors": [ "twitter", "facebook" ] },
    "facebook": {
      "crunchbase_uuid":"df662812-7f97-0b43-9d3e-12f64f504fbb","primary_role":"company","name":"Facebook","crunchbase_url":"https://www.crunchbase.com/organization/facebook?utm_source=odm_csv&utm_medium=export&utm_campaign=dataset","homepage_domain":"facebook.com","homepage_url":"http://www.facebook.com","profile_image_url":"https://www.crunchbase.com/organization/facebook/primary-image/raw","facebook_url":"https://www.facebook.com/","twitter_url":"https://twitter.com/facebook","linkedin_url":"http://www.linkedin.com/company/facebook","stock_symbol":"NASDAQ:FB","location_city":"Menlo Park","location_region":"California","location_country_code":"USA","short_description":"Facebook is an online social networking service that enables its users to connect with friends and family as well as make new connections.", "competitors": [ "twitter", "digg" ]},
    "omnidrive": {
      "crunchbase_uuid":"60485007-8856-bbac-aa1b-c535c41f5f47","primary_role":"company","name":"Omnidrive","crunchbase_url":"https://www.crunchbase.com/organization/omnidrive?utm_source=odm_csv&utm_medium=export&utm_campaign=dataset","homepage_domain":"omnidrive.com","homepage_url":"http://www.omnidrive.com","profile_image_url":"https://www.crunchbase.com/organization/omnidrive/primary-image/raw","facebook_url":"http://www.facebook.com/Nomadesk","twitter_url":"http://twitter.com/Nomadesk","linkedin_url":"http://www.linkedin.com/company/nomadesk","stock_symbol":":","location_city":"Palo Alto","location_region":"California","location_country_code":"USA","short_description":"Omnidrive provides online storage facilities that allow users to access, edit and share their files via a web browser."},
    "geni": {
      "crunchbase_uuid":"4111dc8b-c0df-2d24-ed33-30cd137b3098","primary_role":"company","name":"Geni","crunchbase_url":"https://www.crunchbase.com/organization/geni?utm_source=odm_csv&utm_medium=export&utm_campaign=dataset","homepage_domain":"geni.com","homepage_url":"http://www.geni.com","profile_image_url":"https://www.crunchbase.com/organization/geni/primary-image/raw","facebook_url":"","twitter_url":"http://twitter.com/geni","linkedin_url":"","stock_symbol":":","location_city":"West Hollywood","location_region":"California","location_country_code":"USA","short_description":"Geni is an online community of genealogists collaborating to help individuals build their own family trees."},
    "flektor": {
      "crunchbase_uuid":"180ebf67-68d0-2316-e93d-8e1e546330ba","primary_role":"company","name":"Flektor","crunchbase_url":"https://www.crunchbase.com/organization/flektor?utm_source=odm_csv&utm_medium=export&utm_campaign=dataset","homepage_domain":"flektor.com","homepage_url":"http://www.flektor.com","profile_image_url":"https://www.crunchbase.com/organization/flektor/primary-image/raw","facebook_url":"","twitter_url":"","linkedin_url":"","stock_symbol":":","location_city":"Culver City","location_region":"California","location_country_code":"USA","short_description":"Flektor is a mash-up platform that enables consumers to create, remix, and share photos and videos on the internet."},
    "fox interactive media": {
      "crunchbase_uuid":"d70777cc-14bd-2416-0692-5a483781b78b","primary_role":"company","name":"Fox Interactive Media","crunchbase_url":"https://www.crunchbase.com/organization/fox-interactive-media?utm_source=odm_csv&utm_medium=export&utm_campaign=dataset","homepage_domain":"newscorp.com","homepage_url":"http://www.newscorp.com","profile_image_url":"https://www.crunchbase.com/organization/fox-interactive-media/primary-image/raw","facebook_url":"http://www.facebook.com/newscorp","twitter_url":"http://twitter.com/twitterapi","linkedin_url":"http://www.linkedin.com/company/2073","stock_symbol":":","location_city":"Beverly Hills","location_region":"California","location_country_code":"USA","short_description":"Fox Interactive Media is a network of companies in the industry of media; news, education, and information services."},
    "twitter": {
      "crunchbase_uuid":"5da6106f-0d27-0d37-e9d7-dcfeccc1f709","primary_role":"company","name":"Twitter","crunchbase_url":"https://www.crunchbase.com/organization/twitter?utm_source=odm_csv&utm_medium=export&utm_campaign=dataset","homepage_domain":"twitter.com","homepage_url":"http://www.twitter.com/","profile_image_url":"https://www.crunchbase.com/organization/twitter/primary-image/raw","facebook_url":"https://www.facebook.com/twitterinc","twitter_url":"http://twitter.com/twitter","linkedin_url":"http://www.linkedin.com/company/twitter","stock_symbol":"NYSE:TWTR","location_city":"San Francisco","location_region":"California","location_country_code":"USA","short_description":"Twitter is a global social networking platform that allows its users to send and read 140-character messages known as “tweets.”"},
    "stumbleupon": {
      "crunchbase_uuid":"3d16cb4c-911e-75c0-de5a-15c316b39f98","primary_role":"company","name":"StumbleUpon","crunchbase_url":"https://www.crunchbase.com/organization/stumbleupon?utm_source=odm_csv&utm_medium=export&utm_campaign=dataset","homepage_domain":"stumbleupon.com","homepage_url":"http://www.stumbleupon.com/","profile_image_url":"https://www.crunchbase.com/organization/stumbleupon/primary-image/raw","facebook_url":"https://www.facebook.com/StumbleUpon","twitter_url":"http://twitter.com/stumbleupon","linkedin_url":"http://www.linkedin.com/company/stumbleupon","stock_symbol":":","location_city":"San Francisco","location_region":"California","location_country_code":"USA","short_description":"StumbleUpon is a discovery engine that finds and recommends personalized web content to its users."},
    }
  }
];


ReactDOM.render(
  <FilterableCompanySearch companies={COMPANIES} />,
  document.getElementById('company-profile')
);

