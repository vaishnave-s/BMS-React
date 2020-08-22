import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CarouselSlide from './Carousel/Carousel';
import { useHistory } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slide from '@material-ui/core/Slide'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
//Component Imports
import  MainListItems from '../../components/shared/listItems';
import './index.css';
import Auth from '../../Auth';




function Arrow(props) {
  const { direction, clickFunction } = props;
  const icon = direction === 'left' ? <FaChevronLeft /> : <FaChevronRight />;

  return <div onClick={clickFunction}>{icon}</div>;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight:24, // keep right padding when drawer closed
    backgroundColor:'#3f50b5',
    position: 'fixed',
    width:'100%'
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {

    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,

  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    // flexGrow: 1,
  },
  drawerPaper: {
    // background: "linear-gradient(#e66465, #9198e5);",
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',

  },
  fixedHeight: {
    height: 240,
  },
  InnerComponent: {
      padding: theme.spacing(10),

paddingTop: theme.spacing(14),
width:'100%',
flexGrow: 1,
height: '100vh',
overflow: 'auto',
flexGrow: 1,
height: '100vh',
overflow: 'auto',
  },
}));

export default function Home() {
  const classes = useStyles();
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
  const [movies, setMovies] = React.useState([]);

    var SLIDE_INFO = [];

if(Auth.isAuthenticated()){
    axios.get("https://localhost:44343/api/movies")
        .then(response => {
            // console.log(response.data);
            // movies(response.data);
              var movies = response.data;
              // movies.map((movie,index) => (
              //   SLIDE_INFO.push({movieInfo:movie.PosterURL})
              // ));
              setMovies(response.data)
        })
        .catch(error=>{
            error.log(error);
        })
      }
      SLIDE_INFO=movies.slice();
// console.log(SLIDE_INFO)
  const [index, setIndex] = React.useState(0);
  const content = SLIDE_INFO[index];
  const numSlides = SLIDE_INFO.length;

  const [slideIn, setSlideIn] = React.useState(true);
  const [slideDirection, setSlideDirection] = React.useState('down');

  const onArrowClick = (direction) => {
      const increment = direction === 'left' ? -1 : 1;
      const newIndex = (index + increment + numSlides) % numSlides;

      const oppDirection = direction === 'left' ? 'right' : 'left';
      setSlideDirection(direction);
      setSlideIn(false);

      setTimeout(() => {
          setIndex(newIndex);
          setSlideDirection(oppDirection);
          setSlideIn(true);
      }, 500);
  };

  React.useEffect(() => {
      const handleKeyDown = (e) => {
          if (e.keyCode === 39) {
              onArrowClick('right');
          }
          if (e.keyCode === 37) {
              onArrowClick('left');
          }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
          window.removeEventListener('keydown', handleKeyDown);
      };
  });
  // console.log()
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
           Home
          </Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}

                    {/* <IconButton
                    
            color="inherit">
          <AccountCircleIcon/> 
          <Typography  component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          {sessionStorage.getItem("UserName")}
          </Typography>

          </IconButton> */}

        </Toolbar>
      </AppBar>

      <Drawer
      position="sticky"
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><MainListItems active={"Home"}/></List>
        {/* <Divider /> */}
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <span className={classes.InnerComponent}>
      <div className='carouselSection'>
            <Arrow
                direction='left'
                clickFunction={() => onArrowClick('left')}
            />
            <Slide in={slideIn} direction={slideDirection}>
                <div>
                    <CarouselSlide content={content} />
                </div>
            </Slide>
            <Arrow
                direction='right'
                clickFunction={() => onArrowClick('right')}
            />
        </div>                
      </span>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
      </main>

    </div>
  );
}