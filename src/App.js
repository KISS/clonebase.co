import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


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
        {outcome}
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

    if (competitorProfilesList.length > 0) {
      competitorProfilesList = [];
    }

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
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.onUserInput(this.filterTextInput.value.toLowerCase());
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Search..." value={this.props.value}
          ref={(input) => this.filterTextInput = input}
          onChange={this.handleChange} />
        <input type="submit" value="submit" />
      </form>
    );
  }

};


class FilterableCompanySearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    };

    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  componentDidMount() {
    this.props.onGetCompanies();
  }

  render() {
    console.log('this.props.companies', this)

    const { organization } = this.props.companies;

    return (
      <div className="App">
        <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput} />
        <CompanyProfile companies={this.props.companies} filterText={this.state.filterText} />
        <CompetitorDetails companies={this.props.companies} />
        <showCompetitors/>
      </div>
    );
  }

};


export default FilterableCompanySearch;
