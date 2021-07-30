<script>
import fieldMixin from '@/mixins/fieldMixin'

export default {
  name: 'FieldInputNumber',

  mixins: [fieldMixin],

  render() {
    return this.isRenderField ? (
      <el-input-number
        v-model={this.value}
        {...this.getStyleAndClass}
        {...{ props: this.mergedProps }}
        {...{ on: this.mergedEvents }}
      ></el-input-number>
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