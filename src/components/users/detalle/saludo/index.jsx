import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'
import PropTypes from 'prop-types';
import { Paper, Typography } from '@material-ui/core'
import { Avatar } from '@material-ui/core'
import { connect } from 'react-redux'
import { setRouterLocation } from '../../../../actions'

class Saludo extends Component {

  static contextTypes = {
    router: PropTypes.object
  };
  
  componentDidMount() {
    this.props.setRouterLocation(this.context.router.history.location.pathname)
  }

  render() {
    const { worker } = this.props
    const path = this.context.router.history.location.pathname
    console.log(`PathName: ${path}`)
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

export default connect(mapStateToProps, { setRouterLocation })(Saludo)