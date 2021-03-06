module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    // parser: 'babel-eslint'
    parser: '@typescript-eslint/parser'
  },
  extends: [
    // '@nuxtjs',
    // 'plugin:nuxt/recommended',
    // 'plugin:prettier/recommended',
    // 'plugin:vue/essential', '@vue/typescript',
    '@nuxtjs/eslint-config-typescript'
  ],
  plugins: ['@typescript-eslint'],
  // add your custom rules here
  rules: {
  }
}
