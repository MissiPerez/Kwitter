import React, { Component, Fragment } from "react";
import { getMessages, toggleLike } from "../actions/Message";
import { connect } from "react-redux";
import {Message} from ".";
import { Container } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";

export class MessagesList extends Component {
  componentDidMount() {
    this.props.getMessages();
  }

  render() {
    return (
      <div
        style={{
          display: "flex"
        }}
      >
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Switch>
            <Route path="/feed" />
          </Switch>
        </Container>

        {this.props.messages.map(message => (
          <Message
            key={message.id}
            text={message.text}
            username={message.username}
            toggleLike={() => this.props.toggleLike(message.id)}
            numOfLikes={message.likes.length}
            isLiked={message.isLiked}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages.messages.map(message => {
      const like = message.likes.find(
        like => like.userId === state.auth.login.id
      );
      if (like) {
        return {
          ...message,
          isLiked: true
        };
      } else {
        return {
          ...message,
          isLiked: false
        };
      }
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMessages: () => {
      dispatch(getMessages());
    },
    toggleLike: messageId => dispatch(toggleLike(messageId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesList);
