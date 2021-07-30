import { isFunction } from '@/utils/types'

export default {
  functional: true,

  name: 'FieldText',

  props: {
    text: {
      type: String
    },
    viewConfig: {
      type: Object,
    },
    scope: {
      type: Object
    }
  },

  render(h, { props }) {
    const { text, viewConfig, scope } = props
    const { className, style, renderContent } = viewConfig
    return (
      <span
        class={['vt-column__field--view', className]}
        style={style}
      >
        {isFunction(renderContent) ? renderContent(text, scope) : text}
      </span>
    )
  }
}