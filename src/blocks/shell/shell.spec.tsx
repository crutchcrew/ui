import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Shell } from './shell'

describe(Shell, () => {
	it('renders', () => {
		render(<Shell>Shell</Shell>)
		expect(screen.getByText('Shell')).toBeVisible()
	})
})
