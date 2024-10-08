# 音乐模块(可选)

![](https://private-user-images.githubusercontent.com/67356803/357699588-fd134863-7f30-4f43-8ff7-83563df27221.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjM5MTg5MzgsIm5iZiI6MTcyMzkxODYzOCwicGF0aCI6Ii82NzM1NjgwMy8zNTc2OTk1ODgtZmQxMzQ4NjMtN2YzMC00ZjQzLThmZjctODM1NjNkZjI3MjIxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA4MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwODE3VDE4MTcxOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTE0MzczNWU4ZWQwNmNmYzMxYjZhMjY0ZTVmMGY2M2E5ZDc3ZWMyZDNkMDUzNDgyY2E0NGNlYjk5NWFkODJjYWYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.rWvTzqBGA64s55pt1q9XCCy1BhEuunUWxJkfKeXbOW0)

### 版权声明 📖

:::warning

本教程参考了互联网Github [XiangZi7]作者的教程，并结合自身实际部署过程中积累的经验编写而成。原始教程链接为[KM-Music-Player](https://github.com/XiangZi7/KM-Music-Player)，感谢原作者提供的宝贵参考资料。

本教程仅供学习和交流使用，任何人不得将本教程的内容用于商业用途。如需引用或转载，请务必注明原作者及本文出处。如侵权之处，请联系博主进行删除，谢谢~

:::



### 介绍 📖



**KM-Music-Player** (**Kuriyama Mirai Music Player**) 是一款基于 **Vue 3.4**、**Vite 5**、**Pinia** 和 **Element-Plus** 开发的开源 Web 音乐播放器。它采 用目前最新的技术栈，提供流畅且美观的音乐播放体验。

### 系统需求 ⚙️



- **Node.js** 版本需大于 **18**。

### 在线预览 👀



- [Netlify 预览](https://kmmusic.netlify.app/)
- [GitHub Pages](https://xiangzi7.github.io/KM-Music-Player/)
- [Vercel 预览](https://kmmusic.vercel.app/) (可能需要魔法)

### 代码仓库 ⭐



[GitHub 代码仓库](https://github.com/XiangZi7/KM-Music-Player)

### 项目功能 🔨



- 支持上、下、循环、顺序、随机、单曲播放
- 支持 MV 显示
- 正常动漫播放
- 歌词滚动显示
- 网易云二维码登录
- 动态切换主题
- 暗黑模式

### 安装使用步骤 📔



- Clone

# Github



#### 使用 Git 克隆项目到本地：

```bash
  git clone https://github.com/XiangZi7/KM-Music-Player.git
```



#### 安装依赖

进入项目目录并安装所需的依赖：

```bash
cd KM-Music-Player
pnpm install
```



#### 启动开发服务器

启动本地开发服务器，为你提供实时预览：

```bash
pnpm dev
```



#### 打包并上传您服务器

```bash
pnpm build
```



#### 配置前端文件

路径在：blog-frontend/kuailemao-blog/.env.development或者 [.env.production](..\..\..\..\..\..\ruyu-blog\blog-frontend\kuailemao-blog\.env.production) 

```bash
# 开发环境配置
NODE_ENV = development

# 博客代理地址
VITE_APP_BASE_API = '/api'
# 项目后端地址（来自blog-frontend/kuailemao-admin/.env.development配置文件中VITE_APP_BASE_URL）
#系统接口500异常也是这里配置的原因
    VITE_SERVE='http://192.168.80.128:8088/'
# 前台域名
VITE_FRONTEND_URL = 'http://localhost:99/'
# 音乐代理地址
VITE_MUSIC_BASE_API = '/wapi'
# 第三方开源集成的音乐前端地址，如果不配置上面菜单栏就不会出现音乐选项
VITE_MUSIC_FRONTEND_URL = 'http://localhost:5173/home'
# 左下角音乐后台
VITE_MUSIC_SERVE='http://192.168.80.128:3000/'
# 自己部署的一言接口，如果不填写会默认使用官网的接口，官网接口有每分钟qps限制，有时会得不到想要的结果
VITE_YIYAN_API = 'http://192.168.80.128:8000/'
```



#### 效果展示

![](https://image.kuailemao.xyz/blog/article/articleImage/56edb3d9-5efb-4969-885b-7a8fff2111c1.png)

文档说明

你可以查阅 [网易云音乐 API 文档](https://neteasecloudmusicapi.vercel.app/#/) 以 获取更多信息和接口使用说明（可能需要魔法上网）。

### 项目截图 📷

![](https://private-user-images.githubusercontent.com/67356803/357700300-5ec599a7-8c86-4548-8758-34f977637595.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjM5MTg5MzgsIm5iZiI6MTcyMzkxODYzOCwicGF0aCI6Ii82NzM1NjgwMy8zNTc3MDAzMDAtNWVjNTk5YTctOGM4Ni00NTQ4LTg3NTgtMzRmOTc3NjM3NTk1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA4MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwODE3VDE4MTcxOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWU5NzNmNjNhZTMyNjA4M2Q0ZDBkN2JhYjc5MjFlOTA4NzdlMTY3YzMwYjViZjQxZTM4MjU3MDQyM2M5YmM2MDQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.maEQCPPicDXXNI0AXGDjGXD6Cl-pGxBud0f5hwK-Dgo)

![](https://private-user-images.githubusercontent.com/67356803/357700398-be15d4ab-671d-4b8d-bd69-b06190c14d2a.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjM5MTg5MzgsIm5iZiI6MTcyMzkxODYzOCwicGF0aCI6Ii82NzM1NjgwMy8zNTc3MDAzOTgtYmUxNWQ0YWItNjcxZC00YjhkLWJkNjktYjA2MTkwYzE0ZDJhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA4MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwODE3VDE4MTcxOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWVkYWZiYjA4YTE1NmU1MGE3YjM5YTU4YTdjYjA2YWRmZDc1NjZkN2E4YWY0N2Q1YzdmNmE4YzQ3ZjU4ZDBlMWImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.IwruIWNRejX2lHuLQi4HbDmm8oKMW4G3j53ASbkVlDU)

![](https://private-user-images.githubusercontent.com/67356803/357699906-d924961b-cc41-4db7-9e31-c674cf489de5.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjM5MTg5MzgsIm5iZiI6MTcyMzkxODYzOCwicGF0aCI6Ii82NzM1NjgwMy8zNTc2OTk5MDYtZDkyNDk2MWItY2M0MS00ZGI3LTllMzEtYzY3NGNmNDg5ZGU1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA4MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwODE3VDE4MTcxOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPThmOTFkYWJlYTdkNTUxYWMzMGNkYjBjZTM0YzJlMThkOTE4N2JhM2ZmNDA4MGM5NWQ1YmVkZjBhY2Y0MmVmNTYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.IUpavFyxl597LnqeqdCgnQ0_XRGYG7AVi1LHMO6E3Rw)

![](https://private-user-images.githubusercontent.com/67356803/357701816-b78a1098-a14e-48cf-a113-a2284574816a.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjM5MTg5MzgsIm5iZiI6MTcyMzkxODYzOCwicGF0aCI6Ii82NzM1NjgwMy8zNTc3MDE4MTYtYjc4YTEwOTgtYTE0ZS00OGNmLWExMTMtYTIyODQ1NzQ4MTZhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA4MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwODE3VDE4MTcxOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTUzODA3Y2U1M2FjMzg3NDNhMjNhM2Q1NWU1NjZmNDMyOTY1ZjE1NDAwZTIxM2RhZTAxODNhY2NiZGY1ZWVhY2MmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.EnLZhMhR6IzRV1BwzhXo0CphcPaEPjhLIcXEdz8a5Go)

![](https://private-user-images.githubusercontent.com/67356803/357700469-1909652c-6bf0-472d-998a-68d8b1e795a8.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjM5MTg5MzgsIm5iZiI6MTcyMzkxODYzOCwicGF0aCI6Ii82NzM1NjgwMy8zNTc3MDA0NjktMTkwOTY1MmMtNmJmMC00NzJkLTk5OGEtNjhkOGIxZTc5NWE4LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA4MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwODE3VDE4MTcxOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWI3NzI1ZWQxMmRlNWQxMTMxMDVjYjM1NWY3ZTI1NWQ2YTBhOWQzNmEzYzFmODgyNWEyMzI0ZTg2MjcwNmJkMTAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.TQtHKabnWjPvhSF16iki0tGmuAyYEjJRN8LvDOyGm30)

![](https://private-user-images.githubusercontent.com/67356803/357700516-bc3c4441-d3d6-4dbf-b2a2-85e59abe370b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjM5MTg5MzgsIm5iZiI6MTcyMzkxODYzOCwicGF0aCI6Ii82NzM1NjgwMy8zNTc3MDA1MTYtYmMzYzQ0NDEtZDNkNi00ZGJmLWIyYTItODVlNTlhYmUzNzBiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA4MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwODE3VDE4MTcxOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWM3NWQxMGIzZmRjNzg3ZDkxZDRlYWRiNjk1NzhjOGJlMDEyODdjNjMxZjJhZmY4YTE3YjdiMzUwOGJiZjdmNzMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.EPzkOI4ENa5cFyUNWrFYdQRYvxOg2RNid7EQJzBWdWQ)

![](https://private-user-images.githubusercontent.com/67356803/357700631-8fdb041c-fec5-4992-bd91-d11aabbb7b37.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjM5MTg5MzgsIm5iZiI6MTcyMzkxODYzOCwicGF0aCI6Ii82NzM1NjgwMy8zNTc3MDA2MzEtOGZkYjA0MWMtZmVjNS00OTkyLWJkOTEtZDExYWFiYmI3YjM3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA4MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwODE3VDE4MTcxOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWVlZTkwZTEyYTkyZjhmMzIwNzlmMGY3MmQ4MWZkZmY3NWQwZDRkOTgzMjg0Y2ZmMmUwMTk3ZTgyNGExNTAwOWYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.8KDiIpMy3BGJ2iBx0XysadYibbxFgW7P8_qWTJX3A6Y)

![](https://private-user-images.githubusercontent.com/67356803/357702956-241cc110-98ed-49e6-a9ce-68fa2aa9e18d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjM5MTg5MzgsIm5iZiI6MTcyMzkxODYzOCwicGF0aCI6Ii82NzM1NjgwMy8zNTc3MDI5NTYtMjQxY2MxMTAtOThlZC00OWU2LWE5Y2UtNjhmYTJhYTllMThkLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA4MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwODE3VDE4MTcxOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTVhODljMjM4MzZjN2E1ZWMyZjM5YzkwNWE1Yzk0ZjJkMjZmYjI0YmFjYTdiZjllOTIyYmZhMWFhMGQxNTQyNzMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.GqowDsLplAGPy5G_Vd4sI5vkCfoWeay10-O4rnLsvHM)

![](https://private-user-images.githubusercontent.com/67356803/357700722-dc3ee82d-696a-4924-b307-0711e10152e3.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjM5MTg5MzgsIm5iZiI6MTcyMzkxODYzOCwicGF0aCI6Ii82NzM1NjgwMy8zNTc3MDA3MjItZGMzZWU4MmQtNjk2YS00OTI0LWIzMDctMDcxMWUxMDE1MmUzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA4MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwODE3VDE4MTcxOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTNjMzkwYzNjNDMwM2FhZDZmYmIyNjNkMDllOTg3NTk1ODM2NDI0NjBmNTdkYjk2YTc5NzFiY2NmM2VjZmQ3MDImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.MCeVywH4SbekepGpjJihKy7FiKXrQghFADdC8U5_1rQ)

![](https://private-user-images.githubusercontent.com/67356803/357700871-69f09804-8fa4-4220-9bfc-a8e5594d3c81.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjM5MTg5MzgsIm5iZiI6MTcyMzkxODYzOCwicGF0aCI6Ii82NzM1NjgwMy8zNTc3MDA4NzEtNjlmMDk4MDQtOGZhNC00MjIwLTliZmMtYThlNTU5NGQzYzgxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA4MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwODE3VDE4MTcxOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTBiN2E4MTY1YTQzZjMyNjkzZDg5YWJiNWFkMTdmM2RmMWUyMWJhMWZlMzFiZTk5MjczMGRjZTk0NmEwNTIzYzYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.Oc687iEuqCjP_eg3HOPFGhfKiIMcdVJl324ry3WEKlQ)

![](https://private-user-images.githubusercontent.com/67356803/357700943-c60070ab-8a23-4b06-8ec1-6a714200aaf2.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjM5MTg5MzgsIm5iZiI6MTcyMzkxODYzOCwicGF0aCI6Ii82NzM1NjgwMy8zNTc3MDA5NDMtYzYwMDcwYWItOGEyMy00YjA2LThlYzEtNmE3MTQyMDBhYWYyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA4MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwODE3VDE4MTcxOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTQ1YTYxNjE5MTNlMDk4NjM3ZTYxZjNiNTYwOGQzNTZiNGVhZTVkYzhmOWY4NWQxMDk4NDBlZWFjODhkZjc2NWYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.dB0oJW6F5mEb4D_YhG-L3tcmcrbHUhrFOiMmMLG28GA)

## 存在问题

登录接口请求不到（待解决）
