---
sidebarDepth: 3
---

# Prop: tableColumns

- type: `Array`
- default: `[]`

## 常用属性

| 参数         | 类型                                        | 说明                                                         |
| ------------ | ------------------------------------------- | ----------------------------------------------------------- |
| label        | String                                      | 表头显示的内容                                               |
| prop         | String                                      | 列字段，表格也是校验该字段                                    |
| width        | String , Number                             | 列宽                                                         |
| align        | String                                      | 列对齐方式 `left` , `center` , `right`                       |
| formatter    | Function(row)                               | 如数据需要简单文本加工，可使用该配置处理后 return 即可         |
| ...          | -                                           | **支持所有 [el-table-column][table-column-attributes] 配置** |

## 新增属性

### rules

- type: `Object | ({ row, column, $index }) => Object`

列校验规则，与 [el-form attributes: rules][form-attributes] 属性一样，函数方式用于支持动态校验规则。

### render

- type: `({ row, column, $index }) => String | VNode`

自定义渲染内容，支持返回字符串或 JSX

### visible

- type: `Boolean | () => Boolean`

是否显示列

### disabled

- type: `Boolean | ({ row, column, $index }) => Boolean`

对于表单控件，可通过该属性禁用控件

### name

- type: `String`

渲染器名称，通过 `name` 属性可以使用内置的表单控件。

渲染器名称的可选值有:

| 名称 | 说明 | 对应 Element-UI 组件 |
| ------------ | ------------------------------------------- |----------------------------------------------------|
| input | 输入框 | [Input][input] |
| select | 选择器 | [Select][select] |
| date | 日期选择器 | [Date][date] |
| switch | 开关 | [Switch][switch] |
| number | 计数器 | [Number][number] |
| radio | 单选框 | [Radio][radio] |
| radio-group | 单选框组 | [RadioGroup][radio-group] |
| checkbox | 多选框 | [Checkbox][checkbox] |
| checkbox-group | 多选框组 | [CheckboxGroup][checkbox-group] |
| cascader | 级联选择器 | [Cascader][cascader] |

### componentProps

- type: `Object`
- default: `{}`

如果使用内置的渲染器组件，可通过 `componentProps` 向对应的 Element UI 组件传递 props。例如

```js
{
  name: 'select',
  prop: 'selectValue',
  componentProps: {
    'multiple': true
  }
}
```

### componentEvents

- type: `Object`
- default: `{}`

如果使用内置的渲染器组件，可通过 `componentEvents` 向对应的 Element UI 组件传递 events。

:::tip Note
渲染器组件的事件的回调函数的参数是 `({ row, column, $index }, ...[渲染组件的 arguments]) => {}`
:::

例如

```js
{
  name: 'select',
  prop: 'selectValue',
  componentProps: {
    change: ({ row, column, $index }, value) => {console.log(row, column, $index, value)}
  }
}
```

## 私有属性

### options

- type: `Array | Promise | () => Promise<options>`
- default: `[]`

对于选择类组件，使用 `options` 传递配置项，以下组件支持 `options` 配置

- select
- cascader
- radio
- radio-group
- checkbox
- checkbox-group

例如

- `options` 为数组

```js
{
  options: [
    { label: '单选项1', value: 1 },
    { label: '单选项2', value: 2 }
  ]
}
```

- `options` 为普通函数

当 options 配置项是动态变化时，可使用函数，参数为 `{ row, column, $index }`

```js
{
  options({ row }) {
    return row.sex === 'male'
      ? [{ label: 'xxx', value: 'xxx' }]
      : [{ label: 'yyy', value: 'yyy' }] 
  }
}
```

- `options` 为 `Promise`

```js
const optionPromise = new Promise((resolve) => resolve([
  { label: 'xxx', value: 'xxx' },
  { label: 'yyy', value: 'yyy' }
]))

{
  options: optionPromise
}
```

- `options` 为 `async function`

```js
{
  async function options() {
    return [{ label: 'yyy', value: 'yyy' }]
  }
}
```

[table-column-attributes]: https://element.eleme.io/#/zh-CN/component/table#table-column-attributes
[form-attributes]: https://element.eleme.cn/#/zh-CN/component/form#form-attributes

[input]: http://element.eleme.io/#/zh-CN/component/input
[number]: http://element.eleme.io/#/zh-CN/component/input-number
[select]: http://element.eleme.io/#/zh-CN/component/select
[date]: http://element.eleme.io/#/zh-CN/component/date-picker
[switch]: https://element.eleme.io/#/zh-CN/component/switch
[cascader]: http://element.eleme.io/#/zh-CN/component/cascader
[radio]: https://element.eleme.io/#/zh-CN/component/radio
[radio-group]: https://element.eleme.io/#/zh-CN/component/radio#dan-xuan-kuang-zu
[checkbox]: https://element.eleme.io/#/zh-CN/component/checkbox
[checkbox-group]: https://element.eleme.io/#/zh-CN/component/checkbox#duo-xuan-kuang-zu
[option-attributes]: http://element.eleme.io/#/zh-CN/component/select#option-attributes