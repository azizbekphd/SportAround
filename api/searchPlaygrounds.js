export default function searchPlaygrounds({
    typeId, pay, address, token,
}){
    let url = new URL(api + "playground")
    url.searchParams.append("typeId", typeId)
    url.searchParams.append("address", address.trim())
    url.searchParams.append("pay", pay)
    return fetch(url.href.replace("playground/?", "playground?"), {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}