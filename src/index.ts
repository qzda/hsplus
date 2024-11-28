import process from "node:process";
import { logHelp, logVersion } from "./logs";
import { startServers } from "./server";
import { version } from "../package.json";

function main(args: string[]) {
  if (args.length === 1 && ["-v", "--version"].includes(args[0])) {
    logVersion();
    process.exit(0);
  } else if (args.length === 1 && ["-h", "--help"].includes(args[0])) {
    logHelp();
    process.exit(0);
  } else {
    console.log(`hsplus v${version}`);
    console.log();

    let port: number = 3000;
    if (args.indexOf("-p") > -1) {
      port = +(args[args.indexOf("-p") + 1] || port);
    }
    if (args.indexOf("--port") > -1) {
      port = +(args[args.indexOf("--port") + 1] || port);
    }

    let path = "";
    if (args[0] && args[0][0] !== "-") {
      path = args[0];
    } else {
      path = process.cwd();
    }

    const servers = startServers({
      path,
      port,
      enableLan: args.includes("--host"),
    });

    process.on("SIGINT", () => {
      process.exit(0);
    });

    process.on("beforeExit", () => {
      servers.forEach((server) => {
        server.close();
        console.log(`closing server ${server.address()}`);
      });
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
