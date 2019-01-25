import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'

import { CONVERT_TIMESTAMP } from '../../../../services'
import { setRouterLocation } from '../../../../actions'
import { Typography } from '@material-ui/core';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#D30B0B',
    color: theme.palette.common.white,
    fontSize: 16,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowY: 'auto',
    maxWidth: 900,
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class Calls extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    this.props.setRouterLocation(this.context.router.history.location.pathname)
  }

  render = () => {
  const { classes, worker } = this.props;

  return (
    <Flex
    w={1}
    align='baseline'
    justify='center'>
      <Box>
        <Paper className={classes.root}>
        <Flex
        column>
          <Box
          m={1}>
            <Typography variant={'h6'}>Llamadas recientes</Typography>
          </Box>
          <Box
          m={1}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Nombre</CustomTableCell>
                <CustomTableCell >Número</CustomTableCell>
                <CustomTableCell >Tipo de llamada</CustomTableCell>
                <CustomTableCell >Fecha</CustomTableCell>
                <CustomTableCell >Duración (segs)</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                (worker.details.calls === undefined)
                  ? <Box my={1}>No hay llamadas aún</Box>
                  : Object.values(worker.details.calls)
                    .filter(call => 
                    ((call) === null)
                      ? false
                      : true
                    )
                    .map((call, index) => {
                      return (
                        <TableRow className={classes.row} key={index}>
                          <CustomTableCell component="th" scope="row">{call.name}</CustomTableCell>
                          <CustomTableCell >{call.number}</CustomTableCell>
                          <CustomTableCell >{call.state}</CustomTableCell>
                          <CustomTableCell >{CONVERT_TIMESTAMP(call.date)}</CustomTableCell>
                          <CustomTableCell >{call.duration} s</CustomTableCell>
                        </TableRow>        
                      );
                    })
              }
            </TableBody>
          </Table>
          </Box>
        </Flex>
        </Paper>
      </Box>
    </Flex>
  );
  }
  
}

Calls.propTypes = {
  classes: PropTypes.object.isRequired,
};

const CallsWithStyles = withStyles(styles)(Calls)

const mapStateToProps = ({ worker }) => ({worker: worker.worker})

export default connect(mapStateToProps, { setRouterLocation })(CallsWithStyles)
