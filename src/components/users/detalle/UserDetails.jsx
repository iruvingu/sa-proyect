import React, { Component} from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Flex, Box } from 'reflexbox';
import { Drawer, AppBar, Toolbar, List, CssBaseline, Typography, 
  Divider, ListItem, ListItemIcon, ListItemText, Tooltip, IconButton,
  Menu, MenuItem, Button, Avatar, MenuList, ClickAwayListener, Grow,
  Paper, Popper } from '@material-ui/core';
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
/**
 * icons
 */

import { Sms, Home, PersonPin, ContactPhone, Phone, ArrowBack, ChevronLeft,
  ChevronRight } from '@material-ui/icons'
import MenuIcon from "@material-ui/icons/Menu"
/**
 * Components
 */
import UserInfo from './user_info/UserInfo'
import Messages from './sms'
import Contacts from './contacts/Contacts'
import Calls from './calls/Calls'
import Saludo from './saludo'
// Paths
import views from './settings'

/**
 * Actions
 */
import { setRouterLocation, signOut } from '../../../actions'

const drawerWidth = 160;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 0
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 8 + 1
    }
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
});

class UserDetails extends Component {
  state = {
    open: true,
    openMenu: false,
    selectedIndex: null,
    anchorEl: null,
    colors: {
      Usuario: '#949494',
      Contactos: '#949494',
      SMS: '#949494',
      Llamadas: '#949494'
    }
    
  };

  static contextTypes = {
    router: PropTypes.object
  };
  
  // Change the index of the selected item
  handleListItemClick = (event, index, path) => {
    this.setState({ selectedIndex: index });
  };

  // Handle when the drawer is open
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  // handle when the drower is closed
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  // handle when the
  handleToggle = () => {
    this.setState(state => ({ openMenu: !state.openMenu }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ openMenu: false });
  };

  render() {
    const { classes, theme, path, auth } = this.props;
    const { anchorEl, openMenu } = this.state
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          style={{background: '#FFFFFF'}}
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar>
            <Flex
             align='center'
             style={{width: '100%'}}>
              <Box
              w={1/2}
              flex
              align='center'>
                <Tooltip title='Regresar a inicio'>
                  <IconButton
                  component={Link}
                  to='/'
                  style={{ margin: '0 10px' }}>
                    <ArrowBack />
                  </IconButton>
                </Tooltip>
                <Flex
                    column
                    justify='flex-start'
                  >
                    <Typography style={{ color: '#404E67' }} variant='title'>
                      Administración
                    </Typography>
                    <Typography style={{ color: '#404E67' }} variant='caption'>
                      Panel de control
                    </Typography>
                  </Flex>
              </Box>
              <Box
              flex
              w={1/2}
              justify='flex-end'>
                <Box>
                  <Avatar style={{width: '30', height: '30',}} src={auth.photoURL} />
                </Box>
                
                <Button
                  buttonRef={node => {
                    this.anchorEl = node;
                  }}
                  aria-owns={openMenu ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleToggle}
                >
                  <Typography style={{ color: '#404E67' }} variant='caption'>
                      {auth.displayName}
                  </Typography>
                </Button>
                <Popper open={openMenu} anchorEl={this.anchorEl} transition disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id="menu-list-grow"
                      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
                          <MenuList>
                            <MenuItem onClick={this.props.signOut}>Logout</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Box>
            </Flex>
          </Toolbar>
        </AppBar>
        <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: this.state.open,
          [classes.drawerClose]: !this.state.open
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })
        }}
        open={this.state.open}
        >
          <div className={classes.toolbar} style={{background: '#445064' }} >
          </div>
          <Flex
          flex
          column
          justify='space-between'
          style={{height: '100%', background: '#445064'}}>
            <Box
            justify='start'
            >
              <Divider />
              <List>
              {views.map((view, index) => (
                <ListItem
                  button
                  key={view.text}
                  component={Link}
                  to={{pathname: `/user/detail/${view.text}`}}
                  selected={this.state.selectedIndex === index}
                  onClick={event => this.handleListItemClick(event, index)}
                >
                  <ListItemIcon style={{marginRight: '0px'}}>
                    {index === 0
                      ? <PersonPin style={{color: (path === view.path) ? '#FFFFFF' : '#C8CACE'}} />
                      : index === 1
                        ? <ContactPhone style={{color: (path === view.path) ? '#FFFFFF' : '#C8CACE'}} />
                        : index === 2
                          ? <Sms style={{color: (path === view.path) ? '#FFFFFF' : '#C8CACE'}} />
                          : index === 3
                            ? <Phone style={{color: (path === view.path) ? '#FFFFFF' : '#C8CACE'}} />
                            : <Home color='primary'/>
                    }
                  </ListItemIcon>
                  <ListItemText>
                    <Typography 
                      style={{color: (path === view.path) ? '#FFFFFF' : '#C8CACE'}}
                      variant={
                        (path === view.path)
                          ? 'body2'
                          : 'body1'
                      }
                    >{view.text}</Typography>
                  </ListItemText>
                </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {['Inicio'].map((text, index) => (
                  <ListItem button key={text} component={Link}
                  to='/'>
                    <ListItemIcon style={{marginRight: '0px', color: '#FFFFFF'}}><Home /></ListItemIcon>
                    <ListItemText disableTypography primary={text} style={{color: '#FFFFFF'}} />
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box
            flex
            justify='end'
            align='end'>
              <Flex
              style={{width: '100%'}}
              flex
              justify='space-between'>
                <Box><IconButton onClick={this.handleDrawerOpen} className={classNames(classes.menuButton, {
                    [classes.hide]: this.state.open
                  })} >
                  <ChevronRight color='secondary' />
              </IconButton></Box>
                <Box><IconButton onClick={this.handleDrawerClose} className={classNames(classes.menuButton, {
                    [classes.hide]: !this.state.open
                  })}>
                  <ChevronLeft color='secondary' />
              </IconButton></Box>
              </Flex>
            </Box>
          </Flex>
        </Drawer>
        <main className={classes.content} style={{backgroundColor: '#f9f6f2'}}>
          <div className={classes.toolbar} style={{backgroundColor: '#f9f6f2'}} />
            <Switch>
              <Route path='/user/detail/Usuario' component={UserInfo}/>
              <Route path='/user/detail/Contactos' component={Contacts}/>
              <Route path='/user/detail/SMS' component={Messages}/>
              <Route path='/user/detail/Llamadas' component={Calls}/>
              <Route path='/user/detail/' component={Saludo} />
            </Switch>
        </main>
      </div>
    );
  }
}

UserDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const UserDetailsWithStyles = withStyles(styles, { withTheme: true })(UserDetails);

const MapStateToProps = ({ auth, path }) => {
  return ({
    auth,
    path: path.path
  })
}

export default connect(MapStateToProps, {setRouterLocation, signOut})(UserDetailsWithStyles)
