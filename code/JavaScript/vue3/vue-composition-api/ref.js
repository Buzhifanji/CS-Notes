import * as shared from './shared.js';

const mutableHandlers = {
	get,
	set,
	deleteProperty,
	has,
	ownKeys
};

const mutableCollectionHandlers = {
	get: createInstrumentationGetter(false, false)
};

/**
 * 
 * @param {*} rawValue 未被转换 Ref类型的值
 * @param {*} shallow 
 */
function createRef(rawValue, shallow = false) {
	if (isRef(rawValue)) {
		return rawValue;
	}
	return new RefIml(rawValue, shallow);
}

/**
 * 判断是否为 Ref 类型
 * @param {*} r 
 * @returns 
 */
function isRef(r) {
	return Boolean(r && r.__v_isRef === true);
}

class RefIml {
	constructor(_rawValue, _shallow = false) {
		this._rawValue = _rawValue;
		this._shallow = _shallow;
		this.__v_isRef = true; // 用于判断是否 为 Ref 类型
		this._value = _shallow ? _rawValue : convert(_rawValue);
	}
	get value() {
		tract(toRaw(this), 'get', 'value');
		return this._value;
	}
	set value(newVal) {
		if (shared.hasChanged(toRaw(newVal), this._rawValue)) {
			this._rawValue = newVal;
			this._value = this._shallow ? newVal : convert(newVal);
			trigger(toRaw(this), 'set', 'value');
		}
	}
}

function convert(val) {
	shared.isObject(val) ? reactive(val) : val;
}

function reactive(target) {
	if (target && target['__v_isReadonly']) {
		// 只读，不做处理
		return target;
	}
	return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}

function createInstrumentationGetter(isReadonly, shallow) {}
