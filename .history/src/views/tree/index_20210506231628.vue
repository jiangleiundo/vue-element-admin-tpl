<!--
 * @Description: 树形组件
 * @Autor: J.L
 * @Date: 2021-04-11 12:05:53
 * @LastEditors: J.L
 * @LastEditTime: 2021-05-06 23:16:09
-->
<template>
  <div class="app-container">
    <tree-select v-model="value" multiple collapse-tags :data="options"></tree-select>

    <tree-select v-model="value" :data="options"></tree-select>
  </div>
</template>

<script>
import TreeSelect from '@/components/TreeSelect/index'
export default {
  name: 'Tree',
  components: {
    TreeSelect
  },
  data() {
    return {
      value: '',
      options: [{
        id: 1,
        label: 'Level one 1',
        children: [{
          id: 4,
          label: 'Level two 1-1',
          children: [{
            id: 9,
            label: 'Level three 1-1-1'
          }, {
            id: 10,
            label: 'Level three 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: 'Level one 2',
        children: [{
          id: 5,
          label: 'Level two 2-1'
        }, {
          id: 6,
          label: 'Level two 2-2'
        }]
      }, {
        id: 3,
        label: 'Level one 3',
        children: [{
          id: 7,
          label: 'Level two 3-1'
        }, {
          id: 8,
          label: 'Level two 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

