---
# 文档ID，唯一标识符
id: Docusaurus-UpdateTime

# 文档的URL路径标识符，用于生成文档URL
slug: /Docusaurus-UpdateTime

# 文档标题，显示在页面标题
title: 最后更新时间

# 发布日期，用于时间排序
date: 2024/08/24

# 作者名称
authors: Hyde

#手动设置文档的作者
last_UpdatedBy: "您的名字"

# 最后更新日期，用于时间排序
last_update:
  date: 2024-08-25

# 关键词，用于SEO优化
keywords: [docusaurus]

# 文章标签，帮助分类
tags: [随笔, UpdateTime，最后更新时间]
---

## 1.在 Markdown 文档中添加更新时间

```markdown
---
# 文档ID，唯一标识符
id: Docusaurus-UpdateTime

# 文档的URL路径标识符，用于生成文档URL
slug: /Docusaurus-UpdateTime

# 文档标题，显示在页面标题
title: 最后更新时间

# 发布日期，用于时间排序
date: 2024/08/25

# 作者名称
author: Hyde

# 最后更新日期，用于时间排序
last_update:
  date: 2024-08-25

---
```
## 2.在 `docusaurus.config.ts` 中添加 `showLastUpdateTime` 字段
```js
    presets: [
    [
      'classic',  // 经典预设
      {
        docs: {
          path: 'docs',  // 文档存放的目
          sidebarPath: 'sidebars.ts',  //指定侧边栏配置文件的位置。
          // highlight-next-line
          showLastUpdateTime: true,  // 是否显示最后一次更新时间
            ...
        },
        blog: false,
        ...
      } satisfies Preset.Options,  // Preset.Options 类型的配置对象
    ],
  ],
```