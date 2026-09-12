import { isValidElement } from 'react'

import { type LucideIcon } from 'lucide-react'

/**
 * A single lucide icon child (not text, not multiple children — React only collapses `children`
 * to a bare element when JSX gave it exactly one) gets the icon-only square sizing.
 */
export function isIconOnly(children: unknown): children is LucideIcon {
	if (!isValidElement(children)) {
		return false
	}

	try {
		return getRenderFunction(children).includes('lucide-')
	} catch {
		return false
	}
}

function getRenderFunction(child: object) {
	return 'type' in child &&
		typeof child.type === 'object' &&
		child.type !== null &&
		'render' in child.type &&
		typeof child.type.render === 'function'
		? child.type.render.toString()
		: ''
}

export function isComponent<TProps>(
	child: React.ReactNode,
	type: React.ElementType<TProps>,
): child is React.ReactElement<TProps> {
	return (
		isValidElement(child) &&
		'type' in child &&
		typeof child.type !== 'string' &&
		child.type === type
	)
}
