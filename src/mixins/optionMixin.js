import { isFunction, isArray, isPromise } from '@/utils/types'

export default {
  data() {
    return {
      options: [],
    }
  },

  computed: {
    optionMap() {
      return this.options.reduce((map, option) => {
        return map.set(option.value, option.label), map
      }, new Map)
    },
    getViewModeText() {
      const value = this.value
      const values = isArray(value) ? value : [value]
      return values.map(v => this.optionMap.get(v) || '').join()
    }
  },

  mounted() {
    const { options } = this.column
    if (options) {
      this.resolveOptions()
      isFunction(options) && this.$watch(options, this.resolveOptions)
    }
  },

  methods: {
    async resolveOptions() {
      const { options } = this.column
      if (isArray(options)) {
        this.options = options
      } else if (isFunction(options) || isPromise(options)) {
        this.loading = true
        const result = isPromise(options)
          ? await options
          : await options(this.scope)
        if (isArray(result)) {
          this.options = result
        }
        this.loading = false
      }
      return this.options
    }
  }
}