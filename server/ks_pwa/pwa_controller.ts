import { extname, contentType, pwa_view } from './deps.ts';

export class pwa_controller {

	static respond(pathname) {
		for (const directory of ['./client', './design/entry_point']) {
			try {
				const body = pwa_view.get_body(directory + '/' + pathname);
				return new Response(body, {
					headers: {
						'Content-Type': contentType(extname(pathname)),
					},
				});
			} catch (error) {
			}
		}
		return new Response('Not Found', {
			status: 404,
			headers: {
				'Content-Type': contentType('.html'),
			},
		});
	}

	static handler(request) {
		const url = new URL(request.url);
		const pathname = url.pathname === '/' ? 'index.html' : url.pathname.replace(/^\//, '');
		const params = {};
		for (const [key, value] of url.searchParams) {
			params[key] = value;
		}
		return this.respond(pathname);
	}
}
