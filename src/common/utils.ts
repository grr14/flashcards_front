import moment from "moment"

const formatDate = (date: Date | undefined, withHours: boolean = false) => {
  if (typeof date === undefined) {
    return ""
  }

  return withHours
    ? moment(date).format("MM/DD/YYYY HH:mm")
    : moment(date).format("MM/DD/YYYY")
}

export { formatDate }
