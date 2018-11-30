import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'
import Typography from '@material-ui/core/Typography'

class DeviceInfo extends Component {
  render = () => {
    return (
      <div
      style={{
        maxHeight: 500,
        overflow: 'auto',
        padding: 10
      }}
      >
      <Flex
      style={{height: 'auto',boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
      background: '#DCDCDC',
      borderRadius: '5px'
      }}
      column
      m={1}>
        <Box m={1}>
          <Typography>IMEI: </Typography>
        </Box>
        <Box m={1}>
          <Typography>Bateria del dispositivo: </Typography>
        </Box>
      </Flex>
      </div>
    )
  }
}

export default DeviceInfo
