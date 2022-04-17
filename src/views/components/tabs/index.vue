<!--
 * @Description: tab切换
 * @Author: J.
 * @Date: 2022-04-17 17:19:41
 * @LastEditors: J.
 * @LastEditTime: 2022-04-17 17:34:42
-->

<template>
  <section class="j-tab-table">
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="聚合服务"
        name="first"
      ></el-tab-pane>
      <el-tab-pane
        label="操作服务"
        name="second"
      ></el-tab-pane>
      <el-tab-pane
        label="数据服务"
        name="third"
      ></el-tab-pane>
    </el-tabs>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        fixed
        prop="date"
        label="日期"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
      >
      </el-table-column>
      <el-table-column
        prop="city"
        label="市区"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
      >
      </el-table-column>
      <el-table-column
        prop="zip"
        label="邮编"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="text"
            size="small"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.j-tab-table {
  max-width: 800px;
  margin: 100px auto 0;
}
</style>
