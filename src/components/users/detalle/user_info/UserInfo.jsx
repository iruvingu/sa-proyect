import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'
import { Avatar, Typography, Paper } from '@material-ui/core';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment';
import moment from 'moment'
import { es } from 'date-fns/locale';
import UserMap from './UserMap'
import { connect } from 'react-redux'

import Periodo from './Periodo'

// const es = moment.locale('es')

const createDate = val => (
  (val)
    ? (moment(new Date()).format('YYYY-MM-DD hh:mm:ss'))
    : (moment(new Date()).add(-15, 'minutes').format('YYYY-MM-DD hh:mm:ss'))
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
    this.setState({ startDate: date });
  };

  handleDateChange2 = date => {
    this.setState({ finalDate: date })
  }

  render() {
    const { worker } = this.props
    const { startDate, finalDate } = this.state
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
          style={{width: '100%'}}>
            <Box
            flex
            w={1/4}
            style={{height: 'auto'}}>
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
                      <Avatar alt="Nombre Usuario" src={worker.photoUri} style={{width: 80,height: 80,}} />
                    </div>
                  </Box>
                  <Box
                  m={1}
                  column
                  style={{
                  minWidth: 'auto'
                  }}>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>{worker.name}</Typography>
                    </Box>
                    {/* <Box>
                      <Typography variant="subtitle2" gutterBottom>IMEI: {worker.device.IMEI}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>Bateria: {worker.device.batery}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>Signal: {worker.device.signal}</Typography>
                    </Box> */}
                  </Box>
                </Flex>
              </Box>      
            </Paper>
            </Box>
            
            <Box
            m={1}
            w={1/4}>
              <Paper style={{width: 'auto', background: '#EEF5FA'}}>
                <Flex
                m={1}
                flex
                column>
                  <Box>
                  <div>IMEI</div>
                  </Box>
                  <Box>
                  <div>{worker.device.IMEI}</div>
                  </Box>
                </Flex>
              </Paper>
            </Box>
            <Box
            m={1}
            w={1/4}>
              <Paper style={{width: 'auto', background: '#EEF5FA'}}>
              <Flex
                m={1}
                flex
                column>
                  <Box>
                  <div>Bateria</div>
                  </Box>
                  <Box>
                  <div>{worker.device.batery}</div>
                  </Box>
                </Flex>
              </Paper>
            </Box>
            <Box
            m={1}
            w={1/4}>
              <Paper style={{width: 'auto', background: '#EEF5FA'}}>
              <Flex
                m={1}
                flex
                column>
                  <Box>
                  <div>Señal</div>
                  </Box>
                  <Box>
                  <div>{worker.device.signal}</div>
                  </Box>
                </Flex>
              </Paper>
            </Box>
          </Box>
          <Box
            my={1}
            flex
            w={1/2}
            justify='flex-start'
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
                  <MuiPickersUtilsProvider utils={MomentUtils} locale={es}>
                    <DatePicker
                      margin="normal"
                      autoOk={true}
                      value={startDate}
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
                  <MuiPickersUtilsProvider utils={MomentUtils} locale='es'>
                    <TimePicker
                      margin="normal"
                      autoOk={true}
                      value={startDate}
                      onChange={this.handleDateChange} />
                  </MuiPickersUtilsProvider>
                </Box>
                <Box>
                  <MuiPickersUtilsProvider utils={MomentUtils} locale='es'>
                    <TimePicker
                      margin="normal"
                      autoOk={true}
                      value={finalDate}
                      onChange={this.handleDateChange2} />
                  </MuiPickersUtilsProvider>
                </Box>
              </Flex>
            </Paper>
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
