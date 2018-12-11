import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'
import { Paper, Typography } from '@material-ui/core'

class Saludo extends Component {
  render() {
    return(
      <Flex
      w={1}
      align='baseline'
      justify='center'
      mb={3}>
        <Box
        w={[1, 10 / 12, 8 / 12]}
        >
          <Paper elevation={2} >
            <Box
            p={2}>
              <Typography variant="h5" style={{borderBottom: `1px dotted rgba(0, 0, 0, 0.4)`}}>
                Bienvenid@
              </Typography>
              <Box
                my={2}
              >
                
              </Box>
            </Box>
            
          </Paper>
        </Box>
      </Flex>
    )
  }
}

export default Saludo