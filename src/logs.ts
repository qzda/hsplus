import chalk from "chalk";
import { version } from "../package.json";

export function logVersion() {
  console.log(version);
}

export function logHelp() {
  console.log();
  console.log(chalk.bold("Usage:"));
  console.log(`  hsplus <${chalk.cyan("command")}> [...args]`);
  console.log();
  console.log(chalk.bold("Example:"));
  console.log(`  hsplus`);
  console.log();
  console.log(chalk.bold("Options:"));
  console.log(`  ${chalk.cyan("-h, --help")}\t${"Display this menu and exit"}`);
}
