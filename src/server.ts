import chalk from "chalk";
import express from "express";
import path from "node:path";
import { readdir, readFile } from "node:fs/promises";

import { version } from "../package.json";

export function startServer() {
  const PORT = process.env.PORT || 3000;
  const app = express();

  app.use(
    express.static(".", {
      dotfiles: "allow",
    })
  );

  app.set("view engine", "pug");
  app.get("*", async (req, res) => {
    const urlPath = path.join(".", req.path);
    try {
      const files = await readdir(urlPath);

      res.render("index", {
        title: "hsplus",
        message: `v${version} | files total: ${files.length} | ${urlPath}`,
        files,
        version,
        urlPath,
      });
    } catch (error) {
      res.status(404).render("index", {
        title: "hsplus",
        message: error,
      });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server ready: ${chalk.blue(`http://localhost:${PORT}/`)}`);
  });
}
