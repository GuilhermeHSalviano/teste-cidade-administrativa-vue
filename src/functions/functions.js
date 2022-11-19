export async function requestTheWholeListFromApi(){
    const request = await fetch('http://142.93.251.239/api/v1/posts/')
    const response = await request.json()
    return response
}