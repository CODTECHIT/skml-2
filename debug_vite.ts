import { execSync } from "child_process";
try {
  const output = execSync("npx vite --debug", { stdio: "pipe" });
  console.log(output.toString());
} catch (error: any) {
  console.error("STDOUT:", error.stdout?.toString());
  console.error("STDERR:", error.stderr?.toString());
}
