import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'
import { Paper } from '@material-ui/core'

class Global extends Component {
  render(){
    return(
      <Flex
      flex
      column
      style={{width: '100%'}}
      m={1}
      >
        <Paper>
          <Box>Información Global</Box>
          <Box
          flex
          justify='space-between'>
            <Box>Usuarios desconectados (Top 10)</Box>
          </Box>
        </Paper>
        
      </Flex>
  )
  }
}

export default Global
