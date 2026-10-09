import nextConfig from "eslint-config-next";
import prettierConfig from "eslint-config-prettier";
import js from "@eslint/js";
import globals from "globals";

const config = [
  { ignores: [".next/**", "next-env.d.ts"] },
  { settings: { "import/resolver": { typescript: { project: "./tsconfig.json" } } } },
  ...nextConfig,
  js.configs.recommended,
  prettierConfig,
  {
    files: ["**/*.{ts,tsx,js}"],
    languageOptions: {
      globals: {
        ...globals.commonjs,
        ...globals.node,
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
      },
      ecmaVersion: 2018,
      sourceType: "module",
    },
    ignores: [".next/**", "next-env.d.ts"],
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
      "no-nested-ternary": "error",
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
  {
    files: ["components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [{ group: ["**/contentful/**", "@apollo/client", "@apollo/client/**"], message: "Load CMS data in lib/contentful and pass it through page props." }],
      }],
    },
  },
  ...[
    { layer: "atoms", forbidden: ["**/molecules/**", "**/organisms/**", "**/templates/**"] },
    { layer: "molecules", forbidden: ["**/organisms/**", "**/templates/**"] },
    { layer: "organisms", forbidden: ["**/templates/**"] },
  ].map(({ layer, forbidden }) => ({
    files: [`components/${layer}/**/*.{ts,tsx}`],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [
          { group: forbidden, message: "Atomic components may only depend on their own layer and lower layers." },
          { group: ["**/contentful/**", "@apollo/client", "@apollo/client/**"], message: "Load CMS data in lib/contentful and pass it through page props." },
        ],
      }],
    },
  })),
];

export default config;
