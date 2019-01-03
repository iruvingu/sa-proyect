import React, { Component} from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Flex, Box } from 'reflexbox';
import { Drawer, AppBar, Toolbar, List, CssBaseline, Typography, 
  Divider, ListItem, ListItemIcon, ListItemText, Tooltip, IconButton,
  Menu, MenuItem, Button } from '@material-ui/core';
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
/**
 * icons
 */

import { Sms, Home, PersonPin, ContactPhone, Phone, ArrowBack } from '@material-ui/icons'

/**
 * Components
 */
import UserInfo from './user_info/UserInfo'
import Messages from './sms'
import Contacts from './contacts/Contacts'
import Calls from './calls/Calls'
import Saludo from './saludo'

import views from './settings'

const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  }
});

class UserDetails extends Component {
  state = {
    open: false,
    selectedIndex: null,
    anchorEl: null,
  };

  // Change the index of the selected item
  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
        >
          <Toolbar>
            <Flex
             w={1}
             align='center'
             justify='space-between'>
              <Box
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
                    <Typography style={{ color: 'white' }} variant='title'>
                      Administración
                    </Typography>
                    <Typography style={{ color: 'white' }} variant='caption'>
                      Panel de control
                    </Typography>
                  </Flex>
              </Box>
              <Box>
                <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}>
                  Administrador
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>
              </Box>
            </Flex>
          </Toolbar>
        </AppBar>
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        >
          <div className={classes.toolbar} />
            <List>
            {['Usuario', 'Contactos', 'SMS', 'Llamadas'].map((text, index) => (
              <ListItem
                button
                key={text}
                component={Link}
                to={{pathname: `/user/detail/${text}`}}
                selected={this.state.selectedIndex === index}
                onClick={event => this.handleListItemClick(event, index)}
              >
                <ListItemIcon style={{marginRight: '0px'}}>
                  {index === 0
                    ? <PersonPin color='secondary' />
                    : index === 1
                      ? <ContactPhone color='secondary'/>
                      : index === 2
                        ? <Sms color='secondary' />
                        : index === 3
                          ? <Phone color='secondary'/>
                          : <Home color='primary'/>
                  }
                </ListItemIcon>
                <ListItemText>
                  <Typography>{text}</Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Inicio'].map((text, index) => (
              <ListItem button key={text} component={Link}
              to='/'>
                <ListItemIcon style={{marginRight: '0px'}}><Home color='primary'  /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>       
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

const MapStateToProps = ({ auth }) => {
  return ({
    auth
  })
}

export default connect(MapStateToProps, null)(UserDetailsWithStyles)
