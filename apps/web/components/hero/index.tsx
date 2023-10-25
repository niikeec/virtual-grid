import { Book, GithubLogo } from '@phosphor-icons/react';

import { buttonVariants } from '../ui/button';
import { Installation } from './installation';
import { LogoArt } from './logo-art';

export const Hero = () => {
	return (
		<div className="flex flex-col items-center">
			<LogoArt />

			<div className="flex flex-col items-center">
				<h1 className="mt-3 text-4xl font-bold">Virtual Grid</h1>
				<p className="text-muted-foreground mt-2">
					Virtualized grid powered by{' '}
					<a
						href="https://tanstack.com/virtual/v3"
						target="_blank"
						className="text-orange-400 underline transition-colors hover:text-orange-300"
					>
						@tanstack/virtual
					</a>
				</p>

				<div className="mt-4 flex gap-3">
					<a
						href="https://github.com/niikeec/virtual-grid"
						target="_blank"
						className={buttonVariants({ className: 'w-[150px]' })}
					>
						<GithubLogo weight="fill" className="mr-2 shrink-0" />
						GitHub
					</a>
					<a
						href="https://docs.virtual-grid.com/getting-started/react"
						target="_blank"
						className={buttonVariants({ variant: 'outline', className: 'w-[150px]' })}
					>
						<Book weight="bold" className="mr-2 shrink-0" />
						Documentation
					</a>
				</div>
			</div>

			<Installation />
		</div>
	);
};
