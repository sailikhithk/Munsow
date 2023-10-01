import * as types from "./actionTypes.js";

const initialState = {
  // authActions
  loggedIn: true,
  userId: null,
  quizList: [],
  quizView: {},
  lessonsList: [],
  lessonView: {},
  usersList: [],
  userStats: {},
  adminStats: {},
  institutiondata: [],
  institutiondata_meta: {},
  countryList: {},
  institutionStats:{},
  studentsList:{},
  teachersList:{},
  courseList:[],
  departmentList:[],
  branchList:[],
  institutionList:[],
  countryList:[],
  hardSkillsList: [],
  softSkillsList: [],
  interviewRolesList: [],
  companiesList: [],
  emotionStats: {},
  loading: false
};

const DataReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        loggedIn: action?.payload?.userId && true,
        userCred: action?.payload,
      };
    case types.QUIZ_LIST:
      return {
        ...state,
        quizList: action?.payload
      }
    case types.LESSON_LIST:
      {
        return {
          ...state,
          lessonsList: action?.payload?.data
        }
      }
    case types.LESSON_VIEW:
      {
        return {
          ...state,
          lessonView: action?.payload?.data
        }
      }
    case types.QUIZ_DATA:
      {
        return {
          ...state,
          quizView: action?.payload
        }
      }
    case types.USERS_LIST:
      {
        return {
          ...state,
          usersList: action?.payload
        }
      }
    case types.USER_STATS:
      {
        return {
          ...state,
          userStats: action?.payload
        }
      }
    case types.ADMIN_STATS:
      {
        return {
          ...state,
          adminStats: action?.payload
        }
      }
    case types.INSTITUTE_LIST: return {
      ...state,
      institutiondata: action.payload.data,
      institutiondata_meta: action.payload.meta,
      loading: false
    }
    case types.COUNTRIES_LIST: return {
      ...state,
      countryList: action.payload.data,
      loading: false
    }
    case types.INSTITUTION_STATS: return{
      ...state,
      institutionStats:action.payload.data,
      loading:false
    }
    case types.STUDENTS_LIST: return{
      ...state,
      studentsList:action.payload,
      loading:false
    }
    case types.TEACHERS_LIST: return{
      ...state,
      teachersList:action.payload,
      loading:false
    }
    case types.COURSE_LIST: return{
      ...state,
      courseList:action.payload,
      loading:false
    }
    case types.DEPARTMENT_LIST: return{
      ...state,
      departmentList:action.payload,
      loading:false
    }
    case types.BRANCH_LIST: return{
      ...state,
      branchList:action.payload,
      loading:false
    }
    case types.HARD_SKILLS_LIST: return{
      ...state,
      hardSkillsList:action.payload,
      loading:false
    }
    case types.SOFT_SKILLS_LIST: return{
      ...state,
      softSkillsList:action.payload,
      loading:false
    }
    case types.INTERVIEW_ROLES_LIST: return{
      ...state,
      interviewRolesList:action.payload,
      loading:false
    }
    case types.COMPANIES_LIST: return{
      ...state,
      companiesList:action.payload,
      loading:false
    }
    case types.EMOTION_STATS: return{
      ...state,
      emotionStats:action.payload.data,
      loading:false
    }
    case types.INSTITUTION_LIST: return{
      ...state,
      institutionList:action.payload,
      loading:false
    }
    case types.COUNTRY_LIST: return{
      ...state,
      countryList:action.payload,
      loading:false
    }
    default:
      return state;
  }
};
export default DataReducers;
