import React, { Component } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import {withRouter} from 'react-router-dom';
import './index.css';

class ResetPassword extends Component {
  constructor(props) { 
    super(props);  
    this.state = {
    password:null,
    confirmPassword:null,
    };  
    this.handleChange = this.handleChange.bind(this); 
  }  
  snackbarClose = (e) =>{
    this.setState({snackbaropen:false});
  }
  
  PasswordReset=()=>{  
    console.log(this.state);  

    axios.put('https://localhost:44343/api/authentication/resetpassword',{
      token:this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1),
      newpassword:this.state.password

  } )  
  .then(json => {  
    console.log(json);  
    json.status==200?alert("Your password has been reset!"):null;
    this.props.history.push("/");  

  }).catch(e => {
    console.log(e.response);
    e.response.status==400 && e.response.data.Message=="Reset password session has expired."?alert("Reset password session has expired."):null;
    e.response.status==400 && e.response.data.Message=="Invalid Token"?alert("Please use the correct link URL to verify your account."):null;
    e.response.status==500?alert("Something went wrong. Please try again."):null;
    // window.location.reload(true); 

    })  
  }  
  
  handleChange= (e)=> {  
  this.setState({[e.target.name]:e.target.value});
  this.setState( {isAvailable: true });  
  console.log(this.state);

  } 
  
  handleSubmit=(e)=>{
    e.preventDefault();

    if (this.state.password===this.state.confirmPassword) 
    { 
        this.PasswordReset();
    }
    else
    {
      // this.setState({snackbaropen:true , snackbarmsg : 'Enter a valid email.'});
      alert('Passwords do not match!');

    }
  }
  render() {
    return (

      <Grid container component="main" className="root">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className="image" />
        <Grid className="paperContainer" item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className="paper">
            <Avatar className="avatar"

            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset password
              </Typography>
            <form className="formClass" noValidate>
              <Grid container spacing={2} style={{ marginTop: 10 }}>

                <Grid item xs={12}>

                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
              onChange={this.handleChange}

                  />
                </Grid>
                <Grid item xs={12}>

                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmpassword"
              onChange={this.handleChange}

                  />
                </Grid>
                <Grid item xs={12}>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="submitButton"
                    onClick={this.handleSubmit}
                    disabled={!this.state.confirmPassword||!this.state.password}
                  >
                    Set Password
            </Button>
                </Grid>
              </Grid>

              <Grid container style={{ marginTop: 20 }}>

              </Grid>

            </form>

          </div>
        </Grid>
      </Grid>

    );
  }
}

export default ResetPassword;
    // export default withRouter(SignUp);
