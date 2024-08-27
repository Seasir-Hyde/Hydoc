---
# 文档ID，唯一标识符
id: Docusaurus-jest

# 文档的URL路径标识符，用于生成文档URL
slug: /Docusaurus-jest

# 文档标题，显示在页面标题
title: 找不到“jest”的类型定义文件

# 发布日期，用于时间排序
date: 2024/08/25

#用于在侧边栏中显示文档的顺序，数字越小越靠前
sidebar_position: 14

# 作者名称
author: Hyde

# 最后更新日期，用于时间排序
last_update:
  date: 2024-08-25

# 关键词，用于SEO优化
keywords: [docusaurus]

# 文章标签，帮助分类
tags: [docusaurus, jest, TypeScript ]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

找不到“jest”的类型定义文件。程序包含该文件是因为:在 compilerOptions 中指定的类型库 "jest" 的入口点

找不到文件“@docusaurus/tsconfig”。

Option 'bundler' can only be used when 'module' is set to 'preserve' or to 'es2015' or later.

报错截图：

![image-20240825171547001](https://ice.frostsky.com/2024/08/25/ba1952550d0e43d32ab87e1d967ea1b2.png)


遇到这种情况时，通常是因为 TypeScript 找不到 jest 的类型定义文件。你可以按照以下步骤来解决这个问题：

## 1.确保已安装 @types/jest

确保你已经安装了 Jest 的类型定义包。你可以使用以下命令安装：

<Tabs>
<TabItem value="ts" label="pnmm">

```pnpm
pnpm install --save-dev @types/jest
```
## 2.tsconfig.json 配置

在 tsconfig.json 文件中，确保 "types" 字段包含 "@types/jest"：

```json
{
  "compilerOptions": {
    // highlight-next-line
    "moduleResolution": "Bundler",
    // highlight-next-line
    "types": ["@types/jest"]
  }
}
```
</TabItem>
</Tabs>

## 3.重新启动开发服务器

重新启动你的开发服务器，以确保 TypeScript 能够找到 jest 的类型定义文件。

```pnpm
pnpm start
```

## 4.效果展示

![image-20240825180225439](https://ice.frostsky.com/2024/08/25/38f04b86a62cc2bdf9ab8ccac5538e86.png)
