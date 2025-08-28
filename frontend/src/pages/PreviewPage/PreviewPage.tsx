import type { Movie, MovieDetails } from "@/types/movie.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { getMovieDetails, getMovies } from "@/services/tmdbService.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Trash2} from "lucide-react";

export function PreviewPage() {
	const location = useLocation();
	const [search, setSearch] = useState<string>('');
	const [movieSuggestions, setMovieSuggestions] = useState<[]>([]);
	// const navigate = useNavigate();
	const basicMovies: Movie[] = location.state?.movieResults || [];
	const [movieDetails, setMovieDetails] = useState<MovieDetails[]>([]);
	const [loadingIds, setLoadingIds] = useState<number[]>([]);

	useEffect(() => {
		const fetchMovideDetails = async () => {
			setLoadingIds(basicMovies.map(m => m.id));
			const results = await Promise.all(basicMovies.map(movie => getMovieDetails(movie.id)));
			setMovieDetails(results.filter((movie): movie is MovieDetails => movie !== null));
			setLoadingIds([]);
		}

		fetchMovideDetails();
	}, [basicMovies]);


	const removeMovie = (id: number) => {
		((prev: any) => prev.filter((m) => m.id !== id));
	}

	const handleSearch = async () => {
		if (!search.trim()) return;

		const res = await getMovies([search]);
		const foundMovie = res[0];
		console.log(foundMovie);
		// if (foundMovie) {
		// 	setMovieDetails((prev) => [...prev, foundMovie]);
		// }
	}

	const handleSelectSuggestion = (id: number) => {

	}
	return (
		<section className='min-h-screen bg-slate-100 p-8 space-y-4'>
			<div className="">
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search for a movie..."
				/>
				<Button
					className='cursor-pointer'
					onClick={handleSearch}>Search for additional movies here...</Button>
				{movieSuggestions.length > 0 && (
					<ul className="suggestions">
						{movieSuggestions.map((s) => (
							<li key={s.id} onClick={() => handleSelectSuggestion(s.id)}>
								{s.title}
							</li>
						))}
					</ul>
				)}
			</div>
			<h1 className='text-2xl font-bold mb-8'>List of Found Movies</h1>
			<div className='grid gap-6 md:grid-cols-2'>
				{basicMovies && basicMovies.map((movie) => {
					const details = movieDetails.find(m => m.id === movie.id);
					const isLoading = loadingIds.includes(movie.id);
					return (
						<Card key={movie.id} className='relative'>
							<Button
								variant='ghost'
								size='icon'
								className='absolute top-2 right-2'
								onClick={() => removeMovie(movie.id)}
							>
								<Trash2 className='h-6 w-6 text-red-600'/>
							</Button>
							<CardContent className='flex gap-4 p-4'>
								<img
									src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
									alt={movie.title}
									className='rounded-lg'
								/>
								<div>
									<h2>{movie.title}</h2>
									<p>{movie.releaseDate}</p>
									<p>{movie.overview}</p>

									{isLoading && <p>Loading details...</p>}

									{details && (
										<div>
											<p><span>Director:</span>{details.director}</p>
											<p><span>Actors:</span>{details.actors.join(', ')}</p>
											<p><span>Genres:</span>{details.genres.join(', ')}</p>
											<p><span>Duration:</span>{details.duration}</p>
											<p><span>Rating:</span>{details.rating}</p>
											{details.trailer && (
												<div>
													<iframe
														className='w-full'
														width='420'
														height='315'
														src={`https://www.youtube.com/embed/${details.trailer}`}
													></iframe>
												</div>
											)}
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					)
				})
				}
			</div>

		</section>
	)
}