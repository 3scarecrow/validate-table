<script>
import fieldMixin from '@/mixins/fieldMixin'

export default {
  name: 'FieldInput',

  mixins: [fieldMixin],

  render() {
    return this.isRenderField ? (
      <el-input
        v-model={this.value}
        {...this.getStyleAndClass}
        {...{ props: this.mergedProps }}
        {...{ on: this.mergedEvents }}
      ></el-input>
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