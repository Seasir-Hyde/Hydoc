---
# 文档ID，唯一标识符
id: Ruyu-Frp-Minio

# 文档的URL路径标识符，用于生成文档URL
slug: /Ruyu-Frp-Minio

# 文档标题，显示在页面标题
title: 配置Frp实现公网访问本地Minio服务

# 发布日期，用于时间排序
date: 2024/09/04

#用于在侧边栏中显示文档的顺序，数字越小越靠前
sidebar_position: 0
# 作者名称
author: Hyde

# 最后更新日期，用于时间排序
last_update:
  date: 2024-09-04

# 关键词，用于SEO优化
keywords: [Ruyu, Frp, Minio]

# 文章标签，帮助分类
tags: [Ruyu, Frp, Minio]
---

## 1.准备工作
- 本地服务器.运行 MinIO 服务，IP 地址为 192.168.80.128，端口为 9000；部署方式参考.
[部署Minio](https://hydoc.netlify.app/docs/Blog/tutorial/Ruyu-Blog/#15%E9%83%A8%E7%BD%B2minio)
- 云服务器.IP 地址为 **`云服务器ip地址`**，用于接收公网访问请求，并通过 FRP 将请求转发到本地 Minio
- 安装 FRP.确保在本地和云服务器上都已安装 FRP。安装教程.[Docker部署Frp内网穿透教程](https://hydoc.netlify.app/blog/docker-install-frp)



## 2.配置 FRP 服务端（`frps`）

- 配置教程参考.[安装服务端](https://hydoc.netlify.app/blog/docker-install-frp/#2%E5%AE%89%E8%A3%85%E6%9C%8D%E5%8A%A1%E7%AB%AF)

- 云服务器的配置

  ```bash
  [common]
  # 监听端口
  bind_port = 7000
  # 面板端口
  dashboard_port = 7500
  # 登录面板账号设置
  dashboard_user = admin
  # 登录面板的密码
  dashboard_pwd = 123456
  
  # 身份验证，随便填写无要求
  token = 123456
  ```

  

##  3.配置 FRP 客户端（`frpc`）

- 配置教程参考.[安装客户端](https://hydoc.netlify.app/blog/docker-install-frp/#3%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%AE%89%E8%A3%85)

- 自己的配置

  /root/frpc.ini

  ```bash
  [common]
  # 云服务器的IP地址，FRP客户端连接到此地址
  server_addr = [填写云服务器的IP地址]
  
  # 服务端监听的端口，FRP客户端将连接此端口
  server_port = 7000
  
  # 服务端设置的token，用于客户端与服务端之间的身份验证
  token = [填写云服务器的token，比如123456]
  
  
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
  
  
  [ruyu-hitokoto]
  # 代理的类型，这里是TCP代理
  type = tcp
  
  # 本地应用的IP地址，这里是一个内网地址，FRP客户端会从这里转发流量
  local_ip = 192.168.80.128
  
  # 本地应用的端口，FRP客户端会将请求转发到这个端口
  local_port = 8000
  
  # 远程服务器上对应的端口，外部访问此端口时流量会被转发到本地的local_ip:local_port
  remote_port = 8084
  
  
  [ruyu-minio]
  # 代理的类型，这里是TCP代理
  type = tcp
  
  # 本地应用的IP地址，这里是一个内网地址，FRP客户端会从这里转发流量
  local_ip = 192.168.80.128
  
  # 本地应用的端口，FRP客户端会将请求转发到这个端口
  local_port = 9000
  
  # 远程服务器上对应的端口，外部访问此端口时流量会被转发到本地的local_ip:local_port
  remote_port = 9000
  ```

  

##  4.配置 MinIO 客户端

- `application-dev.yml`）中配置 MinIO 的访问地址，确保使用云服务器的公网 IP

```yml
minio:
  # 访问地址
  endpoint: http://公网ip:9000
  #endpoint: http://192.168.80.128:9000 (本地虚拟机填写这个配置)
  #endpoint: http://公网ip:9000 (通过frp填写这个配置)
  accessKey: 填写虚拟机的accessKey
  secretKey: 填写虚拟机的secretKey
  # 桶名称
  bucketName: blog
```



## 5.防火墙配置

确保云服务器的防火墙开放以下端口.

- FRP 服务端监听端口 `7000`。
- MinIO 服务映射的端口 `9000`。

可以使用以下命令开放这些端口（以 CentOS 为例）.

```bash
sudo firewall-cmd --zone=public --add-port=7000/tcp --permanent
sudo firewall-cmd --zone=public --add-port=9000/tcp --permanent
sudo firewall-cmd --reload
```



## 6.重新构建后端容器

- 构建教程参考：[部署后端](https://hydoc.netlify.app/docs/Blog/tutorial/Ruyu-Blog/#51%E9%83%A8%E7%BD%B2%E5%90%8E%E7%AB%AF)



## 7.验证访问

访问ruyu-blog后台上传图片，在前台访问开发者工具检查图片地址指向是否是云服务器地址，如果是就成功