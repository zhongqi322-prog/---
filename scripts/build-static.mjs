import { spawnSync } from "node:child_process";
import process from "node:process";

const env = { ...process.env, STATIC_EXPORT: "1" };

if (process.platform === "win32" && env.Path && env.PATH) {
  delete env.PATH;
}

const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build", "--webpack"], {
  env,
  stdio: "inherit",
});

if (result.error) {
  process.stderr.write(`${result.error}\n`);
}

process.exit(result.status ?? 1);
