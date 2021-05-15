<!--
 * @Description: info-page
 * @Author: J.
 * @Date: 2021-01-21 09:57:09
 * @LastEditTime: 2021-02-18 17:04:56
-->
<template>
  <el-form class="j-page-info" label-position="left">
    <el-row>
      <el-col :span="span" v-for="item in infoList" :key="item.key">
        <el-form-item :label="item.title" :label-width="labelWidth">
          <label v-text="showInfo(item)"></label>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { value2Text } from '@/utils/utils'
export default {
  name: 'InfoPage',
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    rules: {
      type: Array,
      default: () => {
        return []
      }
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    span: {
      type: Number,
      default: 12
    }
  },
  watch: {
    data(val) {
      this.curData = val
    }
  },
  data() {
    return {
      curData: this.data
    }
  },
  methods: {
    showInfo(item) {
      return value2Text(item.value, item.type, item.code)
    }
  },
  computed: {
    infoList() {
      const list = []
      this.rules.forEach(info => {
        const [title, key, type, code] = info.split('|')
        const value = this.curData[key]
        const item = { title, value, key, type, code }
        list.push(item)
      })
      return list
    }
  }
}
</script>
<style lang="scss" scoped>
.j-page-info {
  padding: 0 12px;
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
