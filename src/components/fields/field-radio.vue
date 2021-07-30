<script>
import fieldMixin from '@/mixins/fieldMixin'
import optionMixin from '@/mixins/optionMixin'

export default {
  name: 'FieldRadio',

  mixins: [fieldMixin, optionMixin],

  render() {
    return this.isRenderField ? (
      <span>
        {this.options.map((option) => (
          <el-radio
            v-model={this.value}
            {...this.getStyleAndClass}
            {...{ props: this.mergedProps }}
            {...{ on: this.mergedEvents }}
            label={option.value}
          >
            {option.label}
          </el-radio>
        ))}
      </span>
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