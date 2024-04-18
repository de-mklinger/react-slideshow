#!/usr/bin/env node

import {globSync} from "glob";
import * as child_process from "node:child_process";

const testFiles= globSync("./src/**/*.test.ts");

if (testFiles.length === 0) {
  console.error("No test files found");
  process.exit(1);
}

try {
  child_process.execFileSync(
    process.argv0,
    [
      "--import",
      "tsx",
      "--test",
      ...testFiles
    ],
    {
      stdio: "inherit",
    }
    );
} catch (e) {
  process.exit(typeof e.status === "number" ? e.status : 1)
}
process.exit(0);
