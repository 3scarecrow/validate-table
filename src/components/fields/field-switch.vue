<script>
import fieldMixin from '@/mixins/fieldMixin'

export default {
  name: 'FieldSwitch',

  mixins: [fieldMixin],

  render() {
    return (
      <el-switch
        v-model={this.value}
        {...this.getStyleAndClass}
        {...{ props: this.mergedProps }}
        {...{ on: this.mergedEvents }}
      ></el-switch>
    )
  },
}
</script>