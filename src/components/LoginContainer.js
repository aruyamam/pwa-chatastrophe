import React, { Component } from 'react';
import Header from './Header';
import { firebase } from '../firebase/firebase';

class LoginContainer extends Component {
   state = {
      email: '',
      password: '',
      error: '',
   };

   onLogin() {
      this.props.history.push('/');
   }

   handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
   };

   handleSubmit = (event) => {
      event.preventDefault();
      this.setState({ error: '' });
      const { email, password } = this.state;

      if (email && password) {
         return this.login(email, password);
      }

      return this.setState({ error: 'Please fill in both fields.' });
   };

   login(email, password) {
      firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then(res => this.onLogin())
         .catch((error) => {
            if (error.code === 'auth/user-not-found') {
               this.signup(email, password);
            }
            else {
               this.setState({ error: 'Error logging in.' });
            }
         });
   }

   signup(email, password) {
      firebase
         .auth()
         .createUserWithEmailAndPassword(email, password)
         .then((res) => {
            console.log(res);
         })
         .catch((err) => {
            this.setState({ error: 'Error siginig up.' });
         });
   }

   render() {
      const { email, password, error } = this.state;

      return (
         <div id="LoginContainer" className="LoginContainer inner-container">
            <Header />
            <form className="LoginContainer__form" onSubmit={this.handleSubmit}>
               <p>Sign in or sign up by entering your email and password.</p>
               <input
                  type="text"
                  name="email"
                  placeholder="Your email"
                  value={email}
                  onChange={this.handleChange}
               />
               <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  value={password}
                  onChange={this.handleChange}
               />
               {error && <p className="error">{error}</p>}
               <button className="button button--red button--block" type="submit">
                  Login
               </button>
            </form>
         </div>
      );
   }
}

export default LoginContainer;
