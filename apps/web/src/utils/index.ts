export const showFormattedDate = (date: Date) => {
  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }
  return new Date(date).toLocaleString("id-ID", options)
}

export const showFormattedDateShort = (date: Date) => {
  const options: any = {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }
  return new Date(date).toLocaleString("id-ID", options)
}

export const showFormattedDateTime = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  }
  return new Date(date).toLocaleString("id-ID", options)
}

export const formatPrice = (data: number) => {
  const options = {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }
  return new Intl.NumberFormat("id-ID", options).format(data)
}
