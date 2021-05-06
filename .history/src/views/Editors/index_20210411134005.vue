<template>
  <div class="j-container">
    <div>
      <el-input
        v-model="left"
        placeholder="请输入"
      />
    </div>
    <div>
      <el-input
        v-model="right"
        placeholder="请输入"
      />
    </div>
  </div>
</template>
<script>
export default {
  name:  "Editors",
  components: {

  },
  data() {
    return {
      left: '',
      right: ''

    }
  },
  computed: {},
  created: function () {
  },
  mounted: function () {
  },
  methods: {

  }
}

</script>
<style lang="scss" scoped>
  .j-container {
    padding: 20px;
    display: flex;
    > div {
      padding: 20px;
      flex: 1;
    }
  }
</style>
