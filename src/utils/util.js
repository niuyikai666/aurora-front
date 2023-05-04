export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    // eslint-disable-next-line standard/computed-property-even-spacing
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function numberFormat (num, dot, endNum) {
  if (num === null) {
    return '-'
  }
  if (num >= 10000) {
    const numF = (num / 10000).toFixed(2)
    return amountFormat(numF, dot, endNum)
  } else {
    if (num > 1000) {
      return amountFormat(num, false, endNum)
    } else {
      return String(num)
    }
  }
}

// 金额千分化
/**
 *
 * @param {*} s 数字
 * @param {*} dot 是否显示小数位 默认false
 * @param {*} endNum 截取几位小数
 * @returns string
 */
export function amountFormat (s, dot, endNum) {
  var noNegative = true
  const endnum = endNum || 2
  // eslint-disable-next-line no-useless-escape
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(endnum) + ''
  if (parseFloat(s) < 0) {
    s = Math.abs(s).toFixed(endnum) + ''
    noNegative = false
  }

  var l = s.split('.')[0].split('').reverse()
  var r = s.split('.')[1]
  var t = ''
  for (var i = 0; i < l.length; i++) {
    if (i % 3 === 2 && i !== l.length - 1) {
      t += l[i] + ','
    } else {
      t += l[i] + ''
    }
  }
  return dot !== false ? (noNegative ? '' : '-') + t.split('').reverse().join('') + '.' + r : (noNegative ? '' : '-') + t.split('').reverse().join('')
}

// 千分化特殊处理
export function amountFormatFunc (s, dot) {
  if (s < 1000) return s
  var noNegative = true
  var result = 0
  // eslint-disable-next-line no-useless-escape
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(2) + ''
  if (parseFloat(s) < 0) {
    s = Math.abs(s).toFixed(2) + ''
    noNegative = false
  }

  var l = s.split('.')[0].split('').reverse()
  var r = s.split('.')[1]
  var t = ''
  for (var i = 0; i < l.length; i++) {
    if (i % 3 === 2 && i !== l.length - 1) {
      t += l[i] + ','
    } else {
      t += l[i] + ''
    }
  }
  result = dot !== false ? (noNegative ? '' : '-') + t.split('').reverse().join('') + '.' + r : (noNegative ? '' : '-') + t.split('').reverse().join('')
  // 如果尾数为00 则截取掉
  if (result) {
    var lastIndex = result && result.lastIndexOf('.')
    if (lastIndex > 0) {
      const end = result.slice(lastIndex + 1, result.length)
      if (end === '00') {
        result = result.slice(0, lastIndex)
      }
    }
  }
  return result
}
// 千分化特殊处理
export function amountFormatFunc1 (s, dot) {
  if (!s && s !== 0) return '-'
  if (s < 1000) return s
  var noNegative = true
  var result = 0
  // eslint-disable-next-line no-useless-escape
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(2) + ''
  if (parseFloat(s) < 0) {
    s = Math.abs(s).toFixed(2) + ''
    noNegative = false
  }

  var l = s.split('.')[0].split('').reverse()
  var r = s.split('.')[1]
  var t = ''
  for (var i = 0; i < l.length; i++) {
    if (i % 3 === 2 && i !== l.length - 1) {
      t += l[i] + ','
    } else {
      t += l[i] + ''
    }
  }
  result = dot !== false ? (noNegative ? '' : '-') + t.split('').reverse().join('') + '.' + r : (noNegative ? '' : '-') + t.split('').reverse().join('')
  // 如果尾数为00 则截取掉
  if (result) {
    var lastIndex = result && result.lastIndexOf('.')
    if (lastIndex > 0) {
      const end = result.slice(lastIndex + 1, result.length)
      if (end === '00') {
        result = result.slice(0, lastIndex)
      }
    }
  }
  return result
}
export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

export function getHashPath () {
  const url = location.href
  return url.slice(url.indexOf('#') + 1, url.length)
}

export function getQueryParam (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const herf = window.location.href
  const search = herf.substring(herf.indexOf('?') + 1, herf.length)
  var r = search.match(reg)
  if (r !== null) return unescape(r[2]); return null
}
export function minuteToHour (val) {
  if (val || val === 0) {
    return (val / 60).toFixed(2) + '小时'
  } else {
    return '-'
  }
}
// export function getUid () {
//   const url = window.location.href
//   const uid = url.split('uid=')[1].split('&')[0]
//   return uid
// }
