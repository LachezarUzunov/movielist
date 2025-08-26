import { Button } from "@/components/ui/button.tsx";

export function MovieList() {
	return (
		<div className="w-full max-w-xl mt-6 bg-white p-6 rounded-xl shadow-lg flex flex-col gap-2">
			<h2 className="font-semibold text-xl mb-2">Movie Titles</h2>
			<ul className="flex flex-col gap-2">
				<li className="flex items-center gap-2">

					<span>Movie 1</span>
				</li>
				<li className="flex items-center gap-2">
					<input type="checkbox" checked className="w-4 h-4"/>
					<span>Movie 2</span>
				</li>
			</ul>
			<Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4 transition">
				Search Selected Movies
			</Button>
		</div>
	)
}