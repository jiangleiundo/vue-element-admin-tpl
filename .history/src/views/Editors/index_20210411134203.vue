<template>
  <div class="j-container">
    <div>
      <el-input
        v-model="left"
        type="textarea"
        placeholder="请输入"
        maxlength="1000"
        rows="5"
        show-word-limit
      />
    </div>
    <div>
      <el-input
        v-model="right"
        type="textarea"
        placeholder="请输入"
        maxlength="1000"
        rows="5"
        show-word-limit
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
      padding: 10px;
      flex: 1;
    }
  }
</style>
