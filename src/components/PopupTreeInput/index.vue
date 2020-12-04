<template>
  <div>
    <el-popover ref="popover" :placement="placement" trigger="click">
      <el-tree
        :data="data"
        :props="props"
        class="asddd"
        node-key="nodeKey"
        ref="popupTree"
        @current-change="currentChangeHandle"
        :default-expand-all="defaultExpandAll"
        :highlight-current="true"
        :expand-on-click-node="true">
      </el-tree>
    </el-popover>
    <el-input v-model="prop" v-popover:popover :readonly="true" :placeholder="placeholder" style="cursor:pointer;"></el-input>
  </div>
</template>

<script>
export default {
  name: 'PopupTreeInput',
  props: {
    data: {
      type: Array,
      default: []
    },
    props: {
      type: Object,
      default: {}
    },
    prop: {
      type: String,
      default: ''
    },
    nodeKey: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '点击选择内容'
    },
    placement: {
      type: String,
      default: 'right-start'
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    currentChangeHandle: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
.asddd{
  -webkit-transform-origin: left center 0px;
  transform-origin: left center 0px;
  z-index: 2017;
  position: fixed;
  top: 181px;
  height: 320px;
  overflow: hidden;
  overflow-y: auto;
  min-width: 300px;
}
  .el-tree-node{
    position : sticky;
  }
</style>
