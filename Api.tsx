const API_KEY = "";

// export interface MovieInfo {
//     year: number;
//     title: string;
//     imdbRating: number;
//     genre: string;
//     director: string;
// }

export interface SimpleMovieInfo {
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
    searchTerm = sanitizeSearchTerm(searchTerm);
    const searchUrlParam = toSearchUrlParam(searchTerm);

    try {
        // return fakeSimpleMovieInfos()
        const response = await fetch(`http://www.omdbapi.com/?s=${searchUrlParam}&apikey=${API_KEY}`)
        if (response.ok) {
            const rawMovies: Array<RawSimpleMovieInfo> = (await response.json()).Search;
            const movies: SimpleMovieInfo[] = rawMovies.map(raw => toSimpleMovieInfo(raw));
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

export interface MovieDetails {
    title: string,
    year: string,
    genre: string,
    runtime: string,
    imdbRating: string,
}

interface RawMovieDetails {
    "Title": string,
    "Year": string,
    "Genre": string,
    "Runtime": string,
    imdbRating: string,
}

function toMovieDetails(raw: RawMovieDetails): MovieDetails {
    return {
        title: raw.Title,
        year: raw.Year,
        genre: raw.Genre,
        runtime: raw.Runtime,
        imdbRating: raw.imdbRating,
    }
}

export async function getMovieInfo(imdbId: string): Promise<MovieDetails | null> {
    try {
        const res = await fetch(`http://www.omdbapi.com/?i=${imdbId}&apikey=${API_KEY}`);
        console.log(`http://www.omdbapi.com/?i=${imdbId}&apikey=${API_KEY}`)
        // console.log(res);
        if (res.ok) {
            const rawDetails: RawMovieDetails = (await res.json());
            const details: MovieDetails = toMovieDetails(rawDetails);
            return details;
        } else {
            console.error("Get movie info response was not ok");
            return null
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

function sanitizeSearchTerm(searchTerm: string): string {
    searchTerm = searchTerm.replace("&", "");
    searchTerm = searchTerm.replace("+", "");
    // etc
    return searchTerm;
}

function toSearchUrlParam(searchTerm: string): string {
    return searchTerm.replace(" ", "+");
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

function fakeSimpleMovieInfos(): SimpleMovieInfo[] {
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