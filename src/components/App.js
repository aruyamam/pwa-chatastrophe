import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import LoginContainer from './LoginContainer';
import { firebase } from '../firebase/firebase';

class App extends Component {
   state = {
      user: null,
   };

   componentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            this.setState({ user });
         }
      });
   }

   render() {
      return (
         <div id="container" className="inner-container">
            <LoginContainer />
         </div>
      );
   }
}

export default hot(module)(App);
