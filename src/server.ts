import chalk from "chalk";
import express from "express";
import { join } from "node:path";
import { readdir } from "node:fs/promises";

import { version } from "../package.json";

export function startServer(config: { path: string; port: string | number }) {
  const app = express();

  const HOME = process.env.HOME || process.env.USERPROFILE;

  app.use(
    express.static(config.path, {
      dotfiles: "allow",
    })
  );

  app.set("view engine", "pug");
  // console.log(join(process.env.PWD || "", "../views"));
  app.set("views", join(process.env.PWD || "", "../views"));
  app.get("*", async (req, res) => {
    const urlPath = join(config.path, req.path);
    const urlPathView = decodeURIComponent(
      HOME ? urlPath.replace(HOME, "~") : urlPath
    );
    try {
      const files = await readdir(urlPath);

      res.render("index", {
        title: "hsplus",
        message: `files total: ${files.length}`,
        files,
        version,
        urlPath: urlPathView,
      });
    } catch (error) {
      res.status(404).render("index", {
        title: "hsplus",
        message: error,
        version,
        urlPath: urlPathView,
      });
    }
  });

  app.listen(config.port, () => {
    console.log(
      `Server ready: ${chalk.blue(`http://localhost:${config.port}/`)}`
    );
  });
}
