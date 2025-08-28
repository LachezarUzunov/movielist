import type {Genre, Movie, MovieDetails} from "@/types/movie.ts";
import { tmdbApi } from "@/lib/axios.ts";

export async function getMovies(titles: string[], getAll: boolean = false): Promise<Movie[]> {
	try {
		const results = await Promise.all(
			titles.map(async (title: string) => {
				const { data } = await tmdbApi.get('search/movie', {
					params: {
						query: title,
						include_adult: false,
						language: "en-US",
						page: 1
					}
				});

				if (!data.results?.length) return null;

				if (getAll) {
					return data.results.map((movie: any) => ({
						id: movie.id,
						title: movie.title,
						overview: movie.overview,
						posterPath: movie.poster_path,
						releaseDate: movie.release_date
					})) as Movie[];
				}

				const firstMovie = data.results[0];
				return {
					id: firstMovie.id,
					title: firstMovie.title,
					overview: firstMovie.overview,
					posterPath: firstMovie.poster_path,
					releaseDate: firstMovie.release_date,
				} as Movie;
			})
		)

		return results.flat().filter((movie): movie is Movie => movie !== null);
	} catch(err) {
		return []
	}
}

export async function getMovieDetails(id: number): Promise<MovieDetails | null> {
	try {
		const [detailsResponse, creditsResponse, videosResponse] = await Promise.all([
			tmdbApi.get(`movie/${id}`, { params: { language: 'en-US'}}),
			tmdbApi.get(`movie/${id}/credits`, { params: { language: 'en-US'}}),
			tmdbApi.get(`movie/${id}/videos`, { params: { language: 'en-US'}})
		])

		const details = await detailsResponse.data;
		const credits = await creditsResponse.data;
		const videos = await videosResponse.data;

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

export async function getAllGenres(): Promise<Genre[]>{
	try {
		const res = await tmdbApi.get(`genre/movie/list`);
		return await res.data.genres;
	} catch (err) {
		console.log('Error getting movie genres: ', err);
		return null;
	}
}