import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'

import { CONVERT_TIMESTAMP } from '../../../../services'
import { Typography } from '@material-ui/core';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
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

  render = () => {
  const { classes, worker } = this.props;

  return (
    <Paper className={classes.root}>
    <Typography variant={'h6'}>Llamadas recientes</Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Nombre</CustomTableCell>
            <CustomTableCell >Numero</CustomTableCell>
            <CustomTableCell >Tipo de llamada</CustomTableCell>
            <CustomTableCell >Fecha</CustomTableCell>
            <CustomTableCell >Duración (segs)</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(worker.details.llamadas).map((call, index) => {
            return (
              <TableRow className={classes.row} key={index}>
                <CustomTableCell component="th" scope="row">{call.nombre}</CustomTableCell>
                <CustomTableCell >{call.numero}</CustomTableCell>
                <CustomTableCell >{call.tipo}</CustomTableCell>
                <CustomTableCell >{CONVERT_TIMESTAMP(call.fecha)}</CustomTableCell>
                <CustomTableCell >{call.duracion} s</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
  }
  
}

Calls.propTypes = {
  classes: PropTypes.object.isRequired,
};

const CallsWithStyles = withStyles(styles)(Calls)

const mapStateToProps = ({ worker }) => ({worker: worker.worker})

export default connect(mapStateToProps, null)(CallsWithStyles)
