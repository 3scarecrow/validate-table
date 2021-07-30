<script>
import fieldMixin from '@/mixins/fieldMixin'

export default {
  name: 'FieldDate',

  mixins: [fieldMixin],

  render() {
    return this.isRenderField ? (
      <el-date-picker
        v-model={this.value}
        {...this.getStyleAndClass}
        {...{ props: this.mergedProps }}
        {...{ on: this.mergedEvents }}
      ></el-date-picker>
    ) : (
      <FieldText
        text={this.value}
        viewConfig={this.viewConfig}
        scope={this.scope}
      />
    )
  },
}
</script>