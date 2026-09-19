import { useEffect, useId } from 'react'

import { cvx, type VariantProps } from '../../utils/class-names'
import { isIconOnly } from '../../utils/react-utils'
import { type ComponentProps } from '../../utils/types'

import { devtoolsStore } from '../../devtools/devtools.store'

export type ButtonProps<TElementType extends React.ElementType = 'button'> = ComponentProps<
	TElementType,
	VariantProps<typeof button>,
	'className' | 'style'
>
export function Button<TElementType extends React.ElementType = 'button'>({
	size,
	variant,
	as,
	...props
}: ButtonProps<TElementType>) {
	const Component = as ?? 'button'
	const iconOnly = isIconOnly(props.children)

	if (import.meta.env.DEV) {
		// oxlint-disable-next-line react/hooks, react-hooks/rules-of-hooks – dev-only checks
		useDevtoolsErrors({ iconOnly, ...props })
	}

	return (
		<Component
			data-slot="button"
			className={button({ size, variant, iconOnly })}
			type={Component === 'button' ? 'button' : undefined}
			{...props}
		/>
	)
}

const button = cvx(
	[
		'inline-flex shrink-0 items-center justify-center border font-medium whitespace-nowrap outline-none',
		'transition-all duration-100',
		'aria-invalid:ring-destructive/20',
		'focus-visible:border-neutral-400 focus-visible:ring-2 focus-visible:ring-black/20',
		'active:translate-y-px',
		'disabled:pointer-events-none disabled:opacity-50',
		// Icon
		'[&_svg]:pointer-events-none [&_svg]:shrink-0',
	],
	{
		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
		variants: {
			iconOnly: {
				false: '',
				true: '',
			},
			size: {
				default: ['h-8 gap-2 rounded-[10px] px-3 text-sm', '[&_svg]:size-4'],
				sm: ['h-7 gap-1.5 rounded-lg px-2 text-sm', '[&_svg]:size-3'],
			},
			variant: {
				default: [
					'border-black bg-black text-white shadow-xs',
					'hover:bg-black/85',
					'active:bg-plack/95',
				],
				outline: ['border-neutral-300 bg-white', 'hover:bg-neutral-100'],
				ghost: ['border-transparent', 'hover:bg-neutral-100'],
				destructive: [
					'border-red-600 bg-red-600 text-white',
					'hover:bg-red-700/90',
					'focus-visible:border-red-700/50 focus-visible:ring-red-600/30',
				],
				secondary: ['border-neutral-200 bg-neutral-200'],
				link: [
					'text-primary border-transparent underline-offset-4',
					'hover:underline',
					'focus-visible:border-neutral-400 focus-visible:ring-black/30',
				],
			},
		},
		compoundVariants: [
			{
				iconOnly: true,
				size: 'default',
				className: 'w-8 px-0',
			},
			{
				iconOnly: true,
				size: 'sm',
				className: 'w-7 px-0',
			},
		],
	},
)

function useDevtoolsErrors(props: {
	iconOnly: boolean
	title?: string | undefined
	'aria-label'?: string | undefined
	'aria-labelledby'?: string | undefined
}) {
	const id = useId()
	const accessibleName = props.title ?? props['aria-label'] ?? props['aria-labelledby']
	const missingAccessibleName = props.iconOnly && accessibleName === undefined

	useEffect(() => {
		devtoolsStore.report(
			id,
			missingAccessibleName
				? {
						source: 'Button',
						message: 'Icon-only Button is missing an accessible name — pass `aria-label`',
					}
				: undefined,
		)
		return () => {
			devtoolsStore.report(id)
		}
	}, [id, missingAccessibleName])
}
