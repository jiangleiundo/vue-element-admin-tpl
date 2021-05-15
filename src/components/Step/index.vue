<!--
 * @Description: steps
 * @Author: Jiang Lei
 * @Date: 2021-01-19 17:03:16
 * @LastEditTime: 2021-03-19 18:43:49
-->
<template>
  <ul class="j-steps" ref="stepRef">
    <li
      class="step"
      :class="{ isActive: index == curVal, actived: index < curVal }"
      :style="{ width: '2000px' }"
      v-for="(item, index) in curSteps"
      :key="item"
    >
      <div class="right-arrow"></div>
      <div class="left-arrow"></div>
      <!-- <span class="cur-step" v-html="index<curVal?'✓':index+1"></span> -->
      <span class="cur-step" v-html="index + 1"></span>
      <span class="step-info">{{ item }}</span>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'Step',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    steps: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    value(val) {
      this.curVal = val
    },
    steps(val) {
      this.curSteps = val
    }
  },
  data() {
    return {
      curVal: this.value,
      curSteps: this.steps
    }
  }
}
</script>
<style lang="scss">
@mixin j-step-arrow {
  content: '';
  display: block;
  height: 48px;
  width: 16px;
  position: absolute;
}

.j-steps {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  li:not(:first-child) {
    margin-left: 16px;
  }
  li.step {
    position: relative;
    width: 238px;
    height: 48px;
    background: #f7f8fa;
    line-height: 44px;
    text-align: center;
    border: 2px solid #f7f8fa;
  }

  .right-arrow {
    height: 48px;
    width: 16px;
    position: absolute;
    top: -2px;
    right: -16px;
    background: #fff;
    box-sizing: border-box;
    border-left: 2px solid #f7f8fa;
  }

  .right-arrow:after {
    @include j-step-arrow;
    background-color: #f7f8fa;
    clip-path: polygon(0 0, 12.5% 0, 100% 50%, 12.5% 100%, 0% 100%, 87.5% 50%);
    top: 0;
    right: 0;
  }
  .right-arrow::before {
    @include j-step-arrow;
    background-color: #f7f8fa;
    clip-path: polygon(-1px 2px, 2px 2px, 87.5% 50%, 2px 46px, -1px 46px);
    top: 0;
    right: 0;
  }

  .left-arrow {
    height: 48px;
    width: 16px;
    position: absolute;
    top: -2px;
    left: -2px;
  }

  .left-arrow:after {
    @include j-step-arrow;
    background-color: #f7f8fa;
    clip-path: polygon(0 0, 12.5% 0, 100% 50%, 12.5% 100%, 0% 100%, 87.5% 50%);
    top: 0;
    right: 0;
  }
  .left-arrow::before {
    @include j-step-arrow;
    background-color: #fff;
    clip-path: polygon(0 0, 87.5% 50%, 0 100%);
    top: 0;
    right: 0;
  }
  li:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    .left-arrow {
      display: none;
    }
  }
  li:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    .right-arrow {
      display: none;
    }
  }

  .cur-step {
    display: inline-block;
    width: 18px;
    height: 18px;
    background: #c1c1c1;
    border-radius: 9px;
    color: #fff;
    line-height: 18px;
    text-align: center;
    margin: 0 6px 0 0;
  }

  li.isActive {
    border: 2px solid #4260db;
    .cur-step {
      background: #4260db;
    }
    .step-info {
      color: #4260db;
      font-weight: 600;
    }
    .right-arrow {
      border-left-color: #4260db;
    }
    .left-arrow:after,
    .right-arrow:after {
      background-color: #4260db;
    }
  }
  li:last-child.isActive {
    border-left: none;
  }

  .step-info {
    color: #848484;
    font-weight: 600;
  }

  .actived {
    .cur-step {
      background: #4260db;
    }
    .step-info {
      color: #4260db;
    }
  }
}
</style>
