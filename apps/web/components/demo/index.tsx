import { zodResolver } from '@hookform/resolvers/zod';
import { Sliders } from '@phosphor-icons/react';
import { Grid, useGrid } from '@virtual-grid/react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { buttonVariants } from '../ui/button';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Window } from './window';

const formSchema = z.object({
	count: z.number().int(),
	width: z.number(),
	height: z.number(),
	columns: z.number().int(),
	padding: z.number(),
	gap: z.number()
});

export const Demo = () => {
	const ref = useRef<HTMLDivElement>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			count: 100,
			width: 140,
			height: 140,
			columns: 0,
			padding: 12,
			gap: 8
		}
	});

	const { count, width, height, columns, padding, gap } = form.watch();

	const grid = useGrid({
		scrollRef: ref,
		count,
		size: { width, height },
		gap,
		padding,
		columns
	});

	return (
		<Window>
			<Popover>
				<PopoverTrigger
					className={buttonVariants({
						size: 'icon',
						variant: 'outline',
						className:
							'!group-hover:opacity-100 absolute right-7 top-7 z-20 h-8 w-8 !shadow-lg backdrop-blur transition-opacity'
					})}
				>
					<Sliders size={16} />
				</PopoverTrigger>
				<PopoverContent align="end" className="w-80">
					<Form {...form}>
						<form className="space-y-3">
							<div className="grid grid-cols-3 items-center gap-4">
								<Label htmlFor="count">Count</Label>
								<FormField
									control={form.control}
									name="count"
									render={({ field }) => (
										<FormItem className="col-span-2 h-8">
											<FormControl>
												<Input
													id="count"
													type="number"
													{...field}
													onChange={(e) => field.onChange(Number(e.target.value))}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<div className="grid grid-cols-3 items-center gap-4">
								<Label htmlFor="width">Width</Label>
								<FormField
									control={form.control}
									name="width"
									render={({ field }) => (
										<FormItem className="col-span-2 flex space-y-0">
											<FormControl>
												<Input
													id="width"
													type="number"
													className="rounded-r-none"
													{...field}
													onChange={(e) => field.onChange(Number(e.target.value))}
												/>
											</FormControl>
											<PX />
										</FormItem>
									)}
								/>
							</div>

							<div className="grid grid-cols-3 items-center gap-4">
								<Label htmlFor="height">Height</Label>
								<FormField
									control={form.control}
									name="height"
									render={({ field }) => (
										<FormItem className="col-span-2 flex space-y-0">
											<FormControl>
												<Input
													id="height"
													type="number"
													className="rounded-r-none"
													{...field}
													onChange={(e) => field.onChange(Number(e.target.value))}
												/>
											</FormControl>
											<PX />
										</FormItem>
									)}
								/>
							</div>

							<div className="grid grid-cols-3 items-center gap-4">
								<Label htmlFor="columns">Columns</Label>
								<FormField
									control={form.control}
									name="columns"
									render={({ field }) => (
										<FormItem className="col-span-2">
											<FormControl>
												<Input
													id="columns"
													type="number"
													placeholder="columns"
													{...field}
													onChange={(e) => field.onChange(Number(e.target.value))}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<div className="grid grid-cols-3 items-center gap-4">
								<Label htmlFor="padding">Padding</Label>
								<FormField
									control={form.control}
									name="padding"
									render={({ field }) => (
										<FormItem className="col-span-2 flex space-y-0">
											<FormControl>
												<Input
													id="padding"
													type="number"
													className="rounded-r-none"
													{...field}
													onChange={(e) => field.onChange(Number(e.target.value))}
												/>
											</FormControl>
											<PX />
										</FormItem>
									)}
								/>
							</div>

							<div className="grid grid-cols-3 items-center gap-4">
								<Label htmlFor="gap">Gap</Label>
								<FormField
									control={form.control}
									name="gap"
									render={({ field }) => (
										<FormItem className="col-span-2 flex space-y-0">
											<FormControl>
												<Input
													id="gap"
													type="number"
													className="rounded-r-none"
													{...field}
													onChange={(e) => field.onChange(Number(e.target.value))}
												/>
											</FormControl>
											<PX />
										</FormItem>
									)}
								/>
							</div>
						</form>
					</Form>
				</PopoverContent>
			</Popover>

			<div ref={ref} className="h-full overflow-auto">
				<Grid grid={grid}>
					{(index) => (
						<div
							key={index}
							className="border-border/80 bg-accent h-full w-full rounded-lg border"
						/>
					)}
				</Grid>
			</div>
		</Window>
	);
};

const PX = () => (
	<div className="bg-secondary/60 text-secondary-foreground flex items-center justify-center rounded-r-md border border-l-0 px-4 text-xs font-light">
		px
	</div>
);
