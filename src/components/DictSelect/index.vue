<!--
 * @Description: 字典选择
 * @Author: Jiang Lei
 * @Date: 2021-01-18 22:41:11
 * @LastEditTime: 2021-04-19 19:40:15
-->
<template>
  <el-select
    :class="{ 'j-dict-select': !isInTable, 'j-mark': mark }"
    ref="dictSelRef"
    :automatic-dropdown="autoOpen"
    :value="curValue"
    :size="size"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    @change="handleChange"
    @visible-change="handleVisible"
    @focus="dictFocus"
  >
    <el-option
      v-for="item in curOptions"
      :key="item.value + Math.random()"
      :label="initLabel(item.label)"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>
<script>
import * as DICT from '@/utils/dict'
import { initDict, objType } from '@/utils/utils'
export default {
  name: 'DictSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    props: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'value'
        }
      }
    },
    value: {
      type: [String, Number, Array],
      default: ''
    },
    size: {
      type: String,
      default: 'medium' // medium/small/mini
    },
    code: {
      type: [String, Array],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    labelOnly: {
      type: Boolean,
      default: false
    },
    isFocus: {
      type: Boolean,
      defalult: false
    },
    autoOpen: {
      type: Boolean,
      default: true
    },
    isInTable: {
      // 是否在表格内部
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    prefix: {
      // option前缀
      type: String,
      default: ''
    },
    mark: {
      // 标记的选项标红
      type: Boolean,
      default: false
    },
    filerKill: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    value(val) {
      this.curValue = val
    },
    code: {
      handler(val) {
        this.curCode = val
        this.curOptions = this.getDicts()
      },
      immediate: true
    },
    isFocus(val) {
      const fun = val ? 'focus' : 'blur'
      this.$refs.dictSelRef[fun]()
    },
    filerKill(val) {
      this.curFilterKill = val
      this.curOptions = this.getDicts()
    }
  },
  data() {
    return {
      curValue: this.value,
      curOptions: this.getDicts(),
      curFilterKill: this.filerKill,
      curCode: this.code
    }
  },
  methods: {
    init(dicts) {
      return initDict(dicts, this.props, this.curFilterKill)
    },

    getDicts() {
      return objType(this.curCode) === 'string'
        ? this.init(DICT[this.curCode]).options
        : this.init(this.curCode).options
    },

    initLabel(label) {
      if (this.prefix) return this.prefix + ' ' + label
      return label
    },

    handleChange(val) {
      this.$emit('change', val)
      this.$emit('on-change', val)
      if (this.labelOnly) {
        const dict = objType(this.curCode) === 'string' ? DICT[this.curCode] : this.curCode
        const label = this.init(dict).val2Nm[val]
        this.$emit('on-label', label)
      }
    },

    handleVisible(val) {
      if (!val) {
        this.$emit('on-visible')
      }
    },

    dictFocus() {
      this.$emit('on-focus')
    }
  }
}
</script>
<style lang="scss" scoped>
.el-select {
  width: 100%;
  /deep/.el-icon-arrow-up:before {
    content: '\e78f';
  }
}
.j-dict-select {
  /deep/input.el-input__inner {
    border: 1px solid #eaeaea;
    border-radius: 6px;
    color: #464646;
    height: 30px;
    line-height: 30px;
    padding: 0 8px;
  }
  /deep/.el-input--medium .el-input__icon {
    line-height: 30px;
  }
}
</style>
