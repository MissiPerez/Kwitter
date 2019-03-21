import React, { Component } from "react";
import { connect } from "react-redux";
import { loginThenGoToUserProfile as login } from "../actions";
// import Spinner from "react-spinkit";

import { Header, Image, Card, Input, Button, Form, Grid, Divider, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import picture from "../Images/favicon.ico";



class LoginForm extends Component {
  state = { username: "", password: "" };

  handleLogin = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { isLoading } = this.props;
    return (
      <Form centered='true'onSubmit={this.handleLogin}>
        <Header color='orange' textAlign='centered' as='h1'>Kwitter</Header>
        {/* <Card.Header>Kwitter</Card.Header>  */}
        <Image centered='true' src={picture} />
        <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
        <Form>
        <label htmlFor="username"></label>
          <Form.Input icon='user' iconPosition='left' label='Username' placeholder='Username' autoFocus
                required
                onChange={this.handleChange}
                name="username" />
                <label htmlFor="password"></label>
          <Form.Input icon='lock' iconPosition='left' label='Password' placeholder='Password' type='password' required
                onChange={this.handleChange}
                name="password" />

          
          <Button content='Login' primary type="submit" disabled={isLoading} />
          
              {this.props.err && <p style={{ color: "red" }}>{this.props.err}</p>}
        </Form>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
      <div>
      <Header as='h4'>Not on Kwitter yet? Let's fix that!</Header>
      </div>
      <Link to="/register">
        <Button content='Create Account'  type="submit" color="ui olive button">
        <i class="sign in icon"></i></Button></Link>
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>
      </Form>
    );
  }
}

export default connect(
  ({ auth }) => ({
    isLoading: auth.loginLoading,
    err: auth.loginError
  }),
  { login }
)(LoginForm);
