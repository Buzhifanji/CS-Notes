import { Main } from './main.js';
import { Router } from './Router.js';
import { Ajax } from './Service.js';
import { toOptions } from './utils/index.js';

const options = toOptions({ Ajax, Router });

console.log(options);
console.log(options.Router.init());

new Main(options).init();
