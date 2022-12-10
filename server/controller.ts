export class controller {

	static post(sender, params) {
		for (const client of this.client_list) {
			client.socket.send(JSON.stringify({
				pathname: 'posted',
				params: {
					user: sender.user,
					text: params.text,
				}
			}));
		}
	}
}
