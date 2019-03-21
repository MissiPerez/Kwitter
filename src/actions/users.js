import { domain } from "./constants";

//action types
export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAIL = "GET_USER_FAIL";
export const GET_USERS = "GET_USERS";

const url = domain + "/users";

//action creators
export const getUserById = id => dispatch => {
  dispatch({
    type: GET_USER
  });

  return fetch(url + `/${id}`)
    .then(res => res.json())
    .then(result => {
      return dispatch({
        type: GET_USER_SUCCESS,
        payload: result
      });
    });

};
export const getUsers = () => dispatch => {
 

  return fetch(url)
    .then(res => res.json())
    .then(result => {
      return dispatch({
        type: GET_USERS,
        payload: result
      });
    });

};

export const getLoggedInUser = () => (dispatch, getState) => {
    const loggedInUserId = getState().auth.login.id
    return dispatch(getUserById(loggedInUserId))
}