const API_KEY = "";

// export interface MovieInfo {
//     year: number;
//     title: string;
//     imdbRating: number;
//     genre: string;
//     director: string;
// }

interface SimpleMovieInfo {
    title: string;
    year: number;
    imdbId: string;
}

interface RawSimpleMovieInfo {
    "Title": string;
    "Year": string;
    "imdbID": string;
}

export async function getMatchingMovies(searchTerm: string): Promise<SimpleMovieInfo[]> {
    try {
        // const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=star+wars`);
        // const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=14efd281`)
        // const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`)
        const response = await fetch(`http://www.omdbapi.com/?s=star+wars&apikey=${API_KEY}`)
        if (response.ok) {
            const rawMovies: Array<RawSimpleMovieInfo> = (await response.json()).Search;
            // console.log(typeof rawMovies)
            const movies: SimpleMovieInfo[] = rawMovies.map(raw => toSimpleMovieInfo(raw));
            console.log(movies);
            return movies;
        } else {
            console.error("Movie API response was not ok");
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

function toSimpleMovieInfo(raw: RawSimpleMovieInfo): SimpleMovieInfo {
    const title = raw.Title;
    const year = parseInt(raw.Year);
    const imdbId = raw.imdbID;
    return {
        title,
        year,
        imdbId,
    }
}

// {
//     "Actors": "Jack Nicholson, Shelley Duvall, Danny Lloyd, Scatman Crothers",
//     "Awards": "4 wins & 7 nominations.",
//     "BoxOffice": "N/A",
//     "Country": "UK, USA",
//     "DVD": "N/A",
//     "Director": "Stanley Kubrick",
//     "Genre": "Drama, Horror",
//     "Language": "English",
//     "Metascore": "66",
//     "Plot": "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     "Production": "N/A",
//     "Rated": "R",
//     "Ratings": Array [
//       {
//         "Source": "Internet Movie Database",
//         "Value": "8.4/10",
//       },
//       {
//         "Source": "Rotten Tomatoes",
//         "Value": "85%",
//       },
//       {
//         "Source": "Metacritic",
//         "Value": "66/100",
//       },
//     ],
//     "Released": "13 Jun 1980",
//     "Response": "True",
//     "Runtime": "146 min",
//     "Title": "The Shining",
//     "Type": "movie",
//     "Website": "N/A",
//     "Writer": "Stephen King (novel), Stanley Kubrick (screenplay), Diane Johnson (screenplay)",
//     "Year": "1980",
//     "imdbID": "tt0081505",
//     "imdbRating": "8.4",
//     "imdbVotes": "848,707",
//   }

function fakeSimpleMovieInfos() {
    return [
        {
          "imdbId": "tt0076759",
          "title": "Star Wars: Episode IV - A New Hope",
          "year": 1977,
        },
        {
          "imdbId": "tt0080684",
          "title": "Star Wars: Episode V - The Empire Strikes Back",
          "year": 1980,
        },
        {
          "imdbId": "tt0086190",
          "title": "Star Wars: Episode VI - Return of the Jedi",
          "year": 1983,
        },
        {
          "imdbId": "tt2488496",
          "title": "Star Wars: Episode VII - The Force Awakens",
          "year": 2015,
        },
        {
          "imdbId": "tt0120915",
          "title": "Star Wars: Episode I - The Phantom Menace",
          "year": 1999,
        },
        {
          "imdbId": "tt0121766",
          "title": "Star Wars: Episode III - Revenge of the Sith",
          "year": 2005,
        },
        {
          "imdbId": "tt0121765",
          "title": "Star Wars: Episode II - Attack of the Clones",
          "year": 2002,
        },
        {
          "imdbId": "tt2527336",
          "title": "Star Wars: Episode VIII - The Last Jedi",
          "year": 2017,
        },
        {
          "imdbId": "tt3748528",
          "title": "Rogue One: A Star Wars Story",
          "year": 2016,
        },
        {
          "imdbId": "tt2527338",
          "title": "Star Wars: Episode IX - The Rise of Skywalker",
          "year": 2019,
        },
    ]
}