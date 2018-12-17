import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';

class UserContainer extends Component {
   renderedUserEmail = false;

   getAuthor = (author) => {
      if (!this.renderedUserEmail) {
         this.renderedUserEmail = true;

         return <p className="author">{author}</p>;
      }
   };

   render() {
      const { messagesLoaded, messages, userID } = this.props;

      return (
         <div id="UserContainer" className="inner-container">
            <Header>
               <Link to="/">
                  <button type="button" className="button button--red">
                     Back To Chat
                  </button>
               </Link>
            </Header>
            {messagesLoaded ? (
               <div id="message-container">
                  {messages.map(
                     msg =>
                        msg.user_id === userID && (
                           <div key={msg.id} className="message">
                              <p>{msg.msg}</p>
                           </div>
                        ),
                  )}
               </div>
            ) : (
               <div id="loading-container">
                  <img id="loader" src="/assets/icon.png" alt="logo" />
               </div>
            )}
         </div>
      );
   }
}

UserContainer.propTypes = {
   userID: PropTypes.string.isRequired,
   messagesLoaded: PropTypes.bool.isRequired,
   messages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserContainer;
