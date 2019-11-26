<template>
<div class="node-item" :class="nodeType" ref="node" :style="flowNodeContainer" @mouseenter="showDelete" @mouseup="changeNodeSite" @dblclick="editNode">
  <!-- <div class="node-titel">
            <div class="node-icon" v-show="mouseEnter">
                <i class="el-icon-delete" @@click.stop="deleteNode"></i>
            </div>
        </div> -->
  <div><span>{{node.label}}</span></div>
  <div class="node-del" v-show="mouseEnter" @click.stop="deleteNode">
    <i class="el-icon-circle-close"></i>
  </div>

  <!--连线用--//触发连线的区域-->
  <div class="flow-node-drag" v-show="isconnect"></div>
</div>
</template>

<script>
export default {
  props: {
    node: Object,
    isconnect: Boolean,
  },
  data() {
    return {
      mouseEnter: false,
      // nodeType: ""
    }
  },
  computed: {
    // 节点容器样式
    flowNodeContainer: {
      get() {
        return {
          position: 'absolute',
          minWidth: '80px',
          top: this.node.top,
          left: this.node.left,
          nodeType: this.node.nodeType,
          boxShadow: this.mouseEnter ? '#66a6e0 0px 0px 12px 0px' : '',
        }
      }
    },
    nodeType: {
      /* if(this.node.nodeType == 'is-start'){
        return 'is-start'
      } */
      get() {
        // console.log('aaaaaaaa',this.node.nodeType);
        return this.node.nodeType
      }
    }
  },
  created() {
    console.log(this.node);
    if (this.node.type == "1") {
      this.nodeType = "is-start"
    }
    if (this.node.type == "2") {
      this.nodeType = "is-end"
    }
    if (this.node.type == "3") {
      this.nodeType = "is-rhombus"
    }
    if (this.node.type == "4") {
      this.nodeType = "is-state"
    }
  },
  mounted() {

  },
  methods: {
    // 删除节点
    deleteNode() {
      console.log('aaa',this.node.id);
      this.$emit('delete-node', this.node.id)
    },
    // 编辑节点
    editNode() {
      this.$emit('edit-node', this.node.id)
    },
    // 鼠标进入
    showDelete() {
      this.mouseEnter = true
    },
    // 鼠标离开
    hideDelete() {
      this.mouseEnter = false
    },
    // 鼠标移动后抬起
    changeNodeSite() {
      this.$emit('changeNodeSite', {
        nodeId: this.node.id,
        left: this.$refs.node.style.left,
        top: this.$refs.node.style.top,
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* .node-item {
  border-radius: 4px;
  box-shadow: 0 0 2px #696969;
  cursor: move;
  overflow: initial;
  background: #fbf4dc;
  padding: 0 10px;
  width: 120px;
} */
.node-item {
  cursor: pointer;
  line-height: normal;
  border: 1px solid #6c62bc;

}

.node-titel {
  height: 20px;
  background: #ffc400;
}

.node-icon {
  position: absolute;
  top: 0px;
  right: 0px;
  // line-height: 20px
  line-height: normal;
}

.node-icon i {
  cursor: pointer;
}

.node-con {
  text-align: center;
  line-height: 30px;
}

.node-del {
  position: absolute;
  color: red;
  font-size: 16px;
  cursor: pointer;
  top: -8px;
  right: -8px;
}

.flow-node-drag {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: crosshair;
}

//开始
.is-start {
  width: 100px;
  height: 50px;
  border-radius: 50% / 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

//结束
.is-end {
  width: 100px;
  height: 60px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

//状态
.is-state {
  width: 100px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

//菱形
.is-rhombus {
  display: inline-block;
  width: 100px;
  height: 100px;
  // background-color: #c685d9;
  transform: rotate(45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;

  span {
    display: block;
    transform: rotate(-45deg);
    /* display: block;
    margin: 30px 0 0 -10px;
    transform: rotate(-45deg); */
  }
}
</style>
