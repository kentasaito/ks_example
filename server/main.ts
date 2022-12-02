import { serve, serveTls } from 'https://deno.land/std@0.166.0/http/server.ts';
import { controller } from './controller.ts';

if (parseInt(Deno.env.get('USE_TLS'))) {
	serveTls(controller.handler, {
		port: 443,
		certFile: '/home/deno/.getssl/' + Deno.env.get('REMOTE_FQDN') + '/' + Deno.env.get('REMOTE_FQDN') + '.crt',
		keyFile: '/home/deno/.getssl/' + Deno.env.get('REMOTE_FQDN') + '/' + Deno.env.get('REMOTE_FQDN') + '.key',
	});
}
else {
	serve(controller.handler);
}
