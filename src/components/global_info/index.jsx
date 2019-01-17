import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'
import { Paper, InputLabel, Select, MenuItem, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import moment from 'moment'

import UsersOffline from './usersOfflineList'

class Global extends Component {
  state = {
    hours : 1
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  substractDate = (hour) => {
    return (moment(new Date()).subtract(hour, 'hours').format("YYYY-MM-DD hh:mm"))
  }

  filterOfflineUsers = (realtime_users, hour) => {
    return Object.values(realtime_users).filter(user => {
      return (user.fecha < this.substractDate(hour))
    })
  }

  render(){
    const usersOffline = this.filterOfflineUsers(this.props.realtimeUser, this.state.hours)
    // console.log(usersOffline)

    return(
      <Flex
      style={{width: '100%', backgroundColor: '#f9f6f2'}}
      m={1}
      >
        <Paper
        style={{width: '100%', backgroundColor: '#fdf3e0'}}>
          <Flex>
            <Box
            flex
            align='center'
            mx={1}>
              <Typography variant='subtitle1'>
                Usuarios desconectados por más de
              </Typography>
              
            </Box>
            <Box>
              <Select
                value={this.state.hours}
                onChange={this.handleChange}
                inputProps={{
                  name: 'hours',
                  id: 'hour-simple',
                }}
              >
                <MenuItem value={1}>
                  <Typography variant='subtitle1'>
                    1 hr
                  </Typography>
                </MenuItem>
                <MenuItem value={6}>
                  <Typography variant='subtitle1'>
                    6 hrs
                  </Typography>
                </MenuItem>
                <MenuItem value={12}>
                  <Typography variant='subtitle1'>
                    12 hrs
                  </Typography>
                </MenuItem>
              </Select>
            </Box> 
          </Flex>

          <Box
          w={2}
          flex
          wrap
          style={{width: '100%'}}
          >
            
              {usersOffline.map(user => {
                return (
                  <UsersOffline name={user.name} date={user.fecha} />
                )
              })}
          </Box>
        </Paper>
        
      </Flex>
  )
  }
}

const mapStateToProps = ({ realtimeUser }) => { return ({ realtimeUser }) }

export default connect(mapStateToProps, null)(Global)
