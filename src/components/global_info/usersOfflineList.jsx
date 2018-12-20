import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'
import { List, Paper } from '@material-ui/core'

class UsersOffline extends Component {
  render() {
    const { name, date } = this.props
    return(
        <List>
          <Flex
          flex
          column
          mx={1}>
            <Paper
            style={{width: '240px'}}>
              <Box>
                {name}
              </Box>
              <Box>
                ultima vez: {date}
              </Box>
            </Paper>
          </Flex>
      </List>
    )
  }
}

export default UsersOffline