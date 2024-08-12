import process from "node:process";
import chalk from "chalk";
import { logHelp, logVersion } from "./logs";

function mian(args: string[]) {
  if (args.length === 1 && ["-v", "--version"].includes(args[0])) {
    logVersion();
  } else if (
    args.length === 0 ||
    (args.length === 1 && ["-h", "--help"].includes(args[0]))
  ) {
    logHelp();
  } else {
    console.error(
      `The command ${chalk.bgRed(`hsplus ${args.join(" ")}`)} is invalid.`
    );
  }
}

const args: string[] = [];
process.argv.slice(2).forEach((arg) => {
  if (arg.startsWith("-")) {
    args.push(arg);
  } else {
    if (args.at(-1)?.startsWith("-")) {
      args.push(arg);
    } else {
      if (args.at(-1)) {
        args[args.length - 1] = [args.at(-1) || "", arg].join(" ").trim();
      } else {
        args.push(arg);
      }
    }
  }
});

// console.log(args);

mian(args);
