// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Genel JS & TS kuralları
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Global ignore'lar
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",        // derleme çıktıları (örn: backend/dist)
      "**/.vite/**",
      "**/build/**",
      "**/.eslintcache",
    ],
  },

  // Frontend: src/**/*.{ts,tsx}
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      sourceType: "module",
      parserOptions: {
        ecmaVersion: 2023,
        ecmaFeatures: { jsx: true }, // JSX desteği
      },
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        localStorage: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    settings: { react: { version: "detect" } },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },

  // Backend TS (opsiyonel; dist zaten ignore ediliyor)
  {
    files: ["backend/**/*.ts"],
    languageOptions: {
      sourceType: "module",
      parserOptions: { ecmaVersion: 2023 },
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        require: "readonly",
        module: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];
