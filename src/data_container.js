import { connect } from 'react-redux';
import { getCompanies } from './get_companies';
import FilterableCompanySearch from './App';


function mapStateToProps(state) {
  return {
    companies: state.companies
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetCompanies: () => dispatch(getCompanies())
  };
}

const dataContainer = connect(mapStateToProps, mapDispatchToProps)(FilterableCompanySearch);

export default dataContainer;
