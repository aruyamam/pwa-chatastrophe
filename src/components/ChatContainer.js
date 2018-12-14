import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { firebase } from '../firebase/firebase';

class ChatContainer extends Component {
   state = {
      newMessage: '',
   };

   handleLogout = () => {
      firebase.auth().signOut();
   };

   handleInputChange = (e) => {
      this.setState({ newMessage: e.target.value });
   };

   handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         e.preventDefault();
         this.handleSubmit();
      }
   };

   handleSubmit = () => {
      this.props.onSubmit(this.state.newMessage);
      this.setState({ newMessage: '' });
   };

   getAuthor = (msg, nextMsg) => {
      if (!nextMsg || nextMsg.author !== msg.author) {
         return (
            <p className="author">
               <Link to={`/users/${msg.user_id}`}>{msg.author}</Link>
            </p>
         );
      }
   };

   render() {
      const { newMessage } = this.state;
      const { messages, user } = this.props;

      return (
         <div id="ChatContainer" className="inner-container">
            <Header>
               <button type="button" className="button button--red" onClick={this.handleLogout}>
                  Logout
               </button>
            </Header>
            <div id="messaage-container">
               {messages.map((msg, i) => (
                  <div className={`message ${user.email === msg.author && 'mine'}`} key={msg.id}>
                     <p>{msg.msg}</p>
                     {this.getAuthor(msg, messages[i + 1])}
                  </div>
               ))}
            </div>
            <div id="chat-input" className="Chat-input">
               <textarea
                  placeholder="Add your message..."
                  value={newMessage}
                  onChange={this.handleInputChange}
                  onKeyDown={this.handleKeyDown}
               />
               <button className="button" type="button" onClick={this.handleSubmit}>
                  <svg viewBox="0 0 24 24">
                     <path fill="#424242" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                  </svg>
               </button>
            </div>
         </div>
      );
   }
}

export default ChatContainer;
