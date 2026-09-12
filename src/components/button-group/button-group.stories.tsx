import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'

import { Button } from '../button/button'
import { ButtonGroup, type ButtonGroupProps } from './button-group'

export function Default(props: ButtonGroupProps) {
	return (
		<ButtonGroup {...props}>
			<Button>
				<ArrowLeftIcon />
			</Button>
			<Button>Default</Button>
			<Button>Default</Button>
			<Button>Outline</Button>
			<Button>Ghost</Button>
			<Button>
				<ArrowRightIcon />
			</Button>
		</ButtonGroup>
	)
}

Default.args = {
	size: 'default',
	variant: 'outline',
	orientation: 'horizontal',
}
Default.argTypes = {
	size: {
		control: { type: 'radio' },
		options: ['default', 'sm'],
	},
	variant: {
		control: { type: 'radio' },
		options: ['default', 'outline'],
	},
	orientation: {
		control: { type: 'radio' },
		options: ['horizontal', 'vertical'],
	},
}
