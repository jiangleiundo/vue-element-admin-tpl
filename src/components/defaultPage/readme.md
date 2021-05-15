<!--
 * @Description: 
 * @Author: J.
 * @Date: 2021-05-16 00:05:20
 * @LastEditors: J.
 * @LastEditTime: 2021-05-16 00:08:14
-->
/*
 * @Description: 
 * @Author: J.
 * @Date: 2021-05-16 00:06:11
 * @LastEditors: J.
 * @LastEditTime: 2021-05-16 00:06:32
 */

属性值：
1.  type， 组件显示类型， 有 emptyData 暂无数据； networkError 网络异常； systemError 系统报错  
    默认是  暂无数据

2. remark， 备注信息   如ui图 暂无备注信息处； 可与type一期传

3. iconClass， svg 文件名称， 没有type属性 ，必须传

4. showText, 包含图片解释文本（如网络异常等）和 备注信息 接收一个对象  key分别对应 text 和 remarkText，
  
注意: 宽高均为100% ， flex布局