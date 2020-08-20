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

class ForgotPassword extends Component {
  constructor(props) { 
    super(props);  
    this.state = {
    email:null,
    snackbaropen :false, snackbarmsg:'',
    isAvailable:false,
    SubmissionStatus:false, 
    };  
    this.handleChange = this.handleChange.bind(this); 
  }  
  snackbarClose = (e) =>{
    this.setState({snackbaropen:false});
  }
  
  SendLink=()=>{  
    console.log(this.state);  

    axios.post('https://localhost:44343/api/authentication/forgotpassword',null,{params:{
      email: this.state.email}
  } )  
  .then(json => {  
    console.log(json);  
    json.status==200?(alert("A password reset link has been sent!"),
    window.location.reload(true)
    ):null;

    
  }).catch(e => {
    // console.log(e.response);
    // e.response.status==400 && e.response.data.Message=="Invalid Credentials"?alert("Invalid credentials"):null;
    e.response.status==400 && e.response.data.Message=="This user doesn't exist."?alert("This user doesn't exist!"):null;
    // e.response.status==400 && e.response.data.Message=="User Not Verified"?alert("This user is not verified."):null;
    // e.response.status!=400?alert("There was an error. Please try again."):null;
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
        this.SendLink();
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
                Forgot password
              </Typography>
              <form className="formClass" noValidate>
              <Grid container spacing={2} style={{ marginTop: 10 }}>

              <Grid item xs={12}>

              <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange}

            />
            </Grid>
                  <Grid item xs={12}>


            </Grid>
            <Grid item xs={12}>

            <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submitButton"
                  onClick={this.handleSubmit}
                  disabled={!this.state.email}
            >
              Send Link
            </Button>
            </Grid>
            </Grid>

            <Grid container justify="flex-end" style={{ marginTop: 20 }}>

                  <Grid item>
                    <Link href="#" variant="body2" onClick={()=>(this.props.history.push("/signin"))}>
                      Remember your password? Sign in
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
    
    export default ForgotPassword;
    // export default withRouter(SignUp);
    