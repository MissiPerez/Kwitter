import { push } from "connected-react-router";
export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";
export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const LOGIN = "LOGIN";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const REGISTER = "REGISTER";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const LIKE_MESSAGE = "LIKE_MESSAGE";
export const GET_MESSAGES = "GET_MESSAGES";
export const GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS";
export const GET_MESSAGES_FAILURE = "GET_MESSAGES_FAILURE";
export const ADD_MESS = "ADD_TEXT";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
export const REMOVE_LIKE = "REMOVE_LIKE";
export const REMOVE_LIKE_SUCCESS = "REMOVE_LIKE_SUCCESS";
export const ADD_LIKE = "ADD_LIKE";
export const ADD_LIKE_SUCCESS = "ADD_LIKE_SUCCESS";
export const UPDATE_MESSAGE_BY_ID_SUCCESS = "UPDATE_MESSAGE_BY_ID_SUCCESS";
export const UPDATE_MESSAGE_BY_ID_FAIL = "UPDATE_MESSAGE_BY_ID_FAIL";
export const GET_MESSAGE_BY_ID = "GET_MESSAGE_BY_ID";
export const GET_MESSAGE_BY_ID_SUCCESS = "GET_MESSAGE_BY_ID_SUCCESS";
export const CREATE_MESSAGE = "CREATE_MESSAGE";
export const CREATE_MESSAGE_SUCCESS = "CREATE_MESSAGE_SUCCESS";
const kwitterURL = "https://kwitter-api.herokuapp.com";

export const composeMessage = text => (dispatch, getState) => {
  const token = getState().authentication.token;
  dispatch({ type: CREATE_MESSAGE });
  return fetch(`${kwitterURL}/messages`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: CREATE_MESSAGE_SUCCESS
      });
      const userId = getState().authentication.id;
      dispatch(getUserInfo(userId));
    });
};

export const removeLike = likeId => (dispatch, getState) => {
  const token = getState().authentication.token;
  dispatch({ type: REMOVE_LIKE });
  return fetch(`${kwitterURL}/likes/${likeId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: REMOVE_LIKE_SUCCESS
      });
    });
};

export const addLike = messageId => (dispatch, getState) => {
  const token = getState().authentication.token;
  dispatch({ type: ADD_LIKE });
  return fetch(`${kwitterURL}/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ messageId })
  })
    .then(res => res.json())
    .then(data => {
      dispatch({ type: ADD_LIKE_SUCCESS });
    });
};
export const getMessageById = messageId => dispatch => {
  dispatch({ type: GET_MESSAGE_BY_ID });
  return fetch(`${kwitterURL}/messages/${messageId}`)
    .then(res => res.json())
    .then(data => {
      dispatch({ type: GET_MESSAGE_BY_ID_SUCCESS });
      return data.message;
    });
};
export const updateMessageById = messageId => (dispatch, getState) => {
  dispatch(getMessageById(messageId)).then(message => {
    const messages = getState().messages;
    const messageIndex = messages.findIndex(
      message => message.id === messageId
    );
    if (~messageIndex) {
      dispatch({
        type: UPDATE_MESSAGE_BY_ID_SUCCESS,
        id: messageId,
        index: messageIndex,
        message
      });
    } else {
      dispatch({ type: UPDATE_MESSAGE_BY_ID_FAIL, id: messageId });
    }
  });
};

export const toggleLike = messageId => (dispatch, getState) => {
  const message = getState().messages.find(message => message.id === messageId);
  const userId = getState().loggedInUser.id;

  const like = message.likes.find(like => like.userId === userId);

  if (like) {
    dispatch(removeLike(like.id)).then(() => {
      dispatch(updateMessageById(messageId));
    });
  } else {
    dispatch(addLike(messageId)).then(() => {
      dispatch(updateMessageById(messageId));
    });
  }
};
export const likedMessageSuccess = likeObj => {
  return {
    type: LIKE_MESSAGE,
    payload: likeObj
  };
};

export const likeMessage = (userId, messageId, token) => dispatch => {
  const header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      userId: userId,
      messageId: messageId
    })
  };
  return fetch(`${kwitterURL}/messages`, header)
    .then(response => response.json())
    .then(likeObj => {
      dispatch(likedMessageSuccess(likeObj));
      return likeObj.like.id;
    });
};

export const addMess = ({ message, token }) => dispatch => {
  fetch(`${kwitterURL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8"
    },
    data: { text: message }
  })
    .then(() => {
      dispatch(getMessages());
    })
    .catch(err => console.log(err));
};

export function getMessages() {
  return function(dispatch) {
    dispatch({ type: GET_MESSAGES });
    fetch(`${kwitterURL}/messages`)
      .then(res => {
        if (res.statusText === "OK") {
          return res.json(); 
        }
      })
      .then(data => {
        dispatch({
          type: GET_MESSAGES_SUCCESS,
           
            messages: data.messages
          
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_MESSAGES_FAILURE });
      });
  };
}

export const login = loginData => dispatch => {
  dispatch({ type: LOGIN });
  fetch(`${kwitterURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginData)
  })
    .then(response => {
      if (!response.ok) {
        response.json().then(err => {
          throw err;
        });
      }
      return response.json();
    })
    .then(data => {
      
      if (data.success === false) {
        throw this.props.err;
      }
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: data.token,
          id: data.id
        },
        login: data,
        result: "Successful login!"
      });
      dispatch(push("/profile"));
      dispatch(getUserInfo(data.id));
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILURE,
        result:
          "Failed to login. Please enter a valid username and/or password."
      });
    });
};

export const getUserInfo = userId => dispatch => {
  dispatch({ type: GET_USER });
  fetch(`${kwitterURL}/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        response.json().then(err => {
          throw err;
        });
      }
      return response.json();
    })
    .then(data => {
      dispatch({ type: GET_USER_SUCCESS, data: data.user });
    })
    .catch(err => {
      dispatch({ type: GET_USER_FAILURE, err });
    });
};

export const logout = () => dispatch => {
  fetch(`${kwitterURL}/auth/logout`)
    .then(response => {
      if (!response.ok) {
        response.json().then(err => {
          throw err;
        });
      }
      return response.json();
    })
    .then(data => {
      dispatch({ type: LOGOUT_SUCCESS });
      dispatch(push("/"));
      alert("Thanks for visiting KWITTER! Come back soon!");
    })
    .catch(err => {
      dispatch({ type: LOGOUT_FAILURE, err });
    });
};

export const register = (registerData, history) => dispatch => {

  dispatch({
    type: REGISTER
  });
 
  fetch(`${kwitterURL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
     
      registerData
    )
  })
    // hydrates body; always need for api b/c always returns json; if not, it would  be parsed diff
    // .then(response => response.json()) // if immediately hydrate, it always assumes its correct, so ave to check
    .then(response => {
    
      if (!response.ok) {
        // throw from here, it goes to catch
        response.json().then(err => {
          throw err;
        });
      }
      return response.json(); // this is an else basically
    })
    .then(data => {
   
      dispatch({
        type: REGISTER_SUCCESS,
        register: data,
        result: "Successfully Registered!" // could make a <div>{this.props.result}</div> to display; reducer might use this value to put some  update
      });
      dispatch(push("/profile"));
      dispatch(
        login({
          username: registerData.username,
          password: registerData.password
        })
      ); //gets loginData w. un and p, so need it as an obj; haveing only the username and password is because thats what the rD needs
    })
    .catch(err => {
      // dispatch here on fail
      dispatch({
        type: REGISTER_FAILURE,
        result: `Failed to register. Please enter a unique username, and make sure all fields have 3-20 characters.`
      });
    });
};

export const deleteUser = token => dispatch => {
  dispatch({ type: DELETE_USER });
  fetch(`${kwitterURL}/users`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        response.json().then(err => {
          throw err;
        });
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      dispatch({ type: DELETE_USER_SUCCESS });
      dispatch(push("/register"));
      //   window.confirm("Are you sure?");
    })
    .catch(err => {
      dispatch({ type: DELETE_USER_FAILURE, err });
    });
};
export const updateUser = userData => (dispatch, getState) => {
  const token = getState().authentication.token;
  if (userData.displayName === "") {
    delete userData.displayName;
  }
  if (userData.password === "") {
    delete userData.password;
  }
  dispatch({ type: UPDATE_USER });
  fetch("https://kwitter-api.herokuapp.com/users", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(response => {
      if (!response.ok) {
        response.json().then(err => {
          throw err;
        });
      }
      return response.json();
    })
    .then(data => {
      dispatch({ type: UPDATE_USER_SUCCESS, data: data.user });
      dispatch(push("/profile"));
    })
    .catch(err => {
      dispatch({ type: UPDATE_USER_FAILURE, err });
    });
};