import React, { Component } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/icons/Cancel';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
// import {withRouter} from 'react-router-dom';

import './index.css';
const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameRegexp=/^[a-z ,.'-]+$/i;
class SignUp extends Component {
    constructor(props) { 
        super(props);  
        this.state = {
        fullName:null,
        email:null,
        password:null,
        snackbaropen :false, snackbarmsg:'',
        isAvailable:false,
        SubmissionStatus:false, 
        };  
        this.handleChange = this.handleChange.bind(this); 
      }  
      snackbarClose = (e) =>{
        this.setState({snackbaropen:false});
      }
      
      RegisterUser=()=>{  
        console.log(this.state);  

        axios.post('https://localhost:44343/api/user/user',{
          CustomerName: this.state.fullName.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          CustomerEmail: this.state.email,
          CustomerPassword: this.state.password
      } )  
      .then(json => {  
        console.log(json);  
        json.status==200?alert("A verification link has been sent to your email."):null;
        window.location.reload(true); 
      }).catch(e => {
        console.log(e.response);
        e.response.status==400?alert("This email already exists!"):null;
        e.response.status!=400?alert("There was an error. Please try again."):null;
        window.location.reload(true); 

        })  
      }  
      
      handleChange= (e)=> {  
      this.setState({[e.target.name]:e.target.value});
      this.setState( {isAvailable: true });  
      console.log(this.state);

      } 
      
      handleSubmit=(e)=>{
        e.preventDefault();

        if (emailRegexp.test(this.state.email)) 
        { 
          if(nameRegexp.test(this.state.fullName)){
            this.RegisterUser();

          }
          else{
            // this.setState({snackbaropen:true , snackbarmsg : 'Enter a valid name.'});
            alert('Enter a valid name.')
          }
        }
        else
        {
          // this.setState({snackbaropen:true , snackbarmsg : 'Enter a valid email.'});
          alert('Enter a valid email.')

        }
      }
      render() {
        return (
  
            <Grid container component="main" className="root">
              
            <CssBaseline />
            {/* <Snackbar 
      anchorOrigin={{vertical:'bottom',horizontal:'right'}}
      open = {this.state.snackbaropen}
      autoHideDuration = {1500}
      onClose={this.snackbarClose}
      message = {<span id="message-id">{this.state.snackbarmsg}</span>}
      action ={[
      <IconButton 
      key="close"
      arial-label="close"
      color="#FFFFFF"
      onClick={this.snackbarClose}>
      </IconButton>
      ]}
      /> */}
            <Grid item xs={false} sm={4} md={7} className="image" />
            <Grid className="paperContainer" item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <div className="paper">
              <Avatar className="avatar">
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form className="formClass" >
                <Grid container spacing={2}  style={{ marginTop: 10 }}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="fullname"
                      name="fullName"
                      variant="outlined"
                      required
                      fullWidth
                      id="fullName"
                      label="Full Name"
                      autoFocus
                      // value={this.state.fullName} 
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      // value={this.state.email} 
                      onChange={this.handleChange}

                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      // value={this.state.password} 
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
                  disabled={!this.state.fullName||!this.state.email||!this.state.password}
                >
                  Sign Up
                </Button>
                </Grid>
                </Grid>

            <Grid container justify="flex-end" style={{ marginTop: 20 }}>

                  <Grid item>
                    <Link href="#" variant="body2" onClick={()=>(this.props.history.push("/"))}>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>

              </form>
      
              </div>
            </Grid>
          </Grid>
        
        );
      }
    }
    
    export default SignUp;
    // export default withRouter(SignUp);
    