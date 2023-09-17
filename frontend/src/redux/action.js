import * as types from "./actionTypes";
import axios from "axios";
import GLOBAL_CONSTANTS from "../../GlobalConstants.js";

// utils
import { toast } from "react-toastify";

export const user_login = (data, callback) => {
    return function (dispatch) {
      var headers = {
        "Content-type": "application/json",
      };
      axios
        .post(`${GLOBAL_CONSTANTS.backend_url}auth/login`, JSON.stringify(data), {
          headers,
        })
        .then((resp) => {
         
          if(! resp?.data?.status)
          {
            toast.error(resp?.data?.message);  
          }
          else
          {
            toast.success("Logged in");
            localStorage.setItem("user_data",JSON.stringify(resp?.data));  
            dispatch({
              type: types.LOGIN,
              payload: resp?.data,
            });

            sessionStorage.setItem("user_data",JSON.stringify(resp?.data))
            callback(resp?.data);
          }

        })
        .catch((error) => {

          toast.error(
            error ?? "Something went wrong",
            {
              autoClose: 2000,
            }
          );
        });
    };
  };

  export const user_signup = (data, callback) => {
    return function () {
      var headers = {
        "Content-type": "application/json",
      };
      axios
        .post(`${GLOBAL_CONSTANTS.backend_url}auth/register`, JSON.stringify(data), {
          headers,
        })
        .then((resp) => {
          if(resp?.data?.error)
          {
            toast.error(resp?.data?.error);  
          }
          else
          {
            toast.success("User Created Sucessfully");  

          }
          callback(resp?.data);
        })
        .catch((error) => {
          toast.error(
            error ?? "Something went wrong",
            {
              autoClose: 2000,
            }
          );
        });
    };
  };


  const getQuizList = (data) => ({
    type: types.QUIZ_LIST,
    payload: data,
  });
  
  export const loadQuizList = () => {
    return function (dispatch) {
      var headers = {
        "Content-type": "application/json",
        };
        axios.get(`${GLOBAL_CONSTANTS?.backend_url}/quiz/full_list`, {headers})
        .then((resp) => {
          dispatch(getQuizList(resp?.data?.data));
        })
        .catch((error) => console.log(error));
    };
  };

  const getQuizView = (data) => ({
    type: types.QUIZ_DATA,
    payload: data,
  });
  
  export const loadQuizQuestions = (id) => {
    return function (dispatch) {
      var headers = {
        "Content-type": "application/json",
        };
        axios.get(`${GLOBAL_CONSTANTS?.backend_url}/quiz/${id}/questions`, {headers})
        .then((resp) => {
          dispatch(getQuizView(resp?.data));
        })
        .catch((error) => console.log(error));
    };
  };


  const getLessonList = (data) => ({
    type: types.LESSON_LIST,
    payload: data,
  });
  
  export const loadLessonList = () => {
    return function (dispatch) {
      var headers = {
        "Content-type": "application/json",
        };
        axios.get(`${GLOBAL_CONSTANTS?.backend_url}/lesson/${GLOBAL_CONSTANTS?.user_cred?.user_id}/list`, {headers})
        .then((resp) => {
          dispatch(getLessonList(resp?.data));
        })
        .catch((error) => console.log(error));
    };
  };


  const getLessonView = (data) => ({
    type: types.LESSON_VIEW,
    payload: data,
  });
  
  export const loadLessonView = (id) => {
    return function (dispatch) {
      var headers = {
        "Content-type": "application/json",
        };
        axios.get(`${GLOBAL_CONSTANTS?.backend_url}/lesson/${id}/get`, {headers})
        .then((resp) => {
          dispatch(getLessonView(resp?.data));
        })
        .catch((error) => console.log(error));
    };
  };


  export const quizSubmit = (data, callback) => {
    return function () {
      var headers = {
        "Content-type": "application/json",
      };
      axios
        .post(`${GLOBAL_CONSTANTS.backend_url}result/submit_answer`, JSON.stringify(data), {
          headers,
        })
        .then((resp) => {
          callback(resp?.data);
        })
        .catch((error) => {

          toast.error(
            error ?? "Something went wrong",
            {
              autoClose: 2000,
            }
          );
        });
    };
  };

  export const quizCreate = (data, callback) => {
    return function () {
      var headers = {
        "Content-Type ": "multipart/form-data",
      };
      axios
        .post(`${GLOBAL_CONSTANTS.backend_url}quiz/upsert_quiz`, data, {
          headers,
        })
        .then((resp) => {
          callback(resp?.data);
        })
        .catch((error) => {

          toast.error(
            error ?? "Something went wrong",
            {
              autoClose: 2000,
            }
          );
        });
    };
  };

  const getUserList = (data) => ({
    type: types.USERS_LIST,
    payload: data,
  });
  
  export const loadUserList = () => {
    return function (dispatch) {
      var headers = {
        "Content-type": "application/json",
        };
        axios.get(`${GLOBAL_CONSTANTS?.backend_url}/auth/user_list`, {headers})
        .then((resp) => {
          dispatch(getUserList(resp?.data));
        })
        .catch((error) => console.log(error));
    };
  };


  export const activateUser = (id , callback) => {
    return function () {
      var headers = {
        "Content-type": "application/json",
      };
      const note = toast.loading("Activating User ..")
      axios
        .get(`${GLOBAL_CONSTANTS.backend_url}auth/${id}/activate`, {
          headers,
        })
        .then((resp) => {
          callback(resp?.data);
          toast.update(note,{render:"User Activated",type:"success",isLoading:false,autoClose:2000});

        })
        .catch((error) => {
          toast.update(note,{render:"Something went wrong",type:"success",isLoading:false,autoClose:3000});

        });
    };
  };

  export const deactivateUser = (id , callback) => {
    return function () {
      var headers = {
        "Content-type": "application/json",
      };
      const note = toast.loading("Deactivating User ..")

      axios
        .get(`${GLOBAL_CONSTANTS.backend_url}auth/${id}/deactivate`, {
          headers,
        })
        .then((resp) => {
          callback(resp?.data);
          toast.update(note,{render:"User Deactivated",type:"success",isLoading:false,autoClose:2000,});

        })
        .catch((error) => {
          toast.update(note,{render:"Something went wrong",type:"success",isLoading:false,autoClose:3000});
        });
    };
  };


  export const activateQuiz = (id , callback) => {
    return function () {
      var headers = {
        "Content-type": "application/json",
      };
      const note = toast.loading("Activating Quiz ..")
      axios
        .get(`${GLOBAL_CONSTANTS.backend_url}quiz/${id}/activate`, {
          headers,
        })
        .then((resp) => {
          callback(resp?.data);
          toast.update(note,{render:"Quiz Activated",type:"success",isLoading:false,autoClose:2000});

        })
        .catch((error) => {
          toast.update(note,{render:"Something went wrong",type:"success",isLoading:false,autoClose:3000});

        });
    };
  };

  export const deactivateQuiz = (id , callback) => {
    return function () {
      var headers = {
        "Content-type": "application/json",
      };
      const note = toast.loading("Deactivating Quiz ..")

      axios
        .get(`${GLOBAL_CONSTANTS.backend_url}quiz/${id}/deactivate`, {
          headers,
        })
        .then((resp) => {
          callback(resp?.data);
          toast.update(note,{render:"Quiz Deactivated",type:"success",isLoading:false,autoClose:2000,});

        })
        .catch((error) => {
          toast.update(note,{render:"Something went wrong",type:"success",isLoading:false,autoClose:3000});
        });
    };
  };

  export const deleteQuiz = (id , callback) => {
    return function () {
      var headers = {
        "Content-type": "application/json",
      };
      const note = toast.loading("Deactivating Quiz ..")

      axios
        .get(`${GLOBAL_CONSTANTS.backend_url}quiz/${id}/delete_quiz`, {
          headers,
        })
        .then((resp) => {
          callback(resp?.data);
          toast.update(note,{render:"Quiz deleted",type:"success",isLoading:false,autoClose:2000,});

        })
        .catch((error) => {
          toast.update(note,{render:"Something went wrong",type:"success",isLoading:false,autoClose:3000});
        });
    };
  };


  export const downloadQuiz = (id , callback) => {
    return function () {
      var headers = {
        "Content-type": "application/json",
      };
      axios
        .get(`${GLOBAL_CONSTANTS.backend_url}quiz/${id}/download_quiz`, {
          headers,
        })
        .then((resp) => {
          callback(resp?.data);
        })
        .catch((error) => {
         
        });
    };
  };

  const getUserStats = (data) => ({
    type: types.USER_STATS,
    payload: data,
  });
  
  export const loadUserStats = () => {
    return function (dispatch) {
      var headers = {
        "Content-type": "application/json",
        };
        axios.get(`${GLOBAL_CONSTANTS?.backend_url}/auth/${GLOBAL_CONSTANTS?.user_cred?.user_id}/statistics`, {headers})
        .then((resp) => {
          dispatch(getUserStats(resp?.data?.data));
        })
        .catch((error) => console.log(error));
    };
  };

  const getAdminStats = (data) => ({
    type: types.ADMIN_STATS,
    payload: data,
  });
  
  export const loadAdminStats = () => {
    return function (dispatch) {
      var headers = {
        "Content-type": "application/json",
        };
        axios.get(`${GLOBAL_CONSTANTS?.backend_url}/auth/admin_statistics`, {headers})
        .then((resp) => {
          dispatch(getAdminStats(resp?.data?.data));
        })
        .catch((error) => console.log(error));
    };
  };

  export const user_update = (data, callback) => {
    return function () {
      var headers = {
        "Content-type": "application/json",
      };
      axios
        .post(`${GLOBAL_CONSTANTS.backend_url}auth/update_user`, JSON.stringify(data), {
          headers,
        })
        .then((resp) => {
          if(resp?.data?.error)
          {
            toast.error(resp?.data?.error);  
          }
          else
          {
            toast.success("Updated Sucessfully");  

          }
          callback(resp?.data);
        })
        .catch((error) => {
          toast.error(
            error ?? "Something went wrong",
            {
              autoClose: 2000,
            }
          );
        });
    };
  };



  //---------------------------------------------



  const getInstituteData = (data) => ({
    type: types.INSTITUTE_LIST,
    payload: data,
  });

export const registerInstitute = () => { 
    return function (dispatch) {     
      var headers = {
        "Content-type": "application/json",
      };
  
      axios.get(`${GLOBAL_CONSTANTS.backend_url}institution/register/`, { headers })
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
   console.log(GLOBAL_CONSTANTS.backend_url)
    return function (dispatch) {     
      var headers = {
        "Content-type": "application/json",
      };
  
      axios.get(`${GLOBAL_CONSTANTS.backend_url}institution/country_list`, { headers })
        .then((resp) => { 
          dispatch(getcountriesData(resp.data));
        })
        .catch((error) => console.log(error));
    };
  };