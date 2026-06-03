import js from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import vueParser from 'vue-eslint-parser';

export default [
  // Ignore patterns
  {
    ignores: ['.nuxt/**', 'dist/**', '.output/**', 'node_modules/**', '.git/**'],
  },

  js.configs.recommended,

  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        defineNuxtConfig: 'readonly',
        useRuntimeConfig: 'readonly',
        useSeoMeta: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        defineNuxtConfig: 'readonly',
        useRoute: 'readonly',
        useRouter: 'readonly',
        useI18n: 'readonly',
        useRuntimeConfig: 'readonly',
        useSeoMeta: 'readonly',
        NuxtLink: 'readonly',
        NuxtLayout: 'readonly',
        NuxtPage: 'readonly',
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        ref: 'readonly',
        computed: 'readonly',
        watch: 'readonly',
        onMounted: 'readonly',
        onUnmounted: 'readonly',
      },
    },
    plugins: {
      vue: eslintPluginVue,
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...eslintPluginVue.configs['flat/recommended'].rules,
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
