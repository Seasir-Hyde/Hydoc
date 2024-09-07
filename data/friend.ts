export const Friend: Friend[] = [  
  {
    title: 'Ruyu快乐猫',
    description: '全网最美博客ruyu-blog作者',
    website: 'https://www.kuailemao.xyz/',
    avatar: '/img/friend/ruyu-blog-logo.jpg',
  },
];

export type Friend = {
  title: string;
  description: string;
  website: string;
  avatar?: any;
};
