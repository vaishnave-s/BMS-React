import React from 'react';
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
import { useHistory } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
//Component Imports
import BG from '../../Assets/BGNav.jpg';
import logo from '../../Assets/logo2.PNG';import MovieComponent from './components/Movies';
import  MainListItems from '../../components/shared/listItems';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight:24, // keep right padding when drawer closed
    backgroundColor:'#3d8792',
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
    background: "url(" + BG + ")",
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
backgroundColor:'#eeeeee',
paddingTop: theme.spacing(14),
width:'100%',
flexGrow: 1,
height: '100vh',
overflow: 'auto'

  },
}));

export default function MovieMain() {
  const classes = useStyles();
  let history = useHistory();
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
            Movies
          </Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
                            <IconButton
                    disableRipple
                    disableFocusRipple
            color="inherit"   
            style={{position:"fixed",right:15}}
            onClick={()=>{history.push("/account")}}
            >
          <AccountCircleIcon fontSize="large" style={{marginRight:10}}/> 
          <Typography  component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          {sessionStorage.getItem("UserName")}
          </Typography>

          </IconButton>
</Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <img 
            onClick={()=>{history.push("/home")}}
          style={{opacity:'0.9',cursor:'pointer',zIndex:30,width:'170px',height:'80px',position:"fixed",left:10}} src={logo}></img>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><MainListItems active={"Movies"}/></List>
        {/* <Divider /> */}
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <span className={classes.InnerComponent}>
      <MovieComponent />
      </span>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
      </main>

    </div>
  );
}