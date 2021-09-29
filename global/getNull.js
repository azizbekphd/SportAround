export default function getNull(number) {
    return ((number < 10 ? "0" : "") + number.toString())
}