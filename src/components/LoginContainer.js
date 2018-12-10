import React, { Component } from 'react';
import Header from './Header';

class LoginContainer extends Component {
   state = {
      email: '',
      password: '',
   };

   handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
   };

   handleSubmit = (event) => {
      event.preventDefault();
      console.log(this.state);
   };

   render() {
      const { email, password } = this.state;

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
               <button className="button button--red button--block" type="submit">
                  Login
               </button>
            </form>
         </div>
      );
   }
}

export default LoginContainer;
