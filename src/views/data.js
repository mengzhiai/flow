/*
 * @Author: your name
 * @Date: 2019-11-21 14:21:13
 * @LastEditTime: 2019-11-28 10:32:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \drag\src\views\data.js
 */
export let nodeList = [
  {
      id: "c86e99b6-d2f4-4be4-ba57-d975ab936946", 
      label: "开始立案", 
      top: "126px", 
      left: "374px", 
      type: -1, 
      isSign: -1,
      nodeType: "is-start"
  }, 
  {
      id: "4e7d5cf5-93d4-4fd7-b7dc-f7a8eed38e8f", 
      label: "状态", 
      top: "299px", 
      left: "375px", 
      Type: 1, 
      isSign: 1,
      nodeType: "is-state"
  }
]
export let lineList = [
  {
      from: "c86e99b6-d2f4-4be4-ba57-d975ab936946", 
      to: "4e7d5cf5-93d4-4fd7-b7dc-f7a8eed38e8f", 
      label: "连线名称222", 
      id: "df0b7558-1e68-4f5f-807c-96a65f874295", 
      Remark: ""
  }
]
