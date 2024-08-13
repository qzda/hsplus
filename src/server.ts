import chalk from "chalk";
import express from "express";
import { join } from "node:path";
import { readdir } from "node:fs/promises";

import { version } from "../package.json";

export function startServer(path?: string) {
  const PORT = process.env.PORT || 3000;
  const app = express();

  const HOME = process.env.HOME || process.env.USERPROFILE;
  const PWD = process.cwd();

  app.use(
    express.static(path || PWD, {
      dotfiles: "allow",
    })
  );

  app.set("view engine", "pug");
  app.get("*", async (req, res) => {
    const urlPath = join(path || PWD, req.path);
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

  app.listen(PORT, () => {
    console.log(`Server ready: ${chalk.blue(`http://localhost:${PORT}/`)}`);
  });
}
