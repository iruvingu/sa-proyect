import React, { Component} from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, CssBaseline, Typography, Divider, ListItem, ListItemIcon, ListItemText, Fab } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
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

import { Link, Route, Switch } from 'react-router-dom'

const drawerWidth = 240;

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
    selectedIndex: 0,
  };

  // Change the index of the selected item
  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };


  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
        >
          <Toolbar>
            <Fab
              size="small"
              color="primary"
              className={classNames(classes.menuButton)}
            >
              <Link to="/">
                <ArrowBack />
              </Link>
            </Fab>
            <Typography variant="h6" color="inherit" noWrap>
              Información del Usuario
            </Typography>
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
                to={`/user/detail/${text}`}
                selected={this.state.selectedIndex === index}
                onClick={event => this.handleListItemClick(event, index)}
              >
                <ListItemIcon>
                  {index === 0
                    ? <PersonPin />
                    : index === 1
                      ? <ContactPhone />  
                      : index === 2
                        ? <Sms />
                        : index === 3
                          ? <Phone />
                          : <Home />
                  }
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Inicio'].map((text, index) => (
              <ListItem button key={text} component={Link}
              to='/'>
                <ListItemIcon><Home /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>       
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
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

export default withStyles(styles, { withTheme: true })(UserDetails);
