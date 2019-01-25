import React, { Component } from 'react'
/**
 * @material-iu core
 */
import { List, ListItem, ListItemText, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Avatar, Typography, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
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
    slectedIndex: 0,
    background : 'white',
    id: ''
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

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

  componentDidMount() {
    this.setState({id: this.props.hoverId})
    console.log(this.state.id)
  }

  render(){
    const { users, classes, hoverId, hoverMarkerId } = this.props
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
    Object.values(users).map(user => (user.id === hoverMarkerId ? console.log('idIguales') : console.log('no iguales')))
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
                      onMouseEnter={() => {
                        console.log(`usuario con id ${user.id}`)
                      }}
                      onMouseLeave={() => {
                        hoverId === user.id 
                        ? console.log(`Id iguales`)
                        : console.log('no son iguales')
                      }}
                      >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.row}>
                          {(!user.photoUri)
                            ? <Avatar src={'/images/faces/man.png'} style={{width: 30, height: 30}} />
                            : <Avatar src={user.photoUri} style={{width: 30, height: 30}} />
                          }
                          {/* <Avatar src={user.photoUri} style={{width: 30, height: 30}} /> */}
                          <Typography className={classes.heading}
                           color={(hoverId === user.id) ? 'primary' : 'default'}>{user.name}</Typography>
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

const mapStateToProps = ({ hoverID }) => {
  return ({ hoverID })
}

export default connect(mapStateToProps, { setWorker })(UserListWithStyles)
