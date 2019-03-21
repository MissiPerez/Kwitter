import React, { Component } from "react";
import { connect } from "react-redux";
import {logout} from "../actions";
import {getUsers, getLoggedInUser} from "../actions"
import {
  Card,
  Icon,
  Image,
  Button,
  Modal,
  Header,
  Input,
  TextArea,
  Segment,
  Grid
} from "semantic-ui-react";
import ComposeMessage from "./ComposeMessage";
import UserMessages from "./UserMessages";


// const data = {
//   user: {
//     id: 498,
//     username: "SD",
//     displayName: "Salvador D",
//     about: "Located in Indy.",
//     createdAt: "2019-03-12T16:01:39.622Z",
//     updatedAt: "2019-03-12T16:01:39.622Z",
//     messages: []
//   }
// };

class UserProfile extends Component {
  componentDidMount(){
    this.props.getUsers();
    this.props.getLoggedInUser()
  }
  render() {
    // console.log(this.props.user)
    return (
      <React.Fragment>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
      <Card>
        <Image
          wrapped
          size="medium"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        />
        <Card.Content>
          <Card.Header>{this.props.displayName}</Card.Header>
          <Card.Meta>
            <span className="displayName">{this.props.displayName}</span>
          </Card.Meta>
          <Icon name="drivers license" />
          <Card.Header>Bio:{this.props.about}</Card.Header>
          <div></div>
        </Card.Content>
        {/* <Card.Content extra /> */}
       
        
        <Modal trigger={<Button>Edit Profile</Button>}>
          <Header>Profile</Header>
          <Modal.Content image>
            <Image
              wrapped
              size="medium"
              src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
            />
            <br />
            <Button basic color="orange" content="Upload Image" />
            <br />
            <Modal.Description>
              <Input placeholder="Username" />
              <Input placeholder="Displayame" />
              <br />
              <Input placeholder="Email" />
              <Input placeholder="Password" />
              <br />
              <TextArea placeholder="Short Bio:" />
              <br />
              <br />
              <Button basic color="teal" content="Update profile" />
              <Button basic color="teal" content="Logout" />
              <Button basic color="red" content="Delete user" />
              
              <br />
              {/* We need this page to refresh with new data */}
              {/* <Link to="/profile">
                  <br></br>
                  <Link to="/profile"></Link>
            <Button content='Login' primary type="submit" /></Link> */}
            
            </Modal.Description>
          </Modal.Content>
        </Modal>
        
        
        <Modal trigger={<Button>My Kweets</Button>}>
          <Modal.Header>My Kweets</Modal.Header>
          
          <Modal.Content image>
            <Image
              wrapped
              size="medium"
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            />
            {/* user messages will populate down below */}
            <Modal.Description>
              <Header>Modal Header</Header>
              <p>
                This is an example of expanded content that will cause the
                modal's dimmer to scroll
              </p>
              {/* <Segment vertical>
                <ComposeMessage />
              </Segment>
              <Segment vertical>
                <UserMessages />
              </Segment> */}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button primary>
              Proceed <Icon name="right chevron" />
            </Button>
          </Modal.Actions>
        </Modal> <button onClick={() => {this.props.logout()}}>logout</button>
      </Card>
      </Grid.Column>
      <Grid.Column>
        <UserMessages></UserMessages>
        </Grid.Column>
        </Grid>
        </React.Fragment>
      
      // <React.Fragment>
      //   <h2>{data.user.username}*</h2>
      //   <h3>{data.user.displayName}*</h3>
      //   <p> About:{data.user.about}*</p>
      //   <p> {data.user.messages}</p>
      // </React.Fragment>
    );
  }
}


// const mapStateToProps = state => {
//   return {
//     user: state.user
//   }
// }

const mapDispatchToProps = {
  logout, getUsers, getLoggedInUser
}
  

export default connect(
  ({ users }) => ({
   user:users.userData.username,
   displayName: users.userData.displayName,
   about: users.userData.about

  }),mapDispatchToProps
  
)(UserProfile);