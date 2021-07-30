<script>
import allComponent from '@/components/fields'
import { upperFirst, ensureArray } from '@/utils/helpers'
import { isPlainObject, isFunction } from '@/utils/types'

const _getColumnProp = (rowIndex, prop) => {
  return `internalData.${rowIndex}.${prop}`
}

const _getFieldName = (rowIndex, prop) => {
  return `Field.${rowIndex}.${prop}`
}

export default {
  name: 'ValidateTable',

  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    tableColumns: {
      type: Array,
      default: () => [],
    },
    tableProps: {
      type: Object,
      default: () => ({}),
    },
    tableEvents: {
      type: Object,
      default: () => ({}),
    },
    selection: {
      type: Array,
      default: () => [],
    },
    tableSelectionColumn: {
      type: [Boolean, String],
      default: false,
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
    height: [Number, String],
    mode: {
      type: String,
      default: 'edit',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      internalSelection: [],
      form: {
        internalData: [],
      },
    }
  },

  computed: {
    mergedProps() {
      const defaultProps = {
        border: true,
        size: 'small',
      }
      return Object.assign({}, defaultProps, this.tableProps)
    },
    selectionColumn() {
      const column = this.tableSelectionColumn
      if (column === false) return false
      let finalColumn = {}
      if (column === 'single') {
        finalColumn.type = 'single'
      } else if (isPlainObject(column)) {
        finalColumn.type = column.type === 'single' ? 'single' : 'selection'
      } else {
        finalColumn.type = 'selection'
      }
      finalColumn.selectable = isFunction(column.selectable)
        ? column.selectable
        : null
      return finalColumn
    },
    isPureTable() {
      return (
        !this.rules &&
        !this.tableColumns.some(
          (c) => c.rules || this.getFieldComponent(c.name)
        )
      )
    },
  },

  watch: {
    tableData: {
      handler(val) {
        this.form.internalData = val
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    /**
     * 供外部调用方法
     */
    validate() {
      let flag = false
      this.$refs.ElForm.validate((valid) => {
        flag = valid
      })
      return flag
    },
    validateRow(rowIndex, callback) {
      const rowIndexs = ensureArray(rowIndex)
      const allProps = this.tableColumns.map((c) => c.prop)
      rowIndexs.forEach((index) => {
        this.$refs.ElForm.validateField(
          allProps.map((prop) => _getColumnProp(index, prop)),
          callback
        )
      })
    },
    validateColumn(prop, callback) {
      const props = ensureArray(prop)
      this.form.internalData.forEach((_, index) => {
        this.$refs.ElForm.validateField(
          props.map((prop) => _getColumnProp(index, prop)),
          callback
        )
      })
    },
    clearValidate() {
      this.$refs.ElForm.clearValidate()
    },
    clearRowValidate(rowIndex) {
      const rowIndexs = ensureArray(rowIndex)
      const allProps = this.tableColumns.map((c) => c.prop)
      rowIndexs.forEach((index) => {
        this.$refs.ElForm.clearValidate(
          allProps.map((prop) => _getColumnProp(index, prop))
        )
      })
    },
    clearColumnValidate(prop) {
      const props = ensureArray(prop)
      this.form.internalData.forEach((_, index) => {
        this.$refs.ElForm.clearValidate(
          props.map((prop) => _getColumnProp(index, prop))
        )
      })
    },
    resetFields() {
      this.$refs.ElForm.resetFields()
    },
    getSelection() {
      return this.internalSelection
    },
    // 获取选择类组件的 option
    getColumnOptions(index, prop) {
      const field = _getFieldName(index, prop)
      return this.$refs[field].options
    },
    // 更新选择类组件的 option
    updateColumnOptions(index, prop) {
      const field = _getFieldName(index, prop)
      return this.$refs[field].resolveOptions()
    },

    /**
     * 内部调用方法
     */
    getFieldComponent(name) {
      return allComponent[`Field${upperFirst(name)}`]
    },
    onSelectionChange(selection) {
      this.internalSelection = selection
      this.$emit('update:selection', selection)
    },
    onRowClick(row) {
      if (this.selectionColumn && !this.disabled) {
        if (this.selectionColumn.type === 'single') {
          this.$refs.ElTable.clearSelection()
          // this.$refs.ElTable.store.states.selection = []
        }
        this.$refs.ElTable.toggleRowSelection(row)
      }
    },
    getRules(column) {
      const { prop, rules } = column
      const formRules = this.rules && this.rules[prop]
      return rules || formRules
    },
    renderSlot(scope, column) {
      const { row, $index } = scope
      const { render, prop, name, viewConfig } = column
      const component = this.getFieldComponent(name)
      if (render) return render(scope)
      if (component) {
        return this.$createElement(component, {
          ref: _getFieldName($index, prop),
          props: {
            scope,
            row,
            column,
            mode: this.mode,
            viewConfig: viewConfig,
          },
        })
      }
      return row[prop]
    },
    renderFormItem(scope, column) {
      const { $index } = scope
      const { prop } = column
      const rules = this.getRules(column)
      const isRuleFunction = isFunction(rules)
      const props = {
        prop: _getColumnProp($index, prop),
        rules: isRuleFunction ? rules(scope) : rules,
      }
      const formItemData = { props }
      formItemData.scopedSlots = {
        default: () => this.renderSlot(scope, column),
      }
      return this.$createElement('el-form-item', formItemData)
    },
    renderSelectionColumn() {
      if (!this.selectionColumn) return null
      const columnData = {}
      const props = { width: '50', align: 'center' }
      if (this.selectionColumn.type === 'selection') {
        props.type = 'selection'
      } else {
        props.fixed = this.tableColumns.some((col) => col.fixed)
        props.resizable = false
        columnData.scopedSlots = {
          default: (scope) => {
            const { row } = scope
            return this.$createElement('el-radio', {
              props: {
                value: this.internalSelection.indexOf(row) > -1 ? '' : null,
                label: '',
              },
              nativeOn: {
                click: (e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  this.onRowClick(row, null, e)
                },
              },
            })
          },
        }
      }
      columnData.props = props
      return this.$createElement('el-table-column', columnData)
    },
    renderTableColumn(column) {
      const _createColumn = (column) => {
        const { render, visible = true, ...props } = column
        const columnVisible = isFunction(visible) ? visible() : visible
        if (!columnVisible) return null
        const propsData = { props }
        const rules = this.getRules(column)
        if (rules) {
          propsData.props['class-name'] = 'el-table__column--validate'
        }
        const isRuleFunction = isFunction(rules)
        const component = this.getFieldComponent(props.name)
        if (render || isRuleFunction || component) {
          propsData.scopedSlots = {
            default: (scope) => {
              return rules
                ? this.renderFormItem(scope, column)
                : this.renderSlot(scope, column)
            },
          }
        }
        return this.$createElement('el-table-column', propsData)
      }
      return isPlainObject(column) ? _createColumn(column) : null
    },
  },

  render() {
    const ElTable = (
      <el-table
        ref="ElTable"
        v-loading={this.loading}
        height={this.height}
        data={this.form.internalData}
        {...{ props: this.mergedProps }}
        on-selection-change={this.onSelectionChange}
        on-row-click={this.onRowClick}
        {...{ on: this.tableEvents }}
      >
        {this.renderSelectionColumn()}
        {this.tableColumns.map((column) => this.renderTableColumn(column))}
      </el-table>
    )
    const formProps = { model: this.form, disabled: this.disabled }
    return (
      <div class="validate-table">
        {this.isPureTable ? (
          ElTable
        ) : (
          <el-form ref="ElForm" {...{ props: formProps }}>
            {ElTable}
          </el-form>
        )}
      </div>
    )
  },
}
</script>
<style lang="less" scoped>
.validate-table {
  /deep/.el-table {
    th {
      background: #f5f7fa;
    }
    .el-table__column--validate > .cell {
      overflow: visible;
      .el-form-item {
        margin-bottom: 0;
        padding: 6px 0;
        .el-form-item__error {
          padding-top: 0;
        }
      }
    }
  }
}
</style>