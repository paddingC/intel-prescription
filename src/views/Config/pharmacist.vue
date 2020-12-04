<template>
  <div v-loading="loading">
    <div class="topBox">
      <el-form :model="formInline" size="medium " class="base-table6-form" :inline="true"
             style="width: 80%;text-align: left;display: inline-block">
        <div>
            <td class="textWidth">人员ID</td>
            <td>
              <el-input v-model="formInline.userid" class="inputWidth"></el-input>
            </td>
            <td class="textWidth">姓名</td>
            <td>
              <el-input v-model="formInline.username" class="inputWidth"></el-input>
            </td>
            <td class="textWidth">登录账号</td>
            <td>
              <el-input v-model="formInline.loginid" class="inputWidth"></el-input>
            </td>
        </div>
        <div v-show="inputMore">
          <div style="margin-top: 20px">
            <td class="textWidth">执业类别</td>
            <td>
              <el-select v-model="formInline.type" placeholder="请选择" class="inputWidth">
                <el-option
                  v-for="item in ztype"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
            <td class="textWidth">注册证书号</td>
            <td>
              <el-input v-model="formInline.registdocno" class="inputWidth"></el-input>
            </td>
            <td class="textWidth">在岗状态</td>
            <td>
              <el-select v-model="formInline.poststatus" placeholder="请选择" class="inputWidth">
                <el-option
                  v-for="item in gstatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
          </div>
          <div style="margin-top: 20px">
            <td class="textWidth">工作状态</td>
            <td>
              <el-select v-model="formInline.workstatus" placeholder="请选择" class="inputWidth">
                <el-option
                  v-for="item in wstatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
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
            <td class="textWidth">注册日期始</td>
            <td>
              <el-date-picker type="date" class="inputWidth"
                              v-model="formInline.beginregistdate"
                              @change="selectTimeB"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </td>
          </div>
          <div style="margin-top: 20px">
            <td class="textWidth">注册日期终</td>
            <td>
              <el-date-picker type="date" class="inputWidth"
                              v-model="formInline.endregistdate"
                              @change="selectTimeE"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd"></el-date-picker>
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
      <elx-editable-column prop="username" label="名称"></elx-editable-column>
      <elx-editable-column prop="loginid" label="登录账号"></elx-editable-column>
      <elx-editable-column prop="sex" label="性别"></elx-editable-column>
      <elx-editable-column prop="birthdate" label="出生日期"></elx-editable-column>
      <elx-editable-column prop="type" label="执业类别" :formatter="formatterType"></elx-editable-column>
      <elx-editable-column prop="registdocno" label="注册证书号"></elx-editable-column>
      <elx-editable-column prop="registdate" label="注册日期" :formatter="formatterDate"></elx-editable-column>
      <elx-editable-column prop="companyname" label="执业单位"></elx-editable-column>
      <elx-editable-column prop="poststatus" label="在岗状态" :formatter="formatterPost"></elx-editable-column>
      <elx-editable-column prop="workstatus" label="工作状态" :formatter="formatterWork"></elx-editable-column>
      <elx-editable-column prop="usestatus" label="使用状态" :formatter="formatterUse"></elx-editable-column>
      <elx-editable-column prop="certificate" label="证书" width="80">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="lookZs(scope.row)">查看</el-button>
        </template>
      </elx-editable-column>
      <elx-editable-column prop="idcard" label="身份证" width="80">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="lookIc(scope.row)">查看</el-button>
        </template>
      </elx-editable-column>
      <elx-editable-column prop="idcard" label="电子签章" width="80">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="lookQz(scope.row)">查看</el-button>
        </template>
      </elx-editable-column>
      <elx-editable-column prop="cz" label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editDialog(scope.row)">编辑</el-button>
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
    <!--新增-->
    <el-dialog title="新增" :visible.sync="dialogTableVisible" class="dialogTit">
      <el-form style="width: 100%;text-align: center">
        <el-form-item>
          <el-input v-model="diaSearch" style="width: 286px"></el-input>
          <el-button type="primary" @click="diaBtns">查询</el-button>
        </el-form-item>
        <el-form-item>
        </el-form-item>
      </el-form>
      <elx-editable :data.sync="gridData" border ref="elxEditable1" style="height: 420px;overflow: auto" :header-cell-style="rowClass">
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

    <!--修改-->
    <el-dialog title="修改" width="30%" :visible.sync="dialogEdit" :close-on-click-modal="false" class="dialogTit">
      <el-form :model="dataForm" label-width="120px" ref="dataForm" style="text-align: left">
        <el-form-item label="执业类别">
          <el-select v-model="dataForm.type" placeholder="请选择" style="width: 286px">
            <el-option
              v-for="item in zytype"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="注册日期">
          <el-date-picker  style="width: 286px"
            v-model="dataForm.registdate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="注册证书号">
          <el-input v-model="dataForm.registdocno" style="width: 286px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogEdit = false">{{$t('action.cancel')}}</el-button>
        <el-button type="primary" @click.native="saveEdit">保存</el-button>
      </div>
    </el-dialog>
    <!--证书-->
    <el-dialog title="证书详情" :visible.sync="dialogBook" width="620px" class="dialogTit">
      <el-form label-position="right" label-width="120px" class="demo-table-expand" style="height: 420px;overflow: auto">
        <el-form-item label="证书：">
          <el-upload
            style="width: 260px"
            class="upload-demo"
            :data="parms" :headers="myHeaders" :action="action"
            :on-preview="handlePreview" :on-success="handelSuccess"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture">
            <el-button size="medium" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native='closeBook'>{{$t('action.cancel')}}</el-button>
      </div>
    </el-dialog>
    <!--身份证-->
    <el-dialog title="身份证详情" :visible.sync="dialogCard" width="620px" class="dialogTit">
      <el-form label-position="right" label-width="120px" class="demo-table-expand" style="height: 420px;overflow: auto">
        <el-form-item label="证书：">
          <el-upload
            style="width: 260px"
            class="upload-demo"
            :data="parms1" :headers="myHeaders" :action="action"
            :on-remove="handleRemove1" :on-success="handelSuccess1"
            :on-exceed="handleExceed"
            :file-list="fileList1"
            :limit="2"
            list-type="picture">
            <el-button size="medium" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native='closeCard'>{{$t('action.cancel')}}</el-button>
      </div>
    </el-dialog>
    <!--电子签章-->
    <el-dialog title="电子签章" :visible.sync="dialogEle" width="620px" class="dialogTit">
      <el-form label-position="right" label-width="120px" class="demo-table-expand" style="height: 420px;overflow: auto">
        <el-form-item label="电子签章：">
          <a v-if="hasBig" :href="bigImg" target="_blank" style="float: right;font-size: 24px;color: #999"><i class="el-icon-zoom-in"></i></a>
          <el-upload
            style="width: 260px"
            class="upload-demo"
            :data="parms2" :headers="myHeaders" :action="action"
            :on-remove="handleRemove2" :on-success="handelSuccess2"
            :on-exceed="handleExceed2"
            :file-list="fileList2"
            :limit="1"
            list-type="picture">
            <el-button size="medium" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native='dialogEle = false'>{{$t('action.cancel')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import XEUtils from 'xe-utils'
  import Cookies from "js-cookie"
export default {
  data(){
    return{
      companyid: sessionStorage.getItem('companyid'),
      loading: false,
      formInline:{
        userid :'',
        username:'',
        loginid:'',
        type:'',
        registdocno:'',
        poststatus:'',
        workstatus:'',
        usestatus:'',
        beginregistdate: '',
        endregistdate:'',
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
      dialogEdit: false,//修改
      zytype:[
        {value:1,label:'药学'},
        {value:2,label:'中药学'},
        {value:3,label:'药学与中药学'}
      ],
      dataForm:{
        pharmacistid: '',
        type: '',
        registdocno: '',
        registdate: ''
      },
      dialogBook:false,
      action:this.global.baseUrl + 'dzsf/pharmacist/uploadfile',
      myHeaders: {token: Cookies.get('token')},
      parms:{
        file: 'image',
        type: 0,
        num: '',
        pharmacistid: ''
      },
      fileList:[],
      curPharmacistid:'',
      dialogCard:false,
      parms1:{
        file: 'image',
        type: 1,
        num: '',
        pharmacistid: ''
      },
      fileList1:[],
      dialogEle: false,
      fileList2: [],
      parms2:{
        file: 'image',
        type: 2,
        pharmacistid: ''
      },
      gstatus:[{label:'在岗',value:1},{label:'不在岗',value:0}],
      wstatus:[{label:'工作中',value:1},{label:'空闲',value:0}],
      ustatus:[{label:'启用',value:1},{label:'停用',value:0}],
      ztype:[{label:'药学',value:1},{label:'中药学',value:2},{label:'药学与中药学',value:3}],
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
      if(this.formInline.type == '药学'){
        this.formInline.type = 1;
      }else if(this.formInline.type == '中药学'){
        this.formInline.type = 2;
      }else if(this.formInline.type == '药学与中药学'){
        this.formInline.type = 3;
      }
      let params={
        companyname: this.formInline.companyname,
        userid: this.formInline.userid,
        username: this.formInline.username,
        loginid: this.formInline.loginid,
        type: this.formInline.type,
        registdocno: this.formInline.registdocno,
        poststatus: this.formInline.poststatus,
        workstatus: this.formInline.workstatus,
        usestatus: this.formInline.usestatus,
        beginregistdate: this.formInline.beginregistdate,
        endregistdate: this.formInline.endregistdate,

        companyid: this.companyid,
        pageIndex: this.pageVO.currentPage,
        pageSize: this.pageVO.pageSize
      }
      this.loading = true;
      this.$api.pharmacist.pharmacistget(params).then(res=>{
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
      this.$api.pharmacist.findPage({
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
        this.$api.pharmacist.insert({
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
    editDialog(val){
      this.dialogEdit = true;
      console.log(val.type);
      let typeVal='';
      if(val.type){
        typeVal = Number(val.type);
      }else{
        typeVal = ''
      }
      let cellVal = XEUtils.toDateString(val.registdate, 'yyyy-MM-dd');

      this.dataForm = {
        pharmacistid: val.pharmacistid,
        type : typeVal,
        registdocno: val.registdocno,
        registdate: cellVal
      }
    },
    saveEdit(){
      console.log(this.dataForm);
      var data = this.dataForm;
      if(data.type == ''){
        this.$message('请选择执业类别');
        return false;
      }
      this.$api.pharmacist.update(data).then(res=>{
        if(res.status == 200){
          this.$message.success('修改成功');
          this.dialogEdit = false;
          this.getFindList();
        }else{
          this.$message(res.msg)
        }
      })
    },
    delEvent(){
      let row = this.$refs.formList.getSelecteds();
      if(row.length){
        console.log(row);
        let arr = [];
        for(var i=0;i<row.length;i++){
          arr.push({pharmacistid:row[i].pharmacistid});
        }
        console.log(arr);
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.pharmacist.del(arr).then(res=>{
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
        type = 0
      }
      let rows = this.$refs.formList.getSelecteds();
      console.log(rows);
      if(rows.length){
        let arr = [];
        let istype = '';
        let isregistdate = '';
        let isregistdocno = '';
        for(let i=0;i<rows.length;i++){
          arr.push({pharmacistid:rows[i].pharmacistid,usestatus:type});
          istype += rows[i].type;
          isregistdate += rows[i].isregistdate;
          isregistdocno += rows[i].registdocno;
        }

        console.log(arr);
        this.$api.pharmacist.updatestatus(arr).then(res=>{
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
    // 证件
    lookZs(val){
      console.log(val);
      this.fileList = [];
      this.curPharmacistid = val.pharmacistid;
      this.parms.pharmacistid = val.pharmacistid;
      this.dialogBook = true;
      if(val.certificate != null){
        val.certificate.forEach((item)=>{
          this.fileList.unshift({
            url:item
          });
        })
      }
    },
    selectTime(val){
      this.dataForm.registdate = val
    },
    selectTimeB(val){
      this.formInline.beginapprovaldate = val;
    },
    selectTimeE(val){
      this.formInline.endapprovaldate = val;
    },
    handleExceed() {
      this.$message.warning(`最多可上传2张`);
    },
    handelSuccess(response){
      console.log(response);
      if(response.status == 200){
        this.fileList.unshift({
          url: response.data
        })
      }else {
        this.$message.error('上传失败');
      }
    },
    handleRemove(file){
      console.log(this.curPharmacistid);
      this.$api.pharmacist.delcertificate({
        pharmacistid: this.curPharmacistid,
        path: file.url
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
    // 身份证
    lookIc(val){
      this.fileList1 = [];
      this.curPharmacistid = val.pharmacistid;
      this.parms1.pharmacistid = val.pharmacistid;
      this.dialogCard = true;
      if(val.idcard != null){
        val.idcard.forEach((item)=>{
          this.fileList1.unshift({
            url:item
          });
        })
      }
    },
    closeCard(){
      this.dialogCard = false;
      this.getFindList();
    },
    handelSuccess1(response){
      console.log(response);
      if(response.status == 200){
        this.fileList1.unshift({
          url: response.data
        })
      }else {
        this.$message.error('上传失败');
      }
    },
    handleRemove1(file){
      console.log(this.curPharmacistid);
      this.$api.pharmacist.delcertificate({
        pharmacistid: this.curPharmacistid,
        path: file.url
      }).then(res=>{
        if(res.status == 200){
          this.$message.success('删除成功')
        }
      });
    },
    // 电子签章
    lookQz (val){
      console.log(val);
      this.fileList2 = [];
      this.curPharmacistid = val.pharmacistid;
      this.parms2.pharmacistid = val.pharmacistid;
      this.dialogEle = true;
      if(val.esignature != null || val.esignature != undefined){
          this.fileList2.unshift({
            url:val.esignature
          });
          this.bigImg = val.esignature
        this.hasBig = true
      } else {
        this.hasBig = false
      }
    },
    handleExceed2() {
      this.$message.warning(`最多可上传1张`);
    },
    handelSuccess2(response){
      if(response.status == 200){
        this.fileList2.unshift({
          url: response.data
        })
        this.bigImg = response.data
        this.hasBig = true
      }else {
        this.$message.error('上传失败');
      }
    },
    handleRemove2(file){

    },
    formatterSex(row, column, cellValue, index){
      if(cellValue == 1){
        return cellValue = '男';
      }else if(cellValue == 2){
        return cellValue = '女';
      }
    },
    formatterPost(row, column, cellValue, index){
      if(cellValue == 0){
        return cellValue = '不在岗';
      }else if(cellValue == 1){
        return cellValue = '在岗';
      }
    },
    formatterWork(row, column, cellValue, index){
      if(cellValue == 0){
        return cellValue = '空闲';
      }else if(cellValue == 1){
        return cellValue = '工作中';
      }
    },
    formatterUse(row, column, cellValue, index){
      if(cellValue == 0){
        return cellValue = '停用';
      }else if(cellValue == 1){
        return cellValue = '启用';
      }
    },
    formatterDate(row, column, cellValue, index) {
      return XEUtils.toDateString(cellValue, 'yyyy-MM-dd')
    },
    formatterType(row, column, cellValue, index){
      if(cellValue == 1){
        return cellValue = '药学';
      }else if(cellValue == 2){
        return cellValue = '中药学';
      }else if(cellValue == 3){
        return cellValue = '药学与中药学';
      }
    },
    handlePreview(){},
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
