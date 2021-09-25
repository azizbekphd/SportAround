const getNull = (number) => {
    return ((number < 10 ? "0" : "") + number.toString())
}

export default function formatDate(dateStr) {
    let date = new Date(dateStr)
    return `${getNull(date.getDate())}.${getNull(date.getMonth()+1)}.${getNull(date.getFullYear())}`
}