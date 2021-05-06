<template>
  <div>
    <div class="j-container">
      <div class="text-area">
        <el-input
          id="textarea"
          ref="textareaRef"
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
        @click="handleLeft('if')"
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
import dConst from './map'
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
      this.left = dConst.RULES[val]
      this.init()
    },

    init() {
      let textarea = document.getElementById('textarea')
      console.log(textarea.selectionStart)
      
      const put = this.$refs.textareaRef 
      const len = put.value.length   
      this.setSelectionRange(put, len, len)
    },

    findTextDesc(id, textValue, moveCount) {
      let ele = document.getElementById(id)
      let start = ele.selectionStart;

      let beforetext = ele.value.substring(0, start);
      let index = beforetext.lastIndexOf(textValue);
      if (index >= 0) {
          ele.setSelectionRange(index + moveCount, index + moveCount);
          ele.focus();
      }
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
