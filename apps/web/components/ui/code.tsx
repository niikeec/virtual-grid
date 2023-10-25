import copy from 'copy-to-clipboard';
import { Highlight, PrismTheme } from 'prism-react-renderer';

import { CopyButton } from './copy-button';

const theme = {
	plain: {},
	styles: [
		{
			types: ['comment'],
			style: {
				color: 'hsl(var(--muted-foreground))'
			}
		},
		{
			types: ['atrule', 'keyword', 'attr-name', 'selector'],
			style: {
				color: 'hsl(var(--muted-foreground))'
			}
		},
		{
			types: ['punctuation', 'operator'],
			style: {
				color: 'hsl(var(--muted-foreground))'
			}
		},
		{
			types: ['class-name', 'function', 'tag'],
			style: {
				color: 'var(--gray12)'
			}
		}
	]
} satisfies PrismTheme;

export const Code = ({ code }: { code: string }) => {
	return (
		<Highlight code={code} theme={theme} language="jsx">
			{({ style, tokens, getLineProps, getTokenProps }) => (
				<div className="from-accent to-secondary/50 relative overflow-hidden rounded-md border bg-gradient-to-tr p-4">
					<pre className="overflow-auto text-xs" style={style}>
						{tokens.map((line, i) => (
							<div key={i} {...getLineProps({ line })}>
								{line.map((token, key) => (
									<span key={key} {...getTokenProps({ token })} />
								))}
							</div>
						))}
					</pre>
					<CopyButton onClick={() => copy(code)} className="bg-background absolute right-3 top-3" />
				</div>
			)}
		</Highlight>
	);
};
