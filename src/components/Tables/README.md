<!--
 * @Description: tables
 * @Author: J.
 * @Date: 2021-02-23 17:18:57
 * @LastEditTime: 2021-03-26 14:24:09
-->
## table组件

### 使用组件
```
<Tables
  :authCode="fjxxwh" // 权限对象
  v-model="tableData" // data
  :columns="tableColumns" // 定义表头
  :current="page"
  :pageSize="pageSize"
  :total="total"
  @on-page="changePage"
  @on-page-size="changePageSize"
  @on-edit="handleEdit" // 按钮可以在button.js 中维护
></Tables>
```

```
tableColumns = [
  {
    type: 'selection',
  },
  {
    type: 'index',
    title: '序号'
  },
  {
    title: '房间',
    key: 'roominfo',
    minWidth: 180
  },
  {
    title: '销售状态',
    key: 'saleStatus'
  },
  {
    title: '定金',
    key: 'xDownpayment',
    type: 'money'
  },
  {
    title: '实际楼层',
    key: 'xActualfloorname'
  },
  {
    title: '销售楼层',
    key: 'floorname'
  },
  {
    title: '名义楼层',
    key: 'xNamedfloorname'
  },
  {
    title: '房屋结构',
    key: 'xHousestru',
  },
  {
    title: '梯数',
    key: 'xDianticount'
  },
  {
    title: '朝向',
    key: 'cx'
  },
  {
    title: '通透',
    key: 'xTongtou'
  },
  {
    title: '操作',
    key: 'handle',
    option: ['edit','info']
    kOption: ['c66', 'c68'] // 按钮权限key，该数组与option中按钮对应
  }
]
```
