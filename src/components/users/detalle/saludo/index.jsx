import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'
import { Paper, Typography } from '@material-ui/core'
import { Avatar } from '@material-ui/core'
import { connect } from 'react-redux'

class Saludo extends Component {
  render() {
    const { worker } = this.props
    return(
      <Flex
      w={1}
      align='baseline'
      justify='center'
      mb={3}
      style={{height: '78vh'}}>
        <Box
        w={[1, 10 / 12, 8 / 12]}
        >
          <Paper elevation={2} >
            <Box
            p={2}
            flex
            justify='center'>
              <Avatar style={{width: 120, height: 120}} src={worker.photoUri} />                
            </Box>
            <Box
            m={1}>
              <Typography>
                {worker.info}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Flex>
    )
  }
}

const mapStateToProps = ({ worker }) => {
  return ({
    worker: worker.worker
  })
}

export default connect(mapStateToProps, null)(Saludo)