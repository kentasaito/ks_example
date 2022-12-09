import { spa_controller } from './ks_spa/spa_controller.js';
import { ws_controller } from './ks_ws/ws_controller.js';

export class controller {

	static extends(from) {
		class dummy {};
		for (const name of Object.getOwnPropertyNames(from)) {
			if (!Object.getOwnPropertyNames(dummy).includes(name)) {
				this[name] = from[name];
			}
		}
		this['initialize_' + from.name]();
	}

	static initialize_controller() {
		this.extends(spa_controller);
		this.extends(ws_controller);

		document.getElementById('text').focus();
		document.getElementById('to_about_state').onclick = event => {
			event.preventDefault();
			this.push_state('about');
		}
		document.getElementById('text').onkeydown = event => {
			if (event.key === 'Enter') {
				this.post(document.getElementById('text').value);
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
		this.socket.send(JSON.stringify({
			pathname: 'post',
			params: {
				text,
			}
		}));
	}
}
