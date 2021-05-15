<!--
 * @Description: tab2
 * @Author: J.
 * @Date: 2021-01-07 19:18:32
 * @LastEditTime: 2021-04-06 13:13:06
-->
<template>
  <div :class="{ 'tab2-bdr': hasLine }">
    <ul class="j-tab2 no-select" :class="[hasLine ? '' : 'tab2-bdr']">
      <li v-for="(tab, idx) in tabData" :key="idx" @click="handleChange(idx)" :class="{ active: tabIdx == idx }">
        <b></b>
        {{ tab }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'TabTwo',
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
    },
    hasLine: {
      // 是否长线
      type: Boolean,
      default: false
    }
  },
  watch: {
    tabs(val) {
      this.tabData = val
    },
    value(val) {
      this.tabIdx = val
    }
  },
  data() {
    return {
      tabData: this.tabs,
      tabIdx: this.value
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
.j-tab2 {
  display: inline-block;
  // border-bottom: 1px solid #eaeaea;
  li {
    display: inline-block;
    position: relative;
    padding: 8px 15px;
    cursor: pointer;
    color: #848484;
    &.active {
      color: #4260db;
      font-weight: 600;
      b {
        display: block;
        height: 1px;
        width: 100%;
        position: absolute;
        bottom: -1px;
        left: 0;
        background-color: #4260db;
      }
    }
  }
}
.tab2-bdr {
  border-bottom: 1px solid #eaeaea;
}
</style>
