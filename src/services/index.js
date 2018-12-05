import moment from 'moment'

export const CONVERT_TIMESTAMP = timeStamp => {
  return moment.unix(timeStamp).format('YYYY-MM-DD HH:mm')
}