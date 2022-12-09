import { pwa_controller } from './ks_pwa/pwa_controller.ts';
import { ws_controller } from './ks_ws/ws_controller.ts';

export class controller {

	static extends(from) {
		class dummy {};
		for (const name of Object.getOwnPropertyNames(from)) {
			if (!Object.getOwnPropertyNames(dummy).includes(name)) {
				this[name] = from[name];
			}
		}
	}

	static {
		this.extends(pwa_controller);
		this.extends(ws_controller);
	}

	static post(sender, params) {
		for (const client of ws_controller.client_list) {
			client.socket.send(JSON.stringify({
				pathname: 'posted',
				params: {
					client_id: sender.client_id,
					text: params.text,
				}
			}));
		}
	}
}
