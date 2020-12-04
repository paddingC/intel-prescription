<template>
  <div class="warp">
    <p style="width: 100%;text-align: left">温馨提示:点击地图可以获取经纬度。</p>
    <el-form :inline="true">
      <div style="float: left">
        <el-input style="display: none;" v-model="location.id"></el-input>
        <el-form-item label="地址">
          <el-input v-model="location.address" autocomplete="off" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="theLocationByName">查询</el-button>
        </el-form-item>
      </div>
      <div style="float: left">
        <el-form-item label="经度">
          <el-input v-model="location.longitude"  autocomplete="off" placeholder="请输入经度"></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="location.latitude"  autocomplete="off" placeholder="请输入纬度"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="selectLocation">查询</el-button>
          <el-button type="primary" @click="locationOk(location)">确定</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!--地图-->
    <div id="allmap"></div>
  </div>
</template>

<script>
  import Bus from '../../bus/bus.js'
  export default {
    name: "bmap",
    data:function(){
      return{
        mapStyle:{
          width:'100%',
          height:this.mapHeight +'px',
        },
        location:{
          address:'',
          longitude:'',
          latitude:''
        }
      }
    },
    mounted(){
      this.initMap();
    },
    methods:{
      initMap(){
        //创建地图
        this.createdMap();
        //点击地图
        this.getClick();
        //反填的值
        this.setdata();
      },
      createdMap(){
        let map = new BMap.Map("allmap");
        let point = new BMap.Point(116.331398,39.897445);
        map.centerAndZoom(point,18);
        window.map = map;
      },
      //点击地图获取经纬度
      getClick(){
        let _this = this;
        map.addEventListener("click", showInfo, true);
        function showInfo(e){
          console.log(e);
          _this.location.longitude = parseFloat(e.point.lng).toFixed(3);
          _this.location.latitude = parseFloat(e.point.lat).toFixed(3);
          console.log(e.point.lng+'和'+e.point.lat)
        }
      },
      setdata(){
        //接收的值
        let vm = this;
        Bus.$on('val',(data)=>{
          vm.location.id = data.id;
          vm.location.longitude = data.longitude;
          vm.location.latitude = data.latitude;
          vm.location.address = data.placepointname;
          console.log(data);
          if(!this.isNull(this.location.longitude) && !this.isNull(this.location.latitude)){
            // var map =new BMap.Map("allmap");
            map.clearOverlays();
            var new_point =new BMap.Point(this.location.longitude,this.location.latitude);
            var marker = new BMap.Marker(new_point);// 创建标注
            map.addOverlay(marker);// 将标注添加到地图中
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);//跳动的动画
            map.panTo(new_point);
            map.addEventListener("click", showInfo, true);
            function showInfo(e){
              vm.location.longitude = parseFloat(e.point.lng).toFixed(3);
              vm.location.latitude = parseFloat(e.point.lat).toFixed(3);
            }
          }else{
            this.theLocationByName();
          }
        });
      },

      theLocationByName(){
        var city = this.location.address;
        if(city != ""){
          map.centerAndZoom(city,15);
          this.getClick();
        }
      },
      selectLocation(){
        if(!this.isNull(this.location.longitude) && !this.isNull(this.location.latitude)){
          map.clearOverlays();
          var new_point =new BMap.Point(this.location.longitude,this.location.latitude);
          var marker = new BMap.Marker(new_point);// 创建标注
          map.addOverlay(marker);// 将标注添加到地图中
          marker.setAnimation(BMAP_ANIMATION_BOUNCE);//跳动的动画
          map.panTo(new_point);
        }
        this.$emit('selectLocation', this.location);
      },
      locationOk(location){
        console.log(location);
        this.$emit("listenEvent",location);

      },
      isNull(value){
        if(value==null || value=="" || value=='undefined'){
          return true;
        }else{
          return false;
        }
      }
    }
  }
</script>

<style scoped>
  .warp{
    width: 100%;
  }
  #allmap {width: 100%;height:300px;;overflow: hidden;margin:0;font-family:"微软雅黑";}
</style>
