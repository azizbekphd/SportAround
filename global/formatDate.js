import getNull from "./getNull"

export default function formatDate(dateStr) {
    let date = (typeof dateStr) == "string" ? new Date(dateStr) : dateStr
    if(isNaN(date)){
        return dateStr
    }
    return `${getNull(date.getDate())}.${getNull(date.getMonth()+1)}.${getNull(date.getFullYear())}`
}