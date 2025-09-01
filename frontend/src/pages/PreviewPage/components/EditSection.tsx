import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import type {MovieDetails} from "@/types/movie.ts";

type Props = {
	details: MovieDetails;
	onHandleSave: (updated: MovieDetails) => void;
	onCancel: () => void;
}

export function EditSection({ details, onHandleSave, onCancel }: Props) {
	const [formData, setFormData] = useState(details);

	const handleChange = (field: keyof MovieDetails, value: any) => {
		setFormData({ ...formData, [field]: value })
	}
	return (
		<section className='flex flex-col gap-2'>
			<div>
				<label className="font-semibold">Original Title:</label>
				<Input
					value={formData.title}
					onChange={(e) => handleChange("title", e.target.value)}
				/>
			</div>

			<div>
				<label className="font-semibold">Release Date:</label>
				<Input
					type="date"
					value={formData.releaseDate}
					onChange={(e) => handleChange("releaseDate", e.target.value)}
				/>
			</div>

			<div>
				<label className="font-semibold">Plot:</label>
				<Textarea
					rows={4}
					value={formData.overview}
					onChange={(e) => handleChange("overview", e.target.value)}
				/>
			</div>

			<div>
				<label className="font-semibold">Director:</label>
				<Input
					value={formData.director}
					onChange={(e) => handleChange("director", e.target.value)}
				/>
			</div>

			<div>
				<label className="font-semibold">Actors:</label>
				<Input
					value={formData.actors.join(", ")}
					onChange={(e) =>
						handleChange("actors", e.target.value.split(",").map((a) => a.trim()))
					}
				/>
			</div>

			<div>
				<label className="font-semibold">Genres:</label>
				<Input
					value={formData.genres.join(", ")}
					onChange={(e) =>
						handleChange("genres", e.target.value.split(",").map((g) => g.trim()))
					}
				/>
			</div>

			<div className="grid grid-cols-2 gap-2">
				<div>
					<label className="font-semibold">Duration (min):</label>
					<Input
						type="number"
						value={formData.duration}
						onChange={(e) => handleChange("duration", Number(e.target.value))}
					/>
				</div>
				<div>
					<label className="font-semibold">Rating:</label>
					<Input
						value={formData.rating}
						onChange={(e) => handleChange("rating", e.target.value)}
					/>
				</div>
			</div>

			<div>
				<label className="font-semibold">Trailer (YouTube ID):</label>
				<Input
					value={formData.trailer || ""}
					onChange={(e) => handleChange("trailer", e.target.value)}
				/>
			</div>

			<div className="flex gap-2 mt-3">
				<Button className='cursor-pointer' onClick={() => onHandleSave(formData)}>Save</Button>
				<Button className='cursor-pointer' variant="outline" onClick={onCancel}>Cancel</Button>
			</div>
		</section>
	)
}