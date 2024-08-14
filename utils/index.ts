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

export function delayResolve(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
}

/** Only Dev mode log */
export function devLog(...args: any[]) {
  if (process.env.NODE_ENV === "dev") {
    console.log(...args);
  }
}
