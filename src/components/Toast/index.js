/*
 * @Description: 全局 toast
 * @Author: J.
 * @Date: 2022-02-24 22:25:14
 * @LastEditors: J.
 * @LastEditTime: 2022-02-28 19:40:54
 */

/**
 * @description: 
 * @param {*} opt object/string
 * @return {*}
 */
const myToast = (opt) => {
    // 防止多次点击
    let tNode = document.getElementById('my_toast')
    if ( tNode) return
    
    let isObj = typeof opt === 'object'
    let timer = null
    let img = ''
    let text = isObj ? opt.text : opt // 提示文字
    let dur = isObj && opt.dur ? opt.dur : 3000 // 延迟时间
    let cls = isObj && opt.type ? opt.type : '' // 提示类型 success，warning，error，info(默认)

    if (isObj && opt.img) {
        img = `<img src="${opt.img}">`
    }

    let str = `${img}<span>${text}</span>`
    let dNode = document.createElement('div')
    dNode.innerHTML = str
    dNode.id = 'my_toast'
    dNode.className = cls
    document.body.appendChild(dNode)

    timer && clearTimeout(timer)
    timer = setTimeout(() => {
        document.body.removeChild(dNode)
    }, dur)
}

export default myToast
