/*
 * @Description: utils公共方法
 * @Author: J.
 * @Date: 2021-05-16 00:15:30
 * @LastEditors: J.
 * @LastEditTime: 2021-05-16 00:24:57
 */
import {MessageBox, Message} from 'element-ui'
import store from '../store/index.js'
import axios from 'axios'
import {post, get} from '@/utils/request'
import {formatDay} from '@/utils/common'
import * as DICT from '@/utils/dict'

const _toString = Object.prototype.toString

/**
 * @Description: 接口二次封装
 * @param {*} url 请求地址 xxxxx#key|get #后面是接口对应的key，如果是get请求加上`|get`
 * @param {*} param 请求参数
 * @param {*} success 成功回调
 * @param {*} pageable 分页数据
 * @param {*} error 失败回调
 * @return {*}
 */
export const $http = (url, param = {}, success, pageable, error) => {
  let basePam = pageable
    ? {
        pageNum: pageable.page,
        pageSize: pageable.pageSize
      }
    : {}

  if (Array.isArray(param)) {
    // 入参是否是数组
    basePam = param
  } else {
    Object.assign(basePam, param)
  }

  const urlArr = url.split('#')
  if (urlArr[1]) {
    // 处理key
    const key = urlArr[1].replace('|get', '')
    setKey(key)
  }

  let http = post
  let pUrl = urlArr[0]
  if (url.includes('|get')) {
    // 处理get
    http = get
    pUrl = pUrl.replace('|get', '')
  }
//   store.commit('paramSetting/setLoading', true)
  http(pUrl, basePam)
    .then(res => {
    //   store.commit('paramSetting/setLoading', false)
      if (res.code == 200) {
        success && success(res)
      } else {
        !error && Message.error(res.message)
        error && error(res)
      }
    })
    .catch(err => {
    //   store.commit('paramSetting/setLoading', false)
      !error && err && Message.error(err.message)
      error && error(err)
    })
}

/**
 * 获取对象类型
 * @param {*} obj 对象参数
 */
export const objType = obj => {
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regexp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[_toString.call(obj)]
}

/**
 * 判空
 * @param {*} val
 */
export const isNull = val => {
  const type = objType(val)
  if (['boolean', 'number'].includes(type)) return false
  if (type === 'array') {
    return val.length === 0
  } else if (type === 'object') {
    return JSON.stringify(val) === '{}'
  } else {
    return val == 'null' || val == null || val == 'undefined' || val == undefined || val == ''
  }
}

/**
 * 是否包含目标值
 * @param {*} val String & Array
 * @param {*} tar string
 */
export const hasTar = (val, tar) => {
  return (val + '').includes(tar)
}

/**
 * 两个字符是否相等
 * @param {*} s1
 * @param {*} s2
 */
export const equalNm = (s1, s2) => {
  return s1 === s2
}

/**
 * 初始化分页对象
 * @param {*} type 分页标识
 * @param {*} pageSize
 */
export const initPageData = (type, pageSize = 20) => {
  const cType = capitalize(type)
  const fun = `get${cType}`
  return {
    name: type,
    fun,
    page: 1,
    pageSize,
    total: 0
  }
}

/**
 * @Description: 分页数据变化后获取table数据
 * @param {*} obj 分页数据
 * @param {*} val 当前页/分页
 * @param {*} type 0page 1pageSize
 * @param {*} vm 当前vue实例
 * @return {*}
 */
export const changePagination = (obj, val, type, vm) => {
  const p = ['page', 'pageSize'][type]
  vm[obj.name][p] = val
  vm[obj.fun]()
}

/**
 * 首字母大写
 */
export const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 对象数组排序
 * @param {*} p 排序属性
 */
export const dynamicSort = p => {
  let order = 1
  if (p[0] === '-') {
    order = -1
    p = p.substr(1)
  }

  return function(a, b) {
    let ac = Number(a[p])
    let bc = Number(b[p])
    if (isNull(ac)) {
      ac = a[p]
      bc = b[p]
    }
    const res = ac < bc ? -1 : ac > bc ? 1 : 0
    return res * order
  }
}

/**
 * @Description: 数组按固定属性顺序排序
 * @param {*} arr 数组
 * @param {*} key 排序属性
 * @param {*} order 自定义顺序
 * @return {*}
 */
export const customSort = (arr = [], key, order) => {
  if (!arr.length) return []
  if (isNull(key) || isNull(order)) return arr
  arr.sort((start, next) => {
    return order.indexOf(start[key]) - order.indexOf(next[key])
  })

  return arr
}

/**
 * @Description: input输入内容长度 @input.native
 * @param {*} el 元素
 * @param {*} max 最大字符长度
 * @return {*}
 */
export const checkLen = (el, max = 100) => {
  const val = el.target.value
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (/[\u4e00-\u9fa5]/.test(val[i])) {
      len += 2
    } else {
      len++
    }
    if (len > max) {
      el.target.value = val.substr(0, i)
      break
    }
  }
}

/**
 * @Description: 浅克隆对象
 * @param {*} cloneObj
 * @return {*}
 */
export const cloneObj = obj => {
  if (!obj) return ''
  return JSON.parse(JSON.stringify(obj))
}

/**
 * @Description: 获取数组中某一属性的集合
 * @param {*} arr
 * @param {*} prop
 * @return {*}
 */
export const getPropFromArr = (arr, prop) => {
  const filter = arr.filter(Boolean)
  return Array.from(filter, item => item[prop])
}

/**
 * @Description: 返回对象数组中的一个
 * @param {*} arr 待查数组
 * @param {*} prop 比对属性
 * @param {*} tar 目标值
 * @return {*}
 */
export const findItemByProp = (arr, prop, tar) => {
  const filter = arr.filter(Boolean)
  return filter.find(x => x[prop] === tar)
}

/**
 * @Description: 初始化字典项
 * @param {*} list 后台返回的构造字典数据
 * @param {*} props 默认属性
 * @param {*} filterKill 反过滤
 * @return {*}
 */
export const initDict = (list = [], props = {label: 'label', value: 'value'}, filterKill = []) => {
  const label = props.label
  const value = props.value
  const dict = {
    options: [],
    val2Nm: {}
  }
  list.forEach(item => {
    if (!filterKill.includes(item[value])) {
      dict.options.push({
        label: item[label],
        value: item[value]
      })
      dict.val2Nm[item[value]] = item[label]
    }
  })
  return dict
}

/**
 * @Description: 路由跳转
 * @param {*} goTo
 * @return {*}
 */
export const goTo = (vm, name, param = {}) => {
  vm.$router.push({
    name,
    param
  })
}

/**
 * @Description: 转换值
 * @param {*} value 值
 * @param {*} type 类型
 * @param {*} code
 * @return {*}
 */
export const value2Text = (value, type, code) => {
  if (!type || type === 'str') {
    return value
  } else if (type === 'date') {
    if (!value) return ''
    return formatDay(value)
  } else if (type === 'suffix') {
    if (!code) return ''
    return value + code
  } else if (type === 'prefix') {
    if (!code) return ''
    return code + value
  } else if (type === 'money') {
    if (!value || isNaN(value)) return '-'
    return rMoney(value)
  } else if (type === 'dict') {
    if (!code) return ''
    if (objType(code) === 'string') return initDict(DICT[code]).val2Nm[value] || ''
    return initDict(code).val2Nm[value] || ''
  } else if (type === 'area') {
    return formatArea(value, code)
  } else if (type === 'exDict') {
    // code就是已经生成的字典
    if (isNull(code) || isNull(code.val2Nm)) return ''
    return code.val2Nm[value] || ''
  }
}

/**
 * @Description: session
 * @param {*}
 * @return {*}
 */
export const session = {
  set: (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data))
  },
  get: key => {
    return JSON.parse(sessionStorage.getItem(key))
  },
  remove: key => {
    sessionStorage.removeItem(key)
  },
  clear: () => {
    sessionStorage.clear()
  }
}

/**
 * @Description: 导出文件
 * @param {*} export
 * @return {*}
 */
export const $export = (url, data, cb) => {
  const opt = {
    url,
    data,
    method: 'post',
    responseType: 'blob'
  }
  axios.request(opt).then(res => {
    cb && cb(res)
    const fileName = decodeURI(res.headers['content-disposition'].split('=')[1])
    const BLOB = res.data
    const fileReader = new FileReader()
    if (BLOB) {
      fileReader.readAsDataURL(BLOB)
    }
    fileReader.onload = event => {
      const a = document.createElement('a')
      a.download = fileName
      a.href = event.target.result
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  })
}

/**
 * @description: 格式化金额
 * @param {*} money
 * @return {*}
 */
export const rMoney = (money) => {
    // 金额格式化，保留2位小数，四舍五入
    return (parseFloat(money) || 0)
      .toFixed(2)
      .toString()
      .split('')
      .reverse()
      .join('')
      .replace(/(\d{3})/g, '$1,')
      .replace(/,$/, '')
      .split('')
      .reverse()
      .join('')
}

/**
 * 格式化金额
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567'，默认返回''
 */
export const formatMoney = num => {
  if (parseFloat(num).toString() != 'NaN') {
    return rMoney(num)
  }
  return ''
}

/**
 * 解析金额
 * @param num
 * @returns {string|*}
 */
export const parseMoney = num => {
  if (num) {
    num = num.replace(/￥s?|(,*)/g, '')
    return num
  }
  return ''
}

/**
 * @Description: 解析对象中的金额
 * @param {*} obj
 * @param {*} keys
 * @return {*}
 */
export const parseData = (obj, keys = []) => {
  const data = Object.assign({}, obj)
  Object.keys(data).forEach(key => {
    if (keys.includes(key) && objType(data[key]) === 'string' && parseFloat(data[key]).toString() != 'NaN') {
      data[key] = Number(parseMoney(data[key]))
    }
  })
  return data
}

/**
 * @Description: 格式化面积
 * @param {*} num
 * @param {*} precision 小数保留位
 * @return {*}
 */
export const formatArea = (num, precision = 2) => {
  if (precision < 0 || precision > 20) precision = 2
  if (parseFloat(num).toString() != 'NaN') {
    // num = parseFloat((num + "").replace(/[^\d\.-]/g, "")).toFixed(precision) + ""
    num = parseFloat((num + '').replace(/[^\d.-]/g, '')) + ''
    const left = num
      .split('.')[0]
      .split('')
      .reverse()
    let right = num.split('.')[1]
    right = right ? right + '0'.repeat(20) : '0'.repeat(20) // 禁止小数位进位直接截取
    right = right.substring(0, precision)

    let total = ''
    for (let i = 0; i < left.length; i++) {
      total += left[i] + ((i + 1) % 3 == 0 && i + 1 != left.length ? ',' : '')
    }

    const leftPart = total
      .split('')
      .reverse()
      .join('')
      .replace(/-,/, '-')
    if (right) {
      return leftPart + '.' + right
    }
    return leftPart
  }
  return ''
}

/**
 * @Description: 解析面积
 * @param {*} str
 * @return {*}
 */
export const parseArea = str => {
  return parseFloat(str.replace(/[^\d.-]/g, ''))
}

/**
 * @Description: 文字溢出显示title
 * @param {*} el 当前需要显示title的元素
 * @param {*} padding table中若父元素宽度受padding影响可传一个参数
 * @return {*}
 */
export const showTitle = (el, padding = 0) => {
  const target = el.target
  const {offsetWidth} = target // 目标元素宽
  let clientWidth = 10000
  if (el.fromElement) {
    clientWidth = el.fromElement.clientWidth - padding // 父元素宽
  }
  target.title = target.innerText
  if (offsetWidth < clientWidth) target.title = ''
}

/**
 * @description: object转array
 * @param obj 需要转换的object
 * @return Array
 */
export const objToArray = obj => {
  const arr = []
  for (const key in obj) {
    arr.push(obj[key])
  }
  return arr
}

/* @Description: confirm弹框
 * @param {*} config {msg: 'xxx', type: 'warning'}
 * @param {*} cb
 * @return {*}
 */
const msgBoxOption = (config, cb) => {
  let msg = '您确定删除吗？'
  let iconClass = 'warning'
  if (config && objType(config) === 'string') {
    msg = config
  }
  if (config && objType(config) === 'object') {
    msg = config.msg || msg
    iconClass = config.type || iconClass
  }
  return {
    customClass: 'j-confirm-box',
    title: '提示',
    type: 'confirm',
    showClose: true,
    showCancelButton: true,
    closeOnClickModal: false,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    cancelButtonClass: 'j-cancel',
    confirmButtonClass: 'j-confirm',
    iconClass,
    message: msg,
    callback: function(action, instance) {
      cb && cb[action] && cb[action](instance)
    }
  }
}

/**
 * @Description: 确认弹框
 * @param {*} cb 回调 { confirm(){}, cancel(){} }
 * @param {*} config 提示 或配置
 * @return {*}
 */
export const confirmM = (cb, config) => {
  MessageBox(msgBoxOption(config, cb))
}

/**
 * @Description: 删除提示
 * @param {*} cb
 * @return {*}
 */
export const cfmModal = (cb, config) => {
  confirmM(
    {
      confirm: () => {
        cb && cb()
      }
    },
    config
  )
}

/**
 * @Description: 查看工作流审批
 * @param {*} url
 * @param {*} approvalNo
 * @return {*}
 */
export const viewWorkFlow = (url, approvalNo) => {
  if (!url) {
    return Message.error('无可查看的审批流程！')
  }
  store.commit('workflowForms/openWorkFlowModel', {
    url,
    bldGuid: approvalNo,
    key: Math.random()
  })
}

/**
 * @description: 替换数组中的某个对象
 * @param {Array} array
 * @param {String} str
 * @param {String} val
 */
export const replaceInArray = (array, str, obj) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i][str] === obj[str]) {
      for (const key in array[i]) {
        if (key !== str) {
          array[i][key] = obj[key]
        }
      }
      break
    }
  }
  return array
}

/**
 * @description: 节流
 * @param {*} delay
 * @param {*} fn
 * @return {*}
 */
export const throttle = function(delay, fn) {
    let firstTime = true
    let timer = null
    return function() {
      const args = [].slice.apply(arguments)
      if (firstTime) {
        fn.apply(this, args)
        firstTime = false
        return
      }
      if (timer) return
      timer = setTimeout(() => {
        fn.apply(this, args)
        clearTimeout(timer)
        timer = null
      }, delay)
    }
}

/**
 * @Description: 防抖
 * @param {*} fn 要防抖函数
 * @param {*} wait 延迟毫秒
 * @param {*} immediate
 * @return {*}
 */
export const debounce = (fn, wait, immediate) => {
  let timer
  return function() {
    if (timer) clearTimeout(timer)
    if (immediate) {
      if (!timer) {
        fn.apply(this, arguments)
      }
      timer = setTimeout(() => {
        timer = null
      }, wait)
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, wait)
    }
  }
}

/**
 * @Description: 半封闭式选择日期
 * @param {*} tim 日期
 * @param {*} type 开始日期传 true
 * @return {*}
 */
export const getTimOption = (tim, type) => {
  if (isNull(tim)) return {}
  return {
    disabledDate: date => {
      const d = new Date(tim).getTime()
      if (type) {
        return date && date.valueOf() > d
      }
      return date && date.valueOf() < d - 24 * 60 * 60 * 1000
    }
  }
}

