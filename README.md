# 后台管理平台
1. excel导出 表头自定义显示
```
//导入组件
import TableColumnFilterDialog from "@/components/table/TableColumnFilterDialog"
//
 <table-column-filter-dialog
          :customColumns="customColumns"
          tableRef="elxEditable"
          @saveCustomEvent="saveCustomEvent"
          @exportCsvEvent="exportCsvEvent"
        ></table-column-filter-dialog>

data() {
    return {
      customColumns: [], //与elx-editable :custom-columns.sync="customColumns" 一致 (要显示的列,默认全部显示)
    }
  },
  created() {
  //持久化获取显示的列表
 let locat = localStorage.getItem('TableCustom3')
 console.log(locat)
 if (locat) {
   this.customColumns = JSON.parse(locat)
   console.log(this.customColumns)
 }
},
 methods:{
 //保存编辑后的列表
    saveCustomEvent(data) {
         console.log(data.hideList)
         this.customColumns = data.hideList
         localStorage.setItem('TableCustom3', JSON.stringify(data.hideList))
         // this.$refs.tableColumnFilterDialog.setDialogVisible(false)
       },
 //导出EXCEL
    exportCsvEvent() {
       this.$refs.elxEditable.exportCsv()
     }
 }
```

