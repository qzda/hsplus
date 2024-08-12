import chalk from "chalk";
import { version } from "../package.json";

export function logVersion() {
  console.log(version);
}

export function logHelp() {
  const tab = "\t\t";

  console.log();
  console.log(chalk.bold("Usage:"));
  console.log(`  hsplus [${chalk.gray("path")}] [${chalk.cyan("options")}]`);
  console.log();
  // console.log(chalk.bold("Example:"));
  // console.log(`  hsplus`);
  // console.log();
  console.log(chalk.bold("Options:"));
  // console.log(
  //   `  ${chalk.cyan(
  //     "-p, --port"
  //   )}${tab}${"Port to use. Use -p 0 to look for an open port, starting at 8080. It will also read from process.env.PORT."}`
  // );
  console.log(
    `  ${chalk.cyan("-h, --help")}${tab}${"Display this menu and exit"}`
  );
  console.log(
    `  ${chalk.cyan("-v, --version")}${tab}${"Print the version and exit"}`
  );

  console.log();
}
