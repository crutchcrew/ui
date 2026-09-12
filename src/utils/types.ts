// oxlint-disable-next-line typescript/no-explicit-any
type Any = any

/**
 * Distributive Omit Generic
 * @description
 * Performs distributive omit over union type
 */
export type DistributiveOmit<TValue, TOmitted extends PropertyKey> = TValue extends Any
	? Omit<TValue, TOmitted>
	: never

/**
 * Polymorphic Component Props based on `as` property
 * @description
 * Props for a polymorphic component, merging its own props with the
 * underlying element's DOM attributes.
 */
export type ComponentProps<
	TElementType extends React.ElementType,
	TProps extends object,
	TOmitProps extends PropertyKey,
> = {
	as?: TElementType
} & TProps &
	DistributiveOmit<
		React.ComponentPropsWithRef<React.ElementType extends TElementType ? 'button' : TElementType>,
		'as' | keyof TProps | TOmitProps
	>
