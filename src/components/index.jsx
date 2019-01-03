import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core'
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
  },
  toolbar: theme.mixins.toolbar,
});

class ClippedDrawer extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Flex
            style={{width: '100%'}}
            flex
            justify='space-between'>
              <Box>
                <Typography variant="h6" color="inherit" noWrap>
                  SA Project
                </Typography>
              </Box>
              <Box>
                <StyledButton onClick={this.props.signOut}>
                  Logout
                </StyledButton>
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
          {/* <SomeUsers /> */}
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

export default connect(null, actions)(HomeComponent)
