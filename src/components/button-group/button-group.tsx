import { Children, cloneElement, useId, useLayoutEffect } from 'react'

import { cvx, type VariantProps } from '../../utils/class-names'
import { isComponent } from '../../utils/react-utils'
import { type ComponentProps } from '../../utils/types'

import { devtoolsStore, type DevError } from '../../devtools/devtools.store'
import { Button, type ButtonProps } from '../button/button'

export type ButtonGroupProps = ComponentProps<
	'div',
	{
		/**
		 * @default 'outline'
		 */
		variant?: Extract<ButtonProps['variant'], 'default' | 'outline' | 'secondary'>
		size?: ButtonProps['size']
	} & VariantProps<typeof buttonGroup>,
	'className' | 'style'
>

/**
 * Button Group Component
 * @description
 * Accepts `<Button />` as children and sets single variant passed on the group
 * Allows to override for Button child to `danger` only for `default` group variant
 * @example
 * ```tsx
 *   <ButtonGroup>
 *    <Button>A</Button>
 *    <Button>B</Button>
 *    <Button>C</Button>
 * 	<ButtonGroup>
 * ```
 * @example
 * ```tsx
 *   <ButtonGroup variant="secondary">
 *    <Button>A</Button>
 *    <Button>B</Button>
 *    <Button>C</Button>
 * 	<ButtonGroup>
 * @example
 * ```tsx
 *   <ButtonGroup variant="default">
 *    <Button>A</Button>
 *    <Button>B</Button>
 *    <Button variant="destructive">C</Button>
 * 	<ButtonGroup>
 * ```
 */
export function ButtonGroup({
	variant = 'outline',
	orientation,
	children,
	size,
	...props
}: ButtonGroupProps) {
	if (import.meta.env.DEV) {
		// oxlint-disable-next-line react/hooks, react-hooks/rules-of-hooks – dev-only checks
		useDevToolsErrors({ children, variant })
	}

	return (
		<div
			role="group"
			data-slot="button-group"
			data-orientation={orientation}
			className={buttonGroup({ orientation })}
			{...props}
		>
			{Children.map(children, (child) =>
				isComponent(child, Button)
					? cloneElement(child, {
							size,
							variant:
								variant === 'default' && child.props.variant === 'destructive'
									? child.props.variant
									: variant,
						})
					: null,
			)}
		</div>
	)
}

const buttonGroup = cvx(
	"flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
	{
		variants: {
			orientation: {
				horizontal:
					'*:data-slot:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg! [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0',
				vertical:
					'flex-col *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0',
			},
		},
		defaultVariants: {
			orientation: 'horizontal',
		},
	},
)

function useDevToolsErrors({ children, variant }: ButtonGroupProps) {
	const id = useId()

	useLayoutEffect(() => {
		const childArray = Children.toArray(children)

		for (const [index, child] of childArray.entries()) {
			devtoolsStore.report(`${id}:${index}`, getButtonGroupChildError(child, variant))
		}

		return () => {
			for (const index of childArray.keys()) {
				devtoolsStore.report(`${id}:${index}`)
			}
		}
	}, [id, children, variant])
}
function getButtonGroupChildError(
	child: React.ReactNode,
	variant: ButtonGroupProps['variant'],
): DevError | undefined {
	if (child === '') {
		return undefined
	}

	if (!isComponent(child, Button)) {
		return { source: 'ButtonGroup', message: '<ButtonGroup /> children must be `<Button />`' }
	}

	if (typeof child.props.size === 'string') {
		return {
			source: 'ButtonGroup',
			message: '"size" must be passed on <ButtonGroup size="default | sm"/>',
		}
	}

	if (
		child.props.variant === undefined ||
		(variant === 'default' && child.props.variant === 'destructive')
	) {
		return undefined
	}

	return {
		source: 'ButtonGroup',
		message:
			variant === 'default'
				? `<ButtonGroup variant="default"> accepts only <Button> or <Button variant="destructive">`
				: 'Only <ButtonGroup variant="default"> can accept <Button variant="destructive">, otherwise "variant" property should be avoided on <Button>',
	}
}
