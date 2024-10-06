---
# 文档的URL路径标识符
slug: Nginx-Picture

# 文档标题，显示在页面顶部
title: Nginx搭建私有图床（推荐）

# 发布日期，用于时间排序
date: 2024-10-06

# 作者名称
# authors: Hyde

# 最后更新日期，用于时间排序
last_update:
  date: 2024/10/06

# 文章标签，帮助分类
tags: [随笔, yum, install, image]

#关键词，用于SEO优化
keywords: [随笔, yum, install, image]

# 文档的简要描述
description: nginx搭建私有图床（推荐）

# 文章的封面图片
image: https://img0.baidu.com/it/u=1482095840,3534510952&fm=253&fmt=auto&app=138&f=PNG?w=778&h=500

#置顶级别，决定文章在列表中的位置
sticky: 5
---

有些人可能对图床这个没什么概念，所谓图床，英文叫法应该叫：ImageHost，也就是储存图片的中枢，可以理解为：用户存储图片后，系统提供该图片的直接链接，用来通过网络访问显示该图片。

<!-- truncate -->

# nginx搭建私有图床（推荐）

## 前言

:::info

有些人可能对图床这个没什么概念，所谓图床，英文叫法应该叫：**ImageHost**，也就是储存图片的中枢，可以理解为：**用户存储图片后，系统提供该图片的直接链接，用来通过网络访问显示该图片**。

使用图床，更好地管理图片，方便打包备份图片；配合CDN，还能更好优化网站加载。

（其实很多网站都有提供图床服务，但是毕竟数据不在自己手上，如果站点跑路或者开启防盗链，基本图片就开始404 Not Found了。）

:::

## 使用场景🎆

[Markdown](https://zh.wikipedia.org/zh-hans/Markdown)、HTML就是很好的图床使用场景点：Markdown和HTML插入图片，使用标记展示一个图片：

```markdown
# Markdown
![图片描述](图片地址)
# HTML
<img src="图片地址"/>
```

其中，`图片地址`可以使用图片的绝对或者相对路径，比如：

- `/img/Mintimate_Logo.png`：到网站根目录下img文件夹找Mintimate_Logo.png图片来展示。
- `../Mintimate_logo.png`：到上级目录找Mintimate_Logo.png图片来展示。

而在一些网站上进行操作，没有明确绝对路径和相对路径时，就需要用到网络地址图片这个时候就可以用图床提供的直接链接，比如：评论回复

## 版权声明

:::warning
本教程参考了[One大佬](https://wiki.onedayxyy.cn/docs/TuChuang-ngnix)作者的教程，并结合自身实际部署过程中积累的经验编写而成。原始教程链接为[实战：完美解决md图床问题-nginx图床-2024.8.4(测试成功)](https://wiki.onedayxyy.cn/docs/TuChuang-ngnix)，感谢原作者提供的宝贵参考资料。

本教程仅供学习和交流使用，任何人不得将本教程的内容用于商业用途。如需引用或转载，请务必注明原作者及本文出处。如侵权之处，请联系博主进行删除，谢谢~

部分内容引用[One大佬](https://wiki.onedayxyy.cn/blog)的教程，感谢大佬的贡献。
:::

## 准备工作🔨

- 已经提前购买好云服务器，本人使用的腾讯轻量云服务器

- 域名已配置https证书

  ### 内容分发网络/CDN（可选）

  内容分发网络，**需要备案域名**。如果你没有域名或者域名没有备案，可以参考：

  - [域名注册](https://buy.cloud.tencent.com/domain)
  - [域名备案](https://cloud.tencent.com/product/ba)

  域名备案挺简单的，**大概7-14天可以备案完成。**具体可以参考[**备案文档**](https://cloud.tencent.com/document/product/243)**。**

  之后需要内容分发:[腾讯云内容分发网络](https://cloud.tencent.com/act/cps/redirect?redirect=10502&cps_key=825b2fa50ccba7d3668554b568acab71)

## 部署nginx服务

- 云服务器上部署nginx服务，详情参考：[实战：yum方式部署nginx-2024.4.16(测试成功)](https://wiki.onedayxyy.cn/docs/ngnix-install-yum/)
- 给自己网站配置https泛域名证书，详情参考：[博客升级HTTPS](https://hydoc.netlify.app/docs/ruyu-update-https/)

### nginx.conf配置文件：

```nginx
user  root;  # 设置 Nginx 运行的用户为 root
worker_processes auto;  # 自动设置工作进程的数量
error_log /var/log/nginx/error.log;  # 错误日志文件的路径
pid /run/nginx.pid;  # Nginx 进程的 PID 文件路径

# 加载动态模块
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;  # 每个工作进程允许的最大连接数
}

http {
    gzip on;  # 启用 gzip 压缩
    gzip_vary on;  # 根据请求中的 `Accept-Encoding` 响应头决定是否启用 gzip
    gzip_proxied any;  # 在所有代理请求中启用压缩
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;  # 指定需要压缩的响应类型
    gzip_comp_level 5;  # 压缩等级（1-9）
    gzip_min_length 256;  # 只对超过指定长度的响应启用压缩

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';  # 定义日志格式

    access_log  /var/log/nginx/access.log  main;  # 访问日志的路径

    sendfile            on;  # 启用高效文件传输
    tcp_nopush          on;  # 优化 TCP 数据包传输
    tcp_nodelay         on;  # 关闭 Nagle 算法，减少延迟
    keepalive_timeout   65;  # 设置保持连接的超时时间
    types_hash_max_size 4096;  # 设置 MIME 类型哈希表的最大大小

    include             /etc/nginx/mime.types;  # 包含 MIME 类型定义文件
    default_type        application/octet-stream;  # 默认的响应类型

    # 从 /etc/nginx/conf.d 目录加载模块化配置文件
    include /etc/nginx/conf.d/*.conf;  # 加载其他配置文件
    charset utf-8;  # 设置字符集为 UTF-8

    # 公共配置文件引入
    include /etc/nginx/common_configs/common_ssl_params.conf;  # 引入 SSL 公用参数
    include /etc/nginx/common_configs/common_proxy_params.conf;  # 引入反向代理公用参数

    # 其他 server 块可以类似配置...
}
```

### ssl证书位置：

```sh
[root@VM-4-16-centos ~]# pwd
/root
[root@VM-4-16-centos ~]# cd /etc/nginx/common_configs
[root@VM-4-16-centos common_configs]# ll
总用量 8
-rw-r--r-- 1 root root 413 10月  5 21:10 common_proxy_params.conf
-rw-r--r-- 1 root root 536 10月  5 21:10 common_ssl_params.conf
[root@VM-4-16-centos common_configs]#
```

### conf.d目录下：

```sh
[root@VM-4-16-centos conf.d]# ll
总用量 8
-rw-r--r-- 1 root root 2881 10月  6 15:22 blog.conf
-rw-r--r-- 1 root root  790 10月  6 15:22 home.conf
[root@VM-4-16-centos conf.d]#
```

### 主域名home.conf配置：

```nginx
server {
    listen 80;
    server_name onedayxyy.cn www.onedayxyy.cn;

    # 配置 HTTPS 重定向
    return 301 https://$host$request_uri;
}

server {
    listen       443 ssl;
    listen       [::]:443 ssl;
    server_name onedayxyy.cn www.onedayxyy.cn;

    root /root/home3.0;

    location / {
        index index.html index.htm;
    }    

    # 图床数据
    location /images {
        alias /root/home3.0/images;  # 确保这里的路径是正确的
        autoindex on;  # 可选，允许浏览目录
    }

    include /etc/nginx/common_configs/common_ssl_params.conf;  # 引入 SSL 公用参数

    error_page 404 /404.html;
    location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
    }
}
```

## 配置picgo

### 安装 PicGo

**下载**：访问[PicGo官网](https://picgo.github.io/PicGo-Doc/) 或者[PicGo GitHub 页面](https://github.com/Molunerfinn/PicGo/releases)，下载适合你操作系统的版本（Windows、macOS 或 Linux）。

**安装**：按照下载文件的说明进行安装。

### 配置 PicGo

- 打开 PicGo 应用程序，你会看到主界面。

- 找到左侧的`插件配置`，搜索[picgo-plugin-sftp-uploader](https://github.com/imba97/picgo-plugin-sftp-uploader)进行安装

- 安装完成后，找到左侧的`插件配置`，`设置`，`配置sftp-uploader`

- 在windows，D:\Program Files\PicGo\shell目录下新建sftpUploader.json文件，并填写以下配置：

- ```
  {
      "sftpUploader": {
          "url": "https://seasir.top",
          "path": "/images/{fullName}",
          "uploadPath": "/images/{fullName}",
          "host": "云服务器IP，例如：192.168.1.1",
          "port": 22,
          "username": "云服务器用户名",
          "password": "云服务器密码"
      }
  }
  ```

  配置字段说明请参考[picgo-plugin-sftp-uploader](https://github.com/imba97/picgo-plugin-sftp-uploader)官方文档

- 回到第三步填写`sftp-uploader`配置

  - 图床配置名：sftpUploader（随意填写）
  - 网站标识：sftpUploader（这里的网站标识 要填内容一定得是 json文件里的 "sftpUploader"名称才行的，不然就会报错🤣）
  - 配置文件：D:/Program Files/PicGo/shell/sftpUploader.json（填写您上面第四步创建的文件路径，注意斜杠）

- 点击左侧`图床设置`找到`SFTP上传`选择刚刚填写的配置文件并设置默认图床

## Typora配置

- 打开`Typora` `文件` `偏好设置` `图像` 插入图片时选择`上传图片`，勾选`对本地位置的图片应用上述规则`

- 然后找到上传服务设置：

  - 上传服务：PicGo（app）

  - PicGo 路径：您的PicGo软件安装路径，比如我这里是：D:\Program Files\PicGo

  - 验证：点击`验证图片上传选项`，提示以下信息成功：

    ```txt
    验证成功
    使用以下命令测试图片上传选项:
    using http://127.0.0.1:36677/upload程序运行结果:
    {"success":true ,"result":["https ://seasir.top/images/typora-icon2.png","https://seasir.top/images/typora-icon .png"]}成功上传图片并获得新的URL
    ```

    

## 域名解析

添加主域名的解析记录，比如我的主域名是：seasir.top

- 记录类型：A-将域名指向一个IPV4地址
- 主机记录：@
- 记录值：云服务器ip
- TTL：默认即可

## 图床验证💪

打开Typora软件，随便截一张图黏贴，然后访问图片的地址在浏览器是否可以成功打开

## 遇到的问题

访问图片地址：https://seasir.top/image-20241006144259015.png会重定向到https://seasir.top/

如何解决呢？