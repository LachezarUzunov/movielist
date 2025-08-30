import type { MovieDetails } from "@/types/movie.ts";

type Props = {
	details: MovieDetails;
};

export function MovieDetailsCard ({details}: Props) {
	return (
		<>
			<img
				src={`https://image.tmdb.org/t/p/w200${details.posterPath}`}
				alt={details.title}
				className='rounded-lg'
			/>
			<div>
				<h2><span className='font-semibold'>Original Title: </span>{details.title}</h2>
				<p><span className='font-semibold'>Release date: </span> {details.releaseDate}</p>
				<p><span className='font-semibold'>Plot: </span> {details.overview}</p>

				<div>
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
		</>
	)
}