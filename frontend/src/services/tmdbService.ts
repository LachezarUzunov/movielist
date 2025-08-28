import type { Movie, MovieDetails } from "@/types/movie.ts";

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTNlNTUyM2JmYTkzYTQwZWUyMWU3MzI4YjJlOTdhNyIsIm5iZiI6MTc1NjIzNzkxMi4yODYsInN1YiI6IjY4YWUxMDU4MTE4N2VjMzM4YTNkODY0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EeIAi_LFA7AS8CHvwhA9TKjCdLNqGjLPme9Sx3crFqw'
	}
};

const mainPath = 'https://api.themoviedb.org/3/';

export async function getMovies(titles: string[]) {
	return Promise.all(
		titles.map(async (title) => {
			const res = await fetch(
				`${mainPath}search/movie?query=${title}&include_adult=false&language=en-US&page=1`, options);

			if(!res.ok) return null;

			if (res.status === 200) {
				const data = await res.json();
				const firstMovie = data.results?.[0];
				if (!firstMovie) return null;

				return {
					id: firstMovie.id,
					title: firstMovie.title,
					overview: firstMovie.overview,
					posterPath: firstMovie.posterPath,
					releaseDate: firstMovie.release_date
				} as Movie
			}
		})
	).then((results) => results.filter((m): m is Movie => m !== null));
}

export async function getMovieDetails(id: number): Promise<MovieDetails | null> {
	try {
		const [detailsResponse, creditsResponse, videosResponse] = await Promise.all([
			fetch(`${mainPath}/movie/${id}?language=en-US`, options),
			fetch(`${mainPath}/movie/${id}/credits?language=en-US`, options),
			fetch(`${mainPath}/movie/${id}/videos?language=en-US`, options),
		])

		if (!detailsResponse.ok) return null;

		const details = await detailsResponse.json();
		const credits = await creditsResponse.json();
		const videos = await videosResponse.json();

		const director = credits.crew?.find((c: any) => c.job === 'Director')?.name || "Unknown";
		const actors = credits.cast?.slice(0, 10).map((actor: any) => actor.name) || [];
		const trailer = videos.results?.find((video: any) => video.type == 'Trailer')?.key || "";

		return {
			id: details.id,
			title: details.title,
			overview: details.overview,
			posterPath: details.poster_path,
			releaseDate: details.release_date,
			genres: details.genres.map((genre: any) => genre.name),
			actors,
			director,
			duration: details.runtime,
			rating: details.vote_average,
			trailer
		}

	} catch (err) {
		console.log('Error getting movide details:', err);
		return null;
	}
}

export async function getSingleMovie(title: string) {

}