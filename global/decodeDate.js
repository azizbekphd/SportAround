export default function decodeDate(str){
    return `${str.substring(6)}-${str.substring(3,5)}-${str.substring(0,2)}`;
}
