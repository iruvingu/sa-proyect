import moment from 'moment'

export const CONVERT_TIMESTAMP = timeStamp => {
  return moment.unix(timeStamp).utc().format('YYYY-MM-DD HH:mm')
}

export const CONVERT_DATE_TO_TIMESTAMP = date => {
  return moment(date).unix()
}
