import { pwa_view } from './ks_pwa/pwa_view.ts';

export class view {

	static extends(from) {
		class dummy {};
		for (const name of Object.getOwnPropertyNames(from)) {
			if (!Object.getOwnPropertyNames(dummy).includes(name)) {
				this[name] = from[name];
			}
		}
	}

	static {
		this.extends(pwa_view);
	}
}
