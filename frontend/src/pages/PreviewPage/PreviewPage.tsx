import type {Genre, Movie, MovieDetails} from "@/types/movie.ts";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import {getAllGenres, getMovieDetails, getMovies} from "@/services/tmdbService.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Trash2 } from "lucide-react";
import { saveDummyEndpoint } from "@/services/api/watchlistService.ts";
import { useDebounce } from "@/hooks/useDebounce.ts";

export function PreviewPage() {
	const location = useLocation();
	const basicMovies: Movie[] = location.state?.movieResults || [];
	const [genres, setGenres] = useState<Genre[]>([]);
	const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
	const [language, setLanguage] = useState<string>('');

	const [movieDetails, setMovieDetails] = useState<MovieDetails[]>([]);
	const [search, setSearch] = useState<string>('');
	const [movieSuggestions, setMovieSuggestions] = useState<Movie[]>([]);
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const debouncedSearch = useDebounce(search, 400);
	console.log('selected genre: ', selectedGenre);
	console.log(genres);
	useEffect(() => {
		const fetchMovideDetails = async () => {
			const results = await Promise.all(basicMovies.map(movie => getMovieDetails(movie.id)));
			setMovieDetails(results.filter((movie): movie is MovieDetails => movie !== null));
		}

		const fetchGenres = async () => {
			const result = await getAllGenres();
			if (result) setGenres(result);
		};

		if(basicMovies.length > 0) {
			fetchMovideDetails();
			fetchGenres();
		}
	}, [basicMovies]);


	const removeMovie = (id: number) => {
		setMovieDetails((prev) => prev.filter((m) => m.id !== id));
	}

	const handleSearch = async () => {
		if (!search.trim()) return;
		const res = await getMovies([search]);
		const foundMovie = res[0];
		const foundMovieDetails = await getMovieDetails(foundMovie.id);
		if (foundMovieDetails && !movieDetails.some(m => m.id === foundMovieDetails.id)) {
			setMovieDetails((prev) => [...prev, foundMovieDetails]);
		}
	}

	const handleSelectSuggestion = async (id: number) => {
		const foundMovieDetails = await getMovieDetails(id);
		if (foundMovieDetails && !movieDetails.some(m => m.id === foundMovieDetails.id)) {
			setMovieDetails((prev) => [...prev, foundMovieDetails]);
		}

		setSearch('');
		setMovieSuggestions([]);
	}

	useEffect(() => {
		const fetchSuggestions = async () => {
			if (debouncedSearch.trim().length < 3) {
				setMovieSuggestions([]);
				return;
			}

			const results = await getMovies([debouncedSearch], true);
			setMovieSuggestions(results.slice(0, 5));
		};

		fetchSuggestions();
	}, [debouncedSearch]);

	const saveWatchlist = async () => {
		setIsSaving(true);
		try {
			await saveDummyEndpoint(movieDetails);
			alert("Watchlist saved successfully!");
		} catch (err) {
			alert("Error saving watchlist");
		} finally {
			setIsSaving(false);
		}
	}

	const filteredMovies = selectedGenre ?
		movieDetails.filter((movie) => movie.genres.some((genre) => genre === selectedGenre))
		: movieDetails;

	return (
		<section className='min-h-screen bg-slate-100 p-8 space-y-4'>
			<div className="flex flex-col md-flex-row justify-between gap-4">
				<div className='bg-white p-4 rounded-xl shadow-lg flex flex-col gap-2 w-full md:w-2/3'>
					<select
						className='border p-2 rounded'
						value={language}
						onChange={(e) => setLanguage(e.target.value)}
					>
						<option value='en'>English</option>
						<option value='bg'>Bulgarian</option>
						<option value='es'>Spanish</option>
					</select>
					<div className='flex gap-2 relative'>
						<input
							type="text"
							className='border p-2 rounded w-100'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search for a movie..."

						/>
						<Button
							className='cursor-pointer'
							onClick={handleSearch}>
							Search
						</Button>

						{movieSuggestions.length > 0 && (
							<ul className="absolute bg-white border rounded w-100 mt-2 z-10 shadow-xl">
								{movieSuggestions.map((s) => (
									<li key={s.id}
									    className='p-2 cursor-pointer hover:bg-slate-200'
									    onClick={() => handleSelectSuggestion(s.id)}
									>
										{s.title}
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
				<div className='bg-white p-4 rounded-lg  shadow-lg md:w-1/3'>
					<label className='block mb-2 text-xl'>Filter movies by genre</label>
					<select
						value={selectedGenre ?? ""}
						onChange={(e) => setSelectedGenre(e.target.value || null)}
						className="border p-2 rounded"
					>
						<option value="">All Genres</option>
						{genres.map((g) => (
							<option key={g.id} value={g.name}>{g.name}</option>
						))}
					</select>
				</div>
			</div>
			<h1 className='text-2xl font-bold mb-8'>List of Found Movies</h1>

			<div className='grid gap-6 md:grid-cols-2'>
				{filteredMovies.map((details) => {
					return (
						<Card key={details.id} className='relative'>
							<Button
								variant='ghost'
								size='icon'
								className='absolute top-2 right-2'
								onClick={() => removeMovie(details.id)}
							>
								<Trash2 className='h-6 w-6 text-red-600'/>
							</Button>
							<CardContent className='flex gap-4 p-4'>
								<img
									src={`https://image.tmdb.org/t/p/w200${details.posterPath}`}
									alt={details.title}
									className='rounded-lg'
								/>
								<div>
									<h2>{details.title}</h2>
									<p>{details.releaseDate}</p>
									<p>{details.overview}</p>

									<div>
										<p><span>Director: </span>{details.director}</p>
										<p><span>Actors: </span>{details.actors.join(', ')}</p>
										<p><span>Genres: </span>{details.genres.join(', ')}</p>
										<p><span>Duration: </span>{details.duration}</p>
										<p><span>Rating: </span>{details.rating}</p>
										{details.trailer && (
											<a
												href={`https://www.youtube.com/watch?v=${details.trailer}`}
												target="_blank"
												rel="noreferrer"
												className="text-blue-600 underline"
											>
												Watch Trailer
											</a>
										)}
									</div>
								</div>
							</CardContent>
						</Card>
					)
				})}
			</div>

			{movieDetails.length > 0 && (
				<div
					className='flex justify-center mt-8'
				>
					<Button
						disabled={isSaving}
						className='cursor-pointer'
						onClick={saveWatchlist}
					>{isSaving ? 'Saving...' : 'Save Watchlist'}</Button>
				</div>
			)}
		</section>
	)
}