import React from 'react'
import { withStyles, Grow, FormHelperText, InputAdornment } from '@material-ui/core'
import Styles from './timepicker'
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment';

const TimePickerControlled = ({
  type,
  classes,
  icon,
  ...props
}) => {
  const customProps = {
    fullWidth: true,
    todayLabel: 'Hoy',
    classes: {
      input: classes.textField
    },
    InputProps: {
      disableUnderline: true,
      classes: {
        root: classes.input
      },
      startAdornment: icon ? (
        <InputAdornment position='start'>
          {icon}
        </InputAdornment>
      ) : null
    }
  }
  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale='es'>
      {type === 'date'
        ? <DatePicker
          {...props}
          {...customProps}
          autoOk
          value={props.value || null}
        />
        : type === 'time'
          ? <TimePicker
            {...props}
            {...customProps}
            value={props.value || null}
          />
          : null
      }
    </MuiPickersUtilsProvider>
  )
}

export default withStyles(Styles)(TimePickerControlled)

