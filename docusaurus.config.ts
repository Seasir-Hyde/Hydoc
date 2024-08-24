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
        name: 'author',
        content: '愧怍',
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
    navbar: {
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
            { label: '🌐 文稿', to: 'docs/Stack/', },
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
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: 'sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css'],
        },
        sitemap: {
          priority: 0.5,
        },
        gtag: {
          trackingID: 'G-S4SD5NXWXF',
          anonymizeIP: true,
        },
        debug: process.env.NODE_ENV === 'development',
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    'docusaurus-plugin-image-zoom',
    '@docusaurus/plugin-ideal-image',
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
        editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
          `https://github.com/kuizuo/blog/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogDescription: '代码人生：编织技术与生活的博客之旅',
        blogSidebarCount: 10,
        blogSidebarTitle: 'Blogs',
        postsPerPage: 12,
        showReadingTime: true,
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        feedOptions: {
          type: 'all',
          title: '愧怍',
          copyright: `Copyright © ${new Date().getFullYear()} 愧怍 Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/" class="footer_lin">${beian}</a></p>`,
        },
      },
    ],
    async function tailwindcssPlugin() {
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
    async function injectMotto() {
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
