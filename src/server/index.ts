import http from "node:http";
import prolog from "@qzda/prolog";

import { devLog, getLocalIP } from "../../utils";
import { ServerConfig } from "./type";
import { methodHandlerGet } from "./methodHandler";

export function startServer(config: ServerConfig) {
  const server = http.createServer((req, res) => {
    const { method, url } = req;
    devLog(prolog.green(`${new Date().toISOString()}`), method, url);
    switch (method) {
      case "GET":
        methodHandlerGet(req, res, config);
        break;
      case "POST":
        res.end("post request not supported");
        break;
      default:
        res.end(`${method} not supported`);
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
