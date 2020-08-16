import React, { Component } from 'react';
// import MovieComponent from './Movies/MovieComponent';
import logo from './logo.svg';
import './App.css';
//Imports
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
// import Movies from './Movies/MovieMain';
import {MovieHall} from './MovieHall/MovieHall';
import Modal from '@material-ui/core/Modal';

class App extends Component {
  render() {
    return (
      // <div style={{width:"100%",height:"100%",backgroundColor:"#f2f2f2"}}><Movies/></div>
      // <div style={{width:"100%",height:"100%",backgroundColor:"#f2f2f2"}}><Movies/></div>
      // <div style={{width:"100%",height:"100%",backgroundColor:"#f2f2f2"}}><MovieComponent/></div>
      <div style={{width:"100%",height:"100%",backgroundColor:"#f2f2f2"}}><MovieHall/></div>
    );
  }
}

export default App;
