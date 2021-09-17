import rawPhone from "./rawPhone";

export default function validate(type, value) {
    if (type == "phone") {
        return rawPhone(value).length == 12
    } else if (type == "email") {
        return /(.+)@(.+){2,}\.(.+){2,}/.test(value)
    } else if (type == "password") {
        return value.length >= 8
    } else if (type == "username") {
        return value.trim().length >= 3
    } else if (type == "birthday") {
        return value < new Date()
    } else if (type == "gender") {
        return value != 0
    }
    return null
}

export function validateAll(fields, user) {
    for (let i = 0; i < fields.length; i++) {
        if (validate(fields[i], user[fields[i]]) === false) {
            return false
        }
    }
    if (fields.includes["password_repeat"]) {
        if (user.password != user.password_repeat) {
            return false
        }
    }
    return true
}