import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
	title: string;
	control: Control<{movies: string[]}>
}

export function SingleTitle({ title, control }: Props) {
	return (
		<Controller
			control={ control }
			name='movies'
			render={({ field }) => {
				const isChecked = field.value?.includes(title);

				return (
					<label>
						<Checkbox
							className='space-x-4'
							checked={isChecked}
							onCheckedChange={(checked) => {
								if (checked) {
									field.onChange([...(field.value || []), title])
								} else {
									field.onChange(field.value?.filter((t) => t !== title))
								}
							}}
						/>
						<span className='ml-4'>{title}</span>
					</label>
				)
			}}
		/>
	)
}
