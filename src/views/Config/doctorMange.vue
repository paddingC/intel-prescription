<template>
  <div v-loading="loading">
    <div class="topBox">
      <el-form :model="formInline" size="medium" class="base-table6-form" :inline="true"
               style="width: 80%;text-align: left;display: inline-block">
        <div>
          <td class="textWidth">医生ID</td>
          <td>
            <el-input v-model="formInline.doctorid" class="inputWidth"></el-input>
          </td>
          <td class="textWidth">医生姓名</td>
          <td>
            <el-input v-model="formInline.doctorname" class="inputWidth"></el-input>
          </td>
          <td class="textWidth">登录账号</td>
          <td>
            <el-input v-model="formInline.loginid" class="inputWidth"></el-input>
          </td>
        </div>
        <div v-show="inputMore">
          <div style="margin-top: 20px">
            <td class="textWidth">使用状态</td>
            <td>
              <el-select v-model="formInline.usestatus" placeholder="请选择" class="inputWidth">
                <el-option
                  v-for="item in ustatus"
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
    <div class="box">
      <el-form style="width: 100%;text-align: left" ref="tablefBtn" class="base-table6-form" size="mini" :inline="true">
        <div>
          <el-form-item>
            <el-button type="primary" @click="addEvent">新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="isSataus('on')">启用</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="isSataus('off')">停用</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="delEvent">批量删除</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!--表单内容-->
    <elx-editable ref="formList"
                  border :header-cell-style="rowClass"
                  :data.sync="tableData"
                  tooltip-effect="dark">
      <elx-editable-column type="selection" width="55"></elx-editable-column>
      <elx-editable-column type="index" width="55"></elx-editable-column>
      <elx-editable-column prop="doctorname" label="名称"></elx-editable-column>
      <elx-editable-column prop="loginid" label="登录账号"></elx-editable-column>
      <elx-editable-column prop="sex" label="性别" :formatter="formatterSex" width="55"></elx-editable-column>
      <elx-editable-column prop="age" label="年龄" width="85"></elx-editable-column>
      <elx-editable-column prop="begindate" label="出生日期"></elx-editable-column>
      <elx-editable-column prop="esignature" label="电子签章" width="80">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="lookZs(scope.row)">查看</el-button>
        </template>
      </elx-editable-column>
      <elx-editable-column prop="usestatus" label="使用状态" :formatter="formatterUse" width="85"></elx-editable-column>
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
    <!--新增-->
    <el-dialog title="新增" :visible.sync="dialogTableVisible" class="dialogTit">
      <el-form style="width: 100%;text-align: center">
        <el-form-item>
          <el-input v-model="diaSearch" style="width: 286px"></el-input>
          <el-button type="primary" @click="diaBtns">查询</el-button>
        </el-form-item>
      </el-form>
      <elx-editable :data.sync="gridData" border ref="elxEditable1" style="height: 510px;overflow: auto" :header-cell-style="rowClass">
        <elx-editable-column type="selection" width="55"></elx-editable-column>
        <elx-editable-column prop="username" label="名称"></elx-editable-column>
        <elx-editable-column prop="sex" :formatter="formatterSex" label="性别"></elx-editable-column>
        <elx-editable-column prop="birthdate" label="生日"></elx-editable-column>
        <elx-editable-column prop="phonenum" label="手机号"></elx-editable-column>
      </elx-editable>

      <div class="block" style="margin: 20px; text-align: right">
        <el-pagination
          @size-change="handleSizeChangeC"
          @current-change="handleCurrentChangeC"
          :current-page="pageVO1.currentPage"
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="pageVO1.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageVO1.totalResult">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="syncList">确 定</el-button>
      </span>
    </el-dialog>
    <!--证书-->
    <el-dialog title="电子签章详情" :visible.sync="dialogBook" width="620px" class="dialogTit">
      <el-form label-position="right" label-width="120px" class="demo-table-expand" style="height: 420px;overflow: auto">

        <el-form-item label="电子签章：">
          <a v-if="hasBig" :href="bigImg" target="_blank" style="float: right;font-size: 24px;color: #999"><i class="el-icon-zoom-in"></i></a>
          <el-upload
            style="width: 260px"
            class="upload-demo"
            :data="parms" :headers="myHeaders" :action="action"
            :on-preview="handlePreview" :on-success="handelSuccess"
            :on-remove="handleRemove" :on-exceed="handleExceed"
            :file-list="fileList"
            :limit="1"
            list-type="picture">
            <el-button size="medium" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native='closeBook'>{{$t('action.cancel')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Cookies from "js-cookie"
  export default {
    data(){
      return{
        companyid: sessionStorage.getItem('companyid'),
        loading: false,
        formInline:{
          doctorid :'',
          doctorname:'',
          loginid:'',
          usestatus:''
        },
        pageVO:{
          pageSize:10,
          currentPage:1,
          totalResult:0
        },
        pageVO1:{
          pageSize:10,
          currentPage:1,
          totalResult:0
        },
        tableData:[],
        gridData:[],
        dialogTableVisible:false,//新增
        diaSearch:'',
        dataForm:{
          pharmacistid: '',
          type: '',
          registdocno: '',
          registdate: ''
        },
        dialogBook:false,
        action: this.global.baseUrl + 'dzsf/doctor/uploadEsignature',
        myHeaders: {token: Cookies.get('token')},
        parms:{
          file: 'image',
          doctorid: ''
        },
        fileList:[],
        curDoctorid: '',
        ustatus:[{label:'启用',value:1},{label:'停用',value:2}],
        inputMore: false,
        bigImg: '',
        hasBig: false
      }
    },
    mounted(){
      this.getFindList();
    },
    methods:{
      showHideForm(){
        this.inputMore = !this.inputMore;
      },
      rowClass(){
        return 'background: #f3f3f3;color:#555;border-color:#dddfe7;'
      },
      searchEvent(){
        this.getFindList();
      },
      // 新增查询
      diaBtns(){
        this.addEvent();
        this.diaSearch = '';
      },
      getFindList(){
        let params={
          doctorid: this.formInline.doctorid,
          doctorname: this.formInline.doctorname,
          loginid: this.formInline.loginid,
          usestatus: this.formInline.usestatus,

          companyid: this.companyid,
          pageIndex: this.pageVO.currentPage,
          pageSize: this.pageVO.pageSize
        }
        this.loading = true;
        this.$api.pharmacist.find(params).then(res=>{
          if(res.status == 200){
            this.tableData = res.data.list;
            this.pageVO.totalResult = res.data.info;
            this.loading = false;
          }else{
            this.loading = false;
          }
        }).catch(()=>{
          this.loading = false;
        })
      },
      emptyEvent(){
        this.formInline={}
      },
      addEvent(){
        this.dialogTableVisible = true;
        this.$api.pharmacist.findusers({
          companyid: this.companyid,
          pageIndex: this.pageVO1.currentPage,
          pageSize: this.pageVO1.pageSize,
          username: this.diaSearch
        }).then(res=>{
          if(res.status == 200){
            this.gridData = res.data.list;
            this.pageVO1.totalResult = res.data.info;
            console.log(res);
          }
        })
      },
      syncList(){
        let row = this.$refs.elxEditable1.getSelecteds();
        if(row.length>0){
          let arrData = [];
          for(var i=0;i<row.length;i++){
            arrData.push({userid:row[i].userid});
          }
          this.$api.pharmacist.doctorSave({
            companyid: this.companyid,
            userid:arrData
          }).then(res=>{
            if(res.status == 200){
              this.dialogTableVisible = false;
              this.$message.success("新增成功");
              this.getFindList();
            }else{
              this.$message(res.msg);
            }
          })
        }else{
          this.$message('请至少选择一条数据！')
        }
      },
      delEvent(){
        let row = this.$refs.formList.getSelecteds();
        if(row.length){
          console.log(row);
          let arr = [];
          for(var i=0;i<row.length;i++){
            arr.push({doctorid:row[i].doctorid});
          }
          console.log(arr);
          this.$confirm('是否删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.pharmacist.doctorDelete(arr).then(res=>{
              if(res.status == 200){
                this.$message.success("删除成功");
                this.getFindList();
              }else{
                this.$message(res.msg)
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else{
          this.$message('请至少选择一条数据！')
        }
      },
      isSataus(type){
        if(type == 'on'){
          type = 1
        }else if(type == 'off'){
          type = 2
        }
        let rows = this.$refs.formList.getSelecteds();
        if(rows.length){
          let arr = [];
          for(let i=0;i<rows.length;i++){
            arr.push({doctorid:rows[i].doctorid,usestatus:type});
          }
          this.$api.pharmacist.enableDisable(arr).then(res=>{
            if(res.status == 200){
              this.$message.success('更改状态成功');
              this.getFindList();
            }else{
              this.$message(res.msg)
            }
          })
        }else{
          this.$message.success('请选择一行数据');
        }
      },
      // 电子签章
      lookZs(val){
        console.log(val);
        this.fileList = [];
        this.curDoctorid = val.doctorid;
        this.parms.doctorid = val.doctorid;
        this.dialogBook = true;
        if(val.esignature != null || val.esignature != undefined){
          this.fileList.unshift({
            url:val.esignature
          });
          this.bigImg = val.esignature
          this.hasBig = true
        } else {

          this.hasBig = false
        }
      },
      handlePreview(){},
      handleExceed() {
        this.$message.warning(`最多可上传1张`);
      },
      handelSuccess(response){
        console.log(response);
        if(response.status == 200){
          this.fileList.unshift({
            url: response.data
          })
          this.bigImg = response.data
          this.$message.success('上传成功')
        }else {
          this.$message.error('上传失败');
        }
      },
      handleRemove(file){
        this.$api.pharmacist.removeEsignature({
          doctorid: this.curDoctorid
        }).then(res=>{
          if(res.status == 200){
            this.$message.success('删除成功')
          }
        });
      },
      closeBook(){
        this.dialogBook = false;
        this.getFindList();
      },
      formatterSex(row, column, cellValue, index){
        if(cellValue == 1){
          return cellValue = '男';
        }else if(cellValue == 0){
          return cellValue = '女';
        }
      },
      formatterUse(row, column, cellValue, index){
        if(cellValue == 1){
          return cellValue = '启用';
        }else if(cellValue == 2){
          return cellValue = '停用';
        }
      },
      handleSizeChange(pageSize) {
        this.pageVO.pageSize = pageSize;
        this.getFindList();
      },
      handleCurrentChange(currentPage) {
        this.pageVO.currentPage = currentPage;
        this.getFindList();
      },
      handleSizeChangeC(pageSize) {
        this.pageVO1.pageSize = pageSize;
        this.addEvent();
      },
      handleCurrentChangeC(currentPage) {
        this.pageVO1.currentPage = currentPage;
        this.addEvent();
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
</style>
