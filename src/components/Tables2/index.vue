<!--
 * @Description  : table组件
 * @Author       : Jack
 * @Date         : 2022-05-12 15:27:44
 * @LastEditors: Jack
 * @LastEditTime: 2022-05-24 15:37:56
-->
<template>
  <div class="j-table">
    <el-table
      ref="tablesRef"
      class="ui-table"
      border
      :data="insideTableData"
      :header-cell-style="{ background: '#F7F8FA' }"
      :row-style="{ height: '36px' }"
      :resizable="resizable"
      :max-height="maxHeight"
      :height="height"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      @sort-change="sortChange"
    >
      <template v-for="(item, index) in insideColumns">
        <el-table-column
          v-if="['selection', 'index'].includes(item.type)"
          :key="item.k||'t1' + index"
          :type="item.type"
          :label="item.title"
          :index="getIndex(item.type)"
          width="60"
          align="center"
          :fixed="item.fixed || null"
        ></el-table-column>

        <el-table-column
          v-else-if="item.key === 'handle'"
          :key="item.k||'t2' + index"
          :label="item.title"
          :fixed="item.fixed || null"
          :min-width="item.minWidth || 100"
          :width="item.width || null"
        >
          <template slot-scope="scope">
            <ex-slot
              v-if="item.render"
              :render="item.render"
              :row="scope.row"
              :column="scope.column"
              :index="scope.$index"
            />
            <template v-else v-for="btn in item.option">
              <el-button
                :key="btn"
                type="text"
                size="small"
                :disabled="disBtns(scope.row, btn)"
                @click="handleOption(btn, scope.row, scope.$index)"
              >
                {{ BTNS[btn] }}
              </el-button>
            </template>
          </template>
        </el-table-column>

        <el-table-column
          v-else
          :key="item.k||'t3' + index"
          :prop="item.key"
          :label="item.title"
          :align="item.align || 'left'"
          :width="item.width || null"
          :min-width="item.minWidth || null"
          :sortable="item.sortable || null"
          :fixed="item.fixed || null"
        >
          <template slot="header">
            <span>{{ item.title }}</span>
          </template>
          <template slot-scope="scope">
            <ex-slot
              v-if="item.render"
              :render="item.render"
              :row="scope.row"
              :column="scope.column"
              :index="scope.$index"
            />
            <span v-else :class="markCls(scope.row.mark, item.key)">{{ scope.row[item.key] || '-' }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div v-if="pageable" class="j-pagenation no-select">
      <pagination
        :total="total"
        :page.sync="currentPage"
        :limit.sync="currentPageSize"
        @pagination="handlePage"
      />
    </div>
  </div>
</template>

<script>
import { BTNS } from './button'
import { value2Text } from '@/utils/utils'
import Pagination from '@/components/Pagination'

var exSlot = {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null,
    },
  },
  render: (h, data) => {
    const params = {
      row: data.props.row,
      index: data.props.index,
    }
    if (data.props.column) params.column = data.props.column
    return data.props.render(h, params)
  },
}

export default {
  name: 'Tables',
  components: { exSlot, Pagination },
  props: {
    value: {
      type: Array,
      default() {
        return []
      },
    },
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    pageable: {
      type: Boolean,
      default: false,
    },
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 20,
    },
    resizable: {
      type: Boolean,
      default: false,
    },
    disableBtns: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: [String, Number],
    },
    height: {
      type: [String, Number],
    },
    showSummary: {
      type: Boolean,
      default: false,
    },
    getSummaries: {
      type: Function,
      default: () => [],
    },
    markKeys: {
      type: Array,
      default() {
        return []
      }
    }
  },
  watch: {
    columns(columns) {
      this.handleColumns(columns)
    },
    value(val) {
      this.handleTableData()
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.current
      },
      set(val) {
        this.$emit('update:current', val)
      }
    },
    currentPageSize: {
      get() {
        return this.pageSize
      },
      set(val) {
        this.$emit('update:current', 1)
        this.$emit('update:pageSize', val)
      }
    },
    markCls() {
      return function(mark, key) {
        if (mark && this.markKeys.includes(key)) {
          return 'mark'
        }
        return ''
      }
    }
  },
  data() {
    return {
      BTNS: BTNS,
      value2Text: value2Text,
      insideTableData: [],
      insideColumns: [],
      timer: null
    }
  },
  mounted() {
    this.handleColumns(this.columns)
    this.handleTableData()
  },
  methods: {
    getIndex(type) {
      if (type === 'index') {
        if (this.pageable)
          return (this.currentPage - 1) * this.currentPageSize + 1
        return 1
      }
      return null
    },

    /**
     * @Description: 不可操作btns
     * @param {*} row 当前行
     * @param {*} btn 当前按钮 eg：‘edit’
     * @return {*}
     */
    disBtns(row, btn) {
      if (this.disableBtns) {
        let dis = ['frozen', 'thaw', 'delete', 'recovery']
        return dis.includes(row.applyType) && btn === 'edit'
      }

      return false
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
        if (item.linkable) item = this.supportLink(item)
        return item
      })
    },

    /**
     * @Description: table中link跳转
     * @param {*} item
     * @return {*}
     */
    supportLink(item){
      item.render = (h, params)=>{
        return h('el-button', {
          class: 'table-link',
          props: {
            type: 'text',
          },
          on: {
            'click': ()=>{
              this.$emit('on-link', params.row)
            }
          }
        }, params.row[params.column.property])
      }
      return item
    },

    /**
     * @Description: 值类型转换
     * @param {*} item
     * @return {*}
     */
    surportType(item) {
      item.render = (h, params) => {
        return h( 'span', {}, value2Text(params.row[item.key], item.type, item.code))
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
     * @Description: 排序
     * @param {*} val
     * @return {*}
     */
    sortChange(val) {
      this.$emit('on-sortChange', val)
    },

    /**
     * @Description: 分页变化
     * @param {*} page 分页对象
     * @return {*}
     */
    handlePage(page) {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('pagination', {page: page.page, pageSize: page.limit})
      }, 50)
    }
  },
}
</script>
<style lang="scss" scoped>
.j-table {
  // margin-top: 10px;
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
</style>

