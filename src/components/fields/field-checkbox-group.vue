<script>
import fieldMixin from '@/mixins/fieldMixin'
import optionMixin from '@/mixins/optionMixin'

export default {
  name: 'FieldCheckboxGroup',

  mixins: [fieldMixin, optionMixin],

  render() {
    return this.isRenderField ? (
      <el-checkbox-group
        v-model={this.value}
        {...this.getStyleAndClass}
        {...{ props: this.mergedProps }}
        {...{ on: this.mergedEvents }}
      >
        {this.options.map((option) => (
          <el-checkbox label={option.value}>{option.label}</el-checkbox>
        ))}
      </el-checkbox-group>
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