<!--
 * @Description: table
 * @Author: Jiang Lei
 * @Date: 2021-02-22 19:33:53
 * @LastEditTime: 2021-05-14 11:06:17
-->
<template>
  <div class="j-form-table">
    <el-table
      ref="tablesRef"
      class="ux-table j-table0"
      border
      :data="insideTableData"
      :header-cell-style="{ background: '#F7F8FA' }"
      :row-style="{ height: '36px' }"
      :resizable="resizable"
      :max-height="maxHeight"
      :height="height"
      :row-class-name="rowClassName"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      @selection-change="handleSelChange"
      @sort-change="sortChange"
    >
      <template slot="empty" v-if="emptyStyle && !loading">
        <default-error-page></default-error-page>
      </template>
      <template v-for="(item, index) in insideColumns">
        <el-table-column
          v-if="['selection', 'index'].includes(item.type)"
          :key="'t1' + index"
          :type="item.type"
          :label="item.title"
          :index="getIndex(item.type)"
          width="70"
          align="center"
          :fixed="item.fixed || null"
        ></el-table-column>

        <el-table-column
          v-else-if="item.key === 'handle'"
          :key="'t2' + index"
          :label="item.title"
          :fixed="item.fixed || null"
          :min-width="item.minWidth || 100"
          :width="item.width || null"
        >
          <template slot="header" v-if="isRefresh">
            <div class="mt-svg">
              <span>{{ item.title }}</span>
              <span class="svg-container">
                <svg-icon icon-class="refresh" @click="refresh"></svg-icon>
              </span>
            </div>
          </template>
          <template slot-scope="scope">
            <ex-slot v-if="item.render" :render="item.render" :row="scope.row" :index="scope.$index" />
            <template v-else v-for="(btn, idx) in item.option">
              <el-button
                v-if="!item.kOption || hasAuthority(item.kOption[idx])"
                :key="btn"
                type="text"
                size="small"
                @click="handleOption(btn, scope.row, scope.$index)"
                >{{ BTNS[btn] }}</el-button
              >
            </template>
          </template>
        </el-table-column>

        <el-table-column
          v-else
          :key="'t3' + index"
          :prop="item.key"
          :label="item.title"
          :align="item.align || 'left'"
          :min-width="item.minWidth || null"
          :width="item.width || null"
          :sortable="item.sortable || null"
          :fixed="item.fixed || null"
        >
          <template slot="header">
            <span v-title>{{ item.title }}</span>
          </template>
          <template slot-scope="scope">
            <ex-slot v-if="item.render" :render="item.render" :row="scope.row" :index="scope.$index" />
            <span v-else v-title>{{ scope.row[item.key] || '-' }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div v-if="pageable" class="j-pagenation clearfix no-select">
      <el-pagination
        :page-sizes="[20, 50, 100, 200]"
        :current-page="currentPage"
        :page-size="currentPageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="changePage"
        @size-change="onSize"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { value2Text } from '@/utils/utils'
import { BTNS } from './button'

// 自定义组件
var exSlot = {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  render: (h, data) => {
    const params = {
      row: data.props.row,
      index: data.props.index
    }
    if (data.props.column) params.column = data.props.column
    return data.props.render(h, params)
  }
}

export default {
  name: 'Tables',
  components: { exSlot },
  props: {
    value: {
      // 绑定的数据
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    pageable: {
      type: Boolean,
      default: true
    },
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 20
    },
    resizable: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: [String, Number]
    },
    isRefresh: {
      // 是否显示刷新按钮
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number]
    },
    emptyStyle: {
      // ‘暂无数据’图片样式
      type: Boolean,
      default: false
    },
    authCode: {
      // 权限对象
      type: Object,
      default() {
        return {}
      }
    },
    showSummary: {
      // 合计
      type: Boolean,
      default: false
    },
    getSummaries: {
      type: Function,
      default: () => []
    },
    precisionNm: {
      // 面积保留位字段
      type: String,
      default: 'decimalDigits'
    }
  },
  watch: {
    columns(columns) {
      this.handleColumns(columns)
    },
    value(val) {
      this.handleTableData()
    },
    total(val) {
      const maxPage = Math.ceil(val / this.currentPageSize)
      if (maxPage < this.currentPage) {
        this.currentPage = maxPage === 0 ? 1 : maxPage
      }
    },
    current(val) {
      this.currentPage = val
    },
    pageSize(val) {
      this.currentPageSize = val
    }
  },
  computed: {
    loading() {
      return this.$store.state.paramSetting.loading
    }
  },
  data() {
    return {
      BTNS: BTNS, // 按钮
      value2Text: value2Text,
      insideTableData: [], // table数据
      insideColumns: [], // columns
      currentPage: this.current,
      currentPageSize: this.pageSize
    }
  },
  mounted() {
    this.handleColumns(this.columns)
    this.handleTableData()
  },
  methods: {
    getIndex(type) {
      if (type === 'index') {
        if (this.pageable) return (this.currentPage - 1) * this.currentPageSize + 1
        return 1
      }
      return null
    },

    /**
     * @Description: 按钮权限
     * @param {*} key
     * @return {*}
     */
    hasAuthority(key) {
      return this.authCode[key]
    },

    /**
     * @Description: 初始化table数据
     * @param {*}
     * @return {*}
     */
    handleTableData() {
      if (!this.value.map) {
        return console.log('tables props value is must be Array!')
      }
      this.insideTableData = this.value.map((item, index) => {
        item.initRowIndex = index
        return item
      })
    },

    /**
     * @Description: 渲染columns
     * @param {*} columns
     * @return {*}
     */
    handleColumns(columns) {
      this.insideColumns = columns.map((item, index) => {
        if (item.type) item = this.surportType(item)
        return item
      })
    },

    /**
     * @Description: 值类型转换
     * @param {*} item
     * @return {*}
     */
    surportType(item) {
      item.render = (h, params) => {
        if (item.type === 'area') item.code = params.row[this.precisionNm]
        return h('span', { directives: [{ name: 'title' }] }, value2Text(params.row[item.key], item.type, item.code))
      }
      return item
    },

    /**
     * @Description: 操作按钮
     * @param {*} btn
     * @param {*} row
     * @param {*} index
     * @return {*}
     */
    handleOption(btn, row, index) {
      this.$emit(`on-${btn}`, row, index)
    },

    /**
     * @Description: 全选
     * @param {*} rows
     * @return {*}
     */
    handleSelChange(rows) {
      this.insideTableData.map(item => {
        item.isActive = false
      })
      rows.map(item => {
        item.isActive = true
      })
      this.$emit('on-selection', rows)
    },

    /**
     * @Description: 选中效果添加背景
     * @param {*} row
     * @return {*}
     */
    rowClassName({ row }) {
      if (row.isActive) {
        return 'bgc-color'
      }
    },

    /**
     * @Description: 排序
     * @param {*} val
     * @return {*}
     */
    sortChange(val) {
      this.$emit('on-sortChange', val)
    },

    /**
     * @Description: 切换当前页
     * @param {*} page
     * @return {*}
     */
    changePage(page) {
      if (this.currentPage != page) {
        this.currentPage = page
        this.$emit('update:current', page)
        this.$emit('on-page', page)
      }
    },

    /**
     * @Description: 切换分页
     * @param {*} pageSize
     * @return {*}
     */
    onSize(pageSize) {
      this.currentPageSize = pageSize
      this.$emit('on-page-size', pageSize)
      this.changePage(1)
    },

    /**
     * @Description: 刷新按钮
     * @param {*}
     * @return {*}
     */
    refresh() {
      this.$emit('on-refresh')
    }
  }
}
</script>
<style lang="scss" scoped>
.j-form-table {
  margin-top: 10px;
  .el-form-item {
    margin-bottom: 0;
    .el-input__inner {
      height: 25px;
      line-height: 25px;
      padding: 0 6px;
      font-size: 12px;
    }
  }
}
.el-button--mini,
.el-button--small {
  font-size: 14px;
}
.j-pagenation {
  > div {
    float: right;
    margin-top: 14px;
  }
  .el-pagination .el-select .el-input .el-input__inner {
    border-radius: 6px;
  }
  .el-pagination .el-pager li {
    font-weight: normal;
    color: #848484;
    &.active {
      color: #4260db;
    }
  }
}

.clearfix:after {
  content: '';
  display: block;
  clear: both;
}
</style>
