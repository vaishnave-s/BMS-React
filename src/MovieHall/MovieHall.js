import React, { Component } from 'react';
// import axios from 'axios';
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';

import Main from './Main';
import '../stylesheets/MovieHall.css';
import Seatbooking from './Seatbooking';

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
      date: null,
      selectedShow:null,
      shows:[],
      book: false,
      displayShows:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
      console.log()
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      book:false,
      displayShows:false
    });

  }
  handleDisplayShows= (event) =>{
    event.preventDefault();
    this.setState({displayShows:true});
//     console.log("helo")
//    axios.get("https://localhost:44343/api/show", {
    // params: {
    //     MovieID: this.props.ID,
    //     RequestedDate: this.state.date
    //   }
    // })
//        .then(response => {
//            // console.log(response.data);
//            // movies(response.data);
//            this.setState({shows:response.data});
//            console.log(response.data)

//        })
//        .catch(error=>{
//            error.log(error);
//        })

  }
  handleSubmit= (event) =>{
    event.preventDefault();
    this.setState({book: true});
  }

  render(){
    return(
      <div>
        <div>
          <Main />
        </div>

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
            <input type="date" name="date" defaultValue={new Date().toISOString().substring(0, 10)}/>
          </div>
          <div>
            <input onClick={this.handleDisplayShows} type="button" value="Display shows" />
            </div>
            {this.state.displayShows ? <div> 
                <div className="form-group">
            <label>
            {/* Shows:
            <RadioGroup className="custom-select mb-2 mr-sm-2 mb-sm-0" name="selectedShow" value={this.state.selectedShow} onChange={this.handleChange}>
    {this.state.shows.map((show,index) => (
            
            <ReversedRadioButton value={show.ShowID}>{show.ShowTime}</ReversedRadioButton>
            ))}
            </RadioGroup> */}
            </label>
          </div>
            <div>
            <input type="submit" value="Submit" />
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