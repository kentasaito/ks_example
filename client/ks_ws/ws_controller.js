import { spa_controller } from '../ks_spa/spa_controller.js';

export class ws_controller extends spa_controller {

	static socket;

	static initialize(controller) {
		super.initialize();
		ws_controller.socket = new WebSocket(location.protocol.replace(/http/, 'ws') + '//' + location.hostname + ':' + location.port + '/ws');

		// onopen
		ws_controller.socket.onopen = () => {
			console.log('onopen:');
		};

		// onmessage
		ws_controller.socket.onmessage = event => {
			const data = JSON.parse(event.data);
console.log('onmessage', data);
		};

		// onclose
		ws_controller.socket.onclose = () => {
			console.log('onclose:');
			setTimeout(ws_controller.socket_open, 1000);
		};

		// onerror
		ws_controller.socket.onerror = event => {
			console.error('onerror:', event);
		};
	}
}
