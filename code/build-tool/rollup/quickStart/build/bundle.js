(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

	function add(a, b) {
		return a + b;
	}

	function log(value) {
		// log
		console.log.apply(this, arguments);
	}

	const a = add(1, 1);
	log(a);

})));
