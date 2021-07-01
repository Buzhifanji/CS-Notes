import { Init, Service } from './interface.js';
import { mix } from './utils/index.js';

export class Ajax extends mix(Init, Service) {
	constructor() {
		super();
	}
	init() {
		console.log('Service::init');
	}
	request() {
		return this.constructor.name;
	}
}
