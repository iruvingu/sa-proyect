import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'
import { Avatar, Typography, Paper } from '@material-ui/core';
import { MuiPickersUtilsProvider,
  TimePicker,
  DatePicker } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment';
import moment from 'moment'
import UserMap from './UserMap'
import { connect } from 'react-redux'

import Periodo from './Periodo'

const createDate = val => (
  (val)
    ? (moment(new Date()).format('YYYY-MM-DDThh:mm:ss'))
    : (moment(new Date()).add(-1, 'days').format('YYYY-MM-DDThh:mm:ss'))
)
const today = createDate(1)
const yesterday = createDate()

class UserInfo extends Component {

  state = {
    startDate: yesterday,
    finalDate: today
  }

  myCallbackStart = async(dataFromChild) => {
    this.setState({startDate: dataFromChild})
  }

  myCallbackEnd = async(dataFromChild) => {
    this.setState({finalDate: dataFromChild})
  }

  handleDateChange = date => {
    this.setState({ finalDate: date });
  };

  render() {
    const { worker } = this.props
    const { finalDate } = this.state
    // console.log(this.state.startDate)
    // console.log(this.state.finalDate)
    return (
      <div style={{
        maxHeight: 400,
      }}>
        <Flex
        column
        >
          <Box
          flex
          w={1/2}
          style={{width: '100%'}}>
            <Box
            flex
            w={1/2}
            style={{height: '130px'}}>
            <Paper
            style={{width: 'auto', background: '#EEF5FA'}}>
              <Box
              flex
              justify='start'
              style={{height: 'auto',}}
              >
                <Flex
                justify='start'
                style={{
                width: 'auto'
                }}
                >
                  <Box
                  m={1}>
                    <div>
                      <Avatar alt="Nombre Usuario" src={worker.photoUri} style={{width: 110,height: 110,}} />
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
                      <Typography variant="subtitle2" gutterBottom>Signal: {worker.device.signal}</Typography>
                    </Box>
                  </Box>
                </Flex>

              </Box>      
            </Paper>
            </Box>
            <Box
          flex
          w={1/2}
          justify='flex-end'
          style={{height: 'auto'}}>
            <Paper style={{width: 'auto'}}>
              <Flex
              flex
              m={1}
              column
              justify='flex-end'
              style={{
                minWidth: '100%'
                }}
              >
                <Box>
                  <Typography variant='subtitle1' style={{color: '#949494'}}>
                    Mapear al usuario
                  </Typography>
                </Box>
                <Box
                  flex
                  align='center'>
                  <Typography variant='body1' style={{color:'#BFBB89'}}>
                    Eliga el día a visualizar:
                  </Typography>
                </Box>
                <Box>
                  <MuiPickersUtilsProvider utils={MomentUtils} locale=''>
                    <DatePicker
                      margin="normal"
                      autoOk={true}
                      value={finalDate}
                      format="DD/MM/YYYY"
                      onChange={this.handleDateChange} />
                  </MuiPickersUtilsProvider>
                </Box>
                <Box
                flex
                align='center'>
                <Typography variant='body1'  style={{color:'#BFBBC8'}}>
                Elegir el periodo:
                  </Typography>
                </Box>
                <Box>
                 
                </Box>
              </Flex>
            </Paper>
          </Box>
          </Box>
          <Box
          mb={2}
          my={2}>
            <Paper elevation={2}>
              <UserMap worker={worker} startDate={this.state.startDate} finalDate={this.state.finalDate} />
            </Paper>
          </Box>
        </Flex>
      </div>
    )
  }
}

const mapStateToProps = ({ worker }) => ({ worker: worker.worker })

export default connect(mapStateToProps, null)(UserInfo)
