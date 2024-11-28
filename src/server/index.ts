import http from "node:http";
import prolog from "@qzda/prolog";

import { devLog, getLocalIP } from "../../utils";
import { ServerConfig } from "./type";
import { methodHandlerGet, methodHandlerPost } from "./methodHandler";

export function startServers(config: ServerConfig) {
  const servers: http.Server[] = [];

  // local server
  const localServer = http.createServer((req, res) => {
    const { method = "", url = "" } = req;
    devLog(prolog.green(`${new Date().toISOString()}`));
    devLog(prolog.yellow(method), prolog.gray(url));
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
  localServer.on("error", console.error);
  localServer.listen(config.port, () => {
    console.log(
      `Server ready: ${prolog.underline(
        prolog.cyan(`http://localhost:${config.port}/`)
      )}`
    );
  });
  servers.push(localServer);

  // lan server
  if (config.enableLan) {
    const lanServer = http.createServer((req, res) => {
      const { method = "", url = "" } = req;
      devLog(prolog.green(`${new Date().toISOString()}`));
      devLog(prolog.yellow(method), prolog.gray(url));
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
    lanServer.on("error", console.error);
    const host = getLocalIP();
    lanServer.listen(config.port, host, () => {
      console.log(
        `Server ready: ${prolog.underline(
          prolog.cyan(`http://${host}:${config.port}/`)
        )}`
      );
    });
    servers.push(lanServer);
  }

  return servers;
}
