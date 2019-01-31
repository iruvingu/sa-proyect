import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'
import { Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Face from '@material-ui/icons/Face'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setRouterLocation } from '../../../../actions'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    overflow: 'auto'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class Contacts extends Component {
  state = {
    expanded: null,
  };

  static contextTypes = {
    router: PropTypes.object
  }
  
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  componentDidMount() {
    this.props.setRouterLocation(this.context.router.history.location.pathname)
  }

  render = () => {
    const { expanded } = this.state
    const { classes, worker } = this.props
    return (
      <div style={{
        maxHeight: 500,
        overflow: 'auto',
        padding: 10
      }}>
      <Flex
      style={{height: 'auto'}}
      column
      m={1}>
        <Paper>
        <Box
        m={1}>
          <Typography variant={'h6'}>Contactos</Typography>
        </Box>
        <Box
        flex
        column
        justify='center'
        align='center'
        m={1}
        >
          {
            (worker.details.contacts === undefined)
            ? <div>No hay contactos guardados</div>
            :
            Object.values(worker.details.contacts).map((contact, index) => (
            <div style={{width: '100%'}} key={index}>
            <ExpansionPanel
            expanded={expanded === (`panel${index}`)}
            onChange={this.handleChange(`panel${index}`)}
            >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                  <div style={{flexBasis: '5%'}}>
                    <Face />
                  </div>
                  <div style={{flexBasis: '20.33%'}}>
                    <Typography className={classes.heading}>{contact.nombre}</Typography>
                  </div>
                </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{alignItems: 'center'}}>
                    <div style={{flexBasis: '5%'}}>
                      <Typography className={classes.heading}>Número: </Typography>
                    </div>
                    <div style={{
                      flexBasis: '50%',}}
                    >
                      <Typography className={classes.heading}>{contact.numero}</Typography>
                    </div>
                  </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
            )
          )
          }
        </Box>
        </Paper>
        
      </Flex>
        
      </div>
    )
  }
}

const contactsWithStyles = withStyles(styles)(Contacts)

const mapStateToProps = ({ worker }) => ({ worker: worker.worker })

export default connect (mapStateToProps, { setRouterLocation })(contactsWithStyles)
