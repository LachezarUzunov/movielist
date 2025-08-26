import { Input } from "@/components/ui/input.tsx";

export function Upload() {
	return (
		<div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4">
			<Input id="list" type="file" className="cursor-pointer"/>
			<button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
				Upload & Show Movie List
			</button>
			<h4>
				Please note that only .txt files are accepted. Separate each
				movie on a new line without commas or quotes. For example:
			</h4>
			<h4>Interstellar</h4>
			<h4>The Shawshenk Redemption</h4>
			<h4>Avatar</h4>
		</div>
	)
}