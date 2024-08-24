---
id: Docusaurus-guides
slug: /Docusaurus-guides
title: Docusaurus 养成记录
authors: Hyde
date: 204/02/24
last_update:
  date: 2023/01/21
keywords: ['guides', 'Docusaurus', 'Docusaurus-guides']
---
import LinkList from "@site/src/components/LinkList"

- 这里记录着我搭建博客的部分踩坑过程，分享在这里希望能够给遇到类似问题或者需要类似教程的小伙伴一些帮助，尽量少走弯路。

- 对于博客框架底层的东西我也不是专业的，我的搭建的过程可以说是一通胡乱摸索，但是所记录的文档均是我运行成功的，可放心食用（如果有版本改动不一定适用）

- 如果遇到了和我不一样的情况，或者参考了我的步骤达不到预期效果，不要慌，要有耐心，要善于利用搜索引擎

**👇 建议多翻阅文官文档，或许会有你需要的答案**



import DocCardList from '@theme/DocCardList'; 

import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>