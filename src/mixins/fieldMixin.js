import { isPlainObject, isFunction } from '@/utils/types'
import { pick } from '@/utils/helpers'
import FieldText from '@/components/fields/field-text'

export default {
  components: {
    FieldText
  },

  props: {
    column: {
      type: Object,
      default: () => ({}),
    },
    row: {
      type: Object,
      default: () => ({}),
    },
    scope: {
      type: Object,
      default: () => ({}),
    },
    mode: String,
    viewConfig: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      defaultProps: {
        size: 'small',
        style: { 'max-width': '100%' }
      }
    }
  },

  computed: {
    value: {
      get() {
        const prop = this.column.prop
        if (!prop) return
        return this.row[prop]
      },
      set(val) {
        const prop = this.column.prop
        if (!prop) {
          console.error(
            `[validate-table] Cannot write value without 'prop' attribute`
          )
        }
        this.$set(this.row, prop, val)
      },
    },
    mergedProps() {
      const { componentProps, disabled } = this.column
      const props = isPlainObject(componentProps) ? componentProps : {}
      props.disabled = isFunction(disabled)
        ? disabled(this.scope)
        : disabled
      const defaultProps = this.defaultProps || {}
      return Object.assign({}, this.privateProps, defaultProps, props)
    },
    mergedEvents() {
      const events = isPlainObject(this.column.componentEvents)
        ? this.column.componentEvents
        : {}
      return Object.keys(events).reduce((wrapperEvents, name) => {
        // bind 的 thisArg 设为 null，使得传入的函数的 this 绑定为原函数的 this
        wrapperEvents[name] = events[name].bind(null, this.scope)
        return wrapperEvents
      }, {})
    },
    getStyleAndClass() {
      return pick(this.mergedProps, ['class', 'style'])
    },
    isEdit() {
      return this.mode === 'edit'
    },
    isRenderField() {
      return this.isEdit && !this.viewConfig.enabled
    }
  }
}