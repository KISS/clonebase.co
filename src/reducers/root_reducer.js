import { combineReducers } from 'redux';
import { dataReducer } from './data_reducer';


const rootReducer = combineReducers({
  companies: dataReducer
});

export default rootReducer;
