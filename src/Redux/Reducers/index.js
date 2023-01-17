import banenrReducer from './banner.js';
import {combineReducers} from 'redux';
import collectionsReducer from './collections.js';
import advertiseReducer from './advertise.js';

const allReducers = combineReducers({
    banner: banenrReducer,
    collections: collectionsReducer,
    advertise: advertiseReducer
})

export default allReducers;