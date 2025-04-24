#!/usr/bin/env node
import { execSync } from "child_process";
import path from "path";

const changed = execSync("git diff --cached --name-only")
  .toString()
  .trim()
  .split("\n")
  .filter(Boolean);

let hasError = false;

for (const file of changed) {
  const base = path.basename(file);
  if (/[A-Z]/.test(base)) {
    console.error(
      `\x1b[31m❌ Uppercase letters are not allowed in filename: ${file}\x1b[0m`
    );
    hasError = true;
  }
  if (
    /\.(JPG|PNG|JPEG|GIF|SVG)$/i.test(base) &&
    /\.(JPG|PNG|JPEG|GIF|SVG)$/.test(base) &&
    /[A-Z]{3,4}$/.test(base.split(".").pop())
  ) {
    console.error(
      `\x1b[31m❌ Uppercase extension detected in filename: ${file}\x1b[0m`
    );
    hasError = true;
  }
}

if (hasError) {
  console.error(
    '\nPlease rename the files using lowercase letters only. Use "git mv" to rename.'
  );
  process.exit(1);
}
