import React, { Component } from "react";
import MessagesList from "./MessagesList";
import _ from "lodash";
import { render } from "react-dom";
import {
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive
} from "semantic-ui-react";

class Feed extends Component {
  render() {
    return <div class="ui feed" />;
  }

  render() {
    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center" }}>Feed</h1>
        <MessagesList />
      </React.Fragment>
    );
  }
}

export default Feed;
