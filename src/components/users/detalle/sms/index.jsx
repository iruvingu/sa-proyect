import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'
import PropTypes from 'prop-types'

/**
 * @material-ui/core library
 */
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Search from '@material-ui/icons/Search'
import { connect } from 'react-redux'
import { CONVERT_TIMESTAMP } from '../../../../services'
import { setRouterLocation } from '../../../../actions'

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '43.33%',
    color: theme.palette.text.secondary,
  },
  ternaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
})

class Mensaje extends Component {
  state= {
    search1: '',
    search2: '',
    messagesSent: [{body: '', date: '', number: '', status: ''}],
    messagesReceived: [{body: '', date: '', number: '', status: ''}],
    nulo: ''
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    (!this.props.worker.details.sms)
      ? this.setState({nulo: 'nulo'})
      : this.setState({
      messagesSent: Object.values(this.props.worker.details.sms).filter(mensaje => { 
      return mensaje.estatus.toLowerCase() === 'enviado'}),
      messagesReceived: Object.values(this.props.worker.details.sms).filter(mensaje => { 
        return mensaje.estatus.toLowerCase() === 'recibido'})
      })
    this.props.setRouterLocation(this.context.router.history.location.pathname)
  }

  bodyMessageSubstring = body => (
    (body.length > 30)
      ? `${body.substr(0,30)}...`
      : body
  )

  onSearchChange1(event) {
    this.setState({
      search1: event.target.value.substr(0, 20)
    })
  }

  onSearchChange2(event) {
    this.setState({
      search2: event.target.value.substr(0, 20)
    })
  }

  filterMessagesSent = messages => (
    messages.filter(message => {
      const numberToString = (message.number + '')
      return (message.body.toLowerCase().indexOf(this.state.search1.toLowerCase()) !== -1)
        || (numberToString.includes(this.state.search1))
    })
  )

  filterMessagesReceived = messages => (
    messages.filter(message => {
      const numberToString = (message.number + '')
      return (message.body.toLowerCase().indexOf(this.state.search2.toLowerCase()) !== -1)
        || (numberToString.includes(this.state.search2))
    })
  )

  render() {
    const { classes } = this.props;

    return(
      <div>
        <Flex
        style={{width: '100%', height: '100vh', maxHeight: 500,}}
        flex
        align='center'
        column>
          <Box>
            <Typography variant={'h6'}>Mensajes SMS</Typography>
          </Box>
          <Box
          m={1}
          w={1/2}
          style={{width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden'}}
          column
          >
            <Box>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <Search />
                </Grid>
                <Grid item>
                  <TextField 
                  id="input-with-icon-grid"
                  label="Mensajes Enviados"
                  value={this.state.search1}
                  onChange={this.onSearchChange1.bind(this)}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
            {

              this.filterMessagesSent(this.state.messagesSent).map((message, index) => (
                <div key={index}>
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>{message.numero}</Typography>
                      <Typography className={classes.secondaryHeading}>{this.bodyMessageSubstring(message.body)}</Typography>
                      <Typography className={classes.ternaryHeading}>{CONVERT_TIMESTAMP(message.date)}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>
                        {message.body}
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              ))
            }
            </Box>
          </Box>
          <Box
          m={1}
          w={1/2}
          style={{width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden'}}
          column>
            <Box>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <Search />
                </Grid>
                <Grid item>
                  <TextField 
                  id="input-with-icon-grid"
                  label="Mensajes Recibidos"
                  value={this.state.search2}
                  onChange={this.onSearchChange2.bind(this)}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
            {
              this.filterMessagesReceived(this.state.messagesReceived).map((message, index) => (
                <div key={index}>
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>{message.number}</Typography>
                      <Typography className={classes.secondaryHeading}>{this.bodyMessageSubstring(message.body)}</Typography>
                      <Typography className={classes.ternaryHeading}>{CONVERT_TIMESTAMP(message.date)}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>
                        {message.body}
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              ))
            }
            </Box>
          </Box>
        </Flex>
      </div>
    )
  }
}

const mapStateToProps = ({ worker }) => ({ worker: worker.worker })

const mensajeWithStyles = withStyles(styles)(Mensaje)

export default connect(mapStateToProps, { setRouterLocation })(mensajeWithStyles)
