import React, { Component } from 'react';
import '../stylesheets/seats.css';

class Seatbooking extends React.Component {

  constructor() {
    super();
    this.state = {
      seat: [],
      seatAvailable: [],
      seatSelected: [],
      seatReserved: []
    }
  }
  componentDidMount(){
//     console.log("helo")
  //  axios.get("https://localhost:44343/api/seats/"+string(this.props.ID))
  //      .then(response => {
  //          // console.log(response.data);
  //          // seats(response.data);
  //          this.setState({seat:response.data.seats});
  //          this.setState({shows:response.data.seatsReserved});
  //          console.log(response.data)

  //      })
  //      .catch(error=>{
  //          error.log(error);
  //      })

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
    this.setState({
      seatSelected: []
    })
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h1>Seat Reservation System</h1>
        <DrawGrid
          seat={ this.state.seat }
          available={ this.state.seatAvailable }
          reserved={ this.state.seatSelected }
          selected={ this.state.seatReserved }
          onClickData={ this.onClickData.bind(this)}
          checktrue={ this.checktrue.bind(this)}
          handleSubmited={ this.handleSubmited.bind(this)}
        />
      </div>
    )
  }
}

class DrawGrid extends React.Component {
  render() {
    return (
      <div className="container">
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
        <button type="button" className="btn-success btnmargin" onClick={() => this.props.handleSubmited()}>Confirm Booking</button>
      </div>
      )
    }

    onClickSeat(seat) {
      this.props.onClickData(seat);
    }
  }
  export default Seatbooking;