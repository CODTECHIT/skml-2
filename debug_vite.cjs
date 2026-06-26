const { execSync } = require("child_process");
try {
  const output = execSync("npx vite", { stdio: "pipe" });
  console.log(output.toString());
} catch (error) {
  console.error("STDOUT:", error.stdout?.toString());
  console.error("STDERR:", error.stderr?.toString());
}
