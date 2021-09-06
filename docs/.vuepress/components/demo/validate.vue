<template>
  <div>
    <div style="margin: 20px">
      <el-button @click="validate">完整校验</el-button>
      <el-button @click="validateRow(0)">校验第一行</el-button>
      <el-button @click="validateColumn('date')">校验日期列</el-button>
      <el-button @click="clearValidate">移除校验</el-button>
      <el-button @click="clearRowValidate(0)">移除第一行校验</el-button>
      <el-button @click="clearColumnValidate('date')">移除日期列校验</el-button>
    </div>
    <ValidateTable ref="ValidateTable" v-bind="config" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        tableData: [{ name: '张三' }, { name: '李四' }],
        tableColumns: [
          {
            name: 'input',
            prop: 'name',
            label: '姓名',
            rules: [
              { required: true, message: '姓名不能为空', trigger: 'blur' },
            ],
          },
          {
            name: 'select',
            prop: 'sex',
            label: '性别',
            options: [
              { label: '男', value: 'male' },
              { label: '女', value: 'female' },
            ],
            rules: [
              {
                required: true,
                message: '性别不能为空',
                trigger: 'change',
              },
            ],
          },
          {
            name: 'date',
            prop: 'date',
            label: '时间',
            rules: [
              { required: true, message: '时间不能为空', trigger: 'change' },
            ],
          },
        ],
      },
    }
  },

  methods: {
    validate() {
      const valid = this.$refs.ValidateTable.validate()
      this.$message({
        type: valid ? 'success' : 'error',
        message: valid ? '校验通过' : '校验不通过',
      })
    },
    validateRow(rowIndex) {
      this.$refs.ValidateTable.validateRow(rowIndex)
    },
    validateColumn(prop) {
      this.$refs.ValidateTable.validateColumn(prop)
    },
    clearRowValidate(rowIndex) {
      this.$refs.ValidateTable.clearRowValidate(rowIndex)
    },
    clearColumnValidate(prop) {
      this.$refs.ValidateTable.clearColumnValidate(prop)
    },
    clearValidate() {
      this.$refs.ValidateTable.clearValidate()
    },
  },
}
</script>