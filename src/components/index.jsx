import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, CssBaseline, Toolbar, Typography,
  Avatar, MenuList, MenuItem, ClickAwayListener, Grow,
  Paper, Popper, Button } from '@material-ui/core'
import { Flex, Box } from 'reflexbox'
import styled from 'styled-components'
import { connect } from 'react-redux';
import * as actions from '../actions'

/**
 * Components
 */
import FirebaseUsers from './users'
import MapTrack from './maps'
import GlobalInfo from './global_info'

const StyledButton = styled.button`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 100%;
  variant: contained;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
`;

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
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 0,
  },
  drawerPaper: {
    width: drawerWidth,
    overflowX: 'hidden'
  },
  toolbar: theme.mixins.toolbar,
});

class ClippedDrawer extends Component {
  state = {
    open: false
  }

  static contextTypes = {
    router: PropTypes.object
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes, auth } = this.props;
    const { open } = this.state;
    console.log(`PathName: ${this.context.router.history.location.pathname}`)
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Flex
            style={{width: '100%'}}
            flex
            justify='space-between'
            >
              <Box
                flex
                justify='start'>
                <Typography variant="h6" color="inherit" noWrap>
                  SA Project
                </Typography>
              </Box>
              <Box
              flex
              justify='end'>
                <Box>
                  <Avatar style={{width: '30', height: '30',}} src={auth.photoURL} />
                </Box>
                
                <Button
                  buttonRef={node => {
                    this.anchorEl = node;
                  }}
                  aria-owns={open ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleToggle}
                >
                  <Typography style={{ color: 'white' }} variant='caption'>
                      {auth.displayName}
                  </Typography>
                </Button>
                <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
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
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <FirebaseUsers />
        </Drawer>
        <main className={classes.content} style={{backgroundColor: '#f9f6f2'}}>
          <div className={classes.toolbar} />
          <div >
            <Flex
            style={{height: '50%',
            borderRadius: '5px'}}
            column
            justify='space-between'
            >
              <Box
              flex
              justify='center'
              align='center'
              >
                <MapTrack />
              </Box>
              <Box
              flex
              style={{
              height: '50%',
              width: '100%'
              }}
              >
                <GlobalInfo />
              </Box>
            </Flex>
          </div>
        </main>
      </div>
    );
  }
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const HomeComponent = withStyles(styles)(ClippedDrawer);

const mapStateToProps = ({ auth }) => {
  return ({ auth })
}

export default connect(mapStateToProps, actions)(HomeComponent)
