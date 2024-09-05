import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { themes } from 'prism-react-renderer'
import social from './data/social'
import type { GiscusConfig } from './src/components/Comment'

const beian = '闽ICP备2020017848号-2'
const beian1 = '闽公网安备35021102000847号'

const config: Config = {
  title: 'Hydoc的小站',
  url: 'https://kuizuo.cn',  //网站url
  baseUrl: '/',
  favicon: 'img/favicon.svg',
  organizationName: 'Hyde',
  projectName: 'blog',
  customFields: {
    bio: '道阻且长，行则将至',
    // 站点描述
    description:
      '该网站基于 React 驱动的静态网站生成器 Docusaurus 构建。由愧怍进行二次魔改，Hyed在愧怍进行二次修改',
  },
  themeConfig: {
    // 禁用面包屑导航
    breadcrumbs: false,
    // announcementBar: {
    //   id: 'announcementBar-3',
    //   content: ``,
    // },
    image: 'img/og.png',

    // 顶部公共栏
    announcementBar: {
      id: 'support_us',
      content:
        '欢迎访问我的网站👋这里将会持续更新，感谢关注~',
      backgroundColor: '#fafbfc',
      textColor: '#091E42',
      isCloseable: true,
    },

    metadata: [
      {
        name: 'Hyde',
        content: '海德',
      },
      {
        name: 'keywords',
        content: 'blog, javascript, typescript, node, react, vue, web',
      },
      {
        name: 'keywords',
        content: '编程爱好者, Web开发者, 写过爬虫, 学过逆向, 主攻ts全栈',
      },
    ],
    docs: {
      sidebar: {
        // 隐藏侧边栏
        hideable: true,
        // 自动折叠侧边栏
        autoCollapseCategories: true,
      },
    },
    navbar: { // 顶部导航栏
      logo: {
        alt: 'Hyde',
        // 亮色模式下头像logo
        src: 'https://ice.frostsky.com/2024/08/17/fe2225d1be58e6076fd44a1744cd69e4.png',
        // 暗色模式下头像logo
        srcDark: 'https://ice.frostsky.com/2024/08/17/fe2225d1be58e6076fd44a1744cd69e4.png',
      },
      hideOnScroll: true,
      items: [
        { label: '🏡 Home', position: 'left', to: '/', },
        {
          label: '✍️ Notes', position: 'left', to: 'docs/overview', //跳转到概述',
          items: [
            { label: '🖥️ 手记', to: 'docs/overview', },
            { label: '🌐 Docusaurus ', to: 'docs/Docusaurus', },
            {
              label: '🛠️ 专栏', to: 'docs/tools/',
            },
          ],
        },
        {
          label: '📖 Blog',
          position: 'left',
          // to: '/Hello-Blog',
          items: [
            { label: '📕 文稿&分类', to: 'blog', },
            { label: '⏰ 时间轴', to: 'blog/archive', },
          ],
        },
        {
          label: '📸 Life Style',
          position: 'left',
          to: '#',
          items: [
            { label: '🐺 Wild Wolf', to: 'docs/WildWolf/', },
            { label: '✨ 生活指南', to: 'docs/LifeGuide/', },
            { label: '🖥 效率指北', to: 'docs/EfficiencyGuide/', },
          ],
        },
        {
          label: '🎵 Album Music',
          position: 'left',
          to: '#',
          items: [
            { label: '🖼️ 时光', to: 'docs/WildWolf/', },
            { label: '🎧 音乐', to: 'docs/LifeGuide/', },
          ],
        },
        {
          label: '🔗 Links',
          to: '#',
          position: 'right',
          items: [
            { label: '🗺️ 友链', to: 'friends' },
            { label: '🌐 导航', to: 'https://google.com', },
            { label: '🚀 关于', to: 'about' },
          ],
        },
        {
          label: '🗃️ Project',
          to: 'project', //跳转到项目
          position: 'left',
          items: [
            { label: '📋 项目', to: 'project', },
            { label: '🧰 工具推荐', to: 'docs/tools' },
          ],
        },
        // 导航栏的语言下拉选择栏
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    // 引用自动生成的侧边栏配置
    sidebars: require('./sidebars.ts'),

    // 页脚
    footer: {
      style: 'dark',
      links: [
        {
          title: '学习',
          items: [
            { label: '博客', to: 'blog' },
            { label: '归档', to: 'blog/archive' },
            { label: '技术笔记', to: 'docs/skill' },
            { label: '实战项目', to: 'project' },
            { label: '前端示例', to: 'https://example.kuizuo.cn' },
          ],
        },
        {
          title: '社交媒体',
          items: [
            { label: '关于我', to: '/about' },
            { label: 'GitHub', href: social.github.href },
            { label: 'Twitter', href: social.x.href },
            { label: '掘金', href: social.juejin.href },
            { label: 'Discord', href: social.discord.href },
          ],
        },
        {
          title: '网站',
          items: [
            { label: 'js反混淆', to: 'https://js-deobfuscator.kuizuo.cn' },
            { label: 'cyberChef', to: 'https://gchq.github.io/CyberChef' },
            { label: 'api服务', to: 'https://api.kuizuo.cn' },
            { label: '便民服务', to: 'https://service.kuizuo.cn' },
            { label: '站点监控', to: 'https://uptime.kuizuo.cn' },
          ],
        },
        {
          title: '更多',
          items: [
            { label: '友链', position: 'right', to: 'friends' },
            {
              html: `
                <a href="https://docusaurus.io/zh-CN/" target="_blank" rel="noreferrer noopener">
                  <img src="/img/buildwith.png" alt="build with docusaurus" width="120" height="50"/>
                <a/>
                `,
            },
          ],
        },
      ],
      copyright: `
        <p style="margin-bottom: 0;"><a href="http://beian.miit.gov.cn/">${beian}</a></p>
        <p style="display: inline-flex; align-items: center;"><img style="height:20px;margin-right: 0.5rem;" src="/img/police.png" alt="police" height="20"/><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${beian1.match(/\d+/)?.[0]
        }" >${beian1}</a></p>
        <p>Copyright © 2020 - ${new Date().getFullYear()} kuizuo. | Built with Docusaurus.</p>
        `,
    },
    algolia: {
      appId: 'GV6YN1ODMO',
      apiKey: '50303937b0e4630bec4a20a14e3b7872',
      indexName: 'kuizuo',
    },
    prism: {
      theme: themes.oneLight,
      darkTheme: themes.oneDark,
      additionalLanguages: ['bash', 'json', 'java', 'python', 'php', 'graphql', 'rust', 'toml', 'protobuf'],
      defaultLanguage: 'javascript',
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
    giscus: {
      repo: 'kuizuo/blog',
      repoId: 'MDEwOlJlcG9zaXRvcnkzOTc2MjU2MTI=',
      category: 'General',
      categoryId: 'DIC_kwDOF7NJDM4CPK95',
      theme: 'light',
      darkTheme: 'dark_dimmed',
    } satisfies Partial<GiscusConfig>,
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    liveCodeBlock: { playgroundPosition: 'top' },
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
    },
  } satisfies Preset.ThemeConfig,

  // 插入外部 JavaScript 链接
  scripts: [
    {
      src: 'https://assets.salesmartly.com/js/project_23232_114665_1724296502.js',  //在线聊天
      async: true,  // 异步加载脚本
    },
    {
      src: 'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js',  //// 看板娘
      defer: true,  // 延迟加载
    },
  ],

  presets: [
    [
      'classic',  // 经典预设
      {
        docs: {
          path: 'docs',  // 文档存放的目
          sidebarPath: 'sidebars.ts',  //指定侧边栏配置文件的位置。
          showLastUpdateTime: true,  // 是否显示最后一次更新时间
          showLastUpdateAuthor: true,  // 是否显示最后一次更新的作者
          editUrl: 'https://github.com/your-repo/edit/main/website/', // 编辑此页的URL
          remarkPlugins: [], // 额外的 Remark 插件
          rehypePlugins: [], // 额外的 Rehype 插件
          include: ['**/*.md', '**/*.mdx'], // 包含哪些文件
          exclude: ['**/_*.{js,jsx,ts,tsx,md,mdx}'], // 排除哪些文件
          // docLayoutComponent: '@theme/DocPage', // 自定义文档页面布局组件
          docItemComponent: '@theme/DocItem', // 自定义文档条目组件
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css'],  // 自定义 CSS 文件的路径
        },
        sitemap: {
          changefreq: 'weekly', // 站点地图的更新频率
          priority: 0.5, // 站点地图的优先级
          ignorePatterns: ['/tags/**'], // 忽略哪些路径
          filename: 'sitemap.xml', // 站点地图文件名
        },
        gtag: {
          trackingID: 'G-S4SD5NXWXF',  // Google Analytics 的跟踪 ID
          anonymizeIP: true,  //是否匿名化 IP 地址
        },
        // 检查当前环境变量NODE_ENV的值是否为'development'
        // 如果为'development'，则设置debug为true，否则为false
        debug: process.env.NODE_ENV === 'development',
      } satisfies Preset.Options,  // Preset.Options 类型的配置对象
    ],
  ],
  plugins: [
    'docusaurus-plugin-image-zoom', // 图片放大插件
    [
      '@docusaurus/plugin-ideal-image',  //图像的 Docusaurus 插件（响应式、懒加载及低像素占位图）。
      {
        name: 'image',  // 图像的名称
        quality: 70,  //JPEG 压缩质量（0-100）
        max: 1030, //除了手动指定sizes，您还可以指定min、max和steps，然后系统将为您生成尺寸。
        min: 640, // 除了手动指定sizes，您还可以指定min、max和steps，然后系统将为您生成尺寸。
        steps: 2, // min配置在和之间max（含）生成的图像数量
        disableInDev: false,  // 是否在开发环境中禁用插件
      },
    ],
    // ['docusaurus-plugin-baidu-tongji', { token: 'c9a3849aa75f9c4a4e65f846cd1a5155' }],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: process.env.NODE_ENV === 'development',
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          { tagName: 'link', rel: 'icon', href: '/img/logo.png' },
          { tagName: 'link', rel: 'manifest', href: '/manifest.json' },
          { tagName: 'meta', name: 'theme-color', content: '#12affa' },
        ],
      },
    ],
    [
      'vercel-analytics',
      {
        debug: process.env.NODE_ENV === 'development',
        mode: 'auto',
      },
    ],
    [
      './src/plugin/plugin-content-blog', // 为了实现全局 blog 数据，必须改写 plugin-content-blog 插件
      {
        path: 'blog',
        editUrl: ({ blogDirPath, blogPath }) =>
          `https://github.com/kuizuo/blog/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogDescription: '代码人生：编织技术与生活的博客之旅',
        blogSidebarCount: 10,
        blogSidebarTitle: 'Blogs',
        postsPerPage: 12,
        showReadingTime: true,
        readingTime: ({ content, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        feedOptions: {
          type: 'all',
          title: '愧怍',
          copyright: `Copyright © ${new Date().getFullYear()} 愧怍 Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/" class="footer_lin">${beian}</a></p>`,
        },
      },
    ],
    async function () {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require('tailwindcss'))
          postcssOptions.plugins.push(require('autoprefixer'))
          return postcssOptions
        },
      }
    },
    async function () {
      return {
        name: 'docusaurus-motto',
        injectHtmlTags() {
          return {
            headTags: [
              {
                tagName: 'script',
                innerHTML: `
    (${function () {
                    console.log(
                      `%c Hyde Blog %c https://github.com/Seasir-Hyde/Hydoc`,
                      'color: #fff; margin: 1em 0; padding: 5px 0; background: #12affa;',
                      'margin: 1em 0; padding: 5px 0; background: #efefef;',
                    )

                    const motto = `
                      This Webisite Powered By Kz Blog.
                      Written by Docusaurus, Coding with Love.
                      --------
                      Love what you do and do what you love.
                      `

                    if (document.firstChild?.nodeType !== Node.COMMENT_NODE) {
                      document.prepend(document.createComment(motto))
                    }
                  }.toString()})();`,
              },
            ],
          }
        },
      }
    },
  ],
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: '愧怍的个人博客',
      },
    },
  ],
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Normal.min.css',
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Medium.min.css',
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Semibold.min.css',
  ],
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
    },
  },

  // 这将仅抑制警告，而不会修复潜在问题。
  onBrokenMarkdownLinks: 'ignore',
  onBrokenLinks: 'ignore',
}

export default config
