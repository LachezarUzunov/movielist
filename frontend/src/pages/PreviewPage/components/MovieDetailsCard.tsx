import type { MovieDetails } from "@/types/movie.ts";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { EditSection } from "@/pages/PreviewPage/components/EditSection.tsx";

type Props = {
	details: MovieDetails;
	onUpdate: (id: number, updated: MovieDetails) => void;
};

export function MovieDetailsCard ({ details, onUpdate }: Props) {
	const [editMode, setEditMode] = useState<boolean>(false);

	const handleSave = (updated: MovieDetails) => {
		onUpdate(details.id, updated)
		setEditMode(false)
	}

	return (
		<div className='flex flex-col sm:flex-row gap-4 w-full'>
			<div className='flex flex-shrink-0 mx-auto sm:mx-0'>
				<img
					src={`https://image.tmdb.org/t/p/w200${details.posterPath}`}
					alt={details.title}
					className='rounded-lg object-cover'
				/>
			</div>

			{editMode ? (
				<EditSection
					details={details}
					onHandleSave={handleSave}
					onCancel={() => setEditMode(false)}
				/>
				) : (
				<div className='flex flex-col gap-2 text-sm sm:text-base overflow-hidden'>
					<h2 className='text-lg'><span className='font-bold'>Original Title: </span>{details.title}</h2>
					<p><span className='font-semibold'>Release date: </span> {details.releaseDate}</p>
					<p><span className='font-semibold'>Plot: </span> {details.overview}</p>

					<div className='space-y-1'>
						<p><span className='font-semibold'>Director: </span>{details.director}</p>
						<p><span className='font-semibold'>Actors: </span>{details.actors.join(', ')}</p>
						<p><span className='font-semibold'>Genres: </span>{details.genres.join(', ')}</p>
						<p><span className='font-semibold'>Duration: </span>{details.duration} minutes</p>
						<p><span className='font-semibold'>Rating: </span>{details.rating}</p>
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
						<div className="mt-3">
							<Button className='cursor-pointer' onClick={() => setEditMode(true)}>Edit</Button>
						</div>
					</div>
				</div>)}
		</div>
	)
}