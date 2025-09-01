import { Input } from "@/components/ui/input.tsx";
import * as React from "react";

type UploadProps = {
	textFile: string | null;
	onHandleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Upload({ textFile, onHandleFileUpload}: UploadProps) {
	return (
		<div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4">
			<label
				htmlFor="list"
				className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
			>
		        <span className="text-gray-600">
		          {textFile ? (
			          <span className="font-medium text-blue-600">{textFile}</span>
		          ) : (
			          "Click here or drag & drop your .txt file"
		          )}
		        </span>
				<Input
					id="list"
					key={textFile}
					type="file"
					className="cursor-pointer"
					onChange={onHandleFileUpload}
				/>
			</label>
			<div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700">
				<p className="mb-2 font-medium">Example file content:</p>
				<p className="bg-white border border-gray-200 rounded p-2 text-gray-800 text-sm flex flex-col">
					<span>Interstellar</span>
					<span>The Shawshank Redemption</span>
					<span>Avatar</span>
                </p>
			</div>
		</div>
)
}