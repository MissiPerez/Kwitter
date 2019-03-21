import { GET_USER, GET_USER_SUCCESS, GET_USER_FAIL, GET_USERS } from "../actions";

const initialState = {
  userData: {},
  displayName:"",
  userId:"",
  users:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state };

    case GET_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload.user
      };

    case GET_USER_FAIL:
      return { ...state };

    case GET_USERS:
      return { ...state,
      users: action.payload
      };

    default:
      return state;
  }
};
