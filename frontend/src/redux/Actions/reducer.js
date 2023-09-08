import * as types from "../Actions/actionType";

const initialState = {
    institutiondata:[],
    institutiondata_meta:{} ,
    countryList: {},
    loading:false
}

const InstitutionReducers =(state = initialState, action)=>{
    console.log("action.payload", action.payload)
    switch(action.type)
    {
        case types.INSTITUTE_LIST: return{
            ...state,
            institutiondata:action.payload.data,
            institutiondata_meta:action.payload.meta,
            loading:false
        }
        case types.COUNTRIES_LIST: return{
            ...state,
            countryList:action.payload.data,
            loading:false
        }
        default:return state;
    }
};
export default InstitutionReducers;
