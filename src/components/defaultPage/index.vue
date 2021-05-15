/*
 * @Description: table的暂无数据图片页面
 * @Author: J.
 * @Date: 2021-05-16 00:06:11
 * @LastEditors: J.
 * @LastEditTime: 2021-05-16 00:06:32
 */

<template>
  <div class="error-content-style">
    <div>
      <svg-icon :icon-class="customClass"></svg-icon>
      <div class="text">
        <b>{{ text }}</b>
      </div>
      <p>{{ remarkText }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DefaultErrorPage',
  components: {},
  directives: {},
  props: {
    // svg图片 名称   默认是空数据
    iconClass: {
      default: 'data_empty',
      type: String
    },
    // 总的显示文字配置
    showText: {
      type: Object,
      default: () => ({
        text: '暂无数据',
        remarkText: ''
      })
    },
    // 默认样式， 传类型 即可
    type: {
      type: String,
      default: 'emptyData'
    },
    // 备注 显示  与type 一起传
    remark: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      customClass: this.iconClass || '',
      text: this.showText.text || '',
      remarkText: this.showText.remarkText || '',
      config: {
        emptyData: {
          iconClass: 'data_empty',
          text: '暂无数据'
        },
        networkError: {
          iconClass: 'net-work-error',
          text: '网络异常'
        },
        systemError: {
          iconClass: 'system_error',
          text: '系统报错'
        }
      }
    }
  },
  computed: {},
  watch: {
    iconClass: function(val) {
      this.customClass = val
    },
    remark: function(val) {
      this.remarkText = val || ''
    },
    showText: {
      deep: true,
      handler(val) {
        const {text, remarkText} = val
        this.text = text || ''
        this.remarkText = remarkText || ''
      }
    },
    type: function(val) {
      if (val) {
        const {text, iconClass} = this.config[val]
        this.text = text || ''
        this.customClass = iconClass || ''
      }
    }
  },
  created() {},
  mounted() {},
  filter: {},
  methods: {
    // ⽅法调⽤不需要注释，⽅法定义需要注释
  }
}
</script>
<style lang="scss" scoped>
.error-content-style {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .svg-icon {
    width: 202px;
    height: 146px;
    margin-bottom: 10px;
  }
  div > .text {
    height: 22px;
    line-height: 22px;
    margin: 0;
    padding: 0;
    text-align: center;
    b {
      display: inline-block;
      height: 22px;
      font: 14px/22px 'PingFang SC';
    }
  }
  p {
    font: 14px/20px 'PingFang SC';
    color: #848484;
  }
}
</style>
<style>
.el-table__empty-text {
  line-height: unset;
}
.el-table__empty-block {
  width: 100% !important;
  height: 100% !important;
}
</style>
