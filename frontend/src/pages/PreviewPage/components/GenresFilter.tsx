import type { Genre } from "@/types/movie.ts";
import { useEffect, useState } from "react";
import { getAllGenres } from "@/services/tmdbService.ts";

type GenresFilterProps = {
	selectedGenre: string | null;
	onSelectGenre: (genre: string | null) => void;
};

export function GenresFilter({selectedGenre, onSelectGenre }: GenresFilterProps) {
	const [genres, setGenres] = useState<Genre[]>([]);

	useEffect(() => {
		const fetchGenres = async () => {
			const result = await getAllGenres();
			if (result) setGenres(result);
		};
		fetchGenres();
	}, []);

	return (
		<div className='bg-white p-4 rounded-lg  shadow-lg w-full'>
			<label className='block mb-2 text-sm font-light'>Filter movies by genre</label>
			<select
				value={selectedGenre ?? ""}
				onChange={(e) => onSelectGenre(e.target.value || null)}
				className="border p-1 text-sm w-full rounded"
			>
				<option value="">All Genres</option>
				{genres.map((g) => (
					<option key={g.id} value={g.name}>{g.name}</option>
				))}
			</select>
		</div>
	)
}