export default function getNull(number) {
    if(number !== null){return ((number < 10 ? "0" : "") + number.toString())}
}