import { extname } from './deps.ts';

export class pwa_view {

	static get_body(path) {
		if (extname(path) !== '.html') return Deno.readFileSync(path);
		let body = Deno.readTextFileSync(path);
		while (body.match(/<!-- include (\S+) -->/)) {
			body = body.replace(/<!-- include (\S+) -->/g, function () {
				return this.get_body(arguments[1]).trimEnd();
			}.bind(this));
		}
		return body;
	}
}
