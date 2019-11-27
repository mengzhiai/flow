<!--
 * @Author: your name
 * @Date: 2019-11-26 09:38:20
 * @LastEditTime: 2019-11-27 14:30:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \drag\src\views\lineEdit.vue
 -->
<template>
<div>
  <el-dialog title="节线编辑" :visible.sync="lineDialog" width="600px">
    <el-form :model="lineData" ref="dataForm" label-width="100px" class="flowEditForm margin13" size="mini">
      <el-form-item label="节线名称">
        <el-input v-model="lineData.label"></el-input>
      </el-form-item>
      <el-form-item label="上一节点">
        <el-input disabled v-model="lineData.prevNodeName"></el-input>
      </el-form-item>
      <el-form-item label="下一节点">
        <el-input disabled v-model="lineData.nextNodeName"></el-input>
      </el-form-item>
      
      <el-form-item label="备注说明">
        <el-input v-model="lineData.Remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="lineDialog=false">取消</el-button>
        <el-button type="primary" @click="saveLine">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

</div>
</template>

<script>
import {lineList,nodeList} from './data'
export default {
  name: 'editLine',
  props:["compoentLine"],
  data() {
    return {
      lineData: {
        label: ''
      },
      lineDialog: false,
      isUpdate: false,
    }
  },
  watch: {
    compoentLine(val){
      this.openLineDialog(val);
    }
  },
  methods: {
    openLineDialog(data){
      this.lineDialog = true;
      // this.lineData = data;
      nodeList.forEach(item=>{
        if(data.from === item.id){
          data.prevNodeName = item.label;
        }
        if(data.to === item.id){
          data.nextNodeName = item.label;
        }
      })
      console.log(data);
      this.lineData = data;
    },
    init(item) {
      this.isUpdate = false;
      this.line = item;
      this.$nextTick(function () {
        this.isUpdate = true;
      });
    },
    saveLine() {
      console.log(this.line);
      this.$emit('line-save', this.line);
      this.lineDialog = false
    }
  }
}
</script>
