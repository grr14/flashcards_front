import moment from "moment"

const formatDate = (date: Date | undefined, withHours: boolean = false) => {
  if (typeof date === undefined) {
    return ""
  }

  return withHours
    ? moment(date).format("MM/DD/YYYY HH:mm")
    : moment(date).format("MM/DD/YYYY")
}

const pad = (input: number): string =>
  input > 9 ? input.toString() : `0${input}`

/* Format input in seconds to hh:mm:ss */
const formatTime = (timeInSeconds: number): string => {
  const h = Math.floor(timeInSeconds / 3600)
  const m = Math.floor((timeInSeconds % 3600) / 60)
  const s = Math.round(timeInSeconds % 60)
  return [h > 0 ? pad(h) : ``, m > 0 ? pad(m) : `00`, pad(s)]
    .filter(Boolean)
    .join(":")
}

/* Check if the input string is a substring of the fullString, ie if they start the same */
const isSameStart = (fullString: string, input: string): boolean =>
  fullString.substring(0, input.length) === input

export { formatDate, formatTime, isSameStart }
