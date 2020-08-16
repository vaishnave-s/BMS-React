import React, { Component } from 'react';
// import logo from './logo.svg';
import '../stylesheets/Main.css';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <div className="Main-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2>Welcome to Movie Booking Zone</h2>
        </div>
      </div>
    );
  }
}

export default Main;