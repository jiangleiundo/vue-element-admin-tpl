<!--
 * @Description: 金额输入框
 * @Author: J.
 * @Date: 2021-02-25 09:28:41
 * @LastEditTime: 2021-05-10 15:20:59
-->
<template>
  <div class="m-input">
    <el-input-number
      ref="input"
      :min="curMin"
      :max="curMax"
      :controls="false"
      v-model.trim="curValue"
      @change="handleChange"
      @blur="handleBlur"
      @focus="focusInput"
      :class="clz"
      :disabled="currentDisabled"
      :placeholder="curPlaceholder"
      :precision="precision"
    ></el-input-number>
    <p v-show="showFormatPrice" @click="focusInput">{{ formaterVal }}</p>
  </div>
</template>

<script>
import { formatArea, parseArea } from '@/utils/utils'

export default {
  name: 'MoneyInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String
    },
    max: {
      type: [String, Number],
      default: 9999999999999.99
    },
    min: {
      type: [String, Number],
      default: -9999999999999.99
    },
    clz: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    precision: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      currentDisabled: this.disabled,
      curPlaceholder: this.placeholder,
      curMax: this.max,
      curMin: this.min,
      curValue: this.value,
      showFormatPrice: true
    }
  },
  computed: {
    formaterVal() {
      // return formatMoney(this.curValue)
      return formatArea(this.curValue, this.precision)
    }
  },
  watch: {
    disabled(val) {
      this.currentDisabled = val
    },
    placeholder(val) {
      this.curPlaceholder = val
    },
    max: {
      handler(val) {
        this.curMax = parseArea(formatArea(val, this.precision))
      },
      immediate: true
    },
    min(val) {
      this.curMin = val
    },
    value: {
      handler(val) {
        if (val >= this.curMax) {
          this.curValue = this.curMax
        } else {
          this.curValue = val
        }
      },
      immediate: true
    }
  },
  methods: {
    focusInput() {
      this.showFormatPrice = false
      this.$refs.input.focus()
      if (this.curValue === 0) {
        this.curValue = undefined
      }
    },

    handleChange(val) {
      this.$emit('input', val)
    },

    handleBlur(selected) {
      this.$emit('on-blur', selected)
      this.showFormatPrice = true
      // if(!this.curValue && !isNull(this.defaultVal)) {
      //   this.curValue = this.defaultVal
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
.m-input {
  position: relative;
  > p {
    position: absolute;
    top: 4px;
    left: 1px;
    height: 25px;
    line-height: 26px;
    width: 98%;
    z-index: 2;
    background: white;
    padding-left: 5px;
    border-radius: 6px;
    font-family: Arial;
    cursor: text;
    color: #464646;
    overflow: hidden;
    text-align: left;
  }
}
</style>
