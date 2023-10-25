import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Virtual Grid',
	description: 'Virtualized grid based on @tanstack/virtual'
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="mx-auto w-full max-w-screen-lg">{children}</div>
			</body>
		</html>
	);
}
