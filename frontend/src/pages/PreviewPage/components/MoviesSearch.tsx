import React from 'react';
import { LANGUAGES } from "@/constants/languages.ts";
import {useEffect, useState} from "react";
import {getMovieDetails, getMovies} from "@/services/tmdbService.ts";
import {useDebounce} from "@/hooks/useDebounce.ts";
import type {Movie, MovieDetails} from "@/types/movie.ts";

type SearchProps = {
	movieDetails: MovieDetails[];
	setMovieDetails: React.Dispatch<React.SetStateAction<MovieDetails[]>>;
};

export function MoviesSearch({ movieDetails, setMovieDetails }: SearchProps) {
	const [movieSuggestions, setMovieSuggestions] = useState<Movie[]>([]);
	const [language, setLanguage] = useState<string>('');
	const [search, setSearch] = useState<string>('');
	const debouncedSearch = useDebounce(search, 400);

	const handleSelectSuggestion = async (id: number) => {
		const foundMovieDetails = await getMovieDetails(id, language);
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

			const results = await getMovies([debouncedSearch], true, language);
			setMovieSuggestions(results.slice(0, 5));
		};

		fetchSuggestions();
	}, [debouncedSearch, language]);

	return (
		<div className='bg-white p-4 rounded-lg shadow flex flex-col gap-2 w-full'>
			<select
				className='border p-1 text-sm rounded'
				value={language}
				onChange={(e) => setLanguage(e.target.value)}
			>
				{LANGUAGES.map((lang) => (
					<option key={lang.code} value={lang.code}>
						{lang.name}
					</option>
				))}
			</select>
			<div className='flex gap-2 relative'>
				<input
					type="text"
					className='border p-1 flex-grow text-sm rounded w-100'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search for a movie..."

				/>

				{movieSuggestions.length > 0 && (
					<ul className="absolute left-0 top-full bg-white border rounded w-full mt-1 z-10 shadow-sm">
						{movieSuggestions.map((s) => (
							<li key={s.id}
							    className='p-1 text-sm cursor-pointer hover:bg-slate-200'
							    onClick={() => handleSelectSuggestion(s.id)}
							>
								{s.title}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}