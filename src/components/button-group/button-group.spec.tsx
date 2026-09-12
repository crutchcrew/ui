import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { UIProvider } from '../../provider'
import { Button } from '../button/button'
import { ButtonGroup } from './button-group'

describe(ButtonGroup, () => {
	it('renders its Button children', () => {
		render(
			<ButtonGroup>
				<Button>A</Button>
				<Button>B</Button>
			</ButtonGroup>,
		)

		expect(screen.getAllByRole('button')).toHaveLength(2)
	})

	it('allows overriding a child to `destructive` when the group variant is `default`', () => {
		render(
			<ButtonGroup variant="default">
				<Button>A</Button>
				<Button variant="destructive">B</Button>
			</ButtonGroup>,
		)

		expect(screen.getByRole('button', { name: 'B' })).toHaveClass('bg-red-600')
	})

	it('reports an error when a child is not a Button', async () => {
		render(
			<UIProvider>
				<ButtonGroup>not a button</ButtonGroup>
			</UIProvider>,
		)

		await userEvent.click(screen.getByRole('button', { name: /dev toolbar errors/iu }))

		expect(screen.getByText(/<ButtonGroup \/> children must be `<Button \/>`/u)).toBeInTheDocument()
	})

	it('does not error for empty children', () => {
		render(
			<UIProvider>
				<ButtonGroup>{null}</ButtonGroup>
			</UIProvider>,
		)

		expect(screen.queryByRole('button', { name: /dev toolbar errors/iu })).not.toBeInTheDocument()
	})

	it('reports an error when overriding variant outside a `default` group', async () => {
		render(
			<UIProvider>
				<ButtonGroup variant="outline">
					<Button variant="ghost">A</Button>
				</ButtonGroup>
			</UIProvider>,
		)

		await userEvent.click(screen.getByRole('button', { name: /dev toolbar errors/iu }))

		expect(
			screen.getByText(
				/Only <ButtonGroup variant="default"> can accept <Button variant="destructive">/u,
			),
		).toBeInTheDocument()
	})

	it('reports an error for a non-`destructive` override inside a `default` group', async () => {
		render(
			<UIProvider>
				<ButtonGroup variant="default">
					<Button variant="ghost">A</Button>
				</ButtonGroup>
			</UIProvider>,
		)

		await userEvent.click(screen.getByRole('button', { name: /dev toolbar errors/iu }))

		expect(
			screen.getByText(
				/<ButtonGroup variant="default"> accepts only <Button> or <Button variant="destructive">/u,
			),
		).toBeInTheDocument()
	})
})
