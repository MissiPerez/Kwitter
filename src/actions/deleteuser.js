// import { domain, jsonHeaders, handleJsonResponse } from "./constants";
// // import { push } from "connected-react-router";

// export const DELETE = "DELETE";
// export const DELETE_SUCCESS = "DELETE_SUCCESS";
// export const DELETE_FAIL = "DELETE_FAIL";

// const url = domain + "/users";

// // action creators
// export const deleteUser = loginData => dispatch => {
//     dispatch({
//       type: DELETE
//     });
  
//     return fetch(url, {
//       method: "DELETE",
//       headers: {...jsonHeaders,
//     Authorization: `Bearer ${.token}`},
      
//     })
//       .then(handleJsonResponse)
//       .then(result => {
//         return dispatch({
//           type: DELETE_SUCCESS,
//           payload: result
//         });
//       })
//       .catch(err => {
//         return Promise.reject(
//           dispatch({ type: DELETE_FAIL, payload: err.message })
//         );
//       });
//   };

// //   export default connect(
// //     ({ auth }) => ({
// //       token: auth.login.token
// //     }),
// //     null
// //   )(deleteuser);