---
sidebarDepth: 3
---

# Methods & Events

## Methods

### validate

  校验整个表格，该方法返回一个 Boolean，表示校验是否成功。

### validateRow

- 参数:
  - `rowIndex`
    - type: `Number | Array`
    - default: `undefined`
    - desc: 校验表格行下标或下标集合

- 用法

  校验表格单行或多行。

### validateColumn

- 参数:
  - `prop`
    - type: `String | Array`
    - default: `undefined`
    - desc: 校验表格列的 prop 或 prop 集合

- 用法

  校验表格单列或多列。

### clearValidate

  移除整个表格的校验。

### clearRowValidate

- 参数:
  - `rowIndex`
    - type: `Number | Array`
    - default: `undefined`
    - desc: 移除表格校验的行下标或下标集合

- 用法

  移除表格单行或多行的校验。

### clearColumnValidate

- 参数:
  - `prop`
    - type: `String | Array`
    - default: `undefined`
    - desc: 移除表格校验列的 prop 或 prop 集合

- 用法

  移除表格单列或多列的校验。

### resetFields

  对整个表格进行重置，将所有字段值重置为初始值并移除校验结果。

### getSelection

  获取当前表格选中的数据。

### getColumnOptions

- 参数
  - `rowIndex`
    - type: `Number`
    - default: `undefined`
    - desc: 行下标
  
  - `prop`
    - type: `String`
    - default: `undefined`
    - desc: 列的 prop 属性

- 用法

对于有 options 属性的渲染器，可通过行下标 `rowIndex` 和列的 `prop` 获取 options 数据。
