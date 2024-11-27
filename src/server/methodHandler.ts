import http from "node:http";
import path from "node:path";
import fs from "node:fs";
import { ServerConfig } from "./type";
import icons from "../assets/icon";
import mime from "mime";
import { getFileList, isTextFile } from "../../utils";
import { Any, Body, Container, Head, Html, Row, Col } from "../views";
import { version } from "../../package.json";

export function methodHandlerGet(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  config: ServerConfig
) {
  const { url = "" } = req;

  if (url === "/favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/svg+xml" });
    res.end(icons.logo.default);
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
                    )
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
