import http from "node:http";
import prolog from "@qzda/prolog";

import { devLog, getLocalIP } from "../../utils";
import { ServerConfig } from "./type";
import { methodHandlerGet, methodHandlerPost } from "./methodHandler";

export function startServer(config: ServerConfig) {
  const server = http.createServer((req, res) => {
    const { method, url } = req;
    devLog(prolog.green(`${new Date().toISOString()}`), method, url);
    switch (method) {
      case "GET":
        methodHandlerGet(req, res, config);
        break;
      case "POST":
        methodHandlerPost(req, res, config);
        break;
      default:
        res.writeHead(405, { "Content-Type": "text/plain;charset=utf-8" });
        res.end(`${method} not supported`);
    }
  });

  // server start
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

  return server;
}
