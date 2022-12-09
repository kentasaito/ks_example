export class controller {

	static post(sender, params) {
		for (const client of this.client_list) {
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
