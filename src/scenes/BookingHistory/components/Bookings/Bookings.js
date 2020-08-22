import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Auth from '../../../../Auth';
import { useHistory } from "react-router-dom";


const columns = [
  { id: 'bookingDate', label: 'Booking Date', minWidth: 170 },
  { id: 'movieName', label: 'Movie', minWidth: 100 },
  { id: 'showDate', label: 'Show Date', minWidth: 100 },
  { id: 'showTime', label: 'Show Time', minWidth: 100 },
  { id: 'confirmedSeats', label: 'Seats', minWidth: 100 },
  { id: 'theatre', label: 'Theatre', minWidth: 100 },
  { id: 'paymentAmount', label: 'Payment Amount', minWidth: 100 },
  { id: 'transactionMode', label: 'Transaction Mode', minWidth: 100 },
  
];
var rows = [{bookingDate:"",movieName:"",showDate:"",showTime:"",confirmedSeats:"NO RECORDS",
theatre:"",paymentAmount:"",transactionMode:""}];
var isPresent = false;
function createData(bookings) {
  if(bookings){
    rows.length=0;
      bookings.map((booking,index) => {
        var bookingDate=Date(booking.BookingVM.BookingDate).toString().split('GMT')[0];
        var movieName=booking.MovieVM.Name;
        var showDate=booking.BookingVM.ShowDate.slice(0,10);
        var showTime=booking.ShowTime.slice(0,5);
        var confirmedSeats=booking.BookingVM.ConfirmedSeats;
        var theatre = booking.TheatreName+", "+booking.TheatreLocation;
        var paymentAmount="Rs "+booking.BookingVM.PaymentAmount;
        var transactionMode=booking.BookingVM.TransactionMode;
        var bookingObj={bookingDate,movieName,showDate,showTime,confirmedSeats,theatre,paymentAmount,transactionMode};
        rows.push(bookingObj);
      }
    );
    isPresent=true;
  }
 
  }

  if(Auth.isAuthenticated()){

axios.get("https://localhost:44343/api/bookings/customer/"+sessionStorage.getItem("UserID"))
     .then(response => {
         // console.log(response.data);
         // movies(response.data);
        //  this.setState({shows:response.data});
         createData(response.data);
     })
     .catch( error=>{
         console.log('error', error)
        //   if(error){
        //  error.response.status==400?alert("There are no shows for this date."):null;
        //  window.location.reload(true); 
        //   }

     });

    }
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
let history = useHistory();

if(Auth.isAuthenticated()){
  var decoded = jwt_decode(sessionStorage.getItem("token"));
  var tokenExpiration = new Date(decoded.exp*1000);
  var currentDate = new Date();
  if(currentDate>tokenExpiration){
    alert("Your session has expired.");
    Auth.logout(()=>{sessionStorage.clear();history.push('/')});
  }
  }
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root} elevation={10}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
