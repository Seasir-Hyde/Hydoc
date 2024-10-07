---
# 文档ID，唯一标识符
id: Ruyu-Update-HTTPS

# 文档的URL路径标识符，用于生成文档URL
slug: /Ruyu-Update-HTTPS

# 文档标题，显示在页面标题
title: 博客升级HTTPS

# 发布日期，用于时间排序
date: 2024/10/05

#用于在侧边栏中显示文档的顺序，数字越小越靠前
sidebar_position: 11
# 作者名称
author: Hyde

# 最后更新日期，用于时间排序
last_update:
  date: 2024-10-05

# 关键词，用于SEO优化
keywords: [Ruyu, v, HTTPS ]

# 文章标签，帮助分类
tags: [Ruyu, Update, HTTPS ]
---

# 博客升级HTTPS

## 安装 Certbot

```bash
sudo snap install --classic certbot
```

如果提示：sudo: snap：找不到命令。因为CentOS 默认不支持 snap 包管理工具，因此你需要使用 Certbot 的其他安装方式来申请 SSL 证书。对于 CentOS，通常使用 EPEL（Extra Packages for Enterprise Linux）存储库和 dnf 或 yum 包管理器来安装 Certbot

### 安装 Certbot 的步骤（适用于 CentOS 7/8）：

1. **启用 EPEL 存储库**：

   首先需要安装 EPEL 存储库，Certbot 依赖这个存储库中的一些工具。

```bash
sudo yum install epel-release
```

### **安装 Certbot**：

安装 Certbot 和 Nginx 插件，一路按y回车（如有）：

```bash
sudo yum install certbot python3-certbot-nginx
```

### 验证是否成功安装Certbot

```bash
certbot --version

#输出：certbot 2.11.0
```

## 准备 Certbot 命令

```bash
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

## 手动运行方式

```bash
certbot -d 域名(可以使用*.代表所有二级域名) --manual --config-dir config --work-dir work --logs-dir logs --preferred-challenges dns certonly
```

我的域名是seasir.top，命令格式如下：

```bash
certbot -d seasir.top -d *.seasir.top --manual --config-dir config --work-dir work --logs-dir logs --preferred-challenges dns certonly
```

```bash
#将调试日志保存到/root/logs/letsencrypt.log输入电子邮件地址(用于紧急续订和安全通知)(输入“c”取消):2429016980@q9.com

Saving debug log to /root/logs/letsencrypt.log
Enter email address (used for urgent renewal and security notices)
 (Enter 'c' to cancel):2429016980@qq.com(输入自己的邮箱)
```

```bash
#请阅读服务条款，网址为nttps://letsencrypt.org/documents/LE-SA-v1.4-April-3-2024.pdf。您必须同意才能在ACME服务器注册。您同意吗?(Y)是/(N)或:y

Please read the Terms of Service at
https://letsencrypt.org/documents/LE-SA-v1.4-April-3-2024.pdf. You must agree in
order to register with the ACME server. Do you agree?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: y
```

```bash
#旦您成功获得第一张证书，您是否愿意与电子前沿基金会共享您的电子邮件地址?电子前沿基金会是 Let'sEncrypt项目的创始合作伙伴，也是开发 Certbot的非营利组织。我们希望向您发送有关我们为网络加密的工作、EFF 新闻、活动以及支持数字自由方式的电子邮件
#(Y)是/(N)否:

Would you be willing, once your first certificate is successfully issued, to
share your email address with the Electronic Frontier Foundation, a founding
partner of the Let's Encrypt project and the non-profit organization that
develops Certbot? We'd like to send you email about our work encrypting the web,
EFF news, campaigns, and ways to support digital freedom.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: y
```

根据提示部署 DNS TXT 记录

### 操作步骤：

**登录 DNS 服务提供商控制台**：通常是你在注册域名时使用的服务商，可能是腾讯云、阿里云、Cloudflare 等。我自己的是阿里云

**找到域名解析设置**：在控制台中找到你的域名 `seasir.top` 的解析设置（通常叫做 "DNS" 或 "域名解析"）

**添加 TXT 记录**：

- **记录类型**：选择 `TXT` 记录。

- **主机记录**：输入 `_acme-challenge`（完整的记录将变成 `_acme-challenge.seasir.top`）

  :::tip

  每次重新运行记录值会发生改变，以自己实际为准！`seasir.top`换成自己的主域名

  ```bash
  certbot -d seasir.top -d *.seasir.top --manual --config-dir config --work-dir work --logs-dir logs --preferred-challenges dns certonly
  ```

  :::

- **记录值**：输入 `mj7lx4IcK6rI5PvGeFjlxl7K2m3YBvYhWZExQ2tjdLQ`/`hMPUVxWJ_SfLRabX7xpE1OJ_blSEzrvaxuabkNwKPyc`

- **TTL**：可以选择默认值（例如 10 分钟或 600 秒）。

```bash
Successfully received certificate.   #成功领取证书。
Certificate is saved at: /root/config/live/seasir.top/fullchain.pem  #证书保存为位置--关键文件
Key is saved at:         /root/config/live/seasir.top/privkey.pem    #证书保存为位置--关键文件
This certificate expires on 2025-01-03.                              #证书有效日期
These files will be updated when the certificate renews.
```

## Nginx配置

### 拷贝文件

由于我的服务器是本地虚拟机frp出去的，所以在云服务器`/etc/nginx/ssl`新建ssl目录

```bash
#进入/etc/nginx/目录
cd /etc/nginx/

#创建ssl文件夹
mkdir ssl
```

进入云服务器文件路径：`/root/config/live/seasir.top`把这两个`fullchain.pem`和`privkey.pem`文件copy进刚刚创建的ssl文件夹：`/etc/nginx/ssl`

`可使用Xftp`软件进行拷贝操作，可视化界面，对小白友好，当然使用linux命令拷贝也行~

```bash
[root@VM-4-16-centos nginx]# cd ssl
[root@VM-4-16-centos ssl]# ll
总用量 8
-rw-r--r-- 1 root root 2843 10月  5 17:12 fullchain.pem
-rw-r--r-- 1 root root  241 10月  5 17:12 privkey.pem
```

### 创建SSL和反向代理公共配置文件

创建`common_configs`文件夹

```bash
#进入/etc/nginx/目录
cd /etc/nginx/

#创建common_configs文件夹
mkdir common_configs
```

在`common_configs`文件夹下分别创建`common_proxy_params.conf`和`common_ssl_params.conf`

```bash
#进入/etc/nginx/common_configs目录
cd /etc/nginx/common_configs

#创建common_proxy_params.conf和common_ssl_params.conf文件
sudo touch /etc/nginx/common_configs/common_proxy_params.conf
sudo touch /etc/nginx/common_configs/common_ssl_params.conf
```

填入`common_proxy_params.conf`和`common_ssl_params.conf`配置，如下：

```nginx
#common_proxy_params.conf

# 定义反向代理公用参数
client_max_body_size 100M;  # 设置客户端最大请求体大小为 100M
proxy_set_header Host $host;  # 转发 Host 头
proxy_set_header X-Real-IP $remote_addr;  # 转发客户端真实 IP
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  # 转发代理链中的 IP
proxy_set_header X-Forwarded-Proto $scheme;  # 转发请求协议
```

```bash
#common_ssl_params.conf

# 定义 SSL 配置的公用参数
ssl_certificate "ssl/fullchain.pem";  # SSL 证书路径
ssl_certificate_key "ssl/privkey.pem";  # SSL 私钥路径
ssl_session_cache shared:SSL:1m;  # SSL 会话缓存
ssl_session_timeout  10m;  # SSL 会话超时时间
ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;  # 加密套件
ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;  # 支持的 TLS 协议版本
ssl_prefer_server_ciphers on;  # 优先使用服务器端的加密套件
```



### Nginx.conf配置文件

ecs 的 Nginx.conf路径：/etc/nginx.nginx.conf，配置如下：

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

### blog.conf配置文件

ecs 的 blog.conf路径：/etc/nginx/conf.d/blog.conf，配置如下：

```nginx
# 全局错误页面配置
error_page 404 /404.html;
error_page 500 502 503 504 /50x.html;

# seasir.top 域名的 HTTP -> HTTPS 重定向
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name seasir.top;

    # 配置 HTTP 到 HTTPS 的重定向
    return 301 https://$host$request_uri;
}

# seasir.top 域名的 HTTPS 反向代理
server {
    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;
    server_name seasir.top;

    root /root/home3.0;

    location / {
        proxy_pass http://云服务器IP:端口/;  # 反向代理到实际后台路径
        include /etc/nginx/common_configs/common_proxy_params.conf;  # 引入反向代理公用参数
    }

    # 图床数据
    location /images {
        alias /images;
        index index.html;
    }

    # 引入 SSL 公用参数
    include /etc/nginx/common_configs/common_ssl_params.conf;
}

# admin.seasir.top 域名的 HTTP -> HTTPS 重定向
server {
    listen 80;
    listen [::]:80;
    server_name admin.seasir.top;

    # 配置 HTTP 到 HTTPS 的重定向
    return 301 https://$host$request_uri;
}

# admin.seasir.top 域名的 HTTPS 反向代理
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name admin.seasir.top;

    location / {
        proxy_pass http://云服务器IP:端口/;  # 反向代理到实际后台路径
        include /etc/nginx/common_configs/common_proxy_params.conf;  # 引入反向代理公用参数
    }

    # 引入 SSL 公用参数
    include /etc/nginx/common_configs/common_ssl_params.conf;
}

# minio.seasir.top 域名的 HTTP -> HTTPS 重定向
server {
    listen 80;
    listen [::]:80;
    server_name minio.seasir.top;

    # 配置 HTTP 到 HTTPS 的重定向
    return 301 https://$host$request_uri;
}

# minio.seasir.top 域名的 HTTPS 反向代理
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name minio.seasir.top;

    location / {
        proxy_pass http://云服务器IP:端口/;  # 反向代理到实际 Minio 服务
        include /etc/nginx/common_configs/common_proxy_params.conf;  # 引入反向代理公用参数
    }

    # 引入 SSL 公用参数
    include /etc/nginx/common_configs/common_ssl_params.conf;
}

# hitokoto.seasir.top 域名的 HTTP -> HTTPS 重定向
server {
    listen 80;
    listen [::]:80;
    server_name hitokoto.seasir.top;

    # 配置 HTTP 到 HTTPS 的重定向
    return 301 https://$host$request_uri;
}

# hitokoto.seasir.top 域名的 HTTPS 反向代理
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name hitokoto.seasir.top;

    location / {
        proxy_pass http://云服务器IP:端口/;  # 反向代理到实际 Hitokoto 服务
        include /etc/nginx/common_configs/common_proxy_params.conf;  # 引入反向代理公用参数
    }

    # 引入 SSL 公用参数
    include /etc/nginx/common_configs/common_ssl_params.conf;
}

```

ecs里的nginx配置目录和文件（`配置后的`）

```bash
[root@VM-4-16-centos ~]# cd /etc/nginx
[root@VM-4-16-centos nginx]# ll
总用量 32
drwxr-xr-x 2 root root 4096 10月  5 19:39 conf.d
-rw-r--r-- 1 root root 1007 5月  30 03:07 fastcgi_params
-rw-r--r-- 1 root root 5349 5月  30 03:07 mime.types
-rw-r--r-- 1 root root 1579 10月  5 18:22 nginx.conf
-rw-r--r-- 1 root root  636 5月  30 03:07 scgi_params
drwxr-xr-x 2 root root 4096 10月  5 17:12 ssl
-rw-r--r-- 1 root root  664 5月  30 03:07 uwsgi_params
```

以上配置完成重启Nginx,命令如下：

```bash
nginx -s reload
#或
sudo systemctl reload nginx
```

## 测试成功（24.10.5）

访问：[博客前台](https://blog.seasir.top/)
![image-20241008000628000](https://seasir.top/images/image-20241008000628000.png)
