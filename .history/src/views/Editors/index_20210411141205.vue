<template>
  <div>
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
    </div>
    <div class="btns">
      <el-button
        type="primary"
        size="mini"
        @click="handleLeft('如果')"
      >
        如果
      </el-button>
      <el-button
        type="primary"
        size="mini"
      >
        小于
      </el-button>
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
  created() {
  },
  methods: {
    handleLeft(val) {
      this.left = val
    }

  }
}

</script>
<style lang="scss" scoped>
  .j-container {
    padding: 20px;
    display: flex;
    div.text-area {
      padding: 0 10px;
      flex: 1;
    }
  }
  .btns {
    border: 1px solid #ddd;
    min-height: 200px;
    margin: 0 30px;
    > button {
      margin: 6px;
    }
  }
</style>
