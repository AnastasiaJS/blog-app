---
title: antd-table中集成react-dnd
toc: true
comments: true
categories: javascript
date: 2018-12-21 10:31:20
tags:
    - react
    - react-dnd
    - ant-design
    - table
    - 拖拽
---

 [ant-design官网表格排序例子(https://ant.design/components/table-cn/#components-table-demo-drag-sorting)

## 重写Table组件里的component

代码如下：

```js
class DragSortingTable extends React.Component {
  state = {
    data: [...],
  }

  components = {
    body: {
      row: DragableBodyRow,
    },
  }

  moveRow = (dragIndex, hoverIndex) => {
    ...
  }

  render() {
    return (
      <Table
        columns={columns}
        dataSource={this.state.data}
        components={this.components}
        onRow={(record, index) => ({
          index,
          moveRow: this.moveRow,
        })}
      />
    );
  }
}
```

其中主要代码是`components={this.components}`用来覆盖默认的 table 元素，拖动行则需要对row重写：

 ```components = {
        body: {
        row: DragableBodyRow,
        },
    }
  ```

DragableBodyRow为：

```js
const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
}))(
  DragSource('row', rowSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    dragRow: monitor.getItem(),
  }))(BodyRow)
);
```

DropTarget和DragSource 是高阶组件.

```js
  class BodyRow extends React.Component {
    render() {
      const {
        connectDragSource,
        connectDropTarget,
        ...restProps
      } = this.props;

      ...

      return connectDragSource(
        connectDropTarget(
          <tr
            {...restProps}
          />
        )
      );
    }
  }
  ```
