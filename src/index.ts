import process from "node:process";
import { logHelp, logVersion } from "./logs";
import { startServer } from "./server";
import { version } from "../package.json";

function main(args: string[]) {
  if (args.length === 1 && ["-v", "--version"].includes(args[0])) {
    logVersion();
  } else if (args.length === 1 && ["-h", "--help"].includes(args[0])) {
    logHelp();
  } else {
    console.log(`hsplus v${version}`);

    let port: string | number = 3000;
    let path = "";

    if (args.indexOf("-p") > -1) {
      port = args[args.indexOf("-p") + 1] || 3000;
    }
    if (args.indexOf("--port") > -1) {
      port = args[args.indexOf("--port") + 1] || 3000;
    }

    if (args[0] && args[0][0] !== "-") {
      path = args[0];
    } else {
      path = process.cwd();
    }

    startServer({
      path,
      port,
    });
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

main(args);
