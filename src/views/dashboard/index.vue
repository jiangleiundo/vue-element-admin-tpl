<!--
 * @Description: 行程卡
 * @Author: J.
 * @Date: 2021-04-11 12:05:53
 * @LastEditors: J.
 * @LastEditTime: 2022-04-05 22:17:03
-->
<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
