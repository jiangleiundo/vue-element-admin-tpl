<!--
 * @Description: 一个优雅的树形选择组件 （单选|多选）
 * @Autor: J.L
 * @Date: 2021-05-06 23:05:46
 * @LastEditors: J.L
 * @LastEditTime: 2021-05-06 23:19:31
-->
<template>
  <el-select
    ref='selTreeRef'
    v-model='selectId'
    class="tree-select"
    popper-class="tree-opt-box"
    :props='defProps'
    :multiple="multiple"
    :collapseTags="collapseTags"
    :clearable="clearable"
    :placeholder='placeholder'
    @clear='handleClear'
    @remove-tag="handleRemoveTag">
    
    <!-- 设置一个空option 不然selectData为空下拉不显示 -->
    <el-option hidden value="" label="" key="s1"></el-option>
    <el-option hidden v-for="(item, index) in selectData" :value="item[cId]" :label="item[cLabel]" :key="'s2'+index"></el-option>
    
    <el-tree
      ref="treeRef"
      :data='data'
      :show-checkbox="multiple"
      :node-key="cId"
      :props='defProps'
      :expand-on-click-node='false'
      :check-on-click-node='true'
      @node-click='handleNodeClick'
      @check="handCheck"
    >
    </el-tree>
  </el-select>
</template>
<script>
import {cloneDeep, castArray} from 'lodash'
export default {
    name: 'TreeSelect',
    props: {
      defProps: {
        type: Object,
        default:() => {
          return {
            children: 'children',
            label: 'label',
            id: 'id'
          }
        }
      },
      value: [String, Number, Object, Array],
      multiple: Boolean, // 默认 false
      clearable: Boolean, // 默认 false
      collapseTags: Boolean, // 默认 false
      data: {  // tree数据
        type: Array,
        default: () => {
          return []
        }
      },
      placeholder: {
        type: String,
        default: '请选择'
      }
    },
    data () {
      return {
        selectId: '',
        selectData: [],
        cId: this.defProps['id'],
        cLabel: this.defProps['label'],
      }
    },
    mounted () {
      this.$nextTick(_ => {
        if(!this.value) return 
        this.setDefaultValue(this.value)
      })
    },
    watch: {
      value: function (v) {
        this.setDefaultValue(v)
      }
    },
    methods: {
      /**
       * @Description: 返显值
       * @param {*} v
       * @return {*}
       */
      setDefaultValue (v) {
        if (this.multiple) {
          v = castArray(v)
          this.$refs.treeRef.setCheckedKeys(v)
          this.handCheckSetValue()
        } else {
          this.$refs.treeRef.setCurrentKey(v)
          this.$nextTick(_ => {
            this.handleNodeSetValue()
          })
        }
      },
      
      /**
       * @Description: 单选点击事件
       * @param {*} data
       * @return {*}
       */
      handleNodeClick (data) {
        if (this.multiple) return
        // 隐藏下拉框
        this.$refs.selTreeRef.blur()
        this.$emit('input', this.handleNodeSetValue())
      },

      /**
       * @Description: 单选设置值
       * @param {*}
       * @return {*}
       */
      handleNodeSetValue () {
        let cNode = this.$refs.treeRef.getCurrentNode()
        this.selectData = cNode ? [cNode] : []
        let val = cNode ? cNode[this.cId] : null
        this.selectId = val
        return val
      },

      /**
       * @Description: 多选勾选
       * @param {*} curNode
       * @param {*} checkedNodes
       * @return {*}
       */
      handCheck (curNode, checkedNodes) {
        if (!this.multiple) return
        this.$emit('input', this.handCheckSetValue())
      },

      /**
       * @Description: 多选设置值
       * @param {*}
       * @return {*}
       */
      handCheckSetValue () {
        this.selectData = cloneDeep(this.$refs.treeRef.getCheckedNodes(true, false))
        let val = this.selectData.map(item => item[this.cId])
        val = castArray(val)
        this.selectId = val
        return val
      },

      /**
       * @Description: 清空
       * @param {*}
       * @return {*}
       */
      handleClear () {
        this.$emit('input', this.multiple ? [] : null)
      },

      /**
       * @Description: 多选模式移除tag
       * @param {*} v
       * @return {*}
       */
      handleRemoveTag (v) {
        this.$emit('input', this.selectId)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .tree-select {
    ::v-deep.el-input--medium .el-input__inner {
      height: 30px;
      line-height: 30px;
      border-radius: 6px;
      border: 1px solid #eaeaea;
      color: #464646;
      padding-left: 5px;
      &:focus {
        border-color: #5587f0;
      }
    }
    ::v-deep.el-icon-arrow-up:before {
      content: '\e78f';
    }
    ::v-deep.el-input--medium .el-input__icon {
      line-height: 30px;
    }
  }
  .tree-opt-box {
    .el-tree {
      border-radius: 6px;
      color: #464646;
      ::v-deep.el-tree-node__content {
        height: 30px;
        padding-right: 12px;
      }
    }

    // 隐藏option
    .el-select-dropdown__item.selected{
      display: none !important;
    }
  }
</style>
<style lang="scss">
  .tree-opt-box {
    overflow: hidden !important;
  }
</style>
