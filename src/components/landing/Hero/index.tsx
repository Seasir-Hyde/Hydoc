import { type Variants, motion } from 'framer-motion';
import Translate from '@docusaurus/Translate';
import HeroSvg from './img/hero.svg';
import SocialLinks from '@site/src/components/SocialLinks';
import { MovingButton } from '../../magicui/moving-border';
import styles from './styles.module.css';
import TypeIt from 'typeit-react';

const variants: Variants = {
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100,
      duration: 0.3,
      delay: i * 0.3,
    },
  }),
  hidden: { opacity: 0, y: 30 },
}

function Circle() {
  return <div className={styles.circle} />
}

function Name() {
  return (
    <motion.div
      className={styles.hero_text}
      custom={1}
      initial="hidden"
      animate="visible"
      variants={variants}
      onMouseMove={(e) => {
        e.currentTarget.style.setProperty('--x', `${e.clientX}px`)
        e.currentTarget.style.setProperty('--y', `${e.clientY}px`)
      }}
    >
      <Translate id="homepage.hero.greet">你好! 我是</Translate>
      <span
        className={styles.name}
        onMouseMove={(e) => {
          const bounding = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty('--mouse-x', `${bounding.x}px`)
          e.currentTarget.style.setProperty('--mouse-y', `${bounding.y}px`)
        }}
      >
        <Translate id="homepage.hero.name">Hyde</Translate>
      </span>
      <span className="ml-1">👋</span>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <motion.div className={styles.hero}>
      <div className={styles.intro}>
        <Name />
        <motion.p custom={2} initial="hidden" animate="visible" variants={variants} className="max-lg:px-4">
          <TypeIt
            getBeforeInit={(instance) => {
              instance
                .type('万般努力') // 输入初始文本
                .pause(2000) // 停顿2秒
                .delete(12, { delay: 0 }) // 删除所有文本
                .pause(500) // 停顿0.5秒
                .type('只为出人头地') // 输入新文本
                .pause(2000) // 停顿2秒
                .delete(11, { delay: 0 }) // 删除所有文本
                .pause(500) // 停顿0.5秒
                .type('低头弯腰') // 输入新文本
                .pause(2000) // 停顿2秒
                .delete(12, { delay: 0 }) // 删除前12个字符
                .pause(500) // 停顿0.5秒
                .type('只为爬的更高！') // 继续添加文本
                .pause(2000) // 停顿2秒
                .delete(12, { delay: 0 }) // 删除前12个字符
                .pause(500) // 停顿0.5秒
                .type('加油！屏幕前的你~') // 添加更多文本
                .pause(2000); // 停顿2秒
              return instance; // 返回实例
            }}
            options={{ loop: true, speed: 200 }} // 添加 speed 参数
            className={styles['rainbow-text']} // 添加彩虹色类
          />
        </motion.p>
        <motion.div custom={3} initial="hidden" animate="visible" variants={variants}>
          <SocialLinks />
        </motion.div>
        <motion.div className="mt-4 flex gap-2" custom={4} initial="hidden" animate="visible" variants={variants}>
          <MovingButton borderRadius="1.25rem" className="relative z-10 flex items-center rounded-2xl border border-neutral-200 border-solid bg-background px-5 py-3 text-center font-semibold text-base dark:border-neutral-800">
            <a href={'/'} className="font-semibold">
              <Translate id="hompage.hero.introduce">自我介绍</Translate>
            </a>
          </MovingButton>
        </motion.div>
      </div>
      <motion.div className={styles.background}>
        <HeroSvg />
        <Circle />
      </motion.div>
    </motion.div>
  )
}
