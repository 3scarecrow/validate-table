<template>
  <div>
    <ValidateTable ref="ValidateTable" v-bind="config" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        tableData: [
          { name: '张三', sex: 'male', date: '2021-11-11' },
          { name: '李四', sex: 'female', date: '2021-11-11' },
        ],
        tableColumns: [
          {
            prop: 'name',
            label: '姓名',
            render: ({ row }) => <span style="color: #409eff">{row.name}</span>,
          },
          {
            prop: 'sex',
            label: '性别',
            formatter: (row) => ({ male: '男', female: '女' }[row.sex]),
          },
          {
            prop: 'date',
            label: '时间',
          },
        ],
      },
    }
  },
}
</script>