---
sidebarDepth: 2
---

# Props

## tableData

- type: `Array`
- default: `[]`

表格数据

## tableColumns

- type: `Array`
- default: `[]`

表格列配置，具体可查看 Prop tableColumns。

## tableProps

- type: `Object`
- default: `{}`

可传入 Element-UI table#table-attributes 的所有属性。

内部通过 v-bind 传递给 `<el-table>` 元素。

## contentEvents

- type: `Object`
- default: `{}`

可传入 Element-UI table#table-events 的所有支持事件。

内部通过 v-on 绑定给 `<el-table>` 元素。

## selection

- type: `Array`
- default: `[]`

表格行选择的选中数据。可通过 .sync 修饰符获取更新：

```vue
<validate-table :selection.sync="selection" />
```

## tableSelectionColumn

- type: `Boolean | String`
- default: `true`

是否开启表格行选择功能。传入 'single' 为表格单选效果。

## rules

- type: `Object`
- default: `undefined`

表格校验规则，内部通过 `tableColumns` 列配置的 prop 去匹配校验规则。

`rules` 的可选属性值有 `Array | Object | Function`。

通过函数方式可配置动态校验规则。

## disabled

- type: `Boolean`
- default: `false`

禁用表格可编辑的表单控件
