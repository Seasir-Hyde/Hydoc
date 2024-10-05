---
# 文档ID，唯一标识符
id: Ruyu-FRP-Configuration-Subdomain-Reverse-Proxy

# 文档的URL路径标识符，用于生成文档URL
slug: /Ruyu-FRP-Configuration-Subdomain-Reverse-Proxy

# 文档标题，显示在页面标题
title: frp配置子域名反向代理

# 发布日期，用于时间排序
date: 2024/10/05

#用于在侧边栏中显示文档的顺序，数字越小越靠前
sidebar_position: 12
# 作者名称
author: Hyde

# 最后更新日期，用于时间排序
last_update:
  date: 2024-10-05

# 关键词，用于SEO优化
keywords: [Ruyu, Frp, Configuration, Subdomain, Reverse, Proxy ]

# 文章标签，帮助分类
tags: [Ruyu, Frp, Configuration, Subdomain, Reverse, Proxy ]
---

# 给frp出去的ecs(ruyu-blog)配置子域名（反向代理）呢？

```
范例：
http://kuailemao.xyz/ #主域名
http://blog.kuailemao.xyz/ #二级域名


主域名：
	seasir.top

子域名：
    博客 blog.seasir.top
    博客后台 admin.seasir.top
```

## 自己ruyu-blog部署环境

```
ecs ip
111.229.208.160

[ruyu-blog-qt]
# 代理的类型，这里是TCP代理
type = tcp

# 本地应用的IP地址，FRP客户端会从这里转发流量
local_ip = 127.0.0.1

# 本地应用的端口，FRP客户端会将请求转发到这个端口
local_port = 80

# 远程服务器上对应的端口，外部访问此端口时流量会被转发到本地的local_ip:local_port
remote_port = 8082


[ruyu-blog-ht]
# 代理的类型，这里是TCP代理
type = tcp

# 本地应用的IP地址，FRP客户端会从这里转发流量
local_ip = 127.0.0.1

# 本地应用的端口，FRP客户端会将请求转发到这个端口
local_port = 81

# 远程服务器上对应的端口，外部访问此端口时流量会被转发到本地的local_ip:local_port
remote_port = 8083
```

## 域名解析

主机记录：blog/admin

记录类型：A

解析请求来源：默认

记录值：111.229.208.160

TTL：10分钟

![image-20241004235002910](C:/Users/AdsPower/AppData/Roaming/Typora/typora-user-images/image-20241004235002910.png)

## ecs nginx完整配置（暂未配置https）

```nginx
# 全局配置
user root;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# 加载动态模块
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    gzip on; # 启用 gzip 压缩
    gzip_vary on;
    gzip_proxied any;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_comp_level 5;
    gzip_min_length 256;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 4096;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    include /etc/nginx/conf.d/*.conf;
    charset utf-8;

    # 一级域名 HTTP 配置 (HTTP 重定向到 HTTPS)
    server {
        listen 80;
        server_name seasir.top www.seasir.top;

        # 配置 HTTPS 重定向
        # return 301 https://$host$request_uri;
    }

    # 一级域名 HTTPS 配置
    server {
        # listen 443 ssl http2;
        # server_name seasir.top www.seasir.top;

        # ssl_certificate /path/to/ssl_certificate.crt;
        # ssl_certificate_key /path/to/ssl_certificate_key.key;

        # ssl_session_cache shared:SSL:1m;
        # ssl_session_timeout 10m;
        # ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        # ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
        # ssl_prefer_server_ciphers on;

        location / {
            # 这里可以配置为静态文件服务、反向代理或其他服务
            root /var/www/html; # 替换为你的网站根目录
            index index.html index.htm;
        }

        # 错误页面配置
        error_page 404 /404.html;
        location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
    }

    # 二级域名 bolg.seasir.top 的反向代理配置
    server {
        listen 80;
        server_name bolg.seasir.top;

        location / {
            proxy_pass http://111.229.208.160:8082/; # 实际的后端服务地址
            client_max_body_size 100M;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

    # 二级域名 admin.seasir.top 的反向代理配置
    server {
        listen 80;
        server_name admin.seasir.top;

        location / {
            proxy_pass http://111.229.208.160:8083/; # 实际的后台服务地址
            client_max_body_size 100M;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

- esc 验证 Nginx 配置：

```nginx
sudo nginx -t
```

- 如果没有问题，重启 Nginx：

```nginx
sudo systemctl restart nginx
```

## 成功验证

访问：[博客前台](https://blog.seasir.top/)

访问：[博客后台](http://admin.seasir.top/)