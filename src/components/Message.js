import React, { Component } from "react";
import {Card} from "semantic-ui-react"

class Message extends Component {
  render() {
    return (
      <Card
        header={this.props.username}
        meta={this.props.numOfLikes}
        description={this.props.text}
      />
    );
  }
}
export default Message;
