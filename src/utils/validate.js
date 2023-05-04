/**
 * Created by Liuxiaoming on 20/9/10.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function checkPhone (val) {
  const reg = /^1[1-9]\d{9}$/
  return reg.test(val)
}
