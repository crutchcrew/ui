export interface DevError {
	source: string
	message: string
}

type Listener = () => void

/**
 * Detached singleton store for dev-only component usage errors
 * @description
 * Kept outside of React state so reporting an error only notifies the dev toolbar's subscription
 * instead of re-rendering the app. Errors are keyed by the reporting call site — omitting the
 * error clears that key. There is no manual dismissal: an error only disappears once the
 * reporting component's effect determines it no longer applies (fixed in code) or unmounts.
 * No-ops entirely outside of development builds.
 */
class DevtoolsStore {
	private readonly errors = new Map<string, DevError>()
	private readonly listeners = new Set<Listener>()
	private snapshot: DevError[] = []

	public subscribe = (listener: Listener) => {
		this.listeners.add(listener)
		return () => {
			this.listeners.delete(listener)
		}
	}

	public getSnapshot = () => this.snapshot

	public report = (key: string, error?: DevError) => {
		if (!import.meta.env.DEV || !this.hasChanged(key, error)) {
			return
		}

		if (error === undefined) {
			this.errors.delete(key)
		} else {
			this.errors.set(key, error)
		}

		this.snapshot = [...this.errors.values()]
		for (const listener of this.listeners) {
			listener()
		}
	}

	private hasChanged(key: string, error: DevError | undefined): boolean {
		const existing = this.errors.get(key)

		if (error === undefined) {
			return existing !== undefined
		}

		return (
			existing === undefined ||
			existing.source !== error.source ||
			existing.message !== error.message
		)
	}
}

export const devtoolsStore = new DevtoolsStore()
