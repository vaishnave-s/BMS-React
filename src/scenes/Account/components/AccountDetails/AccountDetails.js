import React, { Component } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import jwt_decode from 'jwt-decode';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert';

import Auth from '../../../../Auth';
import './AccountDetails.css';

export default class AccountDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open:false,
            setOpen:false,
            variantField: "filled",
            disabledField: true,
            name: null,
            email: null,
            number: null,
            address: null,
            accountCreateDate: null,
            edit: false,

        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        //   this.setState( {isAvailable: true });  

    }

    handleEdit = (e) => {
        e.preventDefault();
        this.setState({ edit: !this.state.edit });
        if (!this.state.edit) {
            this.setState({ variantField: "outlined", disabledField: false });
        }
        else {
            this.setState({ variantField: "filled", disabledField: true });
            var contact = !this.state.rollbackCustomer.CustomerContact||this.state.rollbackCustomer.CustomerContact=="" ? "None":this.state.rollbackCustomer.CustomerContact;
            var address = !this.state.rollbackCustomer.CustomerAddress||this.state.rollbackCustomer.CustomerAddress=="" ? "None":this.state.rollbackCustomer.CustomerAddress;
            this.setState({
                name: this.state.rollbackCustomer.CustomerName,
                number: contact,
                address: address,
            });
        }
    }
    snackbarClose = (e) =>{
        this.setState({snackbaropen:false});
      }

    onChangeAccountDetails=(e)=>
    {
        e.preventDefault();
        axios.put("https://localhost:44343/api/user/user/" + sessionStorage.getItem("UserID"),{
            CustomerName:this.state.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            CustomerAddress:this.state.address,
            CustomerContact:this.state.number
        })
            .then(response => {
                // movies(response.data);
                this.setState({snackbaropen:true , snackbartype:"success",snackbarmsg : "Your details have been updated!"});
                sessionStorage.setItem("UserName",this.state.name),
                setTimeout(() => { 
                window.location.reload(true); 
                    }, 4000)


            })
            .catch(error => {
                console.log('error', error)
                //   if(error){
                //  error.response.status==400?alert("There are no shows for this date."):null;
                //  window.location.reload(true); 
                //   }
                e.response.status==500?(this.setState({snackbaropen:true , snackbartype:"error",snackbarmsg : "Something went wrong."}),
                setTimeout(() => { 
                window.location.reload(true); 
                
                }, 4000)):null;
            });
    }
    componentDidMount() {
if(Auth.isAuthenticated()){
var decoded = jwt_decode(sessionStorage.getItem("token"));
var tokenExpiration = new Date(decoded.exp*1000);
var currentDate = new Date();
if(currentDate>tokenExpiration){
    this.setState({snackbaropen:true , snackbartype:"warning",snackbarmsg : "Your session has expired."});
    setTimeout(() => { 
      Auth.logout(()=>{sessionStorage.clear();this.props.history.push('/')});
    
        }, 4000)
}
else{


        axios.get("https://localhost:44343/api/user/user/" + sessionStorage.getItem("UserID"))
            .then(response => {
                // console.log(response.data);
                // movies(response.data);
                var contact = !response.data.CustomerContact||response.data.CustomerContact=="" ? "None":response.data.CustomerContact;
                var address = !response.data.CustomerAddress||response.data.CustomerAddress=="" ? "None":response.data.CustomerAddress;
                this.setState({
                    name: response.data.CustomerName,
                    email: response.data.CustomerEmail,
                    number: contact,
                    address: address,
                    accountCreateDate: Date(response.data.AccountCreateDate).toString().split('GMT')[0].substring(0, 15),
                    rollbackCustomer:response.data
                });

            })
            .catch(error => {
                console.log('error', error)
                //   if(error){
                //  error.response.status==400?alert("There are no shows for this date."):null;
                //  window.location.reload(true); 
                //   }

            });
}
}

    }
    
    handleClickOpen = () => {
    this.setState({setOpen:true})
  };
    handleClose = () => {
    this.setState({setOpen:false})

  };
  changePassword = () => {
    this.setState({setOpen:false})
    
    axios.post('https://localhost:44343/api/authentication/forgotpassword',null,{params:{
      email: sessionStorage.getItem("UserEmail")}
  } )  
  .then(json => {  
    json.status==200?(
this.setState({snackbaropen:true , snackbartype:"success",snackbarmsg : "A password reset link has been sent!"}),
setTimeout(() => { 
    window.location.reload(true); 
    
    }, 4000)
    ):null;

    
  }).catch(e => {
    // console.log(e.response);
    e?(this.setState({snackbaropen:true , snackbartype:"error",snackbarmsg : "Something went wrong."}),
    setTimeout(() => { 
    window.location.reload(true); 
    
    }, 4000)):null;

    }) 

  };

    render() {
        return (
            <Container maxWidth="md" className="container">
  <Snackbar 
  anchorOrigin={{vertical:'top',horizontal:'right'}}
  open = {this.state.snackbaropen}
  autoHideDuration = {6000}
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
  >
          <MuiAlert elevation={6} variant="filled" onClose={this.state.snackbaropen} severity={this.state.snackbartype}>
  {this.state.snackbarmsg}
</MuiAlert>
</Snackbar>
                <Grid item xs={12}>
                    <Paper className="paper" elevation={10}>

                        {/* <form> */}
                        <Grid container>
                            <Grid item xs={14}>

                                <label>Member since: {this.state.accountCreateDate}
                                </label>

                            </Grid>

                        </Grid>
                        <Grid container>
                            <Grid item xs={14}>

                                <label>Name:

                                    <TextField
                                        variant={this.state.variantField}
                                        disabled={this.state.disabledField}
                                        fullWidth
                                        name="name"
                                        // label="Password"
                                        type="text"
                                        id="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        error={!/^[a-z ,.'-]+$/i.test(this.state.name)}
                                        helperText={!/^[a-z ,.'-]+$/i.test(this.state.name)?"Enter a valid name.":null}
                                    />
                                </label>

                            </Grid>

                        </Grid>
                        <Grid container>
                            <Grid item xs={14}>

                                <label>Email address:

                                    <TextField
                                        variant="filled"
                                        disabled={true}
                                        fullWidth
                                        name="email"
                                        // label="Password"
                                        type="text"
                                        id="email"
                                        value={this.state.email}

                                    />
                                </label>

                            </Grid>

                        </Grid>
                        <Grid container>
                            <Grid item xs={14}>

                                <label>Address:

                                    <TextField
                                        variant={this.state.variantField}
                                        disabled={this.state.disabledField}
                                        fullWidth
                                        name="address"
                                        multiline
                                        rows={4}
                                        // label="Password"
                                        type="text"
                                        id="address"
                                        value={this.state.edit?(this.state.address=="None"?"":this.state.address):this.state.address}

                                        onChange={this.handleChange}

                                    />
                                </label>

                            </Grid>

                        </Grid>
                        <Grid container>

                            <Grid item xs={14}>

                                <label>Contact number:

                                    <TextField
                                        variant={this.state.variantField}
                                        disabled={this.state.disabledField}
                                        fullWidth
                                        name="number"
                                        // label="Password"
                                        type="text"
                                        id="number"
                                        value={this.state.edit?(this.state.number=="None"?"":this.state.number):this.state.number}

                                        onChange={this.handleChange}
                                        error={this.state.number!="None"?(!(/^[0-9+ ]*$/.test(this.state.number))):null}
                                        helperText={(this.state.number!="None"?(!(/^[0-9+ ]*$/.test(this.state.number))):null)?"Enter a valid contact number.":null}
                                    
                                    />
                                </label>

                            </Grid>

                        </Grid>
                        <Grid container>
                            <Grid item xs={this.state.edit ? 6 : 10}>

                                <Button onClick={this.handleClickOpen} style={{ paddingTop: "0px", paddingBottom: "0px" }} variant="contained" size="small" color="secondary"
                                // onClick={}
                                >
                                    Change Password
            </Button>
            <Dialog
        open={this.state.setOpen}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Change password"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to receive a link to change your password?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.changePassword} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
                            </Grid>

                            <Grid item >

                                <Button style={{ paddingTop: "0px", paddingBottom: "0px" }} variant="contained" size="small" color="primary" color="primary"
                                    onClick={this.handleEdit}
                                >
                                    {/* onClick={this.props.history.push("/booking/"+String(movie.ID))} */}
                                    {this.state.edit ? "Cancel" : "Edit"}
                                </Button>
                            </Grid>
                            {this.state.edit ? (<Grid item style={{ marginLeft: "20px" }}>

                                <Button 
                                        disabled={(!(this.state.name && (/^[0-9+ ]*$/.test(this.state.number)) && (/^[a-z ,.'-]+$/i.test(this.state.name)) && (this.state.number!=""||this.state.address!="") && (this.state.name!=this.state.rollbackCustomer.CustomerName || 
                                            this.state.number!=(!this.state.rollbackCustomer.CustomerContact||this.state.rollbackCustomer.CustomerContact=="" ? "None":this.state.rollbackCustomer.CustomerContact) || this.state.address!=(!this.state.rollbackCustomer.CustomerAddress||this.state.rollbackCustomer.CustomerAddress=="" ? "None":this.state.rollbackCustomer.CustomerAddress))))}

                                style={{ paddingTop: "0px", paddingBottom: "0px" }} variant="contained" size="small" color="primary"
                                onClick={this.onChangeAccountDetails}
                                >
                                    Submit
</Button>
                            </Grid>) : null}
                        </Grid>

                        {/* </form> */}

                    </Paper>

                </Grid>
            </Container >
        )
    }

}