type InnerHtmlType = string | string[];

export function Html(innerHtml?: InnerHtmlType, className?: string) {
  const _innerHtml = Array.isArray(innerHtml)
    ? innerHtml.join("")
    : innerHtml || "";

  return `<html class="${className || ""}">${_innerHtml}</html>`;
}

export function Head(innerHtml?: InnerHtmlType) {
  const bootstrapCss = `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">`;

  const _innerHtml = Array.isArray(innerHtml)
    ? innerHtml.join("")
    : innerHtml || "";

  return `<head><meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> ${bootstrapCss}${_innerHtml}</head>`;
}

export function Body(innerHtml?: InnerHtmlType, className?: string) {
  const _innerHtml = Array.isArray(innerHtml)
    ? innerHtml.join("")
    : innerHtml || "";

  return `<body class="${
    className || ""
  }" style="min-width: 600px">${_innerHtml}</body>`;
}

export function Div(innerHtml?: InnerHtmlType, className?: string) {
  const _innerHtml = Array.isArray(innerHtml)
    ? innerHtml.join("")
    : innerHtml || "";

  return `<div class="${className || ""}">${_innerHtml}</div>`;
}

export function Any(
  tag: string,
  innerHtml?: InnerHtmlType,
  className?: string
) {
  const _innerHtml = Array.isArray(innerHtml)
    ? innerHtml.join("")
    : innerHtml || "";

  return `<${tag} class="${className || ""}">${_innerHtml}</${tag}>`;
}

export function Container(innerHtml?: InnerHtmlType, className?: string) {
  const _innerHtml = Array.isArray(innerHtml)
    ? innerHtml.join("")
    : innerHtml || "";

  return `<div class="container ${className || ""}">${_innerHtml}</div>`;
}

export function Row(innerHtml?: InnerHtmlType, className?: string) {
  const _innerHtml = Array.isArray(innerHtml)
    ? innerHtml.join("")
    : innerHtml || "";

  return `<div class="row ${className || ""}">${_innerHtml}</div>`;
}

export function Col(innerHtml?: InnerHtmlType, className?: string) {
  const _innerHtml = Array.isArray(innerHtml)
    ? innerHtml.join("")
    : innerHtml || "";

  return `<div class="col ${className || ""}">${_innerHtml}</div>`;
}
