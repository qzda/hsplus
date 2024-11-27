import http from "node:http";
import path from "node:path";
import fs from "node:fs";
import mime from "mime";
import AdmZip from "adm-zip";

import { getFileList, isTextFile, parseParams } from "../../utils";
import { Any, Body, Container, Head, Html, Div } from "../views";
import { ServerConfig } from "./type";
import icons from "../assets/icon";
import { version } from "../../package.json";

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
          Container([
            Div(
              [
                Any("h1", `hsplus v${version}`, "my-2", [
                  { key: "style", value: "font-size: 2rem;" },
                ]),
                Any("a", icons.github, "link-dark", [
                  {
                    key: "href",
                    value: `https://github.com/qzda/hsplus`,
                  },
                  {
                    key: "target",
                    value: "_blank",
                  },
                ]),
              ],
              "d-flex justify-content-between align-items-center"
            ),
            Any(
              "ul",
              files.map((file, index) => {
                const isDirectory = file.isDirectory();
                return Any(
                  "li",
                  [
                    Div(
                      [
                        Any("input", "", "form-check-input", [
                          { key: "type", value: "checkbox" },
                          {
                            key: "disabled",
                            value: index === 0,
                          },
                        ]),
                        Any(
                          "span",
                          index
                            .toString()
                            .padStart(files.length.toString().length, "0"),
                          "text-black-50 mx-2"
                        ),
                        isDirectory ? "📁" : "📄",
                      ],
                      "font-monospace text-nowrap"
                    ),
                    Div(
                      Any(
                        "a",
                        file.name,
                        "link-underline link-underline-opacity-0 link-underline-opacity-75-hover",
                        [
                          {
                            key: "href",
                            value: path.join(
                              url,
                              file.name,
                              isDirectory ? "/" : ""
                            ),
                          },
                        ]
                      ),
                      "flex-fill mx-2 overflow-x-hidden text-nowrap text-truncate"
                    ),
                  ],
                  `py-1 px-2 d-flex ${
                    index % 2 === 1 ? "bg-secondary-subtle" : ""
                  }`
                );
              }),
              "border rounded p-0"
            ),
          ]),
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
