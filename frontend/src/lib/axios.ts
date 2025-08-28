import axios, {type AxiosInstance} from "axios";

export const tmdbApi: AxiosInstance = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	headers: {
		accept: 'application/json',
		//Authorization: `Bearer ${import.meta.env.TMDB_TOKEN}`
		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTNlNTUyM2JmYTkzYTQwZWUyMWU3MzI4YjJlOTdhNyIsIm5iZiI6MTc1NjIzNzkxMi4yODYsInN1YiI6IjY4YWUxMDU4MTE4N2VjMzM4YTNkODY0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EeIAi_LFA7AS8CHvwhA9TKjCdLNqGjLPme9Sx3crFqw'
	},
});

export const api: AxiosInstance = axios.create({
	baseURL: '/',
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

// Enhance Axios to handle AbortController
api.interceptors.request.use((config) => {
	// Ensure the `signal` property exists and is passed from outside when needed
	if (!config.signal) {
		const controller = new AbortController();
		config.signal = controller.signal; // Attach the signal to the request config
	}
	return config;
});
