import React, { Component } from 'react';
import './Movies.css';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {withRouter} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Auth from '../../../Auth';

class MovieComponent extends Component {
    constructor(props) { 
        super(props);  
        this.state = {
          open: false,
          ID: null,
          movies: []};  
      }  

     componentDidMount(){

      if(Auth.isAuthenticated()){
      var decoded = jwt_decode(sessionStorage.getItem("token"));
      var tokenExpiration = new Date(decoded.exp*1000);
      var currentDate = new Date();
      if(currentDate>tokenExpiration){
        alert("Your session has expired.");
        Auth.logout(()=>{sessionStorage.clear();this.props.history.push('/')});
      }
      }
        axios.get("https://localhost:44343/api/movies")
            .then(response => {
                // console.log(response.data);
                // movies(response.data);
                this.setState({movies:response.data});
                console.log(response.data)

            })
            .catch(error=>{
                error.log(error);
            })

    }
    handleOpen = ID => () => {
      // get which button was pressed via `stationNumber`
      // open the modal and set the `stationNumber` state to that argument
      this.setState({ open: true, ID: ID });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

  render() {
    return (
    // <div>{this.tabs()}</div>

    <div>
        <Container className="cardGrid" maxWidth="md">

        <Grid container spacing={4}>
    {this.state.movies.map((movie,index) => (
      <Grid item key={index} xs={12} sm={6} md={6}>
        <Card className="card" elevation={10}>
          <CardMedia
            className="cardMedia"
            image={movie.PosterURL!==null?(movie.PosterURL):'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'}
            title="Image title"
          />
          <CardContent className="cardContent">
            <Typography gutterBottom variant="h5" component="h2">
              {movie.Name}
            </Typography>
            <Typography style={{fontSize:12,paddingBottom:10}}>
              {/* Cast : <div style={{display:'inline'}}>{movie.Cast.map((actor,index) => (<div style={{display:'inline'}}>{actor.ActorName}</div>))}</div> */}
              Cast : <div style={{display:'inline'}}>{movie.Cast.map((actor,aindex) => (<span key={`${aindex}`}>{ (aindex ? ', ' : '') + actor }</span>))}</div>
            </Typography>
            {/* <Typography style={{fontSize:12}}>
              {movie.Synopsis}

            </Typography> */}
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={this.handleOpen(movie.ID)}>
              View
            </Button>
            <Button size="small" color="primary" onClick={()=>this.props.history.push("/booking/"+String(movie.ID))}>
            {/* onClick={this.props.history.push("/booking/"+String(movie.ID))} */}
              Book
            </Button>
          </CardActions>
          <Modal disableScrollLock open={this.state.open} onClose={this.handleClose}>
            {/* display the content based on newly set state */}
            <div className="modal">
              {/* {this.state.movies.forEach(m => m.ID == this.state.ID).Name} */}
              {this.state.movies.filter(m => m.ID == this.state.ID).map((m)=>
              (
                <div>
                <img className="modalImage" src={m.PosterURL!==null?(m.PosterURL):'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'} >
                  
                </img>
                <Typography gutterBottom variant="h4" component="h2">
              {m.Name}
            </Typography>
            <Typography style={{fontSize:14,paddingBottom:10}}>
              {/* Cast : <div style={{display:'inline'}}>{movie.Cast.map((actor,index) => (<div style={{display:'inline'}}>{actor.ActorName}</div>))}</div> */}
              Cast : <div style={{display:'inline'}}>{m.Cast.map((actor,aindex) => (<span key={`${aindex}`}>{ (aindex ? ', ' : '') + actor }</span>))}</div>
            </Typography>
            <Typography style={{fontSize:14,paddingBottom:10}}>
            Director : {m.Director}
            </Typography>
            <Typography style={{fontSize:14,paddingBottom:10}}>
            Genre : {m.Genre}
            </Typography>
            <Typography style={{fontSize:12,paddingBottom:10}}>
            {m.Synopsis}
            </Typography>
            <Typography style={{fontSize:12,paddingBottom:10}}>
            {m.TrailerURL!==null?(<a target="popup" href={m.TrailerURL}>Watch trailer here</a>):''}
            </Typography>
                </div>
                )
              )}
              </div>
          </Modal>
        </Card>
      </Grid>
    ))}
  </Grid>
  </Container>
  </div>

    
    );
  }
}

export default withRouter(MovieComponent);
