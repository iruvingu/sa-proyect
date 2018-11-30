import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    overflow: 'auto',
  },
  table: {
    minWidth: 600,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, status, callDuration, date) {
  id += 1;
  return { id, name, status, callDuration, date};
}

const rows = [
  createData('Persona 1', 'Recibida', '6:00 mins', '18/10/2018'),
  createData('Persona 2', 'Recibida', '2:00 mins', '18/10/2018'),
  createData('Persona 3', 'Perdida', '0:00 mins', '18/10/2018'),
  createData('Persona 4', 'Marcada', '3:00 mins', '18/10/2018'),
  createData('Persona 5', 'Recibida', '4:00 mins', '18/10/2018'),
];

class Calls extends React.Component {

  render = () => {
  const { classes } = this.props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Nombre</CustomTableCell>
            <CustomTableCell >Estado</CustomTableCell>
            <CustomTableCell >Duración</CustomTableCell>
            <CustomTableCell >Fecha</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow className={classes.row} key={row.id}>
                <CustomTableCell component="th" scope="row">{row.name}</CustomTableCell>
                <CustomTableCell >{row.status}</CustomTableCell>
                <CustomTableCell >{row.callDuration}</CustomTableCell>
                <CustomTableCell >{row.date}</CustomTableCell>
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

export default withStyles(styles)(Calls);
