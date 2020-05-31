const API_KEY = "";

export async function getMovieData(searchTerm: string) {
    // const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=star+wars`);
    // const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=14efd281`)
    // const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`)
    const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=the+shining`)
    console.log(response.status);
    if (response.ok) {
        console.log(await response.json());
    }
}