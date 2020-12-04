<template>
  <div v-loading="loading">
    <div class="topBox">
      <el-form :model="formInline" size="medium " class="base-table6-form" :inline="true"
               style="width: 80%;text-align: left;display: inline-block">
        <div>
              <td class="textWidth">会员卡号</td>
              <td>
                <el-input v-model="formInline.insidercardno" class="inputWidth"></el-input>
              </td>
              <td class="textWidth">手机号码</td>
              <td>
                <el-input v-model="formInline.insiderphone" class="inputWidth"></el-input>
              </td>
              <td class="textWidth">患者姓名</td>
              <td>
                <el-input v-model="formInline.name" class="inputWidth"></el-input>
              </td>
        </div>
        <div v-show="inputMore">
          <div style="margin-top: 20px">
            <td class="textWidth">开方医生</td>
            <td>
              <el-input v-model="formInline.doctorname" class="inputWidth"></el-input>
            </td>
            <td class="textWidth">开方开始时间</td>
            <td>
              <el-date-picker type="date" v-model="formInline.beginprescribingdate" class="inputWidth"
                              @change="selectTimeB"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </td>
            <td class="textWidth">开方结束时间</td>
            <td>
              <el-date-picker type="date" v-model="formInline.endprescribingdate" class="inputWidth"
                              @change="selectTimeE"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </td>
          </div>
          <div style="margin-top: 20px">
            <td class="textWidth">开方状态</td>
            <td>
              <el-select v-model="formInline.prescribingstatus" placeholder="请选择" class="inputWidth">
                <el-option
                  v-for="item in stype"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
          </div>
        </div>
    </el-form>
    <el-form style="float: right;width: 20%;">
      <el-form-item>
        <el-button type="primary" @click="searchEvent">查询</el-button>
        <el-button @click="emptyEvent">清空</el-button>
      </el-form-item>
    </el-form>
    <h3 @click="showHideForm" :class="inputMore==true?'arrow_active':'arrow_img'" class="arrow_img"></h3>
  </div>
    <!--表单内容-->
    <elx-editable height="348"
      ref="formList" border
      :data.sync="tableData" :header-cell-style="rowClass"
      @current-change="rowChose">
      <elx-editable-column type="selection" width="55"></elx-editable-column>
      <elx-editable-column type="index" width="55"></elx-editable-column>
      <elx-editable-column prop="prescribingid" width="88" label="开方ID"></elx-editable-column>
      <elx-editable-column prop="patient" width="88" label="患者姓名"></elx-editable-column>
      <elx-editable-column prop="idcard" width="88" label="身份证号"></elx-editable-column>
      <elx-editable-column prop="sex" label="性别"></elx-editable-column>
      <elx-editable-column prop="age" label="年龄"></elx-editable-column>
      <elx-editable-column prop="insidercardno" width="88" label="会员卡号"></elx-editable-column>
      <elx-editable-column prop="insiderphone" width="88" label="手机号码"></elx-editable-column>
      <elx-editable-column prop="diagnosis" label="诊断"></elx-editable-column>
      <elx-editable-column prop="prescribingstatus" width="88" label="开方状态" :formatter="formatterstatus"></elx-editable-column>
      <elx-editable-column prop="prescribingdate" width="88" label="开方日期" :formatter="formatterDate"></elx-editable-column>
      <elx-editable-column prop="doctorname" width="88" label="开方医生"></elx-editable-column>
      <elx-editable-column prop="medicalinstitutions" width="88" label="医疗机构"></elx-editable-column>
      <elx-editable-column prop="inputmanname" label="录入人"></elx-editable-column>
      <elx-editable-column prop="inputdate" width="88" label="录入日期"></elx-editable-column>
      <elx-editable-column prop="deptname" width="88" label="零售门店"></elx-editable-column>
      <elx-editable-column prop="zl" label="开方资料" width="410">
        <template slot-scope="scope">
          <el-button size="small" type="primary" v-if="scope.row.prescribingimgurl" @click="cfPic(scope.row)">开方图片</el-button>
          <el-button size="small" type="primary" v-else disabled>开方图片</el-button>
          <el-button size="small" type="primary" v-if="scope.row.prescribingvideourl" @click="sfMv(scope.row)">开方视频</el-button>
          <el-button size="small" type="primary" v-else disabled>开方视频</el-button>
          <el-button size="small" type="primary" v-if="scope.row.msg == '1'" @click="sfMsg(scope.row)">开方消息</el-button>
          <el-button size="small" type="primary" v-else disabled>开方消息</el-button>
        </template>
      </elx-editable-column>
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
    <el-dialog :title="title" :visible.sync="dialogData" v-loading="diaLoading" class="dialogTit">
      <el-form v-show="active===1" size="medium" style="height: 400px">
        <el-form-item>
          <a target="_blank" :href="tp">
            <img :src="tp" style="height: 380px;width: 100%;">
          </a>
        </el-form-item>
      </el-form>
      <el-form v-show="active===2" size="medium" style="height: 400px">
        <el-form-item>
          <a target="_blank" :href="jp">
            <img :src="jp" style="height: 380px;width: 100%;">
          </a>
        </el-form-item>
      </el-form>
      <el-form v-show="active===3" size="medium" style="height: 400px">
        <video :src="mv" width="100%" height="380" controls="controls"></video>
      </el-form>
      <el-form v-show="active===4" size="medium" style="height: 400px;overflow: auto">
        <div style="font-size: 14px;text-align: left" v-for="(item,index) in msg" :key="index">
          <p>{{item.credate}}</p>
          <p>{{item.fromuser}}&nbsp;&nbsp;发送给&nbsp;&nbsp;{{item.touser}}：{{item.message}}</p>
        </div>
      </el-form>
    </el-dialog>
    <!--细单内容-->
    <div v-loading="loading2">
      <elx-editable  border height="300"
                     ref="childList"  :header-cell-style="rowClass"
                     highlight-current-row
                    :data.sync="childData">
        <elx-editable-column type="index" width="55"></elx-editable-column>
        <elx-editable-column prop="goodsid" label="货品ID"></elx-editable-column>
        <elx-editable-column prop="goodsname" label="通用名"></elx-editable-column>
        <elx-editable-column prop="goodsqty" label="数量"></elx-editable-column>
        <elx-editable-column prop="yfyl" label="用法用量"></elx-editable-column>
        <elx-editable-column prop="currencyname" label="商品名"></elx-editable-column>
        <elx-editable-column prop="goodstype" label="规格"></elx-editable-column>
        <elx-editable-column prop="goodsunit" label="基本单位"></elx-editable-column>
        <elx-editable-column prop="medicinetypename" label="剂型"></elx-editable-column>
        <elx-editable-column prop="approvedocno" label="批准文号"></elx-editable-column>
      </elx-editable>
      <!--分页-->
      <div class="block" style="margin: 20px; text-align: right">
        <el-pagination
          @size-change="handleSizeChangeDtl"
          @current-change="handleCurrentChangeDtl"
          :current-page="pageDtl.currentPage"
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="pageDtl.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageDtl.totalResult">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import XEUtils from 'xe-utils'
export default {
  data(){
    return{
      companyid: sessionStorage.getItem('companyid'),
      loading: false,
      loading2: false,
      formInline:{
        insidercardno:'',
        insiderphone:'',
        name:'',
        doctorname:'',
        prescribingstatus:'',
        beginprescribingdate:'',
        endprescribingdate:''
      },
      pageVO:{
        pageSize:10,
        currentPage:1,
        totalResult:0
      },
      pageDtl:{
        pageSize:10,
        currentPage:1,
        totalResult:0
      },
      tableData:[],
      childData: [],
      dialogData: false,
      active:1,
      title:'',
      tp:'',
      jp:'',
      mv:'',
      msg:[],
      reid: sessionStorage.getItem('regulatorid'),
      stype:[{label:'未开方',value:1},{label:'已开方',value:2}],
      diaLoading: false,
      inputMore: false
    }
  },
  mounted(){
    this.getFindDocList();
  },
  methods:{
    rowClass(){
      return 'background: #f3f3f3;color:#555;border-color:#dddfe7;height:50px;'
    },
    showHideForm(){
      this.inputMore = !this.inputMore;
    },
    searchEvent(){
      this.getFindDocList();
      this.childData = [];
    },
    getFindDocList(){
      if(this.formInline.prescribingstatus == '未开方'){
        this.formInline.prescribingstatus = 1;
      }else if(this.formInline.prescribingstatus == '已开方'){
        this.formInline.prescribingstatus = 2;
      }
      let params={
        companyid: this.companyid,
        insidercardno: this.formInline.insidercardno,
        insiderphone: this.formInline.insiderphone,
        patient: this.formInline.name,
        doctorname: this.formInline.doctorname,
        prescribingstatus: this.formInline.prescribingstatus,
        beginprescribingdate: this.formInline.beginprescribingdate,
        endprescribingdate: this.formInline.endprescribingdate,

        pageIndex: this.pageVO.currentPage,
        pageSize: this.pageVO.pageSize
      }
      this.loading = true;
      this.$api.recipe.findDocs(params).then(res=>{
        this.loading = false;
        if(res.status == 200){
          this.tableData = res.data.list;
          this.pageVO.totalResult = res.data.info;
        }
      }).catch(err=>{
        this.loading = false;
      })
    },
    emptyEvent(){
      this.formInline = {};
    },
    rowChose(val){
      console.log(val);
      if(val.prescribingid !== ''){
        let parms = {
          prescribingid: val.prescribingid,
          pageIndex: this.pageDtl.currentPage,
          pageSize: this.pageDtl.pageSize
        }
        this.findChildList(parms);
      }
    },
    findChildList(parms){
      console.log(parms);
      this.loading2 = true;
      this.$api.recipe.findDtls(parms).then(res=>{
        if(res.status == 200){
          this.loading2 = false;
          this.childData = res.data.list;
          this.pageDtl.totalResult = res.data.info;
        }else{
          this.loading2 = false;
        }
      }).catch(err=>{
        this.loading2 = false;
      })
    },
    cfPic(val){
      console.log(val);
      this.dialogData = true;
      this.title = '开方图片';
      this.active = 1;
      this.tp = val.prescribingimgurl;
    },
    sfMv(val){
      this.dialogData = true;
      this.title = '开方视频';
      this.active = 3;
      this.mv = val.prescribingvideourl;
    },
    sfMsg(val){
      console.log(val);
      this.dialogData = true;
      this.title = '开方消息';
      this.active = 4;
      this.$api.recipe.gethismessage_kf({prescribingid:val.prescribingid}).then(res=>{
        if(res.status == 200){
          console.log(res);
          this.msg = res.data;
        }
      })
    },
    selectTimeB(val){
      this.formInline.beginprescribingdate = val;
    },
    selectTimeE(val){
      this.formInline.endprescribingdate = val;
    },
    formatterDate(row, column, cellValue) {
      return XEUtils.toDateString(cellValue, 'yyyy-MM-dd')
    },
    // 处方类型
    formatterstatus (row, column, cellValue) {
      if(cellValue == 1){
        return cellValue = '未开方';
      }else if(cellValue == 2){
        return cellValue = '已开方';
      }
    },
    handleSizeChange(pageSize) {
      this.pageVO.pageSize = pageSize;
      this.getFindDocList();
    },
    handleCurrentChange(currentPage) {
      this.pageVO.currentPage = currentPage;
      this.getFindDocList();
    },
    handleSizeChangeDtl(pageSize) {
      this.pageVO.pageSize = pageSize;
      this.findChildList();
    },
    handleCurrentChangeDtl(currentPage) {
      this.pageVO.currentPage = currentPage;
      this.findChildList();
    },
  }
}
</script>

<style scoped>
  .textWidth{
    width: 88px;
    max-width: 200px;
    font-size: 14px;
    text-align: right;
    padding-right: 12px;
  }
  .inputWidth{
    max-width: 200px;
    /*百度 360极速*/
    -webkit-column-width: 200px;
  }
  .arrow_img{
    width: 100%!important;
    margin-top: 0px;
    border-radius: 0 0 3px 3px;
    margin-bottom: 20px;
    height: 24px;
    background: url("../../../src/assets/return_down.png") center bottom no-repeat;
    background-size: 120px auto;
    border-bottom: 2px solid #4ebfff;
    cursor: pointer;
  }
  .arrow_active{
    background: url("../../../src/assets/return_up.png") center bottom no-repeat;
  }
  .dialogTit >>>.el-dialog__header {
    background: #f3f3f3!important;
  }
  .has-gutter tr th{
    background: #f00;
  }
</style>
