import { spa_controller } from '../ks_spa/spa_controller.js';
import { controller } from '../controller.js';

export class ws_controller extends spa_controller {

	static socket;
	static timeout_id;

	static initialize() {
		super.initialize();
		ws_controller.socket = new WebSocket(location.protocol.replace(/http/, 'ws') + '//' + location.hostname + ':' + location.port + '/ws');

		// onopen
		ws_controller.socket.onopen = () => {
			console.log('onopen:');
		};

		// onmessage
		ws_controller.socket.onmessage = event => {
			const data = JSON.parse(event.data);
			controller[data.pathname](data.params);
		};

		// onclose
		ws_controller.socket.onclose = () => {
			console.log('onclose:');
			clearTimeout(controller.timeout_id);
			controller.timeout_id = setTimeout(ws_controller.initialize, 3000);
		};

		// onerror
		ws_controller.socket.onerror = event => {
			console.error('onerror:', event);
		};
	}
}
