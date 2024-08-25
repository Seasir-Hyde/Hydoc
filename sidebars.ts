import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  // Blog 侧边栏配置
  Blog: [
    {
      label: '概述',  //侧边栏标签
      type: 'doc',  //使用doc类型链接到文档页面并将该文档分配到侧边栏
      id: 'Blog/introduction', // 指向 introduction.md
    },
    {
      label: 'Blog部署指南',
      type: 'category',
      link: {
        type: 'doc',
        id: 'Blog/tutorial/index',  // 指向索引页文档的 ID
      },
      collapsed: true,  // 默认折叠侧边栏
      items: [

        {
          小张的个人博客: [
            {
              type: 'doc',
              id: 'Blog/tutorial/BT/Detailed',
              label: '宝塔详细版'
            }
          ],
        },
        {
          全网最美博客: [
            {
              type: 'doc',
              id: 'Blog/tutorial/Ruyu-Blog/Ruyu-Blog',
              label: 'Ruyu-Blog V1.3.2'
            },
            {
              type: 'doc',
              id: 'Blog/tutorial/Ruyu-Blog/hitokoto',
              label: 'hitokoto'
            },
            {
              type: 'doc',
              id: 'Blog/tutorial/Ruyu-Blog/Music-module',
              label: 'Music module'
            },
            {
              type: 'doc',
              id: 'Blog/tutorial/Ruyu-Blog/Gitee',
              label: 'Gitee'
            }
          ],
        }
      ],
    },
  ], 
  skill: [
    'skill/introduction', // 指向 introduction.md
    {
      label: 'Docusaurus 养成记录', // 侧边栏标题
      type: 'category', // 侧边栏类型
      link: {
        type: 'doc', // 使用doc类型链接到文档页面并将该文档分配到侧边栏
        id: 'skill/Docusaurus/Docusaurus-guides'  // 指向 docs\skill\Docusaurus\guides.md文档的id
      }, 
      items: [
        // 指向 docs\skill\Docusaurus\NavFilter.md文档的slug
        'skill/Docusaurus/Docusaurus-NavFilter',  //nav模糊
        'skill/Docusaurus/Docusaurus-Footer',  //波浪效果
        'skill/Docusaurus/Docusaurus-UpdateTime',  //最后更新时间
        'skill/Docusaurus/Docusaurus-menulist',  //侧边栏线条
        'skill/Docusaurus/Docusaurus-pagination-nav-link',  //分页导航
        'skill/Docusaurus/Docusaurus-jest',  //找不到“jest”的类型定义文件
        'skill/Docusaurus/Docusaurus-table-of-contents__link',  //目录悬停和激活样式
        'skill/Docusaurus/Docusaurus-scrollbar' //滚动条样式
      ],
    },
  ], 
}

module.exports = sidebars
