import http from "node:http";
import path from "node:path";
import fs from "node:fs";
import mime from "mime";
import AdmZip from "adm-zip";

import { getFileList, isTextFile, parseParams } from "../../utils";
import { ServerConfig } from "./type";
import icons from "../assets/icon";
import { render404, renderIndex } from "./render";

export function methodHandlerGet(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  config: ServerConfig
) {
  const { url = "" } = req;

  if (url === "/favicon.ico") {
    res.writeHead(304, { "Content-Type": "image/svg+xml" });
    res.end(icons.logo);
    return;
  }

  const fullPath = path.join(config.path, url);

  // 404
  if (!fs.existsSync(fullPath)) {
    res.writeHead(404, { "Content-Type": "text/html;" });
    res.end(render404(url));
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

      res.writeHead(200, { "Content-Type": "text/html;" });
      res.end(renderIndex(files, url));
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

export function methodHandlerPost(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  config: ServerConfig
) {
  const { url = "" } = req;
  const params = parseParams(url);
  const reqUrl = new URL(url, `http://${req.headers.host}/`);
  const dirPath = path.join(config.path, reqUrl.pathname);

  switch (params.type) {
    case "download":
      const filesIndex = (params.index || "").split(",");
      const filesPath = getFileList(dirPath)
        .filter((_, index) => filesIndex.includes((index + 1).toString()))
        .map((file) => path.join(dirPath, file.name));

      const zip = new AdmZip();
      filesPath.forEach((file) => {
        if (fs.lstatSync(file).isDirectory()) {
          zip.addLocalFolder(file, file.replace(dirPath, ""));
        } else {
          zip.addLocalFile(file);
        }
      });

      res.writeHead(200, { "Content-Type": "application/zip" });
      res.end(zip.toBuffer());
      break;

    default:
      res.writeHead(405, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(
        params.type
          ? `type: ${params.type} not supported`
          : "params.type is required"
      );
      break;
  }

  return;
}
