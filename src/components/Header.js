import React from 'react';

const Header = ({ children }) => (
   <div id="Header" className="Header">
      <div>
         <img src="/assets/icon.png" alt="logo" />
         <h1>Chatastrophe</h1>
      </div>
      {children}
   </div>
);

export default Header;
