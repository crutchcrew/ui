import {
	ExternalLinkIcon,
	ActivityIcon,
	SendIcon,
	Trash2Icon,
	Settings2Icon,
	AudioLinesIcon,
} from 'lucide-react'

import { Button, type ButtonProps } from './button'

export function Default(props: ButtonProps) {
	return (
		<div className="flex gap-1">
			<Button {...props}>Default</Button>
			<Button variant="secondary" {...props}>
				Default
			</Button>
			<Button variant="destructive" {...props}>
				Default
			</Button>
			<Button variant="outline" {...props}>
				Outline
			</Button>
			<Button variant="ghost" {...props}>
				Ghost
			</Button>
			<Button variant="link" {...props}>
				Link
			</Button>
		</div>
	)
}

Default.args = {
	size: 'default',
}
Default.argTypes = {
	size: {
		control: { type: 'radio' },
		options: ['default', 'sm'],
	},
}

export function IconOnly(props: ButtonProps) {
	return (
		<div className="flex gap-1">
			<Button {...props}>
				<SendIcon />
			</Button>
			<Button variant="secondary" {...props}>
				<ExternalLinkIcon />
			</Button>
			<Button variant="destructive" {...props}>
				<Trash2Icon />
			</Button>
			<Button variant="outline" {...props}>
				<ActivityIcon />
			</Button>
			<Button variant="ghost" {...props}>
				<Settings2Icon />
			</Button>
			<Button variant="link" {...props}>
				<AudioLinesIcon />
			</Button>
		</div>
	)
}

IconOnly.args = {
	size: 'default',
}
IconOnly.argTypes = {
	size: {
		control: { type: 'radio' },
		options: ['default', 'sm'],
	},
}

export function WithIcon(props: ButtonProps) {
	return (
		<div className="flex gap-1">
			<Button {...props}>
				<SendIcon /> Send
			</Button>
			<Button variant="secondary" {...props}>
				<ExternalLinkIcon /> Open
			</Button>
			<Button variant="destructive" {...props}>
				<Trash2Icon /> Delete
			</Button>
			<Button variant="outline" {...props}>
				<ActivityIcon /> Analyze
			</Button>
			<Button variant="ghost" {...props}>
				<Settings2Icon /> Settings
			</Button>
			<Button variant="link" {...props}>
				<AudioLinesIcon /> Listen
			</Button>
		</div>
	)
}

WithIcon.args = {
	size: 'default',
}
WithIcon.argTypes = {
	size: {
		control: { type: 'radio' },
		options: ['default', 'sm'],
	},
}
