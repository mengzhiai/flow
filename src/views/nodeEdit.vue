<!--
 * @Author: your name
 * @Date: 2019-11-21 17:05:21
 * @LastEditTime: 2019-11-27 13:20:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \drag\src\views\nodeEdit.vue
 -->
<template>
<div>
  <el-dialog title="节点编辑" :visible.sync="nodeDialog" width="600px">
    <el-form :model="nodeData" ref="dataForm" label-width="100px" class="" size="mini">
      <!-- <el-form-item label="id">
        <el-input disabled v-model="nodeData.id"></el-input>
      </el-form-item> -->
      <el-form-item label="当前节点名称">
        <el-input v-model="nodeData.label"></el-input>
      </el-form-item>
      <el-form-item label="节点类型">
        <!-- <el-select v-model="nodeData.type" placeholder="请选择">
          <el-option v-for="item in typeList" :key="item.id" :label="item.label" :value="item.id">
          </el-option>
        </el-select> -->
        <el-input v-model="nodeData.typeName" disabled ></el-input>
      </el-form-item>
      <el-form-item label="是否会签">
        <el-input v-model="nodeData.isSign" placeholder="" disabled></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="nodeData.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="nodeDialog=false">取消</el-button>
        <el-button type="primary" @click="saveNode">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
export default {
  props:["componentNode"],
  data(){
    return{
      nodeData: {
        id: '',
        label:'',
        type: '',
        remark: '',
        isSign: 1,
      },
      nodeDialog: false,
      typeList:[]
    }
  },
  watch:{
    componentNode(val){
      console.log('val',val);
      this.init(val)
    }
  },
  methods:{
    init(data){
      let obj = {};
      data.nodeList.forEach(item=>{
        if(data.nodeId == item.id){
          obj= item;
          console.log(this.nodeData);
          this.nodeDialog = true;
        }
      })
      if(obj.type === -1){
        obj.typeName = "开始"
      }else if(obj.type === 2){
        obj.typeName = "状态"
      }else if(obj.type === 1){
        obj.typeName = "结束"
      }
      if(obj.isSign === 1){
        obj.isSign = "是"
      }else{
        obj.isSign = "否"
      }
      this.nodeData = obj;
      this.typeList = data.nodeList;
    },
    saveNode(){
      console.log('nodeData',this.nodeData);
      this.axios.post('/aaaa',this.nodeData)
      this.nodeDialog = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select{
  width: 100%;
}
</style>
