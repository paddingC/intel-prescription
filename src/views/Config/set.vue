<template>
  <div  style="margin-bottom: 20px">
    <div class="box1">
      <h3>审方设置</h3>
      <div style="width: 280px">
        <el-form ref="form" :model="formSet" label-width="180px">
          <el-form-item label="执业药师最低审方时长(S)">
            <el-input v-model="formSet1.lowesttime" @blur="blurTime" style="width: 286px"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="box2">
      <h3>监管设置</h3>
      <div style="text-align: left">
        <el-form ref="form" :model="formSet" :inline="true" label-width="88px">
          <el-form-item>
            <el-button type="primary" size="mini" @click="chooseEvent">选择监管单位</el-button>
          </el-form-item>
          <div v-for="(item,index) in listArr" style="line-height: 42px;">
            <span style="width: 700px;display: inline-block;">{{item.regulator}}</span>
            <el-button size="mini" type="danger" @click="delEvent(item.regulatorid,item.relid)">移除</el-button>
          </div>
          <div style="margin-top: 20px">
            <el-form-item label="联系人">
              <el-input v-model="formSet.contactman" style="width: 286px"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="formSet.telephone" style="width: 286px"></el-input>
            </el-form-item>
            <el-form-item label="入驻日期">
              <el-input v-model="formSet.enterdate" readonly style="width: 286px"></el-input>
            </el-form-item>
          </div>
          <div style="margin-top: 10px">
            <el-form-item label="省">
              <el-select v-model="formSet.province" @change="provSel" @visible-change="provE" placeholder="请选择" style="width: 286px">
                <el-option
                  v-for="item in provinces"
                  :key="item.provinceid"
                  :label="item.provincename"
                  :value="item.provinceid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="市">
              <el-select v-model="formSet.city" @change="citySel" @visible-change="cityE" placeholder="请选择" style="width: 286px">
                <el-option
                  v-for="item in citys"
                  :key="item.cityid"
                  :label="item.cityname"
                  :value="item.cityid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="县(区)">
              <el-select v-model="formSet.country" @change="countrySel" @visible-change="counE" placeholder="请选择" style="width: 286px">
                <el-option
                  v-for="item in countrys"
                  :key="item.countryid"
                  :label="item.countryname"
                  :value="item.countryid">
                </el-option>
              </el-select>
            </el-form-item>
            <div style="margin-top: 10px">
              <el-form-item label="详细地址">
                <el-input v-model="formSet.address" style="width: 674px"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <!--<div class="box3">-->
      <!--<h3>接口设置</h3>-->
    <!--</div>-->
    <div class="box4">
      <h3>微客户端</h3>
      <div style="text-align: left">
        <p>门店版本：{{doorVersion}}</p>
        <p>总部版本：{{cenVersion}}</p>
        <div>
          <a target="_blank" :href="downloadlink"><el-button size="mini" type="primary" @click.sync="loadlink">进入下载页面</el-button></a>
        </div>
      </div>
    </div>
    <div>
      <el-button type="primary" @click.sync="saveSet">保存</el-button>
    </div>
    <!--订阅监管单位-->
    <el-dialog title="订阅监管单位" :visible.sync="dialogTable">
      <elx-editable :data.sync="gridData" ref="elxEditable1" border :header-cell-style="rowClass">
        <elx-editable-column type="selection" width="55"></elx-editable-column>
        <elx-editable-column prop="provincename" label="省"></elx-editable-column>
        <elx-editable-column prop="cityname" label="市"></elx-editable-column>
        <elx-editable-column prop="countryname" label="县(区)"></elx-editable-column>
        <elx-editable-column prop="regulator" label="监管单位"></elx-editable-column>
      </elx-editable>
      <!--分页-->
      <div class="block" style="margin: 20px; text-align: right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageVO.currentPage"
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="pageVO.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageVO.totalResult">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTable = false">取 消</el-button>
          <el-button type="" @click="syncList">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import { regionData,CodeToText } from 'element-china-area-data'
  export default {
    data(){
      return{
        companyid: sessionStorage.getItem('companyid'),
        formSet1:{
          lowesttime: 10
        },
        dateOptions: regionData,
        selectedOptions: [],
        formSet:{},
        listArr:[],
        provinces:[],
        province_id: '',
        citys:[],
        city_id:'',
        countrys:[],
        dialogTable: false,
        gridData:[],

        pageVO:{
          pageSize:10,
          currentPage:1,
          totalResult:0
        },
        nameChange:[],
        doorVersion:'',
        cenVersion:'',
        downloadlink:'',
        linkaddress :''
      }
    },
    mounted(){
      this.getForm();
      this.getBan();
      this.provE();
    },
    methods:{
      blurTime(){
      },
      getBan(){
        this.$api.set.selectVersion({}).then(res=>{
          if(res.status == 200){
            console.log(res);
            this.doorVersion = res.data.s_version;
            this.cenVersion = res.data.c_version
            this.downloadlink = res.data.downloadlink;
          }
        })
      },
      rowClass(){
        return 'background: #e3e3e3;color:#555;border-color:#dddfe7;height:50px;font-size:16px;'
      },
      getForm(){
        this.$api.set.getconfig({
          companyid: this.companyid
        }).then(res=>{
          if(res.status == 200){
            this.formSet = res.data;
            this.listArr = res.data.list;
            this.formSet1.lowesttime = res.data.lowesttime;

            this.nameChange = res.data;
          }
        })
      },
      chooseEvent(){
        this.dialogTable = true;
        this.$api.set.select({
          pageIndex: this.pageVO.currentPage,
          pageSize: this.pageVO.pageSize,
          companyid: this.companyid,
        }).then(res=>{
          if(res.status == 200){
            console.log(res);
            this.gridData = res.data.list;
            this.pageVO.totalResult = res.data.info;
          }
        })
      },
      syncList(){
        let syncrows = this.$refs.elxEditable1.getSelecteds();
        console.log(syncrows);
        if(syncrows.length>0){
          var arr=[]
          for(var i=0;i<syncrows.length;i++){
            arr.push({regulatorid:syncrows[i].regulatorid});
          }
          this.$api.set.addreg({
            companyid: this.companyid,
            ids:arr
          }).then(res=>{
            if(res.status == 200){
              this.getForm();
              this.dialogTable = false;
              this.$message.success("成功添加监管单位")
            }
          })
        }else{
          this.$message('请选择一条数据')
        }
      },
      delEvent(val1,val2){
        console.log(val1,val2);
        this.$api.set.delreg({
          regulatorid: val1,
          relid: val2
        }).then(res=>{
          if(res.status == 200){
            this.getForm();
            this.$message.success("成功删除监管单位")
          }
        })
      },
      provE(){
        this.$api.set.getprovince({}).then(res=>{
          if(res.status == 200){
            this.provinces = res.data;
          }
        })
      },
      provSel(val){//省
        this.province_id = val;
        this.formSet.provinceid = val;
        console.log(val)
      },
      cityE(){
        if(this.province_id == ''){
          this.province_id = this.formSet.provinceid
        }
        this.$api.set.getcity({provinceid: this.province_id}).then(res=>{
          if(res.status == 200){
            this.citys = res.data;
          }
        })
      },
      citySel(val){//市
        console.log(val)
        this.city_id = val;
        this.formSet.cityid = val;
      },
      counE(){
        if(this.city_id==''){
          this.city_id = this.formSet.cityid
        }
        this.$api.set.getcountry({cityid: this.city_id}).then(res=>{
          if(res.status == 200){
            this.countrys = res.data;
          }
        })
      },
      countrySel(val){//县(区)
        this.formSet.countryid = val;
      },
      saveSet(){
        if(this.formSet1.lowesttime<0){
          this.$message('请输入审方时长');
          return false;
        }
        if(this.formSet1.lowesttime==''){
          this.formSet1.lowesttime = 0;
        }
        this.$api.set.saveconfig({
          companyid: this.companyid,
          lowesttime: this.formSet1.lowesttime,
          provinceid: this.formSet.provinceid,
          cityid:this.formSet.cityid,
          countryid:this.formSet.countryid,
          address: this.formSet.address,
          contactman: this.formSet.contactman,
          telephone: this.formSet.telephone
        }).then(res=>{
          if(res.status == 200){
            this.getForm();
            this.$message.success("保存成功")
          }
        })
      },
      handleSizeChange(pageSize) {
        this.pageVO.pageSize = pageSize;
        this.chooseEvent();
      },
      handleCurrentChange(currentPage) {
        this.pageVO.currentPage = currentPage;
        this.chooseEvent();
      },
    }
  }
</script>

<style scoped>
.box1{

}.box1 h3,
 .box2 h3,
 .box3 h3,
 .box4 h3{
  width: 756px;
  height: 42px;
  color: #333;
  text-align: left;
  text-indent: 24px;
  line-height: 42px;
  border-left: solid 3px #00142a;
  background: #efefef;
 }
</style>
