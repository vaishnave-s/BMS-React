import React, { Component } from 'react';
import './Movies.css';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
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

class MovieComponent extends Component {
    constructor(props) {  
        super(props);  
        this.state = {movies: []};  
      }  

     componentDidMount(){
         console.log("helo")
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

  render() {
    return (
    // <div>{this.tabs()}</div>

    <div>
        <Container className="cardGrid" maxWidth="md">

        <Grid container spacing={4}>
    {this.state.movies.map((movie,index) => (
      <Grid item key={index} xs={12} sm={6} md={4}>
        <Card className="card">
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
              Cast : <div style={{display:'inline'}}>{movie.Cast.map((actor,aindex) => (<span key={`${aindex}`}>{ (aindex ? ', ' : '') + actor.ActorName }</span>))}</div>
            </Typography>
            {/* <Typography style={{fontSize:12}}>
              {movie.Synopsis}

            </Typography> */}
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              View
            </Button>
            {/* <MoviesModal/> */}
            {/* <Button size="small" color="primary">
              Edit
            </Button> */}
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
  </Container>
  </div>

    
    );
  }
}

export default MovieComponent;
