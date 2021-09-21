export const isObject = val => val !== null && typeof val === 'object';

export const hasOwn = (target, key) => Object.prototype.hasOwnProperty(target, key)

export const extend = Object.assign

export function hasChanged(value, oldValue) {
    return !Object.is(value, oldValue)
}