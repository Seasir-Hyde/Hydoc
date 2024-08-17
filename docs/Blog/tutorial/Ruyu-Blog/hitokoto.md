import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

# docker部署一言接口服务

## 前言

:::info

在信息爆炸的时代，简单的一句话有时比长篇大论更能触动人心。无论是激励自己、点缀网站，还是为应用程序增添一点趣味，一个简短而有力的句子往往可以产生意想不到的效果。

动漫也好、小说也好、网络也好，不论在哪里，我们总会看到有那么一两个句子能穿透你的心。我们把这些句子汇聚起来，形成一言网络，以传递更多的感动。如果可以，我们希望我们没有停止服务的那一天。

简单来说，一言指的就是一句话，可以是动漫中的台词，也可以是网络上的各种小段子。 或是感动，或是开心，有或是单纯的回忆。来到这里，留下你所喜欢的那一句句话，与大家分享，这就是一言存在的目的。

“一言”正是基于这个理念应运而生的。它是一个简洁、优雅的在线服务，致力于为用户提供简短的句子，无论是名言警句、诗歌片段，还是电影台词，都可以通过调用 API 随机获得。这个项目旨在为开发者和用户提供一种轻量级、易于集成的方式，将这些富有思想和情感的句子融入到各种应用场景中。

“一言”不仅是一项技术服务，更是一种情感传递的工具。通过它，您可以在网站的角落里增添一抹温暖的色彩，也可以为每天的工作或生活找到新的灵感。无论是个人项目还是大型应用，“一言”都能为您提供源源不断的智慧和创意。

我们希望通过“一言”，能够为每一位用户的生活和工作带来一点点的思考和惊喜。欢迎您来体验和使用“一言”，将这些文字的力量传递给更多的人。



:::

## 一言官网
:::tip[一言官网]
<Tabs>
  <TabItem value="apple" label="「一言」官网">https://hitokoto.cn</TabItem>
  <TabItem value="orange" label="「一言」在线 API 地址">https://v1.hitokoto.cn</TabItem>
  <TabItem value="banana" label="「一言」API 文档">https://developer.hitokoto.cn</TabItem>
  <TabItem value="「一言」官方部署文档" label="「一言」官方部署文档">https://developer.hitokoto.cn/sentence/deploy.html</TabItem>
</Tabs>
:::

![alt text](https://ice.frostsky.com/2024/08/18/a8dd3d24afbb1430da16ce03ab3fc59b.png)

## 版权声明

:::warning
本教程参考了互联网知乎xkcoding作者的教程，并结合自身实际部署过程中积累的经验编写而成。原始教程链接为[快速运行一个你自己的「一言」程序](https://zhuanlan.zhihu.com/p/272333970)，感谢原作者提供的宝贵参考资料。

本教程仅供学习和交流使用，任何人不得将本教程的内容用于商业用途。如需引用或转载，请务必注明原作者及本文出处。如侵权之处，请联系博主进行删除，谢谢~

部分内容引用[One大佬](https://wiki.onedayxyy.cn/blog)的教程，感谢大佬的贡献。
:::

## 环境

:::note
docker环境

centos7.x机器

redis 6.x
:::



## 下载源码



![](https://onedayxyy.cn/images/image-20240817234308639.png)

:::info
链接：https://pan.baidu.com/s/1jd8IGC76Av9qdiE7l6U5nA?pwd=tbfd 提取码：tbfd 2024.8.17-实战：docker部署一言接口服务-2024.8.17(测试成功)
:::



```bash
docker save  hitokoto/api |gzip > hitokoto.tar.gz #74M
docker save redis:6.0.8 |gzip > redis.6.0.8.tar.gz #36M
```

![](https://onedayxyy.cn/images/image-20240817233834783.png)

## 1.部署



**一言官方提供了各种部署方式，自己选一个，这里使用 `Docker` 部署**

## 2.创建数据目录

```bash
#创建hitokoto目录
mkdir -p hitokoto

#进入hitokoto目录
cd hitokoto
```



## 3.创建「一言」的配置文件

```bash
vim config.yml
```



## 4.填写config.yml的配置

```bash
name: 'hitokoto' # 服务名称，例如：hitokoto  [必填！]
url: '192.168.80.128:8000' # 服务地址，例如：https://v1.hitokoto.cn  [必填！]
api_name: 'demo_api_name' # 服务表示，例如：cd-01-demo  [必填！]
server: # 配置 HTTP 服务的信息
  host: hitokoto_api # 监听的地址，因为我们采用 docker-compose 启动，因此设置为 service 名称即可  [必填！]
  port: '8000' # 监听的端口  [必填！]
  compress_body: true # 是否使用 GZIP 压缩
redis: # 配置 Redis
  host: hitokoto_db # Redis 主机名，因为我们采用 docker-compose 启动，因此设置为 service 名称即可  [必填！]
  port: 6379 # Redis 端口  [必填！]
  password: '您的密码' # Redis 密码  [必填！]
  database: 0 # Redis 数据库索引，通常使用 0 号数据库
sentences_ab_switcher: # 本节是服务 AB 异步更新的配置，这是获取语句库的远程地址，除非有特殊需求，通常不需要修改保持默认！
  a: 1 # a 状态对应的 redis 数据库
  b: 2 # b 状态对应的 redis 数据库
remote_sentences_url: https://cdn.jsdelivr.net/gh/hitokoto-osc/sentences-bundle@latest/ # 语句库地址，通常默认即可。如果您想使用您自己打包部署的语句库，您可以修改此项
```



![](https://ice.frostsky.com/2024/08/17/399e11e5303a75e8748da5a03be18081.png)



## 5.创建 `docker-compose.yml`文件

```bash
vim docker-compose.yml
```



```bash
version: "3.8"  # Docker Compose 文件的版本

services:
  # Redis 服务
  hitokoto_db:
    image: redis:6.0.8  # 使用 Redis 6.0.8 镜像
    # 可以添加更多 Redis 配置项，例如环境变量、持久化等

  # Hitokoto API 服务
  hitokoto_api:
    image: hitokoto/api  # 使用 Hitokoto API 镜像
    ports:
      - 8000:8000  # 将容器的 8000 端口映射到主机的 8000 端口
    depends_on:
      - hitokoto_db  # 确保 hitokoto_api 在 hitokoto_db 启动后启动
    volumes:
      - ./config.yml:/usr/src/app/data/config.yml:ro  # 将主机的 config.yml 文件挂载到容器中的指定路径，并以只读模式挂载
    # 可以添加更多配置项，例如环境变量、启动命令等
```



![](https://ice.frostsky.com/2024/08/17/fe1d98d3997f5737bcf4d80a1ed04895.png)

## 6.运行一言容器

```bash
docker-compose up
```



![](https://onedayxyy.cn/images/image-20240817225114140.png)



## 7.效果测试

浏览器输入ip+8000端口是否成功返回，本人浏览器的地址：http://192.168.80.128:8000/

![](https://ice.frostsky.com/2024/08/17/a8b86001ec56052486e55e142419d424.png)

## 8.前端配置

最后在 ruyu-blog\blog-frontend\kuailemao-blog.env.development或者.env.production配置文件中填写您的ip+端口



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
VITE_MUSIC_FRONTEND_URL = ''
# 左下角音乐后台
VITE_MUSIC_SERVE='http://192.168.80.128:3000/'
# 自己部署的一言接口，如果不填写会默认使用官网的接口，官网接口有每分钟qps限制，有时会得不到想要的结果
VITE_YIYAN_API = 'http://192.168.80.128:8000/'
```



## 9.效果预览

![](https://ice.frostsky.com/2024/08/17/20f1899efb59f95a86879b11543df2f3.png)

![alt text](https://ice.frostsky.com/2024/08/18/249883c85ae91abb55f97b4982741af0.png)