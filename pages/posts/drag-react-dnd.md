---
title: 拖拽组件：react-dnd
toc: true
comments: false
date: 2018-12-19 16:25:47
tag: react,react-dnd,拖拽
---
 > 从昨天下午在弄一个关于拖拽的问题，实在有点心烦，先暂停下来，认真梳理一下关于这个组件的知识。

---------------
全文参考了silkshdow的文章， [原文地址](https://phoebecodespace.github.io/2018/05/03/react-dnd-guide/)

## 核心API

- DragSource 用于包装你需要拖动的组件，使组件能够被拖拽（make it draggable）
- DropTarget 用于包装接收拖拽元素的组件，使组件能够放置（dropped on it）
- DragDropContex 用于包装拖拽根组件，DragSource 和 DropTarget 都需要包裹在DragDropContex内
- DragDropContextProvider 与 DragDropContex 类似，用 DragDropContextProvider 元素包裹拖拽根组件。

## API参数介绍

## DragSource(type, spec, collect)

## DropTarget(type, spec, collect)

  1. type: 拖拽类型，必填
  2. spec: 拖拽事件的方法对象，必填。
  3. collect: 把拖拽过程中需要信息注入组件的 props，接收两个参数 connect and monitor，必填。
  
### type

 当 source组件的type 和 target组件的type 一致时，target组件可以接受source组件。

type的类型可以是 string，symbol，也可以是用一个函数来返回该组件的其他 props

### spec

spec定义特定方法的对象，如 source组件的spec 可以定义 `拖动` 相关的事件，target组件的spec 可以定义 `放置` 相关的事件，具体列表：

#### 1. DragSource specObj

- beginDrag(props, monitor, component): 拖动开始时触发的事件，必须。返回跟props相关的对象。
- endDrag(props, monitor, component): 拖动结束时触发的事件，可选。
- canDrag(props, monitor): 当前是否可以拖拽的事件，可选。
- isDragging(props, monitor): 拖拽时触发的事件，可选。

        ```js
        // Box.jsx
        const sourceSpec = {
            beginDrag(props, monitor, component){
            // 返回需要注入的属性
            return {
                id: props.id
            }
            },
            endDrag(props, monitor, component){
            // ..
            },
            canDrag(props, monitor){
            // ..
            },
            isDragging(props, monitor){
            // ..
            }
        }
        @DragSource(ItemTypes.BOX, sourceSpec, collect)

// Example code here

#### 2. DropTarget specObj

- drop(props, monitor, component) 组件放下时触发的事件，可选。
- hover(props, monitor, component) 组件在DropTarget上方时响应的事件，可选。
- canDrop(props, monitor) 组件可以被放置时触发的事件，可选。

        // Dustbin.jsx
        const targetSpec = {
        drop(props, monitor, component){
            // ..
        },
        hover(props, monitor, component){
            // ..
        },
        canDrop(props, monitor){
            // ..
        }
        }
        @DropTarget(ItemTypes.BOX, targetSpec, collect)

        

#### 3.  specObj 对象方法相关参数

- props： 组件当前的props
- monitor：查询当前的拖拽状态，比如当前拖拽的item和它的type，当前拖拽的offsets，当前是否dropped。具体获取方法，参看collect 参数 monitor 部分
  - source组件 的 monitor 参数是 DragSourceMonitor 的实例
  - target组件 的 monitor 参数是 DropTargetMonitor 的实例
- component：当前组件实例

#### 4. collect

collect 是一个函数，默认有两个参数：connect 和 monitor。collect函数将`返回一个对象`，这个对象会注入到组件的 `props` 中，也就是说，我们可以通过 this.props 获取collect返回的所有属性。
 *传递参数时需要，项目中很多地方会需要知道当前拖拽的相关数据，很有用*

#### 5. 参数 connect

- source组件 collect 中 connect是 DragSourceConnector的实例，它内置了两个方法：`dragSource()` 和 `dragPreview()`。dragSource()返回一个方法，将source组件传入这个方法，可以将 source DOM 和 React DnD backend 连接起来；dragPreview() 返回一个方法，你可以传入节点，作为拖拽预览时的角色。
- target组件 collect 中 connect是 DropTargetConnector的实例，内置的方法`dropTarget()` 对应 dragSource()，返回可以将 drop target 和 React DnD backend 连接起来的方法。

  // Box.jsx
    @DragSource(ItemTypes.BOX, sourceSpec,(connect)=>({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    }))
    export default class Box {
    render() {
        const { connectDragSource } = this.props
        return connectDragSource(
        ```html
        &#60;div&#62;
        // Add your code here
        {
            /*...*/
            }
        </div>,
        )
    }
    }

    // Dustbin.jsx
    @DropTarget(ItemTypes.BOX, targetSpec, (connect)=>{
    connectDropTarget: connect.dropTarget(),
    })
    export default class Dustbin {
    render() {
        const { connectDropTarget } = this.props
        return connectDropTarget(
        &#60;div&#62;
        {
            /*...*/
            }
        </div>,
        )
    }
    }

#### 6. 参数 monitor

monitor 用于查询当前的拖拽状态，其对应实例内置了很多方法。
内置方法列表：

// Add your code here

 // DragSourceMonitor
monitor.canDrag()        // 是否能被拖拽
monitor.isDragging()      // 是否正在拖拽
monitor.getItemType()     // 拖拽组件type
monitor.getItem()         // 当前拖拽的item
monitor.getDropResult()   // 查询drop结果
monitor.didDrop()         // source是否已经drop在target
monitor.getInitialClientOffset()   // 拖拽组件初始拖拽时offset
monitor.getInitialSourceClientOffset()
monitor.getClientOffset() // 拖拽组件当前offset
monitor.getDifferenceFromInitialOffset() // 当前拖拽offset和初始拖拽offset的差别
monitor.getSourceClientOffset()

// DropTargetMonitor
monitor.canDrop()         // 是否可被放置
monitor.isOver(options)   // source是否在target上方
monitor.getItemType()     // 拖拽组件type
monitor.getItem()         // 当前拖拽的item
monitor.getDropResult()   // 查询drop结果
monitor.didDrop()         // source是否已经drop在target
monitor.getInitialClientOffset()   // 拖拽组件初始拖拽时offset
monitor.getInitialSourceClientOffset()
monitor.getClientOffset() // 拖拽组件当前offset
monitor.getDifferenceFromInitialOffset() // 当前拖拽offset和初始拖拽offset的差别
monitor.getSourceClientOffset()

// Add your code here

## 最后

以上是一个网友的总结，我实际上是需要在antd的table组件中使用的，react-dnd与antd-table组合又有些不同，将在下一篇文章中记录。

## 拖拽时候的样式重写

 [react-dnd-text-dragpreview](https://www.npmjs.com/package/react-dnd-text-dragpreview)

## [官网例子](http://react-dnd.github.io/react-dnd/examples-chessboard-tutorial-app.html)

## [官方源码](https://github.com/react-dnd/react-dnd)
