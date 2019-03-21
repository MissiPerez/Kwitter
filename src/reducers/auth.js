import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT
} from "../actions";

const initialState = {
  loginLoading: false,
  login: null,
  loginError: null,
  user: ""
};



export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loginLoading: true,
        loginError: null,
       
      };
    case LOGIN_SUCCESS:
      return { ...state, login: action.payload, loginLoading: false ,
        user: action.payload
       };
    case LOGIN_FAIL:
      return { ...state, loginError: action.payload, loginLoading: false };

    case REGISTER:
      return {
        ...state,
        loginLoading: true,
        loginError: null
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        login: action.payload,
        loginLoading: false,
        user: {
          username: action.payload.username,
          displayName: action.payload.displayName
        }
      };

    case REGISTER_FAIL:
      return { ...state, loginError: action.payload, loginLoading: false };

    case LOGOUT:
    return {
      ...state,
      loginLoading: false,
      login: null,
      loginError: null,
      user: {
        username: "",
        displayName: ""
      }
    }

    default:
      return state;
  }
};
