<template>
  <div class="headbar" :style="{'background':themeColor}"
       :class="$store.state.app.collapse?'position-collapse-left':'position-left'">
    <!-- 导航收缩 -->
    <span class="hamburg">
      <el-menu class="el-menu-demo" :background-color="themeColor" text-color="#fff" :active-text-color="themeColor"
               mode="horizontal">
        <el-menu-item index="1" @click="onCollapse"><hamburger :isActive="collapse"></hamburger></el-menu-item>
      </el-menu>
    </span>
    <!-- 导航菜单 -->
    <span class="navbar">
      <el-menu :default-active="activeIndex" class="el-menu-demo"
               :background-color="themeColor" text-color="#fff" active-text-color="#ffd04b" mode="horizontal"
               @select="selectNavBar()">
        <el-menu-item index="1" @click="$router.push('/')"><i class="fa fa-home fa-lg"></i>  </el-menu-item>
        <!--<el-menu-item index="2" @click="openWindow('https://gitee.com/liuge1988/kitty')">{{$t("common.projectRepo")}}</el-menu-item>-->
        <!--<el-menu-item index="3" @click="openWindow('https://gitee.com/liuge1988/kitty/wikis/Home')">{{$t("common.doc")}}</el-menu-item>-->
        <!--<el-menu-item index="4" @click="openWindow('https://www.cnblogs.com/xifengxiaoma/')">{{$t("common.blog")}}</el-menu-item>-->
      </el-menu>
    </span>
    <!-- 工具栏 -->
    <span class="toolbar">
      <el-menu class="el-menu-demo" :background-color="themeColor" :text-color="themeColor"
               :active-text-color="themeColor" mode="horizontal">
        <el-menu-item index="1">
          <!-- 主题切换 -->
          <theme-picker class="theme-picker" :default="themeColor" @onThemeChange="onThemeChange"></theme-picker>
        </el-menu-item>
        <!--<el-menu-item index="2" v-popover:popover-lang>-->
        <!--&lt;!&ndash; 语言切换 &ndash;&gt;-->
        <!--<li style="color:#fff;" class="fa fa-language fa-lg"></li>-->
        <!--<el-popover ref="popover-lang" placement="bottom-start" trigger="click" v-model="langVisible">-->
        <!--<div class="lang-item" @click="changeLanguage('zh_cn')">简体中文</div>-->
        <!--<div class="lang-item" @click="changeLanguage('en_us')">English</div>-->
        <!--</el-popover>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="3" v-popover:popover-message>-->
        <!--&lt;!&ndash; 我的私信 &ndash;&gt;-->
        <!--<el-badge :value="5" :max="99" class="badge" type="success">-->
        <!--<li style="color:#fff;" class="fa fa-envelope-o fa-lg"></li>-->
        <!--</el-badge>-->
        <!--<el-popover ref="popover-message" placement="bottom-end" trigger="click">-->
        <!--<message-panel></message-panel>-->
        <!--</el-popover>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="4" v-popover:popover-notice>-->
        <!--&lt;!&ndash; 系统通知 &ndash;&gt;-->
        <!--<el-badge :value="4" :max="99" class="badge" type="success">-->
        <!--<li style="color:#fff;" class="fa fa-bell-o fa-lg"></li>-->
        <!--</el-badge>-->
        <!--<el-popover ref="popover-notice" placement="bottom-end" trigger="click">-->
        <!--<notice-panel></notice-panel>-->
        <!--</el-popover>-->
        <!--</el-menu-item>-->
        <el-menu-item index="5" v-popover:popover-personal>
          <!-- 用户信息 -->
          <span class="user-info"><img :src="user.avatar"/>{{user.name}}</span>
          <el-popover ref="popover-personal" placement="bottom-end" trigger="click" :visible-arrow="false">
            <personal-panel @changePwd="showDialog" :user="user"></personal-panel>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>

    <!--修改密码弹窗-->
    <el-dialog title="修改密码" :modal="true" :append-to-body="true" :visible.sync="dialogFormVisible">
      <div>
        <el-form :model="resetForm" status-icon :rules="resetFormRules" ref="resetForm" label-width="100px">
          <el-form-item label="旧密码" prop="oldpwd">
            <el-input type="password" v-model="resetForm.oldpwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpwd">
            <el-input type="password" v-model="resetForm.newpwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="renewpwd">
            <el-input type="password" v-model="resetForm.renewpwd" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="changePassword" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>


  </div>

</template>

<script>
  import {mapState} from 'vuex'
  import mock from "@/mock/index"
  import Hamburger from "@/components/Hamburger"
  import ThemePicker from "@/components/ThemePicker"
  // import LangSelector from "@/components/LangSelector"
  import Action from "@/components/Toolbar/Action"
  import NoticePanel from "@/views/Core/NoticePanel"
  // import MessagePanel from "@/views/Core/MessagePanel"
  import PersonalPanel from "@/views/Core/PersonalPanel"

  export default {
    components: {
      Hamburger,
      ThemePicker,
      // LangSelector,
      Action,
      NoticePanel,
      // MessagePanel,
      PersonalPanel
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入新密码'))
          this.pwdFlage.newpwd = false
          console.log(this.rex.test(value))
        } else if (!this.rex.test(value)) {
          this.pwdFlage.newpwd = false
          callback(new Error('密码以字母和数字和特殊符号组合（特殊符号为：!@#$%^& ）,且长度大于等于6'))
        } else {
          this.pwdFlage.newpwd = true
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          this.pwdFlage.renewpwd = false
          callback(new Error('请再次输入密码'))
        } else if (value !== this.resetForm.newpwd) {
          this.pwdFlage.renewpwd = false
          callback(new Error('两次输入密码不一致!'))
        } else {
          this.pwdFlage.renewpwd = true
          callback()
        }
      }
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          this.pwdFlage.oldpwd = false
          callback(new Error('请输入密码'))
        } else {
          this.pwdFlage.oldpwd = true
          callback()
        }
      }
      return {
        dialogFormVisible: false,
        loading: false,
        user: {
          name: "admin",
          avatar: "",
          role: "超级管理员",
          registeInfo: "注册时间：2018-12-20 "
        },
        activeIndex: '1',
        langVisible: false,
        changePwdFlage: false,
        resetForm: {
          newpwd: '',
          renewpwd: '',
          oldpwd: '',
        },
        resetFormRules: {
          newpwd: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          oldpwd: [
            {required: true, validator: validatePass3, trigger: 'blur'}
          ],
          renewpwd: [
            {required: true, validator: validatePass2, trigger: 'blur'}
          ]
        },
        pwdFlage: {
          renewpwd: false,
          oldpwd: false,
          newpwd: false,
        },
        rex: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&])[\da-zA-Z~!@#$%^&*]{6,}$/
      }
    },
    methods: {
      cancel() {
        this.dialogFormVisible = false
        this.resetForm = {
          newpwd: '',
          renewpwd: '',
          oldpwd: '',
        }
      },
      changePassword() {
        let that = this
        let falge = true
        this.loading = true
        Object.keys(that.pwdFlage).forEach(function (key) {
          if (that.pwdFlage[key] == false) {
            falge = false
            that.loading = false
            that.$message({message: '请正确填写相关信息', type: 'warning'})
            return false
          }
        })
        if (falge) {
          let loginid = sessionStorage.getItem('user')
          let pageResule = {
            loginid: loginid,
            loginpwd: this.resetForm.newpwd
          }
          console.log(pageResule)
          this.$api.user.updatepassword(pageResule).then((res) => {
            if (res.status == 200) {
              setTimeout(() => {
                this.$message({message: '请重新登录', type: 'success'})
                sessionStorage.removeItem('user')
                this.$router.push('/login')
              }, 3500)
            } else {
              this.loading = false
              this.$message({message: '操作失败, ' + res.msg, type: 'error'})
            }
          })
        }
      },
      showDialog(val) {
        this.dialogFormVisible = val
      },
      openWindow(url) {
        window.open(url)
      },
      selectNavBar(key, keyPath) {
        console.log(key, keyPath)
      },
      // 折叠导航栏
      onCollapse: function () {
        this.$store.commit('onCollapse')
      },
      // 切换主题
      onThemeChange: function (themeColor) {
        this.$store.commit('setThemeColor', themeColor)
      },
      // 语言切换
      changeLanguage(lang) {
        lang === '' ? 'zh_cn' : lang
        this.$i18n.locale = lang
        this.langVisible = false
      }
    },
    mounted() {
      this.sysName = "INCA Platform"
      var user = sessionStorage.getItem("user")
      if (user) {
        this.user.name = user
        this.user.avatar = require("@/assets/logo-inca.png")
      }
    },
    computed: {
      ...mapState({
        themeColor: state => state.app.themeColor,
        collapse: state => state.app.collapse
      })
    }
  }
</script>

<style scoped lang="scss">
  .headbar {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1020;
    height: 60px;
    line-height: 60px;
    border-color: rgba(180, 190, 190, 0.8);
    border-left-width: 1px;
    border-left-style: solid;
  }

  .hamburg, .navbar {
    float: left;
  }

  .toolbar {
    float: right;
  }

  .lang-item {
    font-size: 16px;
    padding-left: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
    cursor: pointer;
  }

  .lang-item:hover {
    font-size: 18px;
    background: #b0d6ce4d;
  }

  .user-info {
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      margin: 10px 0px 10px 10px;
      float: right;
    }
  }

  .badge {
    line-height: 18px;
  }

  .position-left {
    left: 240px;
  }

  .position-collapse-left {
    left: 65px;
  }

  .el-form-item {
    margin-bottom: 40px;
  }
</style>
