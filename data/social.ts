export type Social = {
  github?: string
  x?: string
  juejin?: string
  qq?: string
  wx?: string
  cloudmusic?: string
  zhihu?: string
  email?: string
  discord?: string
  telegram?: string
  Line?: string
  messenger?: string
  whatsapp?: string
}

type SocialValue = {
  href?: string
  title: string
  icon: string
  color: string
}

const social: Social = {
  github: 'https://github.com/Seasir-Hyde/Hydoc',
  // x: 'https://twitter.com/kuizuo',
  // juejin: 'https://juejin.cn/user/1565318510545901',
  // wx: 'https://img.kuizuo.cn/wechat.png',
  // qq: 'https://img.kuizuo.cn/qq.png',
  // zhihu: 'https://www.zhihu.com/people/kuizuo',
  cloudmusic: 'https://music.163.com',
  // email: '',
  // discord: '',
  telegram: 'https://t.me/seasir_Bot',
  Line: 'https://line.me/R/ti/p/@868pveei?from=page&accountId=868pveei',
  messenger: 'https://www.facebook.com/messages/t/247347248468989',
  whatsapp: 'https://my5353.com/XRRtp',
}

const socialSet: Record<keyof Social | 'rss', SocialValue> = {
  github: {
    href: social.github,
    title: 'GitHub',
    icon: 'ri:github-line',
    color: '#010409',
  },
  juejin: {
    href: social.juejin,
    title: '掘金',
    icon: 'simple-icons:juejin',
    color: '#1E81FF',
  },
  x: {
    href: social.x,
    title: 'X',
    icon: 'ri:twitter-x-line',
    color: '#000',
  },
  wx: {
    href: social.wx,
    title: '微信',
    icon: 'ri:wechat-2-line',
    color: '#07c160',
  },
  zhihu: {
    href: social.zhihu,
    title: '知乎',
    icon: 'ri:zhihu-line',
    color: '#1772F6',
  },
  discord: {
    href: social.discord,
    title: 'Discord',
    icon: 'ri:discord-line',
    color: '#5A65F6',
  },
  telegram: {
    href: social.telegram,
    title: 'telegram',
    icon: 'ri-telegram-2-line',
    color: '#26a6e7',
  },
  Line: {
    href: social.Line,
    title: 'Line',
    icon: 'ri-line-line',
    color: '#00c300',
  },
  messenger: {
    href: social.messenger,
    title: 'messenger',
    icon: 'ri-messenger-line',
    color: '#ca41c7',
  },
  whatsapp: {
    href: social.whatsapp,
    title: 'whatsapp',
    icon: 'ri-whatsapp-line',
    color: '#4dc247',
  },
  qq: {
    href: social.qq,
    title: 'QQ',
    icon: 'ri:qq-line',
    color: '#1296db',
  },
  email: {
    href: social.email,
    title: '邮箱',
    icon: 'ri:mail-line',
    color: '#D44638',
  },
  cloudmusic: {
    href: social.cloudmusic,
    title: '网易云',
    icon: 'ri:netease-cloud-music-line',
    color: '#C20C0C',
  },
  rss: {
    href: '/blog/rss.xml',
    title: 'RSS',
    icon: 'ri:rss-line',
    color: '#FFA501',
  },
}

export default socialSet
