import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      import: pluginImport,
    },
    rules: {
      "import/no-unresolved": "error", // error za loše alias import puteve
      // Dodaj još pravila po želji
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json", // koristi tvoj tsconfig za alias
        },
      },
    },
  },
];

export default eslintConfig;
