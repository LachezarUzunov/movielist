import type { MovieDetails } from "@/types/movie.ts";

type Props = {
	details: MovieDetails;
};

export function MovieDetailsCard ({details}: Props) {
	return (
		<div className='flex flex-col sm:flex-row gap-4 w-full'>
			<div className='flex flex-shrink-0 mx-auto sm:mx-0'>
				<img
					src={`https://image.tmdb.org/t/p/w200${details.posterPath}`}
					alt={details.title}
					className='rounded-lg object-cover'
				/>
			</div>

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
				</div>
			</div>
		</div>
	)
}