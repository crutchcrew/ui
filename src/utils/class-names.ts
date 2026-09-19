import { cx as cn, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

/**
 * Class name composition utility
 *
 * Allows to combine class names and define conditional classes It runs `tailwind-merge` under the
 * hood in order to deduplicate tailwind classed that set the same properties
 */
export function cx(...args: Parameters<typeof cn>): string {
	return twMerge(cn(...args))
}

export { type VariantProps } from 'class-variance-authority'
/**
 * Class name variants utility
 *
 * Defines styling variants base on class name composition It runs `tailwind-merge` under the hood
 * in order to deduplicate tailwind classed that set the same properties
 */
export function cvx<TParams>(
	...args: Parameters<typeof cva<TParams>>
): (params?: Parameters<ReturnType<typeof cva<TParams>>>[0]) => string {
	const variants = cva<TParams>(...args)
	return (params) => twMerge(variants(params))
}
