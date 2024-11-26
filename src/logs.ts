import prolog from "@qzda/prolog";
import { version } from "../package.json";

export function logVersion() {
  console.log(version);
}

export function logHelp() {
  const tab = "\t\t";

  console.log();
  console.log(prolog.bold("Usage:"));
  console.log(`  hsplus [${prolog.green("path")}] [${prolog.cyan("options")}]`);
  console.log();

  console.log(prolog.bold("Options:"));
  console.log(
    `  ${prolog.cyan(
      "-p, --port"
    )}${tab}${"Port to use. Use -p 0 to look for an open port, starting at 8080. It will also read from process.env.PORT."}`
  );
  console.log(`  ${prolog.cyan("--host")}${tab}${"Enable LAN access"}`);
  console.log(
    `  ${prolog.cyan("-h, --help")}${tab}${"Display this menu and exit"}`
  );
  console.log(
    `  ${prolog.cyan("-v, --version")}${tab}${"Print the version and exit"}`
  );

  console.log();
}
