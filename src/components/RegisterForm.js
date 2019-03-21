import React, { Component } from "react";
import { connect } from "react-redux";
import { registerThenGoToUserLogin as register } from "../actions";
// import Spinner from "react-spinkit";

// import { register } from "../actions";

// import Spinner from "react-spinkit";

import { Card, Image, Input, Header, Button, Form, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import picture from "../Images/favicon.ico";



class RegisterForm extends Component {
  state = { username: "", password: "" };

  handleRegister = e => {
    e.preventDefault();
    this.props.register(this.state);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { isLoading } = this.props;
    return (
      <Card centered='true'>
        <Header color='orange' textAlign='centered' as='h1'>Register as new user</Header>
        <Image centered='true' src={picture} />
        <Card.Content>
          <Card.Meta>
            <Form onSubmit={this.handleRegister}>
              <label htmlFor="username"></label>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                autoFocus
                required
                size="large"
                onChange={this.handleChange}
              />
              <label htmlFor="password"></label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                required
                size="large"
                onChange={this.handleChange}
              />
              <label htmlFor="displayName"></label>
              <Input
                type="text"
                name="displayName"
                placeholder="Display name"
                required
                size="large"
                onChange={this.handleChange}
              />
              <label htmlFor="email"></label>
              <Input
                type="email"
                name="email"
                placeholder="Em@il"
                required
                size="large"
                onChange={this.handleChange}
              />
              <div></div>
              <Divider />
              
              {/* <Link to="/"> */}
              <Button size='large' circular content='Login' primary type="submit" disabled={isLoading} />
              {/* </Link> */}
              </Form>
              {this.props.err && <p style={{ color: "red" }}>{this.props.err}</p>}
          </Card.Meta>
          <Card.Description>Already have an account? </Card.Description>
          <Link to="/">
          <Button class="ui olive basic button">Back to login</Button>
          </Link>
          </Card.Content>
      </Card>
    );
  }
}

export default connect(
  ({ auth }) => ({
    isLoading: auth.loginLoading,
    err: auth.loginError
  }),
  { register }
)(RegisterForm);
