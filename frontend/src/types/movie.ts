export interface Movie {
	id: number;
	title: string;
	overview: string;
	posterPath: string;
	releaseDate: string;
}

export interface MovieDetails extends Movie {
	genres: string[];
	actors: string[];
	director: string;
	duration: number;
	rating: number;
	trailer: string;
}