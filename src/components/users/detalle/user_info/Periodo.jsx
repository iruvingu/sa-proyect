import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class DatePickers extends Component {

  sendDateToParent(event) {
    this.props.callBackFromParent(event.target.value)
  }

  render() {
    const { classes, defaultValue } = this.props;
    return (
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          type="date"
          defaultValue={defaultValue}
          onChange={this.sendDateToParent.bind(this)}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    );
  }
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePickers);