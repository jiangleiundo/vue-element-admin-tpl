<!--
 * @Description: 公共搜索框
 * @Author: Jiang Lei
 * @Date: 2021-01-05 15:57:41
 * @LastEditTime: 2021-05-13 15:34:38
-->
<template>
  <div ref="iptRef" class="j-ipt-box" :style="{ width: width }">
    <el-input
      v-model.trim="curValue"
      :placeholder="curPlaceholder"
      maxlength="100"
      :disabled="disabled"
      @change="handleChange"
      @focus="isFocus = true"
      @blur="$event => blur($event)"
    >
      <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
    </el-input>
    <b :class="['search', isFocus ? 'is-focus' : '']">
      <el-tooltip placement="top" v-show="isTips && !curValue">
        <div slot="content">
          <h5 style="marginBottom:8px">已启用通配符</h5>
          <p style="marginBottom:3px" v-for="tip in curTips" :key="tip">
            {{ tip }}
          </p>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7 0.25C10.7279 0.25 13.75 3.27208 13.75 7C13.75 10.7279 10.7279 13.75 7 13.75C3.27208 13.75 0.25 10.7279 0.25 7C0.25 3.27208 3.27208 0.25 7 0.25ZM6 7.75L6 4L8 4L8 7.75H6ZM6 10V8.5H8V10H6Z"
            fill="#C1C1C1"
          />
        </svg>
      </el-tooltip>
      <i v-show="curValue && clearable" class="el-input__icon el-icon-error" @click="handleClear"></i>
    </b>
  </div>
</template>
<script>
export default {
  name: 'ElSearchInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    width: {
      type: String,
      default: '280px'
    },
    tips: {
      type: Array,
      default: () => {
        return ['%替代一个或多个字符']
      }
    },
    isTips: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value(val) {
      this.curValue = val
    },
    placeholder(val) {
      this.curPlaceholder = val
    },
    tips(val) {
      this.curTips = val
    }
  },
  data() {
    return {
      isFocus: false,
      curPlaceholder: this.placeholder,
      curValue: this.value,
      curTips: this.tips
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('input', val)
    },

    handleClear() {
      this.curValue = ''
      this.handleChange('')
      this.$emit('on-clear')
    },

    handleSearch() {
      this.$emit('on-search', this.curValue)
    },
    blur(e) {
      this.isFocus = false
      this.$emit('blur', e.target.value)
    }
  }
}
</script>
<style lang="scss" scoped>
.j-ipt-box {
  position: relative;
  height: 30px;
  /deep/.el-input {
    height: 100%;
    .el-input__suffix {
      height: 30px;
      line-height: 30px;
    }
  }
  /deep/.el-input__inner {
    border-radius: 6px;
    padding: 0 60px 0 5px;
    height: 30px;
    line-height: 30px;
    border-color: #eaeaea;
  }

  .el-input--medium .el-input__icon {
    line-height: 32px;
    cursor: pointer;
  }

  .search {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    box-sizing: border-box;
    border-right: 1px solid #eaeaea;
    border-left: none;
    position: absolute;
    top: 0;
    right: 33px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .el-icon-search {
    // line-height: 30px;
    color: #4260db;
    // font-size: 13px;
    // cursor: pointer;
    // vertical-align: top;
  }

  .is-focus {
    border-color: #4260db;
  }

  b .el-input__icon {
    line-height: 32px;
    color: #c4c4c4;
    cursor: pointer;
  }

  /deep/.el-input__inner {
    vertical-align: 4px;
  }

  /deep/.el-input__inner:focus {
    border-color: #4260db;
  }
}
</style>
