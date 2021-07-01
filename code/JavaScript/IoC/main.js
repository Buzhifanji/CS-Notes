import { Init } from './interface.js';

export class Main extends Init {
	constructor(options) {
		super();
		Object.assign(this, options);
		this.options = options;
		this.render();
	}
	init() {
		Object.values(this.options).map((item) => item.init());
		console.log('Main::init');
	}
	render() {
		const content = this.Ajax.request();
		console.log('content from', content);
	}
}
