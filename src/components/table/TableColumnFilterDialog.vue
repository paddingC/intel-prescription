<template>
  <div>
    <el-tooltip content="列显示" placement="top">
      <el-button size="mini" icon="fa fa-filter" @click="setDialogVisible"></el-button>
    </el-tooltip>

    <el-tooltip content="导出" placement="top">
      <el-button size="mini" icon="fa fa-file-excel-o" @click="exportCsvEvent"></el-button>
    </el-tooltip>

    <el-dialog title="自定义列" :visible.sync="dialogVisible" width="540px" :close-on-click-modal="false" append-to-body
               @open="openCustomEvent">
      <el-transfer
        v-model="selectColumns"
        :data="allCustomColumnList"
        :titles="['隐藏列', '显示列']"
        :props="{key: 'prop', label: 'label'}"></el-transfer>
      <span slot="footer" class="dialog-footer">
          <el-button @click="resetCustomEvent">重 置</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveCustomEvent">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "TableColumnFilterDialog",
    props: {
      tableRef: '',
      customColumns: {
        type: Array,
        default:
          []
      }
    },
    data() {
      return {
        dialogVisible: false,
        selectColumns: [],
      }
    },
    computed: {
      allCustomColumnList() {
        return this.customColumns.filter(item => item.prop)
      }
    },
    methods: {
      // 设置可见性
      setDialogVisible: function () {
        this.dialogVisible = true
      },
      resetCustomEvent() {
        this.selectColumns = this.allCustomColumnList.map(column => column.prop)
      },
      saveCustomEvent() {
        if (!this.selectColumns.length) {
          return Message({
            type: 'error',
            message: '请至少选择一列！'
          })
        }
        this.dialogVisible = false
        this.allCustomColumnList.forEach(column => {
          column.visible = this.selectColumns.includes(column.prop)
        })
        let hideList = this.allCustomColumnList.filter(item => !item.visible).map(({prop, visible}) => ({
          prop,
          visible
        }))
        this.$emit('saveCustomEvent', {hideList: JSON.parse(JSON.stringify(hideList))})
      },
      openCustomEvent() {
        this.selectColumns = this.allCustomColumnList.filter(item => item.visible).map(column => column.prop)
      },
      //导出excel
      exportCsvEvent() {
        this.$emit('exportCsvEvent')
      }
    }
  }
</script>

<style scoped>

</style>
