export default function rawPhone(phone) {
    return phone.replace(/ /g, "").replace(/\(/g, "").replace(/\)/g, "")
}