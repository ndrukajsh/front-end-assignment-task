export default async function PostData(apiUrl, data){

    const test =
        [
  {
    "name": "nameFirst",
    "value": "Jane"
  },
  {
    "name": "nameLast",
    "value": "Doe"
  },
  {
    "name": "contactPhone",
    "value": "9999999999"
  },
  {
    "name": "contactEmail",
    "value": "jd@email.com"
  },
  {
    "name": "contactPreferred",
    "value": "phone"
  }
];




    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        // body: JSON.stringify(data),
        body: JSON.stringify(test),
    })

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        // return json.errors
        throw new Error('Failed to fetch API')
    }
    return json

}