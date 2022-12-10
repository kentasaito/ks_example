import { ksfw } from '../../ks_spa2/ksfw.ts';

export class controller extends ksfw {

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
