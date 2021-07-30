<template>
  <div id="demo">
    <p>
      <el-button @click="handleRowValidate">校验第1行</el-button>
      <el-button @click="$refs.ValidateTable.validateColumn('inputRule')">
        校验列（校验规则）校验
      </el-button>
      <el-button @click="$refs.ValidateTable.clearRowValidate([0])">
        清除第1行校验
      </el-button>
      <el-button @click="$refs.ValidateTable.clearColumnValidate('inputRule')">
        清除列（校验规则）校验
      </el-button>
    </p>
    <ValidateTable
      ref="ValidateTable"
      v-bind="config"
      :selection.sync="selection"
    />
  </div>
</template>

<script>
import ValidateTable from '@/'

export default {
  name: 'Demo',

  components: {
    ValidateTable,
  },

  data() {
    return {
      selection: [],
      config: {
        mode: 'edit',
        // disabled: true,
        tableSelectionColumn: 'single',
        rules: {
          input: [{ required: true, message: '该字段必填', trigger: 'blur' }],
        },
        tableData: [
          {
            input: '孙自鹏',
            select: 2,
            date: '2021-06-01',
            inputNumber: 1,
            radio: '2',
            switch: 1,
            checkbox: ['1', '2'],
            inputRule: '',
          },
          {
            input: '高铭',
            select: 1,
            date: '',
            inputNumber: 100,
            radio: '1',
            switch: 0,
            checkbox: ['2'],
            inputRule: '',
          },
        ],
        tableColumns: [
          {
            name: 'select',
            prop: 'select',
            label: '选择框',
            align: 'center',
            componentProps: {
              multiple: true,
            },
            componentEvents: {
              change: ({ $index }) => {
                const options = this.$refs.ValidateTable.getColumnOptions(
                  $index,
                  'select'
                )
                console.log(options)
              },
            },
            async options({ row }) {
              if (row.switch === 1) {
                return [
                  { label: '懂事', value: 1 },
                  { label: '用户', value: 2 },
                ]
              } else {
                return [
                  { label: '法人', value: 1 },
                  { label: '执行', value: 2 },
                ]
              }
            },
          },
          {
            name: 'switch',
            prop: 'switch',
            label: '开关',
            align: 'center',
            componentProps: {
              activeValue: 1,
              inactiveValue: 0,
            },
            // componentEvents: {
            //   change: ({ $index }) =>
            //     this.$refs.ValidateTable.updateFieldOptions(
            //       $index,
            //       'representative_type'
            //     ),
            // },
            // formatter: (row) => (row.member_type === 1 ? '是' : '否'),
          },
          {
            name: 'input',
            prop: 'input',
            label: '输入框',
            align: 'center',
            componentEvents: {
              input: ({ row }, val) => console.log(row, val),
            },
          },
          {
            name: 'date',
            prop: 'date',
            label: '时间',
            align: 'center',
          },
          {
            name: 'radio',
            prop: 'radio',
            label: '单选框',
            options: [
              { label: '单选1', value: '1' },
              { label: '单选2', value: '2' },
            ],
          },
          {
            name: 'checkbox',
            prop: 'checkbox',
            label: '复选框',
            options: [
              { label: '复选1', value: '1' },
              { label: '复选2', value: '2' },
            ],
            viewConfig: {
              className: 'vt-column--view-mode',
              style: 'color: #409EFF',
              // renderContent: (text) => text.split(',').map((t) => <div>{t}</div>),
            },
          },
          {
            name: 'inputNumber',
            prop: 'inputNumber',
            label: '计数器',
          },
          {
            name: 'input',
            prop: 'inputRule',
            label: '校验规则',
            align: 'center',
            rules: [
              { required: true, message: '该字段必须填写1', trigger: 'blur' },
            ],
            render: ({ row }) => (
              <el-input
                // v-model={row.inputRule}
                value={row.inputRule}
                on-input={(val) => (row.inputRule = val)}
                disabled={this.disabled}
                size="small"
              ></el-input>
            ),
          },
        ],
      },
    }
  },

  methods: {
    handleRowValidate() {
      this.$refs.ValidateTable.validateRow([0], (err) => {
        console.log(err)
      })
    },
  },
}
</script>