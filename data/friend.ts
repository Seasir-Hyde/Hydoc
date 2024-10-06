export const Friend: Friend[] = [  
  {
    title: 'Ruyu快乐猫',
    description: '全网最美博客ruyu-blog作者',
    website: 'https://www.kuailemao.xyz/',
    avatar: '/img/friend/ruyu-blog-logo.jpg',
  },
  {
    title: 'Hyde小窝',
    description: '前后端分离博客',
    website: 'https://seasir.top/',
    avatar: 'https://hydoc.netlify.app/img/friend/hydoc-logo.png',
  },
];

export type Friend = {
  title: string;
  description: string;
  website: string;
  avatar?: any;
};
