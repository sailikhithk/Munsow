import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from  '../../baseurl';

const getInstituteData = (data) => ({
    type: types.INSTITUTE_LIST,
    payload: data,
  });

export const registerInstitute = () => { 
   console.log(BASE_API_SOURCE.url)
    return function (dispatch) {     
      var headers = {
        "Content-type": "application/json",
      };
  
      axios.get(`${BASE_API_SOURCE.url}institution/register/`, { headers })
        .then((resp) => { 
          dispatch(getInstituteData(resp.data));
        })
        .catch((error) => console.log(error));
    };
  };
  const getcountriesData = (data) => ({
    type: types.COUNTRIES_LIST,
    payload: data,
  });

export const getcountries = () => { 
   console.log(BASE_API_SOURCE.url)
    return function (dispatch) {     
      var headers = {
        "Content-type": "application/json",
      };
  
      axios.get(`${BASE_API_SOURCE.url}institution/country_list`, { headers })
        .then((resp) => { 
          dispatch(getcountriesData(resp.data));
        })
        .catch((error) => console.log(error));
    };
  };