import { pwa_controller } from './deps.ts';
import { controller } from '../controller.ts';

export class ws_controller extends pwa_controller {

	static client_list = [];
	static client_id = 1;

	static handler(request) {
		const url = new URL(request.url);
		const pathname = url.pathname === '/' ? 'index.html' : url.pathname.replace(/^\//, '');
		const params = {};
		for (const [key, value] of url.searchParams) {
			params[key] = value;
		}
		if (pathname === 'ws') {
			const { socket, response } = Deno.upgradeWebSocket(request);

			// onopen
			socket.onopen = event => {
//				const user = model.user_shutoku(params.user_token, request.headers.get('user-agent'), connInfo.remoteAddr.hostname);
				ws_controller.client_list.push({
//					user_id: user[0],
					client_id: ws_controller.client_id++,
					socket: event.target,
				});
				console.log('onopen:', 'number of clients:', ws_controller.client_list.length);
//				const result = model.onopen(params, user);
/*
				socket.send(JSON.stringify({
					pathname: 'onopen',
					params: {},
				}));
*/
			};

			// onmessage
			socket.onmessage = event => {
				const client = ws_controller.client_list.find(client => client.socket === event.target);
				const data = JSON.parse(event.data);
				controller[data.pathname](client, data.params);
			}

			// onclose
			socket.onclose = event => {
				ws_controller.client_list = ws_controller.client_list.filter(client => client.socket !== event.target);
				console.log('onclose:', 'number of clients:', ws_controller.client_list.length);
			}

			// onerror
			socket.onerror = event => {
				console.error('onerror:', event);
			}

			return response;
		}
		else {
			return ws_controller.respond(pathname);
		}
	}
}
