import Translate from '@docusaurus/Translate'

import SKILLS from '@site/data/skills'
import IconCloud from '../../magicui/icon-cloud'

export default function Skill({ className }: { className?: string }) {
  return (
    <div className={className}>
      <h2 className="mb-2 flex items-center justify-center gap-1 text-base md:justify-start">
        <Translate id="homepage.feature.skill.title">🧰 技术栈</Translate>
      </h2>
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-background p-4">
        <IconCloud iconSlugs={SKILLS} />
      </div>
    </div>
  )
}
