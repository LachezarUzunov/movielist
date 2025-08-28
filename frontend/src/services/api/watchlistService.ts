import type { MovieDetails } from "@/types/movie.ts";

export async function saveDummyEndpoint(movieDetails: MovieDetails[]) {
	try {
		// const res = await fetch('https://dummyendpoint.com/watchlist', {
		// 	method: 'POST',
		// 	headers: {'Content-Type': 'application/json'},
		// 	body: JSON.stringify({movies: movieDetails})
		// });

		// if (!res.ok) throw new Error('')
		//return res.json();
		return true;

	} catch(err) {
		return 'Error saving watchlist';
	}
}