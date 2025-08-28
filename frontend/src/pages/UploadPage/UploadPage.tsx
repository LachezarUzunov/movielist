//import { Upload } from "@/pages/UploadPage/components/Upload.tsx";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import {Input} from "@/components/ui/input.tsx";
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
	const [textFile, setTextFile] = useState<string>();
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
			<h1 className="text-3xl font-bold mb-6">Movie List</h1>
			{movieTitles.length == 0 &&
                <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4">
                    <Input
	                    id="list"
                        key={textFile}
	                    type="file"
	                    className="cursor-pointer"
	                    onChange={handleFileUpload}
                    />
                    <h3>
                        Please note that only .txt files are accepted. Separate each
                        movie on a new line without commas or quotes. For example:
                    </h3>
                    <h4>Interstellar</h4>
                    <h4>The Shawshenk Redemption</h4>
                    <h4>Avatar</h4>
                </div>
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
				</form>
			)}

			{movieTitles.length > 0 && (
				<div className='mt-8 w-full'>
					<Button onClick={resetMovies} className='w-full cursor-pointer'>Back to Upload</Button>
				</div>
			)}
		</section>
	)
}