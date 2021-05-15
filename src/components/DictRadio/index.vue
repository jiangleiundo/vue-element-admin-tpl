<!--
 * @Description: dict-radio
 * @Author: J.
 * @Date: 2021-03-31 14:16:18
 * @LastEditTime: 2021-05-15 23:53:22
-->
<template>
  <el-radio-group v-model="curValue" @change="handleChange">
    <template v-for="item in curOptions">
      <el-radio :disabled="disabled" :label="item.value" :key="item.value + Math.random()">{{ item.label }}</el-radio>
    </template>
  </el-radio-group>
</template>
<script>
import * as DICT from '@/utils/dict'
import { initDict, objType } from '@/utils/utils'
export default {
  name: 'DictRadio',
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
    code: {
      type: [String, Array],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(val) {
      this.curValue = val
    },
    code(val) {
      if (objType(val) === 'string') {
        this.curOptions = this.init(DICT[val]).options
      }
      if (objType(val) === 'array') {
        this.curOptions = this.init(val).options
      }
    }
  },
  data() {
    return {
      curValue: this.value,
      curOptions: objType(this.code) === 'string' ? this.init(DICT[this.code]).options : this.init(this.code).options
    }
  },
  methods: {
    init(dicts) {
      return initDict(dicts, this.props)
    },

    handleChange(val) {
      this.$emit('change', val)
      this.$emit('on-change', val)
    }
  }
}
</script>
