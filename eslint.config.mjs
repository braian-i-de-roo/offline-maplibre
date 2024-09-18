import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier/recommended'
import globals from 'globals'

export default tseslint.config(
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    ignores: ['babel.config.js', 'expo-env.d.ts', 'metro.config.js'],
  },
)
