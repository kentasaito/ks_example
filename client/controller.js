export class controller {

	static initialize_controller() {
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
		document.getElementById('user_id').innerText = params.user_id;
	}

	static posted(params) {
		const element = document.createElement('div');
		element.innerText = 'user_' + params.user_id + ': ' + params.text;
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
