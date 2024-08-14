import path from "node:path";

export function getFullPath(_path: string) {
  if (_path.startsWith("~") && process.env.USERPROFILE) {
    return path.join(process.env.USERPROFILE, _path.replace("~", ""));
  }

  if (_path.startsWith(".")) {
    return path.join(process.cwd(), _path.replace("~", ""));
  }

  return _path;
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

export const isDev = process.env.NODE_ENV === "dev";
