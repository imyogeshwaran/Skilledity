import js from "@eslint/js";
import * as tseslint from "typescript-eslint";
import next from "eslint-config-next";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...next(),
];