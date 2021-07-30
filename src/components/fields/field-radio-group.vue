<script>
import fieldMixin from '@/mixins/fieldMixin'
import optionMixin from '@/mixins/optionMixin'

export default {
  name: 'FieldRadioGroup',

  mixins: [fieldMixin, optionMixin],

  render() {
    return this.isRenderField ? (
      <el-radio-group
        v-model={this.value}
        {...this.getStyleAndClass}
        {...{ props: this.mergedProps }}
        {...{ on: this.mergedEvents }}
      >
        {this.options.map((option) => (
          <el-radio label={option.value}>{option.label}</el-radio>
        ))}
      </el-radio-group>
    ) : (
      <FieldText
        text={this.getViewModeText}
        viewConfig={this.viewConfig}
        scope={this.scope}
      />
    )
  },
}
</script>