<!--
 * @Description: 
 * @Author: Jiang Lei
 * @Date: 2021-01-28 13:38:19
 * @LastEditTime: 2021-02-16 16:45:28
-->
## 公共搜索框

### 使用方法

- 引入组件
```
import ElSearchInput from "@/components/ElSearchInput/index"
```

- 不带提示的输入框（默认）
```
<el-search-input
    v-model="value"
    @on-search="handleSearch"
    @keyup.native.enter="handleSearch"
    @input.native="checkLen"
></el-search-input>
```

- 带提示输入框
```
<el-search-input 
    isTips
    :tips="['1、提示第一条', '2、提示第二条']"
    v-model="iptValue"
    @on-search="handleSearch"
    @keyup.native.enter="handleSearch"
    @input.native="checkLen"
></el-search-input>
```

### 备注
`checkLen`是控制输入长度的方法，该方法在utils/utils.js中，默认最多输入100个字符，使用时可以参考面积维护页面：src\views\Content\ProjectPreparation\RoomArea\RoomArea.vue
如需控制其他长度，比如限制20个字符： @input.native="checkLen($event, 20)"
