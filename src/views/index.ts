type InnerHtmlType = string | string[];
type AttributesType = { key: string; value: string | boolean }[];

export function Html(innerHtml?: InnerHtmlType, className?: string) {
  const _innerHtml = Array.isArray(innerHtml)
    ? innerHtml.join("")
    : innerHtml || "";

  return `<html class="${className || ""}">${_innerHtml}</html>`;
}

export function Head(innerHtml?: InnerHtmlType) {
  const viewport = `<meta name="viewport" content="width=device-width, initial-scale=1.0">`;
  const bootstrapCss = `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">`;
  const jquery = `<script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>`;
  const myStyle = `<style>svg { width: 100%; height: 100%; }</style>`;
  const _innerHtml = Array.isArray(innerHtml)
    ? innerHtml.join("")
    : innerHtml || "";

  return `<head><meta charset="UTF-8">${viewport}${myStyle}<title>hsplus</title>${bootstrapCss}${jquery}${_innerHtml}</head>`;
}

export function Body(innerHtml?: InnerHtmlType, className?: string) {
  const _innerHtml = Array.isArray(innerHtml)
    ? innerHtml.join("")
    : innerHtml || "";

  return `<body class="${
    className || ""
  }" style="min-width: 300px">${_innerHtml}</body>`;
}

export function Div(
  innerHtml?: InnerHtmlType,
  className?: string,
  attributes?: AttributesType
) {
  const _innerHtml = Array.isArray(innerHtml)
    ? innerHtml.join("")
    : innerHtml || "";

  return Any("div", _innerHtml, className, attributes);
}

export function Any(
  tag: string,
  innerHtml?: InnerHtmlType,
  className?: string,
  attributes?: AttributesType
) {
  const _innerHtml = (
    Array.isArray(innerHtml) ? innerHtml.join("") : innerHtml || ""
  ).replaceAll("  ", "");

  return `<${tag} class="${className || ""}" ${(attributes || [])
    .map(({ key, value }) => {
      if (typeof value === "boolean") {
        return value ? key : "";
      }
      return `${key}="${value}"`;
    })
    .join(" ")}>${_innerHtml}</${tag}>`;
}

export function Container(innerHtml?: InnerHtmlType, className?: string) {
  const _innerHtml = Array.isArray(innerHtml)
    ? innerHtml.join("")
    : innerHtml || "";

  return Any("div", _innerHtml, `container ${className || ""}`);
}

export function Row(innerHtml?: InnerHtmlType, className?: string) {
  const _innerHtml = Array.isArray(innerHtml)
    ? innerHtml.join("")
    : innerHtml || "";

  return Any("div", _innerHtml, `row ${className || ""}`);
}

export function Col(innerHtml?: InnerHtmlType, className?: string) {
  const _innerHtml = Array.isArray(innerHtml)
    ? innerHtml.join("")
    : innerHtml || "";

  return Any("div", _innerHtml, `col ${className || ""}`);
}
