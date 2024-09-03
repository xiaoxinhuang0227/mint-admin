/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

export function formatToDateTime(date?: number, format = DATE_TIME_FORMAT): string {
  return dayjs(date * 1000).format(format)
}

export function formatToDate(date?: number, format = DATE_FORMAT): string {
  return dayjs(date * 1000).format(format)
}

export const dateUtil = dayjs
