(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{460:function(e,a,l){"use strict";l.r(a);var t={name:"Validate",data:function(){return{config:{tableData:[{name:"张三"},{name:"李四"}],tableColumns:[{name:"input",prop:"name",label:"姓名",rules:[{required:!0,message:"姓名不能为空",trigger:"blur"}]},{name:"select",prop:"sex",label:"性别",options:[{label:"男",value:"male"},{label:"女",value:"female"}],rules:[{required:!0,message:"性别不能为空",trigger:"change"}]},{name:"date",prop:"date",label:"时间",rules:[{required:!0,message:"时间不能为空",trigger:"change"}]}]}}},methods:{validate:function(){var e=this.$refs.ValidateTable.validate();this.$message({type:e?"success":"error",message:e?"校验通过":"校验不通过"})},validateRow:function(e){this.$refs.ValidateTable.validateRow(e)},validateColumn:function(e){this.$refs.ValidateTable.validateColumn(e)},clearRowValidate:function(e){this.$refs.ValidateTable.clearRowValidate(e)},clearColumnValidate:function(e){this.$refs.ValidateTable.clearColumnValidate(e)},clearValidate:function(){this.$refs.ValidateTable.clearValidate()}}},n=l(41),i=Object(n.a)(t,(function(){var e=this,a=e.$createElement,l=e._self._c||a;return l("div",[l("div",{staticStyle:{margin:"20px"}},[l("el-button",{on:{click:e.validate}},[e._v("完整校验")]),e._v(" "),l("el-button",{on:{click:function(a){return e.validateRow(0)}}},[e._v("校验第一行")]),e._v(" "),l("el-button",{on:{click:function(a){return e.validateColumn("date")}}},[e._v("校验日期列")]),e._v(" "),l("el-button",{on:{click:e.clearValidate}},[e._v("移除校验")]),e._v(" "),l("el-button",{on:{click:function(a){return e.clearRowValidate(0)}}},[e._v("移除第一行校验")]),e._v(" "),l("el-button",{on:{click:function(a){return e.clearColumnValidate("date")}}},[e._v("移除日期列校验")])],1),e._v(" "),l("ValidateTable",e._b({ref:"ValidateTable"},"ValidateTable",e.config,!1))],1)}),[],!1,null,null,null);a.default=i.exports}}]);