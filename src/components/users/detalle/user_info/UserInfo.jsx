import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import UserMap from './UserMap'
import { connect } from 'react-redux'

import Periodo from './Periodo'

const createDate = val => (
  (val)
    ? (moment(new Date()).format('YYYY-MM-DD'))
    : (moment(new Date()).add(-1, 'days').format('YYYY-MM-DD'))
)
const today = createDate(1)
const yesterday = createDate()

class UserInfo extends Component {

  state = {
    startDate: yesterday,
    finalDate: today
  }

  myCallbackStart = (dataFromChild) => {
    this.setState({startDate: dataFromChild})
  }

  myCallbackEnd = (dataFromChild) => {
    this.setState({finalDate: dataFromChild})
  }

  render() {
    const { worker } = this.props
    console.log(this.state.startDate)
    console.log(this.state.finalDate)
    return (
      <div style={{
        maxHeight: 400,
      }}>
        <Flex
        column
        >
          <Box
          flex
          justify='center'
          align='center'
          style={{height: 'auto',
          background: '#DCDCDC',
          borderRadius: '5px'}}>
            <Flex
            justify='space-around'
            style={{
            minWidth: '100%'
            }}
            >
              <Box style={{
              minWidth: 'auto'
              }}>
                <div>
                  <Avatar alt="Nombre Usuario" src={worker.photoUri} style={{width: 120,height: 120,}} />
                </div>
              </Box>
              <Box
              m={1}
              column
              style={{
              minWidth: 'auto'
              }}>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>Nombre: {worker.name}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>IMEI: {worker.device.IMEI}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>Bateria: {worker.device.batery}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>Marca: {worker.device.product}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>Signal: {worker.device.signal}</Typography>
                </Box>
              </Box>
            </Flex>

          </Box>
            
          <Box
          my={1}
          flex
          justify='center'
          align='center'
          style={{height: 'auto',
          background: '#DCDCDC',
          borderRadius: '5px'}}>
            <Flex
            flex
            justify='flex-end'
            style={{
              minWidth: '100%'
              }}>
              <Box>
                <div>Periodo desde: </div>
              </Box>
              <Box>
                <Periodo defaultValue={yesterday} callBackFromParent={this.myCallbackStart} />
              </Box>
              <Box>
                <div>hasta: </div>
              </Box>
              <Box>
                <Periodo defaultValue={today} callBackFromParent={this.myCallbackEnd} />
              </Box>
            </Flex>
          </Box>
          <Box>
            <UserMap worker={worker} startDate={this.state.startDate} finalDate={this.state.finalDate} />
          </Box>
        </Flex>
      </div>
    )
  }
}

const mapStateToProps = ({ worker }) => ({ worker: worker.worker })

export default connect(mapStateToProps, null)(UserInfo)
