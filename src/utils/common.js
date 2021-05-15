/**
 *全局公用方法
 */
/**
 * @description: 格式化时间 return yyyy-mm-dd hh:mm:ss
 * @param {*} time
 * @param {*} cFormat
 * @return {*}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
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
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

/**
 * @description: 格式化时间 return yyyy-mm-dd
 * @param {*} time
 * @return {*}
 */
export function formatDay(time) {
  const date = new Date(time)
  let month = date.getMonth() + 1
  if (month < 10) {
    month = `0${month}`
  }
  let day = date.getDate()
  if (day < 10) {
    day = `0${day}`
  }

  return `${date.getFullYear()}-${month}-${day}`
}

/**
 * @description: 格式化时间
 * @param {*} time
 * @param {*} option
 * @return {*}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * @description: 转化url的query对象
 * @param {*} url
 * @return {*}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @description: 字节长度
 * @param {*} str
 * @return {*}
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

/**
 * @description: 除去数组中无效项
 * @param {*} actual
 * @return {*}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @description: 组合对象
 * @param {*} json
 * @return {*}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @description: url的query对象
 * @param {*} url
 * @return {*}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @description: 
 * @param {*} val
 * @return {*}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * @description: 对象合并
 * @param {*} target
 * @param {*} source
 * @return {*}
 */
export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @description: 切换class
 * @param {*} element
 * @param {*} className
 * @return {*}
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @description: 日期组件快捷键
 * @param {*}
 * @return {*}
 */
export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }
]

/**
 * @description: 
 * @param {*} type
 * @return {*}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @description: 防抖
 * @param {*} func
 * @param {*} wait
 * @param {*} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout; let args; let context; let timestamp; let result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone(source) {
  let targetObj
  if (source && typeof source === 'object') {
    targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    })
  } else {
    throw new Error('error arguments', 'deepClone')
  }
  return targetObj
}

/**
 * @description: 数组去重
 * @param {*} arr
 * @return {*}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @description: 生成唯一字符串
 * @param {*}
 * @return {*}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * @description: hasClass
 * @param {*} ele
 * @param {*} cls
 * @return {*}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * @description: addClass
 * @param {*} ele
 * @param {*} cls
 * @return {*}
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * @description: removeClass
 * @param {*} ele
 * @param {*} cls
 * @return {*}
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/***
 * 根据设定好的值获取时间区间
 * 今天、昨天、最近一周、7天内、最近一月、最近30天、本月、本季度、本年...
 * ***/
export const getTimePeriod = {
  getToday() {
    // 获取今天
    const time = new Date(new Date().toDateString())
    return [time, time]
  },
  getThisWeek() {
    // 获取这周到今天
    return this.getTime({
      num: new Date().getDay()
    })
  },
  getThisMonth() {
    // 获取这个月到今天
    return this.getTime({
      num: new Date().getDate()
    })
  },
  getThisQuarter() {
    // 获取这个季度到今天
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    return [new Date(`${year}-${month - month % 3 + 1}-01`), today]
  },
  getThisYear() {
    // 获取今年到今天
    const end = new Date()
    const start = new Date(`${end.getFullYear()}-01-01`)
    return [start, end]
  },
  yesterday() {
    // 获取昨天
    return this.getTime({
      oneDay: true,
      num: 1
    })
  },
  getTime(obj) {
    // 获取几天前到现在或者几个月到今天（周为固定7天，月为固定30天，年为360天）
    const time = {
      hour: 3600000,
      day: 3600000 * 24,
      week: 3600000 * 24 * 7,
      month: 3600000 * 24 * 30,
      year: 3600000 * 24 * 360
    }
    const end = new Date()
    const today = new Date(new Date().toDateString()).getTime()
    const num = obj.oneDay || obj.num == 0 ? obj.num : obj.num - 1
    const start = new Date(today - time[obj.type || 'day'] * num)
    return [start, obj.oneDay ? start : end]
  }
}

export const timeText = {
  yesterday: true,
  getThisWeek: true,
  getThisMonth: true,
  getThisQuarter: true,
  getThisYear: true
}

/**
 * @description: 调用 getTimePeriod 方法，返回时间段（某天到今天）
 * @param {*} str
 * @return {*}
 */
export function acquisitionTime(str) {
  let time = ''
  if (timeText[str]) {
    time = getTimePeriod[str]()
  } else {
    time = getTimePeriod.getTime({
      num: Number(str.slice(4))
    })
  }
  return time.map(item => formatDay(item)).join(',')
}

/**
 * @description: 获取当前时间 格式如：20210325173610
 * @param {*}
 * @return {*}
 */
export function getCurrentDateTime() {
  const time = new Date()
  return (
    time.getFullYear() +
    formatNum(time.getMonth() + 1) +
    formatNum(time.getDate()) +
    formatNum(time.getHours()) +
    formatNum(time.getMinutes()) +
    formatNum(time.getSeconds())
  )
}

/**
 * @description: 修改月、天的格式，保持两位数显示
 * @param {*} m
 * @return {*}
 */
function formatNum(m) {
  return m < 10 ? '0' + m : m
}

/**
 * @description: js小数相加(最多两位小数)，解决丢失精度问题
 * @param {*} num1
 * @param {*} num2
 * @return {*}
 */
export function sumUp(num1, num2) {
  function toNumber(num) {
    return Number(num) || 0
  }
  return (toNumber(num1) * 100 + toNumber(num2) * 100) / 100
}
