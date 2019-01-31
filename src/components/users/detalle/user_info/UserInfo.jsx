import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'
import { Avatar, Typography, Paper, Icon, FormHelperText} from '@material-ui/core';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment';
import moment from 'moment-timezone'
import { es } from 'date-fns/locale';
import UserMap from './UserMap'
import { connect } from 'react-redux'
import ProptTypes from 'prop-types'

import Periodo from './Periodo'
import TimePickerControl from './TimePickerControl'
import { setRouterLocation } from '../../../../actions'
// const es = moment.locale('es')

const createDate = val => (
  (val)
    ? (moment(new Date()).format('YYYY/MM/DD hh:mm:ss'))
    : (moment(new Date()).add(-15, 'minutes').format('YYYY/MM/DD hh:mm:ss'))
)
const today = createDate(1)
const yesterday = createDate()

class UserInfo extends Component {

  state = {
    startDate: yesterday,
    finalDate: today
  }

  static contextTypes = {
    router: ProptTypes.object
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

  componentDidMount() {
    this.props.setRouterLocation(this.context.router.history.location.pathname)
  }

  render() {
    const { worker } = this.props
    const { startDate, finalDate } = this.state
    // console.log(finalDate)
    return (
      <div style={{
        maxHeight: 400,
      }}>
        <Flex
        flex
        column
        >
          <Box
          flex
          style={{width: '100%'}}>
            <Paper style={{width: '100%', background: '#EEF5FA'}}>
              <Flex
              column>
                <Box
                mx={1}>
                  <Typography variant='subtitle1' style={{color: '#949494'}}>
                    Información del usuario
                  </Typography>
                </Box>
                <Flex>
                  <Box
                  flex
                  ml={1}
                  mb={1}
                  w={1/4}
                  style={{height: 'auto'}}>
                    <Paper
                    style={{width: '100%', background: '#EEF5FA'}}>
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
                        </Box>
                      </Flex>     
                    </Paper>
                  </Box>
                  <Box
                  w={1/4}
                  ml={1}
                  flex
                  align='flex-start'
                  justify='center'>
                    <Paper style={{width: '100%', background: '#EEF5FA'}}>
                      <Flex
                      m={1}
                      flex
                      column>
                        <Box>
                          <Typography variant='body1'  style={{color:'#BFBBC8'}}>
                          IMEI
                          </Typography>
                        </Box>
                        <Box>
                        <div>{worker.device.imei}</div>
                        </Box>
                      </Flex>
                    </Paper>
                  </Box>
                  <Box
                  w={1/4}
                  mx={1}
                  flex
                  align='flex-start'
                  justify='center'>
                    <Paper style={{width: '100%', background: '#EEF5FA'}}>
                      <Flex
                      m={1}
                      flex
                      column>
                        <Box>
                          <Typography variant='body1'  style={{color:'#BFBBC8'}}>
                            Bateria
                          </Typography>
                        </Box>
                        <Box>
                          <div>{worker.device.battery}</div>
                        </Box>
                      </Flex>
                    </Paper>
                  </Box>
                  <Box
                  w={1/4}
                  flex
                  mr={1}
                  align='flex-start'
                  justify='center'>
                    <Paper style={{width: '100%', background: '#EEF5FA'}}>
                      <Flex
                      m={1}
                      flex
                      column>
                        <Box>
                          <Typography variant='body1'  style={{color:'#BFBBC8'}}>
                            Señal
                          </Typography>
                        </Box>
                        <Box>
                          <div>{worker.device.signal}</div>
                        </Box>
                      </Flex>
                    </Paper>
                  </Box>
                </Flex>
              </Flex>
            </Paper>
          </Box>
          
          <Box
          my={1}
          flex>
            <Paper style={{width: '100%'}}>
              <Flex
              flex
              column
              >
                <Box
                mx={1}>
                  <Typography variant='subtitle1' style={{color: '#949494'}}>
                    Mapear al usuario
                  </Typography>
                </Box>
                <Flex>
                  <Box
                  w={1/4}
                  m={1}>
                    <Paper>
                      <Flex
                      column>
                        <Box
                          flex
                          align='center'
                          mx={1}
                          mt={1}
                          >
                          <Typography variant='body1' style={{color:'#BFBB89'}}>
                            Eliga el día a visualizar:
                          </Typography>
                        </Box>
                        <Box
                        mx={1}
                        mb={1}>
                          <MuiPickersUtilsProvider utils={MomentUtils} locale={es}>
                            <DatePicker
                              autoOk={true}
                              value={startDate}
                              format="DD/MM/YYYY"
                              onChange={this.handleDateChange} />
                          </MuiPickersUtilsProvider>
                        </Box>
                      </Flex>
                    </Paper>
                  </Box>
                  <Box
                  w={3/4}
                  my={1}
                  mr={1}>
                    <Paper>
                      <Flex
                      column>
                        <Box
                        flex
                        align='center'
                        mx={1}
                        mt={1}>
                          <Typography variant='body1'  style={{color:'#BFBB89'}}>
                            Elegir el periodo:
                          </Typography>
                        </Box>
                        <Flex>
                          <Box
                          mx={1}
                          mb={1}>
                            <MuiPickersUtilsProvider utils={MomentUtils} locale='es'>
                              <TimePicker
                                autoOk={true}
                                value={startDate}
                                onChange={this.handleDateChange} />
                            </MuiPickersUtilsProvider>
                          </Box>
                          <Box
                          mx={1}
                          mb={1}>
                            <MuiPickersUtilsProvider utils={MomentUtils} locale='es'>
                              <TimePicker
                              autoOk={true}
                              value={finalDate}
                              onChange={this.handleDateChange2} />
                            </MuiPickersUtilsProvider>
                          </Box>
                        </Flex>
                        
                      </Flex>
                    </Paper>
                  </Box>
                </Flex>
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

export default connect(mapStateToProps, { setRouterLocation })(UserInfo)
