import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  // Base recommended rules (bug-catching, not style).
  js.configs.recommended,

  // The vanilla browser site.
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      // Classic <script> (global scope). Switch to "module" if you start
      // loading JS with <script type="module"> and using import/export.
      sourceType: "script",
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",
    },
  },

  // Must stay LAST: disables any rule that would conflict with Prettier,
  // so ESLint handles code quality and Prettier owns formatting.
  prettier,
];
