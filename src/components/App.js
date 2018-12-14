import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { firebase } from '../firebase/firebase';
import LoginContainer from './LoginContainer';
import ChatContainer from './ChatContainer';
import UserContainer from './UserContainer';

class App extends Component {
   state = {
      user: null,
      messages: [],
   };

   componentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            this.setState({ user });
         }
         else {
            this.props.history.push('/login');
         }
      });

      firebase
         .database()
         .ref('/messages')
         .on('value', (snapshot) => {
            this.onMessage(snapshot);
         });
   }

   onMessage = (snapshot) => {
      const messages = Object.keys(snapshot.val()).map((key) => {
         const msg = snapshot.val()[key];
         msg.id = key;

         return msg;
      });

      this.setState({ messages });
   };

   handleSubmitMessage = (msg) => {
      const { user } = this.state;
      const data = {
         msg,
         author: user.email,
         user_id: user.uid,
         timestamp: Date.now(),
      };
      firebase
         .database()
         .ref('messages/')
         .push(data);
   };

   render() {
      const { messages, user } = this.state;

      return (
         <div id="container" className="inner-container">
            <Route
               exact
               path="/"
               render={() => (
                  <ChatContainer
                     user={user}
                     messages={messages}
                     onSubmit={this.handleSubmitMessage}
                  />
               )}
            />
            <Route path="/login" component={LoginContainer} />
            <Route path="/users/:id" component={UserContainer} />
         </div>
      );
   }
}

export default hot(module)(withRouter(App));
