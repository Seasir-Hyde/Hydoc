export const projects: Project[] = [
  {
    title: 'Hydoc的小站',
    description: '🦖 基于 Docusaurus 静态网站生成器实现个人博客',
    preview: '/img/project/blog.png',
    website: 'https://hydoc.netlify.app/',
    source: 'https://github.com/Seasir-Hyde/Hydoc',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
  },
  {
    title: 'Hydeの小窝',
    description: '个人前后端分离博客',
    preview: '/img/project/blogSeasir.png',
    website: 'https://seasir.top/',
    source: 'https://github.com/Seasir-Hyde/ruyu-blog',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
  },
  {
    title: '导航网',
    description: '基于花森导航部署的导航网站',
    preview: 'https://camo.githubusercontent.com/cc865cbee3e166a2a134728723bb02f98c1e42e693d3b2eb2c3cf37ec9f9fc07/68747470733a2f2f73322e6c6f6c692e6e65742f323032332f31322f31342f41664948456e334e5777754f63797a2e706e67',
    website: 'https://nav.seasir.top/',
    source: 'https://github.com/huasenjio/huasenjio-compose',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
  },
  {
    title: 'Machete',
    description: '作者的相册网站',
    preview: 'https://photo.seasir.top/girls/test/3294-wallpaperhub.com.jpg?ver=1722364235',
    website: 'https://photo.seasir.top/',
    source: 'https://github.com/filesite-io/machete',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
  },
  
  
  // toy

  // personal

  // other

]

export type Tag = {
  label: string
  description: string
  color: string
}

export type TagType = 'favorite' | 'opensource' | 'product' | 'design' | 'large' | 'personal'

export type ProjectType = 'web' | 'app' | 'commerce' | 'personal' | 'toy' | 'other'

export const projectTypeMap = {
  web: '🖥️ 网站',
  app: '💫 应用',
  commerce: '商业项目',
  personal: '👨‍💻 个人',
  toy: '🔫 玩具',
  other: '🗃️ 其他',
}

export type Project = {
  title: string
  description: string
  preview?: string
  website: string
  source?: string | null
  tags: TagType[]
  type: ProjectType
}

export const Tags: Record<TagType, Tag> = {
  favorite: {
    label: '喜爱',
    description: '我最喜欢的网站，一定要去看看!',
    color: '#e9669e',
  },
  opensource: {
    label: '开源',
    description: '开源项目可以提供灵感!',
    color: '#39ca30',
  },
  product: {
    label: '产品',
    description: '与产品相关的项目!',
    color: '#dfd545',
  },
  design: {
    label: '设计',
    description: '设计漂亮的网站!',
    color: '#a44fb7',
  },
  large: {
    label: '大型',
    description: '大型项目，原多于平均数的页面',
    color: '#8c2f00',
  },
  personal: {
    label: '个人',
    description: '个人项目',
    color: '#12affa',
  },
}

export const TagList = Object.keys(Tags) as TagType[]

export const groupByProjects = projects.reduce(
  (group, project) => {
    const { type } = project
    group[type] = group[type] ?? []
    group[type].push(project)
    return group
  },
  {} as Record<ProjectType, Project[]>,
)
