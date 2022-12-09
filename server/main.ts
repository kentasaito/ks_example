import { serve, serveTls } from 'https://deno.land/std@0.166.0/http/server.ts';

import { pwa_controller } from './ks_pwa/pwa_controller.ts';
import { ws_controller } from './ks_ws/ws_controller.ts';
import { controller } from './controller.ts';

import { pwa_view } from './ks_pwa/pwa_view.ts';
import { view } from './view.ts';

function extend(to, from) {
	class dummy {};
	for (const name of Object.getOwnPropertyNames(from)) {
		if (!Object.getOwnPropertyNames(dummy).includes(name)) {
			to[name] = from[name];
		}
	}
}

extend(controller, pwa_controller);
extend(controller, ws_controller);
extend(view, pwa_view);

if (parseInt(Deno.env.get('USE_TLS'))) {
	serveTls(controller.handler, {
		port: Deno.env.get('REMOTE_PORT'),
		certFile: '/home/deno/.getssl/' + Deno.env.get('FQDN') + '/' + Deno.env.get('FQDN') + '.crt',
		keyFile: '/home/deno/.getssl/' + Deno.env.get('FQDN') + '/' + Deno.env.get('FQDN') + '.key',
	});
	const watcher = Deno.watchFs('/home/deno/.getssl/' + Deno.env.get('FQDN') + '/' + Deno.env.get('FQDN') + '.crt');
	for await (const event of watcher) {
		if (event.kind === 'modify') {
			Deno.utimeSync(new URL(import.meta.url).pathname, new Date(), new Date());
		}
	}
}
else {
	serve(controller.handler.bind(controller), {
		port: Deno.env.get('LOCAL_PORT'),
	});
}
