<script>
import fieldMixin from '@/mixins/fieldMixin'
import optionMixin from '@/mixins/optionMixin'

export default {
  name: 'FieldCascader',

  mixins: [fieldMixin, optionMixin],

  data() {
    return {
      loading: false,
      options: [],
      privateProps: {
        filterable: true,
      },
    }
  },

  render() {
    return (
      <el-cascader
        v-model={this.value}
        {...this.getStyleAndClass}
        {...{ props: this.mergedProps }}
        {...{ on: this.mergedEvents }}
        options={this.options}
      ></el-cascader>
    )
  },
}
</script>