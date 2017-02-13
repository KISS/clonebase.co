import ActionTypes from '../action_types';


export function dataReducer(state = {}, action) {
  switch(action.type) {
    case ActionTypes.GetDataRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case ActionTypes.GetDataRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in getting data'
      });
    }
    case ActionTypes.GetDataFulfilled: {
      const { organization } = action.companies;
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Got data!',
        organization
      });
      return newState;
    }
    default:
      return state;
  }
}
