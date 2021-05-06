<template>
  <div class="j-container">
    <div class="text-area">
      <el-input
        v-model="left"
        type="textarea"
        maxlength="1000"
        rows="15"
        show-word-limit
      />
    </div>
    <div class="text-area">
      <el-input
        v-model="right"
        type="textarea"
        maxlength="1000"
        rows="15"
        show-word-limit
      />
    </div>
    <div class="btns" />
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
    > div.text-area {
      padding: 10px;
      flex: 1;
    }

    .btns {
      border: 1px solid #ddd;
      min-height: 200px;
    }
  }
</style>
