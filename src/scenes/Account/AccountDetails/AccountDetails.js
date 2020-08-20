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
        console.log(this.state);

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


    onChangeAccountDetails=(e)=>
    {
        e.preventDefault();
        axios.put("https://localhost:44343/api/user/user/" + sessionStorage.getItem("UserID"),{
            CustomerName:this.state.name,
            CustomerAddress:this.state.address,
            CustomerContact:this.state.number
        })
            .then(response => {
                console.log(response.data);
                // movies(response.data);
                alert("Your details have been updated!");
                 window.location.reload(true); 


            })
            .catch(error => {
                console.log('error', error)
                //   if(error){
                //  error.response.status==400?alert("There are no shows for this date."):null;
                //  window.location.reload(true); 
                //   }

            });
    }
    componentDidMount() {
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
                console.log(this.state);

            })
            .catch(error => {
                console.log('error', error)
                //   if(error){
                //  error.response.status==400?alert("There are no shows for this date."):null;
                //  window.location.reload(true); 
                //   }

            });
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
    console.log(json);  
    json.status==200?(alert("A password reset link has been sent!")
    // ,window.location.reload(true)
    ):null;

    
  }).catch(e => {
    // console.log(e.response);
    // e.response.status==400 && e.response.data.Message=="Invalid Credentials"?alert("Invalid credentials"):null;
    e.response.status==400 && e.response.data.Message=="This user doesn't exist."?alert("This user doesn't exist!"):null;
    // e.response.status==400 && e.response.data.Message=="User Not Verified"?alert("This user is not verified."):null;
    // e.response.status!=400?alert("There was an error. Please try again."):null;
    // window.location.reload(true); 

    }) 

  };

    render() {
        return (
            <Container maxWidth="sm" className="container">

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
                                        inputProps={{ pattern: "[0-9+]" }}
                                        id="number"
                                        value={this.state.edit?(this.state.number=="None"?"":this.state.number):this.state.number}

                                        onChange={this.handleChange}

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