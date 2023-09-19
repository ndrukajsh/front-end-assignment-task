export default async function PostData(apiUrl, data){

    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    })

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        // return json.errors
        throw new Error('Failed to fetch API')
    }
    return json

}