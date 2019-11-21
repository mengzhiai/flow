<template>
<div>
  <el-row>
    <el-col :span="4">
      <div class="flow-menu">
        <div class="menu-item" v-for="(item,i) in menueList" :key="i" draggable="true" @dragstart="drag(item)">
          <i class="iconfont" :class="item.icon"></i>
          <div>{{item.name}}</div>
        </div>
        <div class="menu-item" @click="isConnect=true">
          <i class="el-icon-bottom-right"></i>
          <div>连线</div>
        </div>
        <div class="menu-item" @click="isConnect=false">
          <i class="el-icon-rank"></i>
          <div>选择</div>
        </div>
      </div>
    </el-col>
    <el-col :span="18">
      <!-- <flowNode class="aaaaa"></flowNode> -->
      <div class="flow-detail">
        <div id="flowContent" ref="flowContent" @drop="drop($event)" @dragover="allowDrop($event)" @click="editFlow()" @dblclick="isConnect=false">
          <flowNode v-for="node in data.nodeList" :key="node.id" :style="flowNodeContainer" :node="node" :id="node.id" class="node-item" :isconnect="isConnect" @delete-node="deleteNode" @change-node-site="changeNodeSite" @edit-node="editNode">
          </flowNode>
        </div>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="savebtn">
        <el-button type="primary" size="mini" @click="saveData()">保 存</el-button>
      </div>
    </el-col>

  </el-row>
  <nodeEdit :componentNode="editNodeData"></nodeEdit>

</div>
</template>

<script>
import {
  jsPlumb
} from 'jsplumb'
import {
  nodeList,
  lineList
} from './data'
import flowNode from './flowNode'
import nodeEdit from './nodeEdit'
export default {
  components: {
    flowNode,
    nodeEdit
  },
  data() {
    return {
      menueList: [{
          type: 1,
          name: '开始',
          icon: 'icontuoyuan',
          nodeType: 'is-start'
        },
        {
          type: 2,
          name: '结束',
          icon: 'icontuoyuan1copy',
          nodeType: 'is-end'
        },
        {
          type: 3,
          name: '逻辑判断',
          icon: 'icontubiao',
          nodeType: 'is-rhombus'
        },
        {
          type: 4,
          name: '状态',
          icon: 'iconchangfangxing',
          nodeType: 'is-state'
        },
      ],
      droppedItem: '',
      jsPlumb: null,
      // 默认设置参数
      jsplumbSetting: {
        // 动态锚点、位置自适应
        Anchors: ['Top', 'TopCenter', 'TopRight', 'TopLeft', 'Right', 'RightMiddle', 'Bottom', 'BottomCenter',
          'BottomRight', 'BottomLeft', 'Left', 'LeftMiddle'
        ],
        Container: 'flowContent',
        // 连线的样式 StateMachine、Flowchart,有四种默认类型：Bezier（贝塞尔曲线），Straight（直线），Flowchart（流程图），State machine（状态机）
        Connector: 'Flowchart',
        //这个是鼠标拉出来的线的属性
        ConnectionOverlays: [
          ["Label", {
            label: "连线文本",
            id: "label-1",
            cssClass: "csslabel"
          }]
        ],
        // 鼠标不能拖动删除线
        ConnectionsDetachable: false,
        // 删除线的时候节点不删除
        DeleteEndpointsOnDetach: false,
        // 连线的端点
        // Endpoint: ["Dot", {radius: 5}],
        Endpoint: ["Rectangle", {
          height: 10,
          width: 10
        }],
        // 线端点的样式
        EndpointStyle: {
          fill: 'rgba(255,255,255,0)',
          outlineWidth: 1
        },
        LogEnabled: true, //是否打开jsPlumb的内部日志记录
        // 绘制线
        PaintStyle: {
          stroke: '#409eff',
          strokeWidth: 2
        },
        // 绘制箭头
        Overlays: [
          ['Arrow', {
            width: 8,
            length: 8,
            location: 1
          }],
        ],
        RenderMode: "svg"
      },
      // jsplumb连接参数
      jsplumbConnectOptions: {
        isSource: true,
        isTarget: true,
        // 动态锚点、提供了4个方向 Continuous、AutoDefault
        anchor: "Continuous",
      },
      jsplumbSourceOptions: {
        filter: ".flow-node-drag", //触发连线的区域
        /*"span"表示标签，".className"表示类，"#id"表示元素id*/
        filterExclude: false,
        anchor: "Continuous",
        allowLoopback: false
      },
      jsplumbTargetOptions: {
        filter: ".flow-node-drag",
        /*"span"表示标签，".className"表示类，"#id"表示元素id*/
        filterExclude: false,
        anchor: "Continuous",
        allowLoopback: false
      },
      // 是否加载完毕
      loadEasyFlowFinish: false,
      // 数据
      data: {
        flowInfo: {
          Id: this.getUUID(),
          Name: '我的流程',
          Remark: '',
        },
        nodeList: nodeList,
        lineList: lineList
      },
      currentItem: '', //临时存添加的元素
      isConnect: false, //判断是否连接
      timer: null, //定时器,判断单双击,
      currentConnect: '', //当前的连接线
      currentLine: '', //当前连接线数据
      editType: '', //编辑的类型,
      flowNodeContainer: {
        position: 'absolute',
      },
      editNodeData: {}
    }
  },
  mounted() {
    this.jsPlumb = jsPlumb.getInstance();
    this.$nextTick(() => {
      this.init();
    });
    // this.editFlow()
  },
  methods: {
    init() {
      this.jsPlumb.ready(() => {
        // 导入默认配置
        this.jsPlumb.importDefaults(this.jsplumbSetting)
        // 会使整个jsPlumb立即重绘。
        this.jsPlumb.setSuspendDrawing(false, true);
        // 初始化节点
        this.loadEasyFlow()
        // 单点连接线（编辑label）,
        this.jsPlumb.bind('dblclick', function (conn, originalEvent) {
          //clearTimeout(this.timer);
          //this.timer = setTimeout(function () { // 这里采用执行自定义事件的方式
          //    console.log("click", conn);
          //    _this.editLine(conn);
          //}, 300); // 延迟300ms执行单击事件,区分双击事件
          console.log("click", conn);
          console.log(originalEvent);
          this.editLine(conn);
          console.log(conn.getOverlay("label-1"));
          //conn.getOverlay("label-1").setLabel('大肥肚'); //初始化label
        })
      })
    },
    // 加载流程图
    loadEasyFlow() {

      // 初始化节点
      for (let i = 0; i < this.data.nodeList.length; i++) {
        let node = this.data.nodeList[i]
        // 设置源点，可以拖出线连接其他节点
        this.jsPlumb.makeSource(node.id, this.jsplumbSourceOptions)
        // // 设置目标点，其他源点拖出的线可以连接该节点
        this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions)
        // jsPlumb.addEndpoint(node.id)
        // 设置可拖拽
        // jsPlumb.draggable(node.id, {
        //     containment: 'parent',
        //     grid: [10, 10]
        // })

        this.jsPlumb.draggable(node.id, {
          containment: 'parent'
        })

        // jsPlumb.draggable(node.id)
      }

      // 初始化连线
      for (var i = 0; i < this.data.lineList.length; i++) {
        let line = this.data.lineList[i]
        let connection = this.jsPlumb.connect({
          source: line.from,
          target: line.to,
        }, this.jsplumbConnectOptions);

        connection.getOverlay("label-1").setLabel(line.label); //初始化label
      }
      this.$nextTick(function () {
        this.loadEasyFlowFinish = true
      })
    },
    drag(item) {
      console.log(item);
      this.currentItem = item;
    },
    drop() {
      var _obj = this.$refs.flowContent;
      console.log(_obj);
      var temp = {
        id: this.getUUID(),
        label: this.currentItem.name,
        top: event.offsetY + 'px',
        left: event.offsetX + 'px',
        Type: this.currentItem.type,
        nodeType: this.currentItem.nodeType
      }
      this.addNode(temp);
      // this.editNode(temp.id);
    },
    allowDrop(event) {
      event.preventDefault()
    },
    deleteNode() {

    },
    changeNodeSite() {

    },
    editNode(nodeId) {
      console.log('编辑节点', nodeId)
      this.editType = 'node';
      /* this.$nextTick(function () {
        this.$refs.nodeForm.init(this.data, nodeId)
      }) */
      console.log('bbb', this.data);
      let obj = {
        nodeId: nodeId
      }
      this.editNodeData = Object.assign({}, obj, this.data)
      console.log(this.editNodeData);
    },
    // 添加新的节点
    addNode(temp) {
      console.log('添加节点', temp)
      this.data.nodeList.push(temp);
      this.$nextTick(function () {
        this.jsPlumb.makeSource(temp.id, this.jsplumbSourceOptions)
        this.jsPlumb.makeTarget(temp.id, this.jsplumbTargetOptions)
        this.jsPlumb.draggable(temp.id, {
          containment: 'parent'
        })

      })
    },
    getUUID() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";
      var uuid = s.join("");
      return uuid;
    },
    editFlow() {
      /* this.editType = 'flow';
      this.$nextTick(function () {
        this.$refs.flowEdit.init(this.data.flowInfo);
      }) */
    },
    saveData() {
      console.log(this.data.nodeList);
      console.log(this.data.lineList);
      this.axios.post('/node', this.data.nodeList)
      this.axios.post('/line', this.data.lineList)
    }
  }
}
</script>

<style lang="scss" scoped>
.drop-field {
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
}

.flow-menu {
  .menu-item {
    margin-bottom: 30px;
  }
}

#flowContent {
  width: 100%;
  height: 100vh;
  position: relative;
}

.el-select {
  width: 100%;
}

.flow-menu{
  text-align: center;
  height: 100vh;
  border-right: 1px solid #ccc;
}
</style>
