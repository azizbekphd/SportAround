import getNull from "./getNull";

export default function decodeDate(str){
    if(str !== null){
        if((typeof str) == "string"){
            return `${str.substring(6)}-${str.substring(3,5)}-${str.substring(0,2)}`;
        }
        else if((typeof str) == "object"){
            return `${str.getFullYear()}-${getNull(str.getMonth() + 1)}-${getNull(str.getDate())}`
        }
    }else return str
}
