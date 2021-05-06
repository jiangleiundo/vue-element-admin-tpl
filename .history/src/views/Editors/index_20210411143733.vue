<template>
  <div>
    <div class="j-container">
      <div class="text-area">
        <el-input
          ref="leftRef"
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
      const put = this.$refs.textarea 
      console.log(put)
      
      const len = put.value.length   
      this.setSelectionRange(put, len, len)
    },

    setSelectionRange(input, selectionStart, selectionEnd) {
      console.log(input)
      
      if (input.setSelectionRange) {
        input.focus()
        input.setSelectionRange(selectionStart, selectionEnd)
      } else if (input.createTextRange) {
        const range = input.createTextRange()
        range.collapse(true)
        range.moveEnd('character', selectionEnd)
        range.moveStart('character', selectionStart)
        range.select()
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
