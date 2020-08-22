import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './Seatbooking.css';

class Seatbooking extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      seat: [],
      seatAvailable: [],
      seatSelected: [],
      seatReserved: [],
      confirmation: false,
      showSeatReservation:true

    }
    console.log(this.props);

  }
  componentDidMount(){


   axios.get("https://localhost:44343/api/seats/", {
    params: {
        ShowID:this.props.showInfo.selectedShow.ShowID,
        RequestedDate: this.props.showInfo.selectedDate
      }
    })
       .then(response => {
           // console.log(response.data);
           // seats(response.data);
           console.log(response.data)

           this.setState({seat:response.data.Seats});
           this.setState({seatReserved:response.data.ReservedSeats});
           console.log(this.state)


       })
       .catch(error=>{
           error.log(error);
       })

}

  onClickData(seat) {
    if(this.state.seatSelected.indexOf(seat) > -1 ) {
      this.setState({
        seatAvailable: this.state.seatAvailable.concat(seat),
        seatSelected: this.state.seatSelected.filter(res => res != seat),
        //seatReserved: this.state.seatReserved.filter(res => res != seat)
      })
    } else {
      this.setState({
        seatSelected: this.state.seatSelected.concat(seat),
        //seatReserved: this.state.seatReserved.concat(seat),
        seatAvailable: this.state.seatAvailable.filter(res => res != seat)
      })
    }
  }
  checktrue(row) {
    if(this.state.seatReserved.indexOf(row) > -1){
      return false
    }else{
      return true
    }
  }

  handleSubmited() {
    this.setState({seatReserved: this.state.seatReserved.concat(this.state.seatSelected)})
    // this.setState({
    //   seatSelected: [],
    // })
    // console.log(this.state.seatSelected.length)
    if(this.state.seatSelected.length>0){
      this.setState({
      confirmation:true,
      showSeatReservation:false
      })
    }
  }

  render() {
    return (
      <div>
       
        <DrawGrid
          seat={ this.state.seat }
          available={ this.state.seatAvailable }
          reserved={ this.state.seatSelected }
          selected={ this.state.seatReserved }
          onClickData={ this.onClickData.bind(this)}
          checktrue={ this.checktrue.bind(this)}
          handleSubmited={ this.handleSubmited.bind(this)}
          confirmation={this.state.confirmation}
          showSeatReservation={this.state.showSeatReservation}
          showInfo={this.props.showInfo}
          parentProps={this.props}
        /></div>
    )
  }
}

class DrawGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Transaction:null
    }
    this.handleChange = this.handleChange.bind(this);

  }
  
  confirmBooking(){
    console.log(this.props)

    console.log(this.state)
    axios.post('https://localhost:44343/api/booking',{
      CustomerID:sessionStorage.getItem("UserID"),
      ShowID:this.props.showInfo.selectedShow.ShowID,
      ShowDate:this.props.showInfo.selectedDate,
      PaymentAmount:parseFloat((this.props.showInfo.selectedShow.Price)*(this.props.reserved.length)),
      TransactionMode:this.state.Transaction,
      ConfirmedSeats:this.props.reserved
  
  })  
  .then(json => {  
    console.log(json);  

  if(json.status===200){  
    alert("Booking confirmed");  
  this.props.parentProps.history.push("/movies");  
  }  
  else{  
  alert('Data not Saved');  
  debugger;  
  // this.props.history.push('/movies')  
  }  
  }) 
  }



handleChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  this.setState({
    [name]: value,
  });

}
  render() {
    return (
      <div className="container">
         {this.props.showSeatReservation?<div>
          <h1>Seat Reservation System</h1>
        <h2></h2>
        <table className="grid">
          <tbody>
            <tr>
            { this.props.seat.map( row =>
              <td
              className={this.props.selected.indexOf(row) > -1? 'reserved': (this.props.reserved.indexOf(row) > -1? 'selected':'available')}
              key={row} onClick={this.props.checktrue(row) ? e => this.onClickSeat(row) : null} >{row} </td>) }
            </tr>
          </tbody>
        </table>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:20}}>
        <Button
        type="button"
                  variant="contained"
                  color="primary"
                  onClick={() => this.props.handleSubmited()}
            >Book</Button>
            </div>
        <div>
      </div>
        </div>
  :<div>{this.props.confirmation ? 
    
    <Grid item xs={13}>
    <Paper className="paper" elevation={10}>
  <div className="confirmationSection">
    
   
    <h1>Confirmation</h1>
  <div><label>Show date: {this.props.showInfo.selectedDate}</label></div>
  <div><label>Show time: {this.props.showInfo.selectedShow.ShowTime}</label></div>
  <div><label>Theatre: {this.props.showInfo.selectedShow.TheatreName}, {this.props.showInfo.selectedShow.TheatreLocation}</label></div>
  <div><label>Tickets chosen:{this.props.reserved} </label></div>
  <div><b><label>Total price: Rs {(this.props.showInfo.selectedShow.Price)*(this.props.reserved.length)}</label></b></div>
  <div><label>Transaction mode: 
  
  <select className="custom-select mb-2 mr-sm-2 mb-sm-0" name="Transaction" onChange={this.handleChange}>
            <option disabled selected value> -- select an option -- </option>
            <option value="Netbanking">Netbanking</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="UPI">UPI</option>
  </select>
  </label>
  </div>

  <div>
  <Button
        type="button"
                  variant="contained"
                  color="primary"
                  onClick={() => this.confirmBooking()}
                  disabled={!this.state.Transaction}
            >Confirm Booking</Button>
  
  </div>

  </div>
  </Paper>
  </Grid>: null }</div>} </div>
      )
    }

    onClickSeat(seat) {
      this.props.onClickData(seat);
    }
  }
  export default withRouter(Seatbooking);