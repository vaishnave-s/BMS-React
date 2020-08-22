import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Auth from '../../../../Auth';

//Component Imports
import './MovieHall.css';
import Seatbooking from './components/Seatbooking/Seatbooking';

export class MovieHall extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toISOString().substring(0, 10),
      selectedShow: null,
      shows: [],
      book: false,
      displayShows: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    name == "date" ? (this.setState({
      [name]: value,
      book: false,
      displayShows: false,
      selectedShow:null
    })) : (this.setState({
      [name]: value,
      book: false,
    }));

  }
  handleDisplayShows = (event) => {
    console.log(this.props);
    event.preventDefault();
    this.setState({ displayShows: true });

    if (Auth.isAuthenticated()) {
      var decoded = jwt_decode(sessionStorage.getItem("token"));
      var tokenExpiration = new Date(decoded.exp * 1000);
      var currentDate = new Date();
      if (currentDate > tokenExpiration) {
        alert("Your session has expired.");
        Auth.logout(() => { sessionStorage.clear(); this.props.history.push('/') });
      }
      else{
    axios.get("https://localhost:44343/api/show", {
      params: {
        MovieID: parseInt(this.props.history.location.pathname.substring(this.props.history.location.pathname.lastIndexOf('/') + 1)),
        RequestedDate: this.state.date
      }
    })
      .then(response => {
        // console.log(response.data);
        // movies(response.data);
        this.setState({ shows: response.data });

      })
      .catch(error => {
        console.log('error', error)
        if (error) {
          error.response.status == 400 ? alert("There are no shows for this date.") : null;
          window.location.reload(true);
        }

      })
    }
  }

  }
  handleSubmit = (event) => {

    event.preventDefault();
    this.setState({ book: true });
  }

  render() {
    return (
      <span style={{ padding: '1rem' }}>

        <Grid item xs={12}>
          <Paper className="paper" elevation={10}>
            <div className="container form">
              <form onSubmit={this.handleSubmit}>


                <div className="form-group">
                  {/* <label> */}
                    Date:
            {/* </label> */}
                  <input type="date" name="date" min={new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }).substring(0, 10)} defaultValue={new Date().toISOString().substring(0, 10)} required onChange={this.handleChange} />
                  <Button
                  variant="contained"
                  color="secondary"
                  // disabled={Date(this.state.date)<(new Date())}
                  onClick={this.handleDisplayShows} type="button" 
            >Display shows</Button>
                </div>

                {this.state.displayShows ? <div>
                    {/* <label> */}
                      Shows:
            <select className="custom-select mb-2 mr-sm-2 mb-sm-0" name="selectedShow" onChange={this.handleChange}>
                        <option disabled selected value> -- select an option -- </option>
                        {this.state.shows.map((show, index) => (

                          // <option value={String(show.ShowID)}>{show.ShowTime}</option>
                          <option
                            value={String(show.ShowID)}
                        >{show.ShowTime} - {show.MovieHallType} (Rs {show.Price}) @ {show.TheatreName}</option>

                        ))}
                      </select>
                    {/* </label> */}
                  <div>
                    {this.state.selectedShow ? (                  <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  type="submit" 

            >Select seats</Button>
                ) : null}


                  </div>
                </div> : null}
              </form>
            </div>


          </Paper>

        </Grid>
        {this.state.shows.filter(s => s.ShowID == parseInt(this.state.selectedShow)).map((m) =>
          (
            <div>
              {this.state.book ? <Seatbooking showInfo={{ selectedDate: this.state.date, selectedShow: m }} /> : null}
            </div>
          ))};
      </span>
    )
  }
}