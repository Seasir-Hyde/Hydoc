import Translate, { translate } from '@docusaurus/Translate'
import { Icon } from '@iconify/react'
import OpenSourceSvg from '@site/static/svg/undraw_open_source.svg'
import SpiderSvg from '@site/static/svg/undraw_spider.svg'
import WebDeveloperSvg from '@site/static/svg/undraw_web_developer.svg'

export type FeatureItem = {
  title: string | React.ReactNode
  description: string | React.ReactNode
  header: React.ReactNode
  icon?: React.ReactNode
}

const FEATURES: FeatureItem[] = [
  {
    title: translate({
      id: 'homepage.feature.developer',
      message: '前端爱好者',
    }),
    description: (
      <Translate>
        喜欢折腾前端一些开源项目，学习开源项目的源码，对开源项目有深入的了解。
      </Translate>
    ),
    header: <WebDeveloperSvg className={'h-auto w-full'} height={150} role="img" />,
    icon: <Icon icon="logos:typescript-icon" className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: translate({
      id: 'homepage.feature.spider',
      message: 'TypeScript',
    }),
    description: (
      <Translate>
        学习TypeScript，通过TypeScript构建一些开源项目，希望有生之年能够构建出一个知名的开源项目。
      </Translate>
    ),
    header: <SpiderSvg className={'h-auto w-full'} height={150} role="img" />,
  },
  {
    title: translate({
      id: 'homepage.feature.enthusiast',
      message: 'Tailwind CSS 和 WindiCSS',
    }),
    description: (
      <Translate>
        希望抽空学习Tailwind CSS 和 WindiCSS，对Tailwind CSS 和 WindiCSS 有深入的了解
      </Translate>
    ),
    header: <OpenSourceSvg className={'h-auto w-full'} height={150} role="img" />,
  },
]

export default FEATURES
