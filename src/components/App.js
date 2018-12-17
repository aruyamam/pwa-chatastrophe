import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { firebase } from '../firebase/firebase';
import LoginContainer from './LoginContainer';
import ChatContainer from './ChatContainer';
import UserContainer from './UserContainer';

class App extends Component {
   state = {
      user: {
         email: '',
      },
      messages: [],
      messagesLoaded: false,
   };

   componentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            this.setState({ user });
         }
         else {
            const {
               history: { push },
            } = this.props;

            push('/login');
         }
      });

      firebase
         .database()
         .ref('/messages')
         .on('value', (snapshot) => {
            this.onMessage(snapshot);
            if (!this.state.messagesLoaded) {
               this.setState({ messagesLoaded: true });
            }
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
      const { messages, user, messagesLoaded } = this.state;

      return (
         <div id="container" className="inner-container">
            <Route
               exact
               path="/"
               render={() => (
                  <ChatContainer
                     user={user}
                     messages={messages}
                     messagesLoaded={messagesLoaded}
                     onSubmit={this.handleSubmitMessage}
                  />
               )}
            />
            <Route path="/login" component={LoginContainer} />
            <Route
               path="/users/:id"
               render={({ history, match }) => (
                  <UserContainer
                     messages={messages}
                     messagesLoaded={messagesLoaded}
                     userID={match.params.id}
                  />
               )}
            />
         </div>
      );
   }
}

App.propTypes = {
   history: PropTypes.shape({
      push: PropTypes.func.isRequired,
   }).isRequired,
};

export default hot(module)(withRouter(App));
