<template>
  <el-submenu v-if="menu.children && menu.children.length >= 1" :index="menu.id + ''">
    <template slot="title">
      <i :class="menu.iconcls" ></i>
      <span slot="title" :title=menu.opname class="w110">{{menu.opname}}</span>
    </template>
    <MenuTree v-for="item in menu.children" :key="item.id" :menu="item"></MenuTree>
  </el-submenu>
  <el-menu-item v-else :index="menu.id + ''" @click="handleRoute(menu)">
    <i :class="menu.iconcls"></i>
    <span slot="title" :title=menu.opname class="w100">{{menu.opname}}</span>
  </el-menu-item>

</template>

<script>
import { getIFrameUrl, getIFramePath } from '@/utils/iframe'
export default {
  name: 'MenuTree',
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleRoute (menu) {
      // 如果是嵌套页面，转换成iframe的path
    let path = getIFramePath(menu.homeurl)
    if(!path) {
      path = menu.homeurl
    }
    debugger
    // 通过菜单URL跳转至指定路由
    this.$router.push("/" + path)
    }
  }
}
</script>

<style scoped lang="scss">
 .el-submenu, .el-menu-item {
   /*background-color: #3c4b5a44;*/
 }
 /*.w110{*/
   /*display: inline-block;*/
   /*width: 110px;*/
   /*overflow: hidden;*/
   /*text-overflow: ellipsis;*/
   /*white-space: nowrap;*/
   /*cursor: pointer;*/
 /*}*/
  /*.w100{*/
    /*display: inline-block;*/
    /*width: 100px;*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*white-space: nowrap;*/
    /*cursor: pointer;*/
  /*}*/
 /*.w100:hover{*/
   /*display: inline-block;*/
   /*width: 100%;*/
   /*overflow: auto;*/
   /*white-space: normal;*/
 /*}*/
 .el-submenu__icon-arrow{
   right: 10px;
 }
</style>
