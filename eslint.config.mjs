import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends(
      "next",
      "prettier",
      "airbnb-base",
      "eslint:recommended",
      "plugin:import/typescript",
    ),
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    files: ["**/*.{ts,tsx,js}"],
    languageOptions: {
      globals: {
        ...globals.commonjs,
        ...globals.node,
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
      },
      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: "module",
    },
    ignores: [".next/**", "eslint.config.mjs"],
    rules: {
      // ALLES UITGEZET - voor snelle fix
      "function-paren-newline": "off",
      "operator-linebreak": "off",
      indent: "off",
      camelcase: "off",
      "arrow-body-style": "off",
      "import/no-extraneous-dependencies": "off",
      "import/order": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/exhaustive-deps": "warn",
      "no-underscore-dangle": "off",
      "object-curly-newline": "off",
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "import/newline-after-import": ["error", { count: 1 }],
      "import/no-unresolved": [2, { caseSensitive: false }],
      "import/extensions": "off",
      "no-console": ["error", { allow: ["error"] }],
      "import/prefer-default-export": "off",
      quotes: ["error", "double"],
      "max-len": "off",
      "import/no-cycle": "off",
      "no-tabs": "off",
      "comma-dangle": ["error", "only-multiline"],
      "no-trailing-spaces": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "implicit-arrow-linebreak": "off",
    },
  },
];
