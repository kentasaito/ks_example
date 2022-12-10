import { serve, serveTls } from 'https://deno.land/std@0.166.0/http/server.ts';

import { core_controller } from 'https://deno.land/x/ks_spa2@0.1.0/core_controller.ts';
import { ws_controller } from 'https://deno.land/x/ks_spa2@0.1.0/ws_controller.ts';
import { controller } from './controller.ts';

function extend(to, from) {
	class dummy {};
	for (const name of Object.getOwnPropertyNames(from)) {
		if (!Object.getOwnPropertyNames(dummy).includes(name)) {
			to[name] = from[name];
		}
	}
}

extend(controller, core_controller);
extend(controller, ws_controller);

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
