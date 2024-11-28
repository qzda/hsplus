import { Html, Head, Body, Container, Div, Any } from "../views";
import icons from "../assets/icon";
import path from "path";
import { version } from "../../package.json";

export function renderIndex(
  files: {
    name: string;
    isDirectory: () => boolean;
  }[],
  reqUrl: string
) {
  const html = Html([
    Head(),
    Body([
      Container([
        Div(
          [
            Any("h1", `hsplus v${version}`, "my-0", [
              { key: "style", value: "font-size: 2rem;" },
            ]),
            Div(
              [
                Any(
                  "button",
                  icons.download,
                  "btn btn-outline-primary p-1 d-flex justify-content-center align-items-center",
                  [
                    {
                      key: "style",
                      value: "width: 2rem; height: 1.5rem;",
                    },
                    { key: "onclick", value: "download()" },
                  ]
                ),
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
              "d-flex align-items-center gap-2"
            ),
          ],
          "py-2 sticky-top bg-white d-flex justify-content-between align-items-center"
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
                      { key: "index", value: index.toString() },
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
                          reqUrl,
                          file.name,
                          isDirectory ? "/" : ""
                        ),
                      },
                    ]
                  ),
                  "flex-fill mx-2 overflow-x-hidden text-nowrap text-truncate"
                ),
              ],
              `py-1 px-2 d-flex ${index % 2 === 1 ? "bg-secondary-subtle" : ""}`
            );
          }),
          "border rounded p-0"
        ),
      ]),
      Any(
        "script",
        `function download() {
          var indexs = $('input:checked').get().map(i => $(i).attr('index'))
          var url = location.pathname + '?type=download&index=' + indexs.join(',')

          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(res => res.blob()).then(blob => {
            const a = document.createElement('a')
            a.href = URL.createObjectURL(blob)
            a.download = 'hsplus-' + indexs.join(',') + '.zip'
            a.click()

            // clear checked
            $('input:checked').prop('checked', false)
          })
        }`
      ),
    ]),
  ]);

  return html;
}

export function render404(url: string) {
  const html = Html([
    Head(),
    Body([
      Container([
        Div(
          [
            Any("h1", `hsplus v${version}`, "my-0", [
              { key: "style", value: "font-size: 2rem;" },
            ]),
            Div(
              [
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
              "d-flex align-items-center gap-2"
            ),
          ],
          "py-2 sticky-top bg-white d-flex justify-content-between align-items-center"
        ),
        Any(
          "h2",
          `${Any(
            "span",
            url,
            "text-warning bg-dark text-decoration-underline"
          )} not found`
        ),
      ]),
    ]),
  ]);

  return html;
}
