import chalk from "chalk";
import express from "express";
import { join } from "node:path";
import { readdir } from "node:fs/promises";

import { version } from "../package.json";
import { devLog } from "../utils";

function getThisFilePath() {
  const e = new Error();
  let _path = e.stack?.split("\n")[1].trim() || "";
  _path = _path.slice(_path.indexOf("(") + 1, _path.indexOf(":"));

  return join(
    _path.slice(_path.indexOf("(") + 1, _path.indexOf(":")),
    "../../views/"
  );
}

export function startServer(config: { path: string; port: string | number }) {
  const HOME = process.env.HOME || process.env.USERPROFILE;
  const app = express();
  app.set("view engine", "pug");
  const viewPath = getThisFilePath();
  devLog(`viewPath: ${viewPath}`);
  app.set("views", viewPath);
  app.use(
    express.static(config.path, {
      dotfiles: "allow",
    })
  );

  app.get("*", async (req, res) => {
    devLog(req.path);

    const urlPath = join(config.path, req.path);
    const urlPathView = decodeURIComponent(
      HOME ? urlPath.replace(HOME, "~") : urlPath
    );

    let files: string[] = [];
    let message = "";

    try {
      files = await readdir(urlPath);
      message = `files total: ${files.length}`;
    } catch (error) {
      message = error;
    }

    const templateConfig = {
      title: "hsplus",
      message,
      files,
      version: process.env.NODE_ENV === "dev" ? `${version} dev` : version,
      urlPath: urlPathView,
    };

    res.render("index", templateConfig);
  });

  app.listen(config.port, () => {
    console.log(
      `Server ready: ${chalk.blue(`http://localhost:${config.port}/`)}`
    );
  });
}
