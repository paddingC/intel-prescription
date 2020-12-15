<template>
  <div class="menu-bar-container">
    <!-- logo -->
    <div class="logo" :style="{'background-color':themeColor}" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'" @click="$router.push('/')">
      <!-- <img v-if="collapse" src="@/assets/logo-inca.png"/> -->
      <div style="text-align: center">{{collapse?'':appName}}</div>
    </div>
    <el-input @keyup.enter.native="treeSelect"
      placeholder="请输入内容"
      suffix-icon="el-icon-search"
      v-model="input1" size="large"
    v-show="searchShow">
    </el-input>
    <!-- 导航菜单 -->
    <el-menu :default-active="active1" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'" :collapse="collapse" :collapse-transition="true" :unique-opened="true  " @open="handleopen" @close="handleclose" @select="handleselect" active-text-color="#409EFF">
      <!-- 导航菜单树组件，动态加载菜单 -->
      <menu-tree v-for="item in navTree" :key="item.id" :menu="item" ></menu-tree>
    </el-menu>
  </div>
</template>

<script>
  function getMenuID(arr, data, lastData = []) {
    if (typeof data === "object") {
      for (let i = 0; arr[i] !== undefined; i++) {
        for (let j = 0; data[j] !== undefined; j++) {
          if (arr[i] === data[j].opname) {
            lastData.push(data[j]);
          }
        }
      };
      for (let i = 0; data[i] !== undefined; i++) {
        getMenuID(arr, data[i].children, lastData);
      };
    }
    return lastData;
  }

  import {mapState} from 'vuex'
  import MenuTree from "@/components/MenuTree"
  export default {
    components: {
      MenuTree
    },
    data() {
      return {
        input1: '',
        active1: "1",
      }
    },
    computed: {
      ...mapState({
        appName: state => state.app.appName,
        themeColor: state => state.app.themeColor,
        collapse: state => state.app.collapse,
        navTree: state => state.menu.navTree
      }),
      mainTabs: {
        get() {
          return this.$store.state.tab.mainTabs
        },
        set(val) {
          this.$store.commit('updateMainTabs', val)
        }
      },
      mainTabsActiveName: {
        get() {return this.$store.state.tab.mainTabsActiveName},
        set(val) {this.$store.commit('updateMainTabsActiveName', val)}
      },
      searchShow(){
        if (this.collapse==true){
          return false
        }else {
          return  true
        }
      }
    },
    watch: {
      $route: 'handleRoute'
    },
    created() {
      this.handleRoute(this.$route)
    },
    methods: {
      handleopen() {
        // console.log('handleopen')
      },
      handleclose() {
        // console.log('handleclose')
      },
      handleselect(a, b) {
        // console.log('handleselect')
        this.active1=a
      },
      // 路由操作处理
      handleRoute(route) {
        // tab标签页选中, 如果不存在则先添加
        var tab = this.mainTabs.filter(item => item.name === route.name)[0]
        if (!tab) {
          tab = {
            name: route.name,
            title: route.name,
            icon: route.meta.icon
          }
          this.mainTabs = this.mainTabs.concat(tab)
        }
        this.mainTabsActiveName = tab.name
      },
      treeSelect() {
        let b =[this.input1]
        let searchItem =  getMenuID(b,this.navTree)
        let menuID = ''
        if (!searchItem.length) {
         this.$message.error('未查询到相关模块');
        }else {
         if (searchItem[0].parentid==null){
           menuID=searchItem[0].children[0].id+''
         }else {
           menuID=searchItem[0].id+''
         }
         this.active1=menuID
         setTimeout(()=>{
           var el = document.querySelector(".is-active");
           console.log(el)
           el.scrollIntoView();
         },500)
       }
      }
    }
  }
</script>

<style scoped lang="scss">
.menu-bar-container {
  position: fixed;
  top: 0px;
  left: 0;
  bottom: 0;
  z-index: 1020;
  .el-menu {
    position:absolute;
    top: 60px;
    bottom: 0px;
    text-align: left;
    // background-color: #2968a30c;
  }
  .logo {
    position:absolute;
    top: 0px;
    height: 60px;
    line-height: 60px;
    background: #545c64;
    cursor:pointer;
    img {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        margin: 10px 10px 10px 10px;
        float: left;
    }
    div {
      font-size: 25px;
      color: white;
      text-align: left;
      /*padding-left: 20px;*/
    }
  }
  .menu-bar-width {
    width: 240px;
  }
  .menu-bar-collapse-width {
    width: 65px;
  }
}.menu-bar-container .el-menu{
   position: absolute;
   top: 101px;
   bottom: 0px;
   text-align: left;
   height: auto;
   overflow-y: scroll;
   overflow-x:hidden;
 }
/*.el-menu::-webkit-scrollbar {*/
  /*display: none;*/
/*}*/

.custom-scrollbar {
  height: 70px;
  overflow-y: scroll;
}
/* To style the document scrollbar, remove `.custom-scrollbar` */
.el-menu::-webkit-scrollbar {
  width: 8px;
}
.el-menu::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
.el-menu::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}



.el-input--large{
  top: 60px;
  width: 240px;
}
</style>
