import { ws_controller } from './ks_ws/ws_controller.js';

export class controller extends ws_controller {

	static initialize() {
		super.initialize(controller);
		document.getElementById('to_another_state').onclick = () => controller.push_state('another');
		document.getElementById('post').onclick = () => controller.post(document.getElementById('text').value);
	}

	static onopen(params) {
console.log('onopen:', params);
	}

	static posted(params) {
		console.log('posted:', params);
		const element = document.createElement('div');
		element.innerText = params.text;
		document.getElementById('output').appendChild(element);
	}

	static post(text) {
		controller.socket.send(JSON.stringify({
			pathname: 'post',
			params: {
				text,
			}
		}));
	}
}
