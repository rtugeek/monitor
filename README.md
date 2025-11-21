# Monitor
## A lightweight servers monitoring tool

**Monitor** is a lightweight server monitoring tool that allows you to view the status of multiple server on a single page.  
It provides real-time monitoring of key system metrics including **CPU, GPU, memory, disk, and network**.  
The server is built on **systeminformation** and offers **RESTful API** endpoints for easy customization and integration.

🔗 [Live Demo](https://rtugeek.github.io/monitor/#/)  
📘 [Usage Guide](https://widgetjs.cn/monitor/doc)

## Features

- 🚀 Built with Vue 3 + TypeScript
- 📦 CPU、GPU、Memory、Disk、Network monitoring
- ⚙️ RESTful API for easy integration
- 🖥️ Desktop widgets for quick access to server stats
- 🌐 Web interface for centralized monitoring

## Web Preview
### Server Detail
![Detail](./vitepress/docs/screenshot/detail.png)

### Homepage
![Homepage](./vitepress/docs/screenshot/homepage.png)

### Add Server
![Add Server](./vitepress/docs/screenshot/edit_server.png)

## Desktop Widgets
### Base Panel Widget
![Base Panel Widget Preview](./public/image/preview_base_panel.png)
### Server Widget
![Server Widget Preview](./public/image/preview_server.png)


## Project Structure
```
monitor/
├── src/                    # Client-side code (Vue 3)
│   ├── widgets/            # Desktop widgets (Electron + Vue 3)/              # Vue views/pages
│   └── ...                 # Other client-side code
├── server/                 # Server-side code (NestJS)
└── vitepress/              # Documentation site (VitePress)
```