import { isArray } from "./types"

export function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export function kebabCase(str) {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function camelize(str) {
  return str.replace(/-(\w)/g, (_, w) => (w ? w.toUpperCase() : w))
}

export function upperFirst(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}

// 创建新对象，对象的 key 由 iteratee 返回值组成
export function mapKey(object, iteratee) {
  object = Object(object)
  return Object.keys(object).reduce((prev, key) => {
    const value = object[key]
    prev[iteratee(value, key, object)] = value
    return prev
  }, {})
}

/**
 * 将对象的 key 转为横向连接符
 * @param {Object} object 目标对象
 */
export function kebabCaseObjectKey(object) {
  return mapKey(object, (_, key) => kebabCase(key))
}

export function ensureArray(val) {
  return isArray(val) ? val : [val]
}

export function pick(object, keys) {
  return keys.reduce((prev, key) => {
    object && hasOwn(object, key) && (prev[key] = object[key])
    return prev
  }, {})
}