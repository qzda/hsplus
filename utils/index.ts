import { readdirSync } from "node:fs";
import path from "node:path";
import os from "node:os";

export const isDev = process.env.NODE_ENV === "dev";

export function getFullPath(_path: string) {
  if (_path.startsWith("~") && process.env.USERPROFILE) {
    return path.join(process.env.USERPROFILE, _path.replace("~", ""));
  }

  if (_path.startsWith(".")) {
    return path.join(process.cwd(), _path.replace("~", ""));
  }

  return _path;
}

export function getFileList(path: string) {
  const files = readdirSync(path, { withFileTypes: true });

  return files;
}

export function getThisFilePath() {
  const funcName = "getThisFilePath";

  const e = new Error();
  let _path = e.stack?.split("\n")[1].trim() || "";
  devLog(_path);
  _path = _path
    .slice(_path.indexOf(funcName) + funcName.length)
    .trim()
    .replaceAll("file:", "")
    .replaceAll(/\(|\)/g, "")
    .replace(/:\d+:\d+$/, "");

  // On Windows, path start '/' will error
  while (_path.includes(":") && _path[0] === "/") {
    devLog(_path);
    _path = _path.slice(1);
  }

  return _path;
}

export function delayResolve(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
}

/** Only Dev mode log */
export function devLog(...args: any[]) {
  if (isDev) {
    console.log(...args);
  }
}

export function isTextFile(fileType: string) {
  // todo: video/mp2t maybe is typescript file
  if (fileType === "video/mp2t") {
    return true;
  }
  return fileType.startsWith("text/") || fileType.startsWith("application/");
}

export function getLocalIP(): string {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    if (!iface) continue;

    for (const alias of iface) {
      if (alias.family === "IPv4" && !alias.internal) {
        return alias.address;
      }
    }
  }
  return "localhost";
}
