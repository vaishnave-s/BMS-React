import React, { Component } from 'react';
import axios from 'axios';
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';

import Main from './MovieHallMain';
import './MovieHall.css';
import Seatbooking from './Seatbooking';
import MovieHallMain from './MovieHallMain';

export class MovieHall extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
    //   hallSeat: "",
    //   movie: "",
    //   au: "U",
    //   genre: "",
    //   format: "",
    //   hall: "",
      date: new Date().toISOString().substring(0, 10),
      selectedShow:null,
      shows:[],
      book: false,
      displayShows:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      book:false,
    });

  }
  handleDisplayShows= (event) =>{

    event.preventDefault();
    this.setState({displayShows:true});
    // console.log("helo")
   axios.get("https://localhost:44343/api/show", {
    params: {
        MovieID:1,
        RequestedDate: this.state.date
      }
    })
       .then(response => {
           // console.log(response.data);
           // movies(response.data);
           this.setState({shows:response.data});
           console.log(response.data)

       })
       .catch( error=>{
           console.log('error', error)


       })

  }
  handleSubmit= (event) =>{
    console.log(this.state)

    event.preventDefault();
    this.setState({book: true});
  }

  render(){
    return(
      <div style={{padding:'1rem'}}>


        <div className="container form">
          <form onSubmit={this.handleSubmit}>

          {/* <div className="form-group">
            <label>
            Name:
            </label>
            <input className="form-control" name="movie" type="text" value={this.state.movie} required onChange={this.handleChange} />
          </div>

          <div className="form-group">
            <label>
            A/U:
            <select disabled className="custom-select mb-2 mr-sm-2 mb-sm-0" name="au" value={this.state.au} onChange={this.handleChange}>
            <option value="U">U</option>
            <option value="U/A">U/A</option>
            <option value="A">A</option>
            <option value="S">S</option>
            </select>
            </label>
          </div>

          <div className="form-group">
            <label>
            Genre:
            </label>
            <input className="form-control" name="genre" type="text" value={this.state.genre} required onChange={this.handleChange} />
          </div>

          <div className="form-group">
            <label>
            Format:
            <select className="custom-select mb-2 mr-sm-2 mb-sm-0" name="format" value={this.state.format} onChange={this.handleChange}>
            <option value="2d">2D</option>
            <option value="3d">3D</option>
            </select>
            </label>
          </div>

          <div className="form-group">
            <label>
            HallName:
            </label>
            <input className="form-control" name="hall" type="text" value={this.state.hall} required onChange={this.handleChange} />
          </div> */}

          <div className="form-group">
            <label>
            Date:
            </label>
            <input type="date" name="date" min={new Date().toLocaleString("en-IN", {timeZone: "Asia/Kolkata"}).substring(0, 10)} defaultValue={new Date().toISOString().substring(0, 10)} required onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <input onClick={this.handleDisplayShows} type="button" value="Display shows" />
            </div>
            {this.state.displayShows ? <div> 
                <div className="form-group">
            <label>
            Shows:
            <select className="custom-select mb-2 mr-sm-2 mb-sm-0" name="selectedShow" onChange={this.handleChange}>
            <option disabled selected value> -- select an option -- </option>
    {this.state.shows.map((show,index) => (
            
            // <option value={String(show.ShowID)}>{show.ShowTime}</option>
            <option
            value={String(show.ShowID)}
          >{show.ShowTime} @ {show.TheatreName}</option>
            ))}
            </select>
            </label>
          </div>
            <div>
        {this.state.selectedShow ? <input type="submit" value="Submit" /> : null }

            
            </div>
            </div>: null }
        </form>
      </div>

      <div>
        {this.state.book ? <Seatbooking ID={this.state.selectedShow} /> : null }
      </div>
    </div>
    )
  }
}