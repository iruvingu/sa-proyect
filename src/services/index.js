// import moment from 'moment'
import moment from 'moment-timezone'
// import dateFns from 'date-fns'

export const CONVERT_TIMESTAMP = timeStamp => {
  return moment.unix(timeStamp).tz('America/Mexico_City').format('YYYY-MM-DD HH:mm')
}

export const CONVERT_DATE_TO_TIMESTAMP = date => {
  // return moment(date).unix()
  return moment(date).unix()
}
