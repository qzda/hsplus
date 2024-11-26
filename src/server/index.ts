import http from "node:http";
import os from "node:os";
import fs from "node:fs";
import path from "node:path";
import mime from "mime";
import prolog from "@qzda/prolog";

import { devLog, getFileList } from "../../utils";
import icons from "../assets/icon";
import { Any, Body, Col, Container, Head, Html, Row } from "../views";
import { version } from "../../package.json";

interface ServerConfig {
  path: string;
  port: number;
  /** Whether to enable LAN access */
  enableLan?: boolean;
}
export function startServer(config: ServerConfig) {
  devLog("startServer", config);

  const server = http.createServer((req, res) => {
    const { method, url } = req;
    devLog(method, url);
    switch (method) {
      case "GET":
        getmethodHandler(req, res, config);
        break;
      case "POST":
        res.end("post request");
        break;
      default:
        res.end("Not Found");
    }
  });

  server.listen(config.port, () => {
    console.log(
      `Server ready: ${prolog.underline(
        prolog.cyan(`http://localhost:${config.port}/`)
      )}`
    );
  });
  if (config.enableLan) {
    const host = getLocalIP();
    server.listen(config.port, host, () => {
      console.log(
        `Server ready: ${prolog.underline(
          prolog.cyan(`http://${host}:${config.port}/`)
        )}`
      );
    });
  }

  server.on("error", (err) => {
    console.error(err);
  });

  server.on("close", () => {
    console.log("Server closed");
  });

  return server;
}

function getmethodHandler(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  config: ServerConfig
) {
  if (req.url === "/favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/svg+xml" });
    res.end(icons.default);
    return;
  }

  resRender(req, res, config);
  return;
}

function resRender(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  config: ServerConfig
) {
  const { url = "" } = req;
  const fullPath = path.join(config.path, url);

  // 404
  if (!fs.existsSync(fullPath)) {
    const html = Html([
      Head(),
      Body([Container(Any("h1", `${url} not found`))]),
    ]);
    res.writeHead(404, { "Content-Type": "text/html;" });
    res.end(html);
    return;
  } else {
    // directory
    if (fs.lstatSync(fullPath).isDirectory()) {
      const files = [
        {
          name: "..",
          isDirectory: () => true,
        },
      ].concat(getFileList(fullPath));
      const html = Html([
        Head(),
        Body([
          Container(Any("h1", `hsplus v${version}`), "mt-2"),
          Container(
            files.map((file, index) => {
              const isDirectory = file.isDirectory();
              return Row(
                [
                  Col(
                    `<input type="checkbox" class="form-check-input" ${
                      index === 0 ? "disabled" : ""
                    } />
                    ${index
                      .toString()
                      .padStart(files.length.toString().length, "0")} ${
                      isDirectory ? "📁" : "📄"
                    }`,
                    "col-3 font-monospace"
                  ),
                  Col(
                    `<a href="${path.join(
                      url,
                      file.name,
                      isDirectory ? "/" : ""
                    )}">${file.name}</a>`
                  ),
                ],
                `py-1 ${index % 2 === 1 ? "bg-secondary-subtle" : ""}`
              );
            }),
            "border rounded"
          ),
        ]),
      ]);
      res.writeHead(200, { "Content-Type": "text/html;" });
      res.end(html);
      return;
    } else {
      // file
      const fileType = mime.lookup(fullPath);

      if (isTextFile(fileType)) {
        res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        res.end(fs.readFileSync(fullPath, "utf-8"));
        return;
      } else {
        res.writeHead(200, { "Content-Type": fileType });
        res.end(fs.readFileSync(fullPath));
        return;
      }
    }
  }
}

function getLocalIP(): string {
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

function isTextFile(fileType: string) {
  // todo: video/mp2t maybe is typescript file
  if (fileType === "video/mp2t") {
    return true;
  }
  return fileType.startsWith("text/") || fileType.startsWith("application/");
}
