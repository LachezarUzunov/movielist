import { Upload } from "@/pages/UploadPage/components/Upload.tsx";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {SingleTitle} from "@/pages/UploadPage/components/SingleTitle.tsx";
import {Button} from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from 'react-hook-form';
import { getMovies } from "@/services/tmdbService.ts";

type FormValues = {
	movies: string[]
}

export function UploadPage() {
	const navigate = useNavigate();
	const [textFile, setTextFile] = useState<string|null>(null);
	const [movieTitles, setMovieTitles] = useState<string[]>([]);

	const form = useForm<FormValues>({
		defaultValues: { movies: [] }
	})

	const { handleSubmit, control, reset } = form

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (! file) return;

		const reader = new FileReader();
		reader.onload = () => {
			setTextFile(reader.result as string);
		};
		reader.readAsText(file);
	}

	useEffect(() => {
		if (! textFile) return;

		const titles = textFile.split(/\r\n|\n/).filter(Boolean);
		setMovieTitles(titles);
		reset({ movies: titles });
	}, [textFile, reset]);

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		const movieResults = await getMovies(data.movies);
		navigate('/preview', { state: { movieResults }});
	}

	const resetMovies = () => {
		setMovieTitles([]);
		setTextFile('');
		reset({ movies: [] });
	}

	return (
		<section className="min-h-screen bg-slate-100 flex flex-col items-center p-8">
			<div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6">
				<h2 className="text-xl font-bold text-center text-gray-800">Upload Your Movie List</h2>
				<p className="text-gray-600 text-sm text-center">
					Select a <span className="text-black">.txt</span> file containing your movies.
					Each movie should be on a separate line.
					This helps us recognize them and get details about the movies.
				</p>
				{movieTitles.length == 0 &&
	                <Upload
	                    textFile={textFile}
	                    onHandleFileUpload={handleFileUpload}
	                />
				}

				{movieTitles.length > 0 && (
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='w-full max-w-xl mt-6 space-y-4'
					>
						<div className='flex flex-col gap-12px'>
							{movieTitles.map((title, index) => (
								<SingleTitle
									title={title}
									key={index}
									control={control}
								/>
							))}
						</div>

						<Button type='submit' className='w-full cursor-pointer'>Get movies</Button>
						<Button onClick={resetMovies} className='w-full cursor-pointer'>Back to Upload</Button>
					</form>
				)}
			</div>
		</section>
	)
}