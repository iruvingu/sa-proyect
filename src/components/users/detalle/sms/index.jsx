import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
})

class Mensaje extends Component {
  render() {
    const { mensajes, classes } = this.props;
    const messagesSent = Object.values(mensajes).filter(mensaje => { 
      return mensaje.status === 'enviado'})
    const messagesReceived = Object.values(mensajes).filter(mensaje => { 
      return mensaje.status === 'recibido'})

    return(
      <div>
        <Flex
        style={{width: '100%', height: '100vh'}}
        flex
        justify='center'
        align='center'>
          <Box
          m={1}
          column>
            <Box>Mensajes Enviados</Box>
            <Box>
            {
              messagesSent.map((message, index) => (
                <div key={index}>
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>{message.numero}</Typography>
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
          column>
            <Box>Mensajes Recibidos</Box>
            <Box>
            {
              messagesReceived.map((message, index) => (
                <div key={index}>
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>{message.numero}</Typography>
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

export default withStyles(styles)(Mensaje)
