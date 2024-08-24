import React from 'react';

import {useThemeConfig} from '@docusaurus/theme-common';
import FooterLinks from '@theme/Footer/Links';
import FooterLogo from '@theme/Footer/Logo';
import FooterCopyright from '@theme/Footer/Copyright';
import FooterLayout from '@theme/Footer/Layout';

import styles from './styles.module.css'

function Footer(): JSX.Element | null {
  // 获取主题配置
  const {footer} = useThemeConfig();
  // 如果没有配置footer，则返回null
  if (!footer) {
    return null;
  }
  // 获取footer配置
  const {copyright, links, logo, style} = footer;

  return (
    <>
    <div className={styles.header} >
      <div className={styles.innerheader}>
    </div>
    <div>
      <svg className={styles.waves} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g className={styles.parallax}>
          <use xlinkHref="#gentle-wave" x="48" y="0" />
          <use xlinkHref="#gentle-wave" x="48" y="3" />
          <use xlinkHref="#gentle-wave" x="48" y="5" />
          <use xlinkHref="#gentle-wave" x="48" y="7" />
        </g>
      </svg>
    </div>
    </div>
    {/* <div className={styles.content}>
      <span>Shake's Blog</span>
    </div> */}
    <FooterLayout

    

      // 设置样式
      style={style}
      // 如果links存在且长度大于0，则渲染FooterLinks组件
      links={links && links.length > 0 && <FooterLinks links={links} />}
      // 如果logo存在，则渲染FooterLogo组件
      logo={logo && <FooterLogo logo={logo} />}
      // 如果copyright存在，则渲染FooterCopyright组件
      copyright={copyright && <FooterCopyright copyright={copyright} />}
    />
    </>
  );
}

export default React.memo(Footer);
