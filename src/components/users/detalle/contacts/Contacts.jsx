import React, { Component } from 'react'
import { Flex, Box } from 'reflexbox'
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Face from '@material-ui/icons/Face'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'

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
  
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

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
      style={{height: 'auto',boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
      background: '#DCDCDC',
      borderRadius: '5px'}}
      column
      m={1}>
        <Box
        flex
        column
        justify='center'
        align='center'
        m={1}
        >
          {Object.values(worker.details.contactos).map((contact, index) => (
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
      </Flex>
        
      </div>
    )
  }
}

const contactsWithStyles = withStyles(styles)(Contacts)

const mapStateToProps = ({ worker }) => ({ worker: worker.worker })

export default connect (mapStateToProps, null)(contactsWithStyles)
