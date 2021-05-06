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
          @change="handleChange"
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
      <el-button type="primary" size="mini" @click="handleLeft('if')">如果</el-button>
      <el-button type="primary" size="mini" @click="handleLeft('low')">小于</el-button>
      <el-button type="primary" size="mini" @click="handleLeft('great')">大于</el-button>
      <el-button type="primary" size="mini" @click="handleLeft('brace')">{...}</el-button>
      <el-button type="primary" size="mini" @click="handleRes">结果输出</el-button>

      <el-button type="primary" size="mini" @click="handleTxt('xyCpType')">营销产品类型</el-button>
      <el-button type="primary" size="mini" @click="handleTxt('scArea')">实测面积</el-button>
      <el-button type="primary" size="mini" @click="handleTxt('ysDate')">预售日期</el-button>
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
      right: '',
      isChanged: false,
      isLookedCodeNewest: false,

    }
  },
  computed: {},
  created() {
  },
  mounted() {
    let vm = this
    document.onkeydown = function(e) { // 改方法中的this指向document
      e = e || window.event
      if(e.keyCode === 9) {        
        vm.insertText(" ")
        vm.preventDefault(e)
      }
    }
  },
  methods: {
    handleChange() {
      this.isChanged = true
      this.isLookedCodeNewest = false
    },

    handleRes() {
      console.log(this.left)
    },

    handleTxt(val) {
      let str = dConst.DICT[val]
      this.insertText(str)
    },

    handleLeft(val) {
      let str = dConst.RULES[val]
      // this.left = dConst.RULES[val]
      this.insertText(str)
    },

    autoPlaceFocus (str) {
      if (typeof str !== "string") {
        str = str.toString()
      }
      if (str.indexOf("如果") != -1 || str.indexOf("round") != -1 || str == "()") {
        this.findTextDesc("textarea", "(", 1);
      }

      if (str == "{\n\n}") {
        this.findTextDesc("textarea", "{", 2);
      }
    },

    insertText(text) {
      let ele = document.getElementById('textarea')
      ele.focus()

      let start = ele.selectionStart
      let end = ele.selectionEnd
      ele.value = ele.value.substring(0, start) + text + ele.value.substring(end, ele.value.length)
      ele.setSelectionRange(start + text.length, start + text.length)
      ele.focus()

      this.isChanged = true
      this.isLookedCodeNewest = false
      this.autoPlaceFocus(text)
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
    },

    preventDefault (e) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
    },
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
