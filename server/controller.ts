import { ws_controller } from './ks_ws/ws_controller.ts';

export class controller extends ws_controller {
	static post(sender, params) {
		console.log('sender:', sender);
		console.log('message:', params);
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
