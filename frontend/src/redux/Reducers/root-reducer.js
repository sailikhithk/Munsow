import {combineReducers} from "redux";

const rootReducer = combineReducers({
    data:AdminReducers,
    dataById:AdmindataIdReducers
});

export default rootReducer;
