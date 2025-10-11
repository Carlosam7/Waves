import js from "@eslint/js";
import globals, { node } from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    env: {
      browser: true,
      es2024: true,
      node: true,
    },
    rules: {
      "no-unused-vars": "warn",
    },
  },
]);
