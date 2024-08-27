---
# 文档ID，唯一标识符
id: Docusaurus-NavFilter

# 文档的URL路径标识符，用于生成文档URL
slug: /Docusaurus-NavFilter

# 文档标题，显示在页面标题
title: NavFilter模糊

# 发布日期，用于时间排序
date: 2024/08/24

# 作者名称
authors: Hyde

#用于在侧边栏中显示文档的顺序，数字越小越靠前
sidebar_position: 9

# 最后更新日期，用于时间排序
last_update:
  date: 2024/08/24

# 关键词，用于SEO优化
keywords: [docusaurus]

# 文章标签，帮助分类
tags: [docusaurus, NavFilter]
---

# navbar导航栏模糊

## 添加模糊代码

在src\css\custom.css路径下添加以下代码

```css
.navbar {
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  background-color: hsla(0, 0%, 100%, 0.2);
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.102),
    0 0.2rem 0.4rem rgba(0, 0, 0, 0.2);
  opacity: 1;
  /* 添加过渡动画 */
  transition: backdrop-filter 0.5s linear, background-color 0.5s linear,
    box-shadow 0.5s linear, opacity 0.5s linear;
}
```

## 解决移动端布局侧边栏高度自适应

```css
@media (max-width: 1100px) {
	省略...
	
  .navbar-sidebar {
    height: 200rem; /* 高度为视口高度的 200rem */
  }
}
```

## 可选

```css
.navbar-sidebar__backdrop {
  /* 移动端侧边栏背景色,背景色为透明 */
  background-color: rgba(0, 0, 0, 0);
}
```