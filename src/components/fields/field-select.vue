<script>
import fieldMixin from '@/mixins/fieldMixin'
import optionMixin from '@/mixins/optionMixin'

export default {
  name: 'FieldSelect',

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
    return this.isRenderField ? (
      <el-select
        loading={this.loading}
        v-model={this.value}
        {...this.getStyleAndClass}
        {...{ props: this.mergedProps }}
        {...{ on: this.mergedEvents }}
      >
        {this.options.map((option) => (
          <el-option {...{ props: option }}></el-option>
        ))}
      </el-select>
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