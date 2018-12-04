import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'

class Global extends Component {
  render(){
    return(
      <Flex
      flex
      column
      style={{width: '100%'}}
      >
        <Box>Información Global</Box>
        <Box
        flex
        justify='space-between'>
          <Box>Usuarios desconectados (Top 10)</Box>
        </Box>
      </Flex>
  )
  }
}

export default Global
