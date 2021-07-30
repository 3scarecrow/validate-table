import Vue from 'vue'

const _toString = (val) => Object.prototype.toString.call(val)

const isType = (val, type) => _toString(val).slice(8, -1) === type

export function isDef(val) {
  return val !== undefined && val !== null
}

export function isUndef(val) {
  return val === undefined || val === null
}

export function isString(val) {
  return isType(val, 'String')
}

export function isPlainObject(obj) {
  return isType(obj, 'Object')
}

export function isFunction(val) {
  return typeof val === 'function'
}

export function isArray(val) {
  return isType(val, 'Array')
}

export function isNumber(val) {
  return isType(val, 'Number')
}

export function isPromise(val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

export function isVNode(node) {
  const vm = new Vue()
  const emptyVNode = vm.$createElement()
  return node instanceof emptyVNode.constructor
}