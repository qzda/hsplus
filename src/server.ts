import chalk from "chalk";
import express from "express";
import { version } from "../package.json";
import { readdir } from "node:fs/promises";

export function startServer() {
  const PORT = process.env.PORT || 3000;
  const app = express();

  app.use(express.static("."));

  app.set("view engine", "pug");
  app.get("/", async (req, res) => {
    const files = await readdir(".");

    res.render("index", {
      title: "hsplus",
      message: `v${version} | files total: ${files.length}`,
      files: files,
    });
  });

  app.use(function (req, res) {
    res.status(404).render("index", {
      title: "hsplus",
      message: "Sorry cant find that!",
    });
  });

  app.listen(PORT, () => {
    console.log(`Server ready: ${chalk.blue(`http://localhost:${PORT}/`)}`);
  });
}
