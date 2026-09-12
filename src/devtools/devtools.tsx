import { useState, useSyncExternalStore } from 'react'

import { AlertTriangleIcon } from 'lucide-react'

import { devtoolsStore } from './devtools.store'

/**
 * Devtools
 * @description
 * Floating dev-only notification listing component usage errors reported through
 * `devtoolsStore` (like Next.js' dev overlay). Renders nothing while there are no errors.
 * Errors cannot be dismissed here — they only clear once the reporting component's usage is
 * fixed in code (or it unmounts).
 */
export function Devtools() {
	const [open, setOpen] = useState(false)
	const errors = useSyncExternalStore(devtoolsStore.subscribe, devtoolsStore.getSnapshot)

	function handleToggle(evt: React.MouseEvent<HTMLButtonElement>) {
		evt.preventDefault()
		setOpen((previous) => !previous)
	}

	if (errors.length === 0) {
		return null
	}

	return (
		<div
			data-slot="dev-toolbar"
			className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2"
		>
			{open ? (
				<ul className="max-h-80 w-96 divide-y divide-neutral-200 overflow-auto rounded-lg border border-neutral-300 bg-white shadow-lg">
					{errors.map((error) => (
						<li key={`${error.source}:${error.message}`} className="px-3 py-2 text-sm text-red-600">
							<span className="font-medium">{error.source}: </span>
							{error.message}
						</li>
					))}
				</ul>
			) : null}
			<button
				type="button"
				aria-label={`${open ? 'Hide' : 'Show'} ${errors.length} dev toolbar errors`}
				onClick={handleToggle}
			>
				<AlertTriangleIcon />
				{errors.length}
			</button>
		</div>
	)
}
