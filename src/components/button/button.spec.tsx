import { render, screen } from '@testing-library/react'
import { SendIcon } from 'lucide-react'
import { describe, expect, it } from 'vitest'

import { UIProvider } from '../../provider'
import { Button } from './button'

describe(Button, () => {
	it('renders', () => {
		render(<Button>Button</Button>)
		expect(screen.getByRole('button')).toHaveTextContent('Button')
	})

	it('reports an error for an icon-only button with no accessible name', () => {
		render(
			<UIProvider>
				<Button>
					<SendIcon />
				</Button>
			</UIProvider>,
		)

		expect(screen.getByRole('button', { name: /dev toolbar errors/iu })).toBeInTheDocument()
	})

	it('does not error for an icon-only button with an aria-label', () => {
		render(
			<UIProvider>
				<Button aria-label="Send">
					<SendIcon />
				</Button>
			</UIProvider>,
		)

		expect(screen.queryByRole('button', { name: /dev toolbar errors/iu })).not.toBeInTheDocument()
	})
})
