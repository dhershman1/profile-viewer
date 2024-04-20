// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  [
    {
      rules: {
        'vue/multi-word-component-names': 'off',
        '@stylistic/comma-dangle': 'off'
      }
    }
  ]
  // Your custom configs here
)
