import React, { Component } from 'react'
/**
 * @material-iu core
 */
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
/**
 * @material-iu icons
 */
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Search from '@material-ui/icons/Search'
/**
 * redux
 */
import { connect } from 'react-redux'
import { setWorker } from '../../actions'
import { Link } from 'react-router-dom'
import { Flex, Box } from 'reflexbox'


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
      overflow: 'auto'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  row: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  }
})

class UserList extends Component {
  state = {
    expanded: null,
    search: '',
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    })
  }

  onSearchChange(event) {
    this.setState({
      search: event.target.value.substr(0, 20)
    })
  }

  render(){
    const { users, classes } = this.props
    const { expanded } = this.state;
    const filteredUsers = Object.values(users).filter((user) => {
        // if you can't find this stateSearch with this particular userName 
        // then don't return however in the instance where you can find it
        // where it's not equal to -1 (means any value that it cn't find)
        // then go ahead and return that contact
        return user.name.toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1;
          // indexOf just look for the index of a particular character string
          // or character that we are looking for...
      })
    
    return (
      <div>
        <Flex
        column
        >
          <Box
          flex
          justify='center'>
            <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Search />
            </Grid>
            <Grid item>
              <TextField 
              id="input-with-icon-grid"
              label="Search"
              value={this.state.search}
              onChange={this.onSearchChange.bind(this)}
              />
            </Grid>
            </Grid>
          </Box>
          <Box>
            <div>
              {
                filteredUsers.map((user, index) => (
                  <div className={classes.root} key={index}>
                      <ExpansionPanel
                      expanded={expanded === (`panel${index}`)}
                      onChange={this.handleChange(`panel${index}`)}
                      >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.row}>
                          <Avatar src={user.photoUri} style={{width: 30, height: 30}} />
                          <Divider />
                          <Typography className={classes.heading}>{user.name}</Typography>
                          </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        <div className={classes.root}>
                        <List component="nav">
                            <ListItem button component={Link} to='/user/detail' onClick={() => { this.props.setWorker(user) }}>
                                <ListItemText primary='Detalles del Usuario' />
                            </ListItem>
                        </List>
                        </div>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                  </div>
                  )
                )
              }
            </div>
          </Box>
        </Flex>
      </div>
    )
  }
}

const UserListWithStyles =  withStyles(styles)(UserList)

export default connect(null, { setWorker })(UserListWithStyles)
