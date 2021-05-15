<!--
 * @Description: tab切换，带页签
 * @Author: J.
 * @Date: 2021-01-07 14:25:11
 * @LastEditTime: 2021-01-12 13:26:05
-->

<template>
  <div>
    <ul class="j-tab-one">
      <li v-for="(tab, idx) in tabData" :key="idx" @click="handleChange(idx)" :class="{ active: tabOneIdx == idx }">
        <b></b>
        {{ tab }}
      </li>
    </ul>
    <div class="j-search-box" :class="{ 'j-search-rad': tabOneIdx }">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TabOne',
  props: {
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: [Number, String],
      default: ''
    }
  },
  watch: {
    tabs(val) {
      this.tabData = val
    },
    value(val) {
      this.tabOneIdx = val
    }
  },
  data() {
    return {
      tabData: this.tabs,
      tabOneIdx: this.value
    }
  },
  methods: {
    handleChange(id) {
      this.$emit('input', id)
    }
  }
}
</script>
<style lang="scss">
@mixin j-tab-btm-tri {
  content: '';
  display: block;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: #f0f2f7;
  position: absolute;
  top: -6px;
}

.j-tab-one {
  overflow: hidden;
  -webkit-user-select: none;
  user-select: none;
  > li {
    display: inline-block;
    padding: 8px 15px;
    font-weight: 400;
    line-height: 20px;
    color: #848484;
    position: relative;
    cursor: pointer;
  }
  > li.active {
    font-weight: 600;
    color: #4260db;
    background-color: #fff;
    border-radius: 6px 6px 0px 0px;
    > b {
      display: block;
      position: absolute;
      width: calc(100% + 12px);
      height: 6px;
      left: -6px;
      bottom: 0px;
      background: #fff;
      &::before {
        @include j-tab-btm-tri;
        left: -6px;
      }
      &::after {
        @include j-tab-btm-tri;
        right: -6px;
      }
    }
  }
}

.j-search-box {
  background-color: #fff;
  border-radius: 0px 6px 6px 6px;
  padding: 12px 12px 10px;
}

.j-search-rad {
  border-radius: 6px;
}
</style>
