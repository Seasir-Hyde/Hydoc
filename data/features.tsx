import Translate, { translate } from '@docusaurus/Translate'
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
      message: '特点标题1',
    }),
    description: (
      <Translate>
        特点内容1
      </Translate>
    ),
    header: <WebDeveloperSvg className={'h-auto w-full'} height={150} role="img" />,
    // icon: <Icon icon="logos:typescript-icon" className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: translate({
      id: 'homepage.feature.spider',
      message: '特点标题2',
    }),
    description: (
      <Translate>
        特点内容2
      </Translate>
    ),
    header: <SpiderSvg className={'h-auto w-full'} height={150} role="img" />,
  },
  {
    title: translate({
      id: 'homepage.feature.enthusiast',
      message: '特点标题3',
    }),
    description: (
      <Translate>
        特点内容3
      </Translate>
    ),
    header: <OpenSourceSvg className={'h-auto w-full'} height={150} role="img" />,
  },
]

export default FEATURES
