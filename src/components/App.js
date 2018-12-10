import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import LoginContainer from './LoginContainer';
// import './app.css';

class App extends Component {
   state = {};

   render() {
      return (
         <div id="container" className="inner-container">
            <LoginContainer />
         </div>
      );
   }
}

export default hot(module)(App);
