# hsplus

快速启动一个静态文件服务器。体积更小，使用更简单。

## 特性

- 支持文本文件预览
- 支持批量下载

## 使用方法

```bash
npx hsplus
# npx hsplus [路径] [选项]
```

## 选项

- `-p, --port`: 设置服务器端口（默认：3000）
- `-h, --host`: 设置服务器主机（默认：localhost）
- `-o, --open`: 自动打开浏览器
- `-v, --version`: 显示版本号
- `--help`: 显示帮助信息

## 开发

本项目依赖 [`Bun`](https://bun.sh)。

```bash
bun i
bun dev
```
