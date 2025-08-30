import type { Movie, MovieDetails} from "@/types/movie.ts";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { getMovieDetails } from "@/services/tmdbService.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Trash2 } from "lucide-react";
import { saveDummyEndpoint } from "@/services/api/watchlistService.ts";
import {MovieDetailsCard} from "@/pages/PreviewPage/components/MovieDetailsCard.tsx";
import {GenresFilter} from "@/pages/PreviewPage/components/GenresFilter.tsx";
import {MoviesSearch} from "@/pages/PreviewPage/components/MoviesSearch.tsx";

export function PreviewPage() {
	const location = useLocation();
	const basicMovies: Movie[] = location.state?.movieResults || [];

	const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
	const [movieDetails, setMovieDetails] = useState<MovieDetails[]>([]);
	const [isSaving, setIsSaving] = useState<boolean>(false);

	useEffect(() => {
		const fetchMovideDetails = async () => {
			const results = await Promise.all(basicMovies.map(movie => getMovieDetails(movie.id)));
			setMovieDetails(results.filter((movie): movie is MovieDetails => movie !== null));
		}

		if(basicMovies.length > 0) {
			fetchMovideDetails();
		}
	}, [basicMovies]);


	const removeMovie = (id: number) => {
		setMovieDetails((prev) => prev.filter((m) => m.id !== id));
	}

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
			<h1 className='text-2xl font-bold mb-4'>List of Found Movies</h1>

			<div className="grid md:grid-cols-2 gap-4 mb-4">
				<div className='flex flex-row gap-4'>
					<MoviesSearch movieDetails={movieDetails} setMovieDetails={setMovieDetails}/>
					<GenresFilter selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre}/>
				</div>
			</div>

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
								<MovieDetailsCard details={details}/>
							</CardContent>
						</Card>
					)
				})}
			</div>

			{filteredMovies.length > 0 && (
				<div className='flex justify-center mt-8'>
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