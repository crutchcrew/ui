import { type ReactNode } from 'react'

import { Devtools } from './devtools/devtools'

export interface UIProviderProps {
	children: ReactNode
}

/**
 * UI Provider
 * @description
 * Wraps the app and renders the dev-only toolbar (see `src/devtools`) alongside children.
 */
export function UIProvider({ children }: UIProviderProps) {
	return (
		<>
			{children}
			{import.meta.env.DEV ? <Devtools /> : null}
		</>
	)
}
