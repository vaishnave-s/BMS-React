import React, { Component } from 'react';
import { Route,Switch } from 'react-router-dom';
// import MovieComponent from './Movies/MovieComponent';
import logo from './logo.svg';
import './App.css';
//Imports
import SignIn from './scenes/Onboarding/SignIn/index';
import ForgotPassword from './scenes/Onboarding/ForgotPassword/index';
import ResetPassword from './scenes/Onboarding/ResetPassword/index';
import SignUp from './scenes/Onboarding/SignUp/index';
import MovieMain from './scenes/Movies/index';
import MovieHallMain from './scenes/MovieHall/index';
import Modal from '@material-ui/core/Modal';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
     {/* <div style={{width:"100%",height:"100%",backgroundColor:"#f2f2f2"}}><Movies/></div> */}
     {/* <div style={{width:"100%",height:"100%",backgroundColor:"#f2f2f2"}}><MovieMain/></div> */}
      {/* <div style={{width:"100%",height:"100%",backgroundColor:"#f2f2f2"}}><MovieComponent/></div> */}
      <Route path="/movies" component={MovieMain}></Route>
      <Route path="/booking" component={MovieHallMain}></Route>
      {/* <Route path="/signin" component={SignIn}></Route> */}
      <Route path="/signin" component={SignIn}></Route>
      <Route path="/signup" component={SignUp}></Route>
      <Route path="/forgotpassword" component={ForgotPassword}></Route>
      <Route path="/resetpassword" component={ResetPassword}></Route>
     {/* <div style={{width:"100%",height:"100%",backgroundColor:"#f2f2f2"}}><MovieHallMain/></div> */}
     </Switch>
     
      </div>
    );
  }
}

export default App;
