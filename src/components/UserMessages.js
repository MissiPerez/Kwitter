import React, { Component } from "react";
import { getMessages, toggleLike } from "../actions/Message";
import {Message} from "."
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";

class UserMessages extends Component {

  // componentDidMount() {
  //   this.props.getMessages();
  // }

  render() {
    console.log(this.props.messages)
    return (
      <div
        // style={{
        //   display: "flex"
        // }}
      >
       

        {this.props.messages.map(message => (
          <Message
            key={message.id}
            text={message.text}
            username={this.props.loggedInUserId}
            numOfLikes={message.likes.length}
            // isLiked={message.isLiked}
            // toggleLike={() => this.props.toggleLike(message.id)}
          />
        ))}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    messages: state.users.userData.messages || [],
    loggedInUserId: state.users.userData.username
  }
};

// const mapDispatchToProps = dispatch => {
//   return {
//     getMessages: () => {
//       dispatch(getMessages());
//     },
//     toggleLike: messageId => dispatch(toggleLike(messageId))
//   };
// };

export default connect(
  mapStateToProps,
  null
)(UserMessages);
