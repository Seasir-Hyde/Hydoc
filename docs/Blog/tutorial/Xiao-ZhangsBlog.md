<!-- ---
id: xiaoblog
title: 小张的个人博客
slug: /blog/xiao-zhangs-blog
date: 2024-08-14
authors: xxx
description: 这是一个示例文档。
tags: [随笔, code, backup]
keywords: [随笔, code, backup]
--- -->

# 博客部署教程-宝塔面版详细版

:::tip
## 版权声明[](https://wiki.onedayxyy.cn/blog#版权声明)

> 本着开源共享、共同学习的精神：
>
> 本文是在 博主[Ruyu](http://mrzym.top/) 文章：《博客部署教程-宝塔面板》http://mrzym.top/#/article?id=6 基础上增加了自己实践过程的一些细节，转载无需和我联系，但请注明文章来源。如果侵权之处，请联系博主进行删除，谢谢~
:::

## 1.连接服务器

使用远程连接工具，比如Xshell连接到您服务器，输入服务器的ip和端口号，以及服务器用户名和密码

## 2.服务器内安装宝塔面板

**Centos安装脚本**

```shell
yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec
```

安装好后，会给你展示访问宝塔内网、外网面板地址(记好外网面板地址，需要用这个在浏览器打开)、以及登录用户名和密码类似下图（最新安装的提示会很全，偷懒网上找了个类似的老图

![img](http://img.mrzym.top/Fvo6Ml5xmLepLTPm9B7Ep4jS39cw)

## 3.进入宝塔面板

在浏览器内打开宝塔安装时给的外网面板地址，输入用户名和密码登录

## 4.环境准备

进入软件商店，安装Nginx、minio(Docker应用) 、MySQL、Node.js,先安装这4个

![](https://ice.frostsky.com/2024/08/05/3abd5c2b5e70f7698ee72fd501e5d5b3.png)

## 5.配置后端服务

### 5.1在根目录的 www/wwwroot 下创建文件夹 blog

![image-20240717224543806](https://ice.frostsky.com/2024/08/05/921aefde711c810ab433bfdc50e9d280.png)

### 5.2复制后端文件夹到服务器

使用Xftp工具将blog-server整个文件夹放在/www/wwwroot/blog路径下

![image-20240717230530587](https://ice.frostsky.com/2024/08/05/1887af1ef9c30e6970ce188074af4c8f.png)

### 5.3安装npm

首先输入node看是否有node版本，没有的话安装下

```sh
sudo yum install epel-release 

sudo yum install nodejs 

node --version
```

安装成功如图：

![image-20240717230836234](https://ice.frostsky.com/2024/08/05/c3782d21a5188bd57783b5948c52389f.png)



### 5.4进入blog-server文件夹输入npm i安装依赖

```sh
cd /www/wwwroot/blog/blog-server
```

```sh
npm i
```

## 6.开放后端端口

去左侧安全开放后端8888端口，否则后端服务无法访问

![image-20240717231416087](https://ice.frostsky.com/2024/08/05/7ae3f796628b89c1fc0342e703ba3241.png)

## 7.mysql数据配置

### 7.1添加数据库

数据库名：online_blog，数据库用户和数据库密码，然后点击确定

![image-20240717231655228](https://ice.frostsky.com/2024/08/05/77b7f87c256815ef8ce56aa2352f504e.png)

### 7.2导入数据库

导入blog-server\db下面的online_blog.sql

![image-20240717232109496](https://ice.frostsky.com/2024/08/05/93f3b2e69fba7a993e090fb8527cc128.png)

(有一次导入是上传文件，上传完成后还会显示上传成功的 sql 文件，还需要在那个文件右侧点击一次导入才算是导入成功)，导入过后可以重启一下 mysql，有可能会出现导入了但是数据库没重启就没生效的情况。

![image-20240717232152169](https://ice.frostsky.com/2024/08/05/5d6dab8f9b1d3ee817519e5e6864fe71.png)

## 8.后端基础配置

找到blog-server下面的.env配置，里面包含项目后端的基础配置

```java
# node项目启动端口号
APP_PORT = 8888
# 数据库地址
MYSQL_HOST = 您的服务器ip
# 数据库端口号
MYSQL_PORT = 3306
# 数据库连接名
MYSQL_USER = online_blog
# 数据库密码
MYSQL_PASSWORD = 您创建数据库的密码，可以在宝塔数据库面板看到
# 数据库名称
MYSQL_DB = online_blog
# 超级管理员密码 超级管理员账户默认是admin 密码在这里自定义，然后通过管理员给你自己角色来获得修改权限
ADMIN_PASSWORD = ''

# 七牛云 AK
ACCESSKEY = ''
# 七牛云 SK
SECRETKEY = ''
# 七牛云存储空间名称
BUCKET = ''

# minio config 需要使用minio的就配置一下
# minio AK
MINIO_ACCESSKEY = ''

# minio SK
MINIO_SECRETKEY = ''

# minio bucket(也就是minio桶的名称)
MINIO_BUCKET = 'blog-images'

# minio服务地址，直接写服务器地址，或者是网址就行，比如我的是admin.seasir.top，不能带http://或者是https:// minio 会自动带
MINIO_PATH = 'admin.seasir.top'

# 本地:local   七牛云:qiniu   在线云服务器：online    minio服务器：minio
UPLOADTYPE = 'minio'

# 服务器地址 用于拼接图片显示 可以使用七牛云测试域名 前面请带上http://或者https://根据实际情况带上
# 本地就是 'http://127.0.0.1:8888/' 像使用了七牛云绑定了自己的二级域名 博主的图片域名 'http://img.mrzym.top/'
# 具体如何设置二级域名 可以百度 七牛云文档也有教程 如果嫌麻烦 可以使用minio 只需要在自己的服务器上装一个就行 请看博客部署教程
BASEURL = 'http://www.seasir.top'

# JWT密钥
JWT_SECRET = blog
```

## 9.配置文件上传方式

文件上传推荐先使用 minio 上传，上传模式选择 minio

minio 安装方式：首先下载 docker 在软件安装面板搜来装就行。如果装不了就在安装面板选择使用命令行的方式安装

在宝塔里打开终端或者xshell终端执行下载 minio 的操作，然后使用 docker 运行 minio



```dockerfile
// 1、安装minio
docker pull minio/minio
// 2、运行 minio
// docker 运行minio 修改下面的user 和 password 那个就是minio登录账户密码 可以改成自己记得住的
docker run --name minio \
-p 9000:9000 \
-p 9999:9999 \
-d --restart=always \
-e "MINIO_ROOT_USER=minio" \
-e "MINIO_ROOT_PASSWORD=minio@123" \
-v /home/minio/data:/data \
-v /home/minio/config:/root/.minio \
minio/minio server /data \
--console-address '0.0.0.0:9999'
```

运行好以后 查看 docker 面板 会看到运行的 minio 然后打开服务器和宝塔的 9999、9000 端口进行放行 使用服务器 ip/域名 + :9999 登录

![image-20240717234134299](https://ice.frostsky.com/2024/08/05/510c2dfc863e6b72a2657bd62e20f95b.png)

登录minio

![image-20240717235111105](https://ice.frostsky.com/2024/08/05/14492b01c28ff87ba488c79f56af683b.png)

创建桶，输入桶的名称：blog-images，桶的名称务必和我的一致 方便代理 后续熟悉了项目自己可以再修改

![image-20240717234356069](https://ice.frostsky.com/2024/08/05/37981ea233fe07637b5ef2d2640e370c.png)

![img](http://mrzym.top/blog-images/GpoBaNhKRrSx)

把桶的权限改为 public

![img](http://mrzym.top/blog-images/wCePuROQCRvf)

创建 Access Key好后，把 Access Key、Secret Key、桶的名称填入 .env 配置里 就可以上传了

![image-20240717234813757](https://ice.frostsky.com/2024/08/05/e4172c6e0bbeab0e288859d37cc887f6.png)

其他配置看下博主的：http://mrzym.top/#/article?id=6

## 10.后端项目运行

### 10.1点击宝塔-网站-Node项目-添加Node项目

![image-20240717235331756](https://ice.frostsky.com/2024/08/05/606659e6091bd2db214d5ad9e4ce8518.png)

### 10.2配置node项目的基本信息，如图：![img](http://mrzym.top/blog-images/bPfmRfIXxjej)

切记 打开设置后有一个开启外网映射的功能 开启了以后会有一个项目配置文件可以修改 如果没有特殊需求 请不要修改 因为我们后面会全局配置nginx 如果这里配置了 会和全局的有冲突

![img](http://mrzym.top/blog-images/wyeBASGdgRWi)

开放后端3306端口，成功启动后可以看一下项目日志，如果日志如下图

![image-20240717235705249](https://ice.frostsky.com/2024/08/05/8735d0523c06286da7df77bab18a07b2.png)

则表明后端服务运行成功了，可以在浏览器输入服务器地址+ :端口号访问。若是出现数据库连接失败，就说明数据库账户、密码这些不对，可以去/www/wwwroot/blog/blog-server下面的.env配置里面检查

## 11.前端配置

11.1在/www/wwwroot/blog新建blogV3文件夹，分别新建admin和blog，admin对应的是博客后台前端，blog对应的是博客前端

11.2打包前端，使用vscode分别打开admin和blog，**前端打包前需要安装Node.js**，没有安装先去百度怎么安装。打包成功后会有dist 文件夹，使用Xftp 7将dist 整个文件夹放在/www/wwwroot/blog/blogV3/blog和/www/wwwroot/blog/blogV3/admin目录下，

![image-20240718000855226](https://ice.frostsky.com/2024/08/05/171cfcbd36272c3c4f7feae8735e47af.png)

## 12.宝塔配置NGINX

在软件商店找到安装 nginx 好后(有小伙伴遇到了 nginx 下载后，启动了，但是 nginx 并没有生效的情况，可以在安装时选择编译安装就解决了)，点击配置，将我的配置复制进去就行

![image-20240718001147654](https://ice.frostsky.com/2024/08/05/a1d1b2b2ecd3a271a555ba851a866f92.png)

记得把服务器 ip 改成你自动的！

```nginx
user www www;
worker_processes auto;
error_log /www/wwwlogs/nginx_error.log crit;
pid /www/server/nginx/logs/nginx.pid;
worker_rlimit_nofile 51200;

stream {
  log_format tcp_format '$time_local|$remote_addr|$protocol|$status|$bytes_sent|$bytes_received|$session_time|$upstream_addr|$upstream_bytes_sent|$upstream_bytes_received|$upstream_connect_time';

  access_log /www/wwwlogs/tcp-access.log tcp_format;
  error_log /www/wwwlogs/tcp-error.log;
  include /www/server/panel/vhost/nginx/tcp/*.conf;
}

events {
  use epoll;
  worker_connections 51200;
  multi_accept on;
}

http {
  include mime.types;
  #include luawaf.conf;

  include proxy.conf;
  lua_package_path "/www/server/nginx/lib/lua/?.lua;;";

  default_type application/octet-stream;

  server_names_hash_bucket_size 512;
  client_header_buffer_size 32k;
  large_client_header_buffers 4 32k;
  client_max_body_size 50m;

  sendfile on;
  tcp_nopush on;

  keepalive_timeout 60;

  tcp_nodelay on;

  fastcgi_connect_timeout 300;
  fastcgi_send_timeout 300;
  fastcgi_read_timeout 300;
  fastcgi_buffer_size 64k;
  fastcgi_buffers 4 64k;
  fastcgi_busy_buffers_size 128k;
  fastcgi_temp_file_write_size 256k;
  fastcgi_intercept_errors on;

  gzip on;
  gzip_min_length 1k;
  gzip_buffers 4 16k;
  gzip_http_version 1.1;
  gzip_comp_level 2;
  gzip_types text/plain application/javascript application/x-javascript text/javascript text/css application/xml;
  gzip_vary on;
  gzip_proxied expired no-cache no-store private auth;
  gzip_disable "MSIE [1-6]\.";

  limit_conn_zone $binary_remote_addr zone=perip:10m;
  limit_conn_zone $server_name zone=perserver:10m;

  server_tokens off;
  access_log off;

  # 数据库面板
  server {
    listen 888;
    server_name phpmyadmin;
    index index.html index.htm index.php;
    root /www/server/phpmyadmin;
    location ~ /tmp/ {
      return 403;
    }

    #error_page   404   /404.html;
    include enable-php.conf;

    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
      expires 30d;
    }

    location ~ .*\.(js|css)?$ {
      expires 12h;
    }

    location ~ /\. {
      deny all;
    }

    access_log /www/wwwlogs/access.log;
  }

  server {
    listen 80;
    server_name localhost;
    # 博客前台前端静态资源
    location / {
      root /www/wwwroot/blog/blogV3/blog/dist;
      index index.html index.htm;
      #history模式
      try_files $uri $uri/ /index.html;
    }

    # 小表情
    location /emoji {
      alias /www/wwwroot/emoji;
      autoindex on;
    }

    location /ws/ {
        proxy_pass http://服务器ip/:8889;
        # 后端WebSocket服务器的地址和端口
        proxy_http_version 1.1; 
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host; 
        proxy_cache_bypass $http_upgrade; 
    }

    # 服务器存储图片
    location /online {
      alias /www/wwwroot/blog/blogServer/src/upload/online;
      autoindex on;
    }
    # 后端服务代理
    location /api/ {
      proxy_pass http://服务器ip:8888/; # 服务端代理地址 或者是域名(域名解析以后要能指向服务器ip)
      proxy_set_header Host $host; # 获取用户真实ip
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    # gitee 代理
    location /gitee/ {
      proxy_pass https://gitee.com/mrzym/; # 改成你的gitee面板地址
    }
    # minio 代理
    location /blog-images {
      proxy_pass http://服务器ip:9000/blog-images;
    }
    # 网易云音乐 代理
    location /wapi/ {
      proxy_pass http://服务器ip:3000/;
    }
  }
  
  server {
        listen 80;
        server_name admin.seasir.top;  #后台域名

       # 后台前端静态资源
    location / {
      root /www/wwwroot/blog/blogV3/admin/dist;
      index index.html index.htm;
      #history模式
      try_files $uri $uri/ /index.html;
    }
    
    # 小表情
    location /emoji {
      alias /www/wwwroot/emoji;
      autoindex on;
    }
    
    location /ws/ {
        # 后端WebSocket服务器的地址和端口
        proxy_pass http://服务器ip/:8889;
        proxy_http_version 1.1; 
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host; 
        proxy_cache_bypass $http_upgrade; 
    }
    
    # 服务器存储图片
    location /online {
      root /www/wwwroot/blog/blog-server/src/upload/local;
      autoindex on;
    }
    
    # gitee 代理
    location /gitee/ {
      proxy_pass https://gitee.com/mrzym/; # 改成你的gitee面板地址
    }
    
    # minio 代理
    location /blog-images {
      proxy_pass http://服务器ip:9000/blog-images;
    }

    # 网易云音乐 代理
    location /wapi/ {
      proxy_pass http://服务器ip:3000/;
    }
    
    # 后端服务代理
    location /api/ {
      proxy_pass http://服务器ip:8888/; # 服务端代理地址 或者是域名(域名解析以后要能指向服务器ip)
      proxy_set_header Host $host; # 获取用户真实ip
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
  }
  # include /www/server/panel/vhost/nginx/*.conf;
}
```

## 12.部署音乐后端

1. 拉取镜像

```dockerfile
docker pull binaryify/netease_cloud_music_api
```

2.运行

```dockerfile
docker run -p 3000:3000 --name netease_cloud_music_api -d binaryify/netease_cloud_music_api
```

3.nginx配置

```nginx
# 网易云音乐 代理
    location /wapi/ {
      proxy_pass http://156.238.224.112:3000/;
    }
```

4.开放端口，重启nginx

![image-20240716193550090](https://ice.frostsky.com/2024/08/05/b09b9e90e81d6dcc6e9651b4c5f3c458.png)

## 13.部署websocket

进入 blog-v3\src\components\ChatRoom\index.vue组件，填写服务器ip+端口，端口对应的就是nginx配置后端WebSocket服务器的地址和端口

```javascript
const initWebsocket = async (isReconnect = false) => {
  isConnecting.value = true;

  // 如果说发现了异常 断开连接了 之前的websocket 还在的话就清空 重连
  if (websocket) {
    websocket.close();
    websocket = null;
  }
  websocket = new WebSocket("ws://156.238.224.112:8889/ws/");
  // websocket = new WebSocket("ws://localhost:8889/");
  // localhost表示在本地 线上需要用nginx代理一下 代理在博客部署nginx配置里有
  省略.....
};
```

## 

## 常见问题

## 1.数据库名称和密码都是对是，报错找不到ws模块解决

![image-20240716002728316](https://ice.frostsky.com/2024/08/05/f4c1ac492763ccc791578284f2086671.png)

解决 linux 下安装 node 报错： command not found：https://cloud.tencent.com/developer/article/1979850

```javascript
sudo yum install epel-release 

sudo yum install nodejs 

node --version
```



![image-20240716002853805](https://ice.frostsky.com/2024/08/05/460a3f7903ddfc2439aa7acc23adcb1a.png)

cd进入/www/wwwroot/blog/blog-server                  输入：npm i

![](https://ice.frostsky.com/2024/08/05/0ad736bea60a83b91f0727b5c44f3e6a.png)

![image-20240716003311712](https://ice.frostsky.com/2024/08/05/f29d750ad80f48039d82aef826e7026d.png)

![image-20240716003120393](https://ice.frostsky.com/2024/08/05/c2275e8166cb053c2eaccdfc6f639a94.png)



## 2.admin后台提示报错502原因以及解决方案

![image-20240716123954843](https://ice.frostsky.com/2024/08/05/6a640ea2c2df99bffbf3aa92098f1f52.png)

原因：nginx后端服务代理端口配置错误，改成正确的端口号，改完重启nginx服务！

![image-20240716124128443](https://ice.frostsky.com/2024/08/05/6d0b59ab53f2959d2efc29ee3bea0b45.png)

![image-20240716124147746](https://ice.frostsky.com/2024/08/05/516cae106ae592e5fbd8512a2b01aaa1.png)



## 3.注册好的账号登录后台前端无限循环返回404

原因：是因为没有配置giree代理，需要配置nginx的gitee代理：

```javascript
#gitee 代理
location /gitee/ {
  proxy_pass https://gitee.com/mrzym/; # 改成你的gitee面板地址
}
```

![image-20240716124352821](https://ice.frostsky.com/2024/08/05/c1a0ba9b4628ffa17454b3802e08d133.png)



## 4.解决minio上传图片时报404

原因是后端.env加上了端口，去掉即可，改成重启node后端服务

![image-20240716130406365](https://ice.frostsky.com/2024/08/05/b071b407c6183a46ed407a6b3b8c2761.png)

![image-20240716130607123](https://ice.frostsky.com/2024/08/05/cc65ff7f6f0ad18e3d6c96a95027c86f.png)

![image-20240716130529679](https://ice.frostsky.com/2024/08/05/f5b00ef202daa81c77e3e9eb5719d8b0.png)





## 5.图片上传成功，但是图片是加载失败的，如图：

原因是nginx端口配置错误，访问minio页面是9999端口 访问它的图片服务是9000，改完重启后端服务

![image-20240716125929914](https://ice.frostsky.com/2024/08/05/d77fa2c277ef2735370db9a4ecbbf55c.png)

![image-20240716125813655](https://ice.frostsky.com/2024/08/05/8d2212fa9685e324c769efe86c356b98.png)

## 6.解决即时聊天获取getChatlist接口报错500问题

![](https://ice.frostsky.com/2024/08/05/3107e50b95b333cb2b2b5d20a3ed5a46.png)

原因是找不到这个用户id,去注册一个用户就行，或者给这个用户管理员权限；还不行的话清除聊天记录和下线，刷新网页再试试

![image-20240720012342092](https://ice.frostsky.com/2024/08/05/0abb7b0e79bcce69058493fd49a004ff.png)