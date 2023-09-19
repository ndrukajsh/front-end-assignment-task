export default async function FormData(apiUrl){

    const res = await fetch(apiUrl)

    return await res.json();

}