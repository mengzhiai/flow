<!--
 * @Author: your name
 * @Date: 2019-11-26 09:38:20
 * @LastEditTime: 2019-11-26 15:31:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \drag\src\views\lineEdit.vue
 -->
<template>
<div>
  <el-dialog title="节线编辑" :visible.sync="lineDialog" width="600px">
    <el-form :model="line" ref="dataForm" label-width="100px" class="flowEditForm margin13" size="mini">
      <el-form-item label="id">
        <el-input disabled v-model="line.id"></el-input>
      </el-form-item>
      <el-form-item label="源活动">
        <el-input disabled v-model="line.from"></el-input>
      </el-form-item>
      <el-form-item label="目标活动">
        <el-input disabled v-model="line.to"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="line.label"></el-input>
      </el-form-item>
      <el-form-item label="备注说明">
        <el-input v-model="line.Remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="lineDialog=false">取消</el-button>
        <el-button type="success" @click="saveLine">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

</div>
</template>

<script>
export default {
  name: 'editLine',
  props:["compoentLine"],
  data() {
    return {
      line: {
        label: ''
      },
      lineDialog: false,
      isUpdate: false,
    }
  },
  watch: {
    compoentLine(val){
      console.log('val',val);
      this.openLineDialog(val);
    }
  },
  methods: {
    openLineDialog(data){
      this.lineDialog = true;
      this.line = data;
    },
    init(item) {
      this.isUpdate = false;
      this.line = item;
      this.$nextTick(function () {
        this.isUpdate = true;
      });
    },
    saveLine() {
      this.$emit('line-save', this.line);
      this.lineDialog = false
    }
  }
}
</script>
