import { ws_controller } from './ks_ws/ws_controller.js';

export class controller extends ws_controller {

	static initialize() {
		super.initialize(controller);
		document.getElementById('to_another_state').onclick = () => controller.push_state('another');
	}
}
