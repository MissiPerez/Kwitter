import {GET_MESSAGES, GET_MESSAGES_SUCCESS} from "../actions"


const initialState = {
  messages:[]

};


export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_SUCCESS :
     return {
       ...state, messages:action.messages
     }
    default:
      return state;
  }
};
