<template>
  <div>
    <el-tabs v-model="tabsValue" type="border-card">
      <el-tab-pane label="按日统计" name="first">
        <el-form :model="searchForm" size="medium" class="base-table6-form" :inline="true" label-width="108px" style="width: 100%;text-align: left">
          <el-form-item label="执业药师">
            <el-input v-model="searchForm.pharmacistname" style="width: 286px"></el-input>
          </el-form-item>
          <el-form-item label="审方日期从">
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" style="width: 286px"
                                v-model="searchForm.beginapprovaldate"
                                @change="selectTimeB"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">至</el-col>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" style="width: 286px"
                                v-model="searchForm.endapprovaldate"
                                @change="selectTimeE"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item style="padding-left: 12px">
            <el-button type="primary" @click="searchData">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button  @click="clearPage">清空</el-button>
          </el-form-item>
        </el-form>
        <div id="dayChart" :style="{width: '820px', height: '300px'}"></div>
        <!--不规则表格-->
        <el-table
          ref="elxTable"
          border :header-cell-style="rowClass"
          height="466"
          :data.sync="listDay"
          :span-method="objectSpanMethod"
          style="width: 100%">
          <el-table-column label="执业药师" prop="pharmacistname"></el-table-column>
          <el-table-column label="审方日期" prop="date"></el-table-column>
          <el-table-column prop="adopt" label="通过量"></el-table-column>
          <el-table-column prop="refuse" label="拒绝量"></el-table-column>
          <el-table-column prop="total" label="总量"></el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="按月统计" name="second">
        <el-form :model="searchForm1" size="medium " class="base-table6-form" :inline="true" label-width="108px" style="width: 100%;text-align: left">
          <el-form-item label="执业药师">
            <el-input v-model="searchForm1.pharmacistname" style="width: 286px"></el-input>
          </el-form-item>
          <el-form-item label="审方日期从">
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date"  style="width: 286px"
                                v-model="searchForm1.beginapprovaldate"
                                @change="selectTimeB1"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">至</el-col>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" style="width: 286px"
                                v-model="searchForm1.endapprovaldate"
                                @change="selectTimeE1"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item style="padding-left: 12px">
            <el-button type="primary" @click="searchData1">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button  @click="clearPage1">清空</el-button>
          </el-form-item>
        </el-form>
        <div id="monChart" :style="{width: '820px', height: '300px'}"></div>
        <!--不规则表格-->
        <el-table
          ref="elxTable"
          border :header-cell-style="rowClass"
          height="466"
          :data.sync="listMon"
          :span-method="objectSpanMethodM"
          style="width: 100%">
          <el-table-column label="执业药师" prop="pharmacistname"></el-table-column>
          <el-table-column label="审方日期" prop="date"></el-table-column>
          <el-table-column prop="adopt" label="通过量"></el-table-column>
          <el-table-column prop="refuse" label="拒绝量"></el-table-column>
          <el-table-column prop="total" label="总量"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入折线图组件
require('echarts/lib/chart/line')
export default {
  name: "workload",
  data () {
    return {
      companyid: sessionStorage.getItem('companyid'),
      searchForm:{},
      searchForm1:{},
      tabsValue: 'first',
      listDay:[],
      spanArr:[],
      colArr:[],
      mapDay:[],
      adoptL:[],
      refuseL:[],
      totalL:[],

      listMon:[],
      spanArrM:[],
      colArrM:[],
      mapMon:[],
      adoptR:[],
      refuseR:[],
      totalR:[],
    }
  },
  mounted(){
    this.getDay();
    this.getMoy();

  },
  methods:{
    rowClass(){
      return 'background: #f3f3f3;color:#555;border-color:#dddfe7;'
    },
    clearPage(){
      this.searchForm = {}
    },
    searchData(){
      this.mapDay = [];
      this.getDay();
    },
    //按日
    getDay(){
      this.listDay = [];
      this.adoptL=[];
      this.refuseL=[];
      this.totalL=[];
      this.$api.workload.getdayworkload({
        companyid: this.companyid,
        pharmacistname: this.searchForm.pharmacistname,
        beginapprovaldate: this.searchForm.beginapprovaldate,//开始日期
        endapprovaldate: this.searchForm.endapprovaldate//结束日期
      }).then(res=>{
        if(res.status == 200){
          if(res.data == null){
            this.rowspan();
            this.drawLineday();
            return false;
          }
          res.data.list.forEach((item)=>{
            this.mapDay.push(item.date);
            item.children.forEach((chil)=>{
              this.listDay.push({
                date:item.date,
                pharmacistname: chil.pharmacistname,
                adopt: chil.adopt,
                refuse:chil.refuse,
                total: chil.total
              })
            })
            // 折线图的数据
            this.adoptL.push(item.sumdaopt);
            this.refuseL.push(item.sumrefuse);
            this.totalL.push(item.sumtotal);
            this.listDay.push({
              pharmacistname: item.date+'小计',
              date:'',
              adopt: item.sumdaopt,
              refuse:item.sumrefuse,
              total: item.sumtotal,
            })
          })
          this.listDay.push({
            pharmacistname: '总量',
            date:'',
            adopt: res.data.adopt,
            refuse:res.data.refuse,
            total: res.data.total,
          })
          // console.log(this.mapDay);
          this.rowspan();
          this.drawLineday();
        }
      })
    },
    rowspan() {
      this.spanArr = [];
      this.colArr = [];
      let contactDot = 0;
      this.listDay.forEach( (item,index) => {
        if(index===0){
          this.spanArr.push(1)
          this.colArr.push(1)
        }else{
          if(item.date == this.listDay[index-1].date){
            this.spanArr[contactDot] += 1;
            this.spanArr.push(0);
          }else{
            contactDot = index
            this.spanArr.push(1);
          }
        }
      })
    },
    objectSpanMethod({row, column, rowIndex, columnIndex}){
      if(columnIndex ===1){
        if (this.listDay[rowIndex].date == '') {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        else {
          if (this.spanArr[rowIndex]) {
            return {
              rowspan: this.spanArr[rowIndex],
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      }else if (columnIndex===0){
        if (this.listDay[rowIndex].date==''){
          return{
            rowspan:1,
            colspan:2
          }
        }
      }
    },
    drawLineday(){
      let myChart = this.$echarts.init(document.getElementById('dayChart'));
      myChart.setOption({
        title: { text: '日审方量' },
        tooltip: {},
        legend: {
          data:['拒绝量','通过量','总量']
        },
        xAxis: {
          data: this.mapDay
        },
        yAxis: {},
        series: [{
          name:'拒绝量',
          type:'line',
          stack: '总量',
          data:this.refuseL
        },
          {
            name:'通过量',
            type:'line',
            stack: '总量',
            data: this.adoptL
          },
          {
            name:'总量',
            type:'line',
            stack: '总量',
            data: this.totalL
          }]
      });
    },
    clearPage1(){
      this.searchForm1 = {}
    },
    searchData1(){
      this.getMoy();
      this.mapMon = []
    },
    //按月
    getMoy(){
      this.listMon = [];
      this.adoptR=[];
      this.refuseR=[];
      this.totalR=[];
      this.$api.workload.getmonthworkload({
        companyid: this.companyid,
        pharmacistname: this.searchForm1.pharmacistname,
        beginapprovaldate: this.searchForm1.beginapprovaldate,
        endapprovaldate: this.searchForm1.endapprovaldate
      }).then(res=>{
        if(res.status == 200){
          if(res.data == null){
            this.rowspanM();
            this.drawLinemon();
            return false;
          }
          res.data.list.forEach((item)=>{
            this.mapMon.push(item.date)
            item.children.forEach((chil)=>{
              this.listMon.push({
                date:item.date,
                pharmacistname: chil.pharmacistname,
                adopt: chil.adopt,
                refuse:chil.refuse,
                total: chil.total
              })
            })
            // 折线图的数据
            this.adoptR.push(item.sumdaopt);
            this.refuseR.push(item.sumrefuse);
            this.totalR.push(item.sumtotal);
            this.listMon.push({
              pharmacistname: item.date+'小计',
              date:'',
              adopt: item.sumdaopt,
              refuse:item.sumrefuse,
              total: item.sumtotal,
            })
          })
          this.listMon.push({
            pharmacistname: '总量',
            date:'',
            adopt: res.data.adopt,
            refuse:res.data.refuse,
            total: res.data.total,
          })
          this.rowspanM();
          this.drawLinemon();
        }
      })
    },
    rowspanM() {
      this.spanArrM = [];
      this.colArrM = [];
      let contactDot = 0;
      this.listMon.forEach( (item,index) => {
        if(index===0){
          this.spanArrM.push(1)
          this.colArrM.push(1)
        }else{
          if(item.date == this.listMon[index-1].date){
            this.spanArrM[contactDot] += 1;
            this.spanArrM.push(0);
          }else{
            contactDot = index
            this.spanArrM.push(1);
          }
        }
      })
    },
    objectSpanMethodM({row, column, rowIndex, columnIndex}){
      if(columnIndex ===1) {
        if (this.listMon[rowIndex].date == '') {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        else {
          if(this.spanArrM[rowIndex]){
            return {
              rowspan:this.spanArrM[rowIndex],
              colspan:1
            }
          }else{
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }

      }else if(columnIndex === 0){
        if (this.listMon[rowIndex].date==''){
          return{
            rowspan:1,
            colspan:2
          }
        }
      }
    },
    drawLinemon(){
      let myChart = this.$echarts.init(document.getElementById('monChart'));
      myChart.setOption({
        title: { text: '月审方量' },
        tooltip: {},
        legend: {
          data:['拒绝量','通过量','总量']
        },
        xAxis: {
          data: this.mapMon
        },
        yAxis: {},
        series: [{
          name:'拒绝量',
          type:'line',
          stack: '总量',
          data:this.refuseR
        },
          {
            name:'通过量',
            type:'line',
            stack: '总量',
            data: this.adoptR
          },
          {
            name:'总量',
            type:'line',
            stack: '总量',
            data: this.totalR
          }]
      });
    },
    selectTimeB(val){
      this.searchForm.beginapprovaldate = val;
    },
    selectTimeE(val){
      this.searchForm.endapprovaldate = val;
    },
    selectTimeB1(val){
      this.searchForm1.beginapprovaldate = val;
    },
    selectTimeE1(val){
      this.searchForm1.endapprovaldate = val;
    },
  }
}
</script>

<style scoped>

</style>
