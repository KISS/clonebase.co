import ActionTypes from './action_types';
import database from './database_config';


export function getCompanies() {
  return dispatch => {
    dispatch(getDataRequestedAction());
    return database.ref('/').once('value', snap => {
      const companies = snap.val();
      dispatch(getDataFulfilledAction(companies))
    })
    .catch((error) => {
      console.log(error);
      dispatch(getDataRejectedAction());
    });
  }
}

function getDataRequestedAction() {
  return {
    type: ActionTypes.GetDataRequested
  };
}

function getDataRejectedAction() {
  return {
    type: ActionTypes.GetDataRejected
  };
}

function getDataFulfilledAction(companies) {
  return {
    type: ActionTypes.GetDataFulfilled,
    companies
  };
}
