import { ws_controller } from './ks_ws/ws_controller.js';

export class controller extends ws_controller {

	static initialize() {
		super.initialize(controller);
		document.getElementById('text').focus();
		document.getElementById('to_about_state').onclick = event => {
			event.preventDefault();
			controller.push_state('about');
		}
		document.getElementById('text').onkeydown = event => {
			if (event.key === 'Enter') {
				controller.post(document.getElementById('text').value);
				document.getElementById('text').value = '';
			}
		}
	}

	static connected(params) {
		document.getElementById('client_id').innerText = params.client_id;
	}

	static posted(params) {
		const element = document.createElement('div');
		element.innerText = 'client_' + params.client_id + ': ' + params.text;
		document.getElementById('output').prepend(element);
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
