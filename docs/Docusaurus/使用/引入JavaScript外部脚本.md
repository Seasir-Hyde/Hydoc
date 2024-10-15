---
# 文档ID，唯一标识符
id: Docusaurus-scripts

# 文档的URL路径标识符，用于生成文档URL
slug: /Docusaurus-scripts

# 文档标题，显示在页面标题
title: 引入JavaScript外部脚本

# 发布日期，用于时间排序
date: 2024/08/27

# 作者名称
author: Hyde

#用于在侧边栏中显示文档的顺序，数字越小越靠前
sidebar_position: 12

# 最后更新日期，用于时间排序
last_update:
  date: 2024-08-27

# 关键词，用于SEO优化
keywords: [docusaurus]

# 文章标签，帮助分类
tags: [docusaurus, scripts, JavaScript ]
---

# 集成看板娘和在线聊天

## 1.集成配置
在根目录下`docusaurus.config.ts`配置目录下插入以下代码

```ts
// 插入外部 JavaScript 链接
const config: Config = {
    themeConfig:{
        // ...
    },
    // highlight-start
      scripts: [
    {
        // 在线聊天
      src: '实际替换成您自己的聊天链接',
      async: true,  // 异步加载脚本
    },
    {
        // 看板娘
      src: 'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js',
      defer: true,  // 延迟加载
    },
    {
      src: 'https://cpython666.github.io/js/clickjs/fireworks.js',  //鼠标爆炸效果
      efer: true,  // 延迟加载
    },
    {
      src: 'https://cpython666.github.io/js/clickjs/anime.min.js',  //鼠标爆炸效果
      efer: true,  // 延迟加载
    },
  ],
  // highlight-end
}
```
## 2.重新启动开发服务器
重新启动你的开发服务器，以确保`docusaurus.config.ts`配置重新加载生效