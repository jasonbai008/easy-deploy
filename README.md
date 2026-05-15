# 🚀 Easy Deploy

Easy Deploy 是一个轻量级、直观的静态资源部署工具，旨在帮助开发者快速将 HTML 页面或整个文件夹部署到 Cloudflare R2 存储桶中。

## 📖 项目介绍

本项目提供了一个简洁的 Web 界面，用户可以通过简单的三步操作完成静态资源的部署。它结合了 Cloudflare Pages Functions 的强大边缘计算能力和 R2 存储的稳定性，为您提供极致的部署体验。

## 🛠️ 技术栈

-   **前端框架**: [Vue 2.7](https://v2.vuejs.org/) (通过 CDN 引入)
-   **后端逻辑**: [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/) (边缘函数)
-   **存储服务**: [Cloudflare R2](https://developers.cloudflare.com/r2/)
-   **通信**: 原生 `fetch` API
-   **样式**: 纯原生 CSS (Cloudflare 品牌风格)

## ✨ 功能亮点

-   **双模式上传**: 支持上传单个 `.html` 文件，也支持上传整个文件夹并自动保持原始目录结构。
-   **即时预览**: 部署完成后，右侧预览区域会立即通过 `iframe` 加载您的页面，实现“所见即所得”。
-   **美观的 UI**: 深度还原 Cloudflare 官网设计语言，浅色调视觉风格，界面清新简洁。
-   **便捷操作**:
    -   一键复制预览链接。
    -   内置地址栏，支持新标签页跳转。
    -   实时显示待上传文件列表及大小。
-   **高性能**: 利用 Cloudflare 边缘节点处理上传逻辑，速度快且延迟低。
---

*Made with ❤️ for faster deployment.*
