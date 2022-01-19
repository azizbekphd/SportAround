import api from "../global/api";


export default function UpdateUserLocation({ token, longitude, latitude }) {
    let url = new URL(api + "profile/location")

    const info = { latitude: latitude.toString(), longtitude: longitude.toString() }
    const data =  JSON.stringify(info)

    return fetch('http://sport.onyxgp.ru/v1/profile/location', {
        method: "PUT",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: data
    }).then(response => response.json()).then(data => console.log(data))
}
