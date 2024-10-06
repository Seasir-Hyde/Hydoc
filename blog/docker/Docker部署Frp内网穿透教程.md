---
# 文档的URL路径标识符
slug: docker-install-frp

# 文档标题，显示在页面顶部
title: Docker部署Frp内网穿透教程

# 发布日期，用于时间排序
date: 2024-08-24

# 作者名称
# authors: Hyde

# 最后更新日期，用于时间排序
last_update:
  date: 2024-08-25

# 文章标签，帮助分类
tags: [随笔, docker，frp，内网穿透]

#关键词，用于SEO优化
keywords: [随笔, docker，frp，内网穿透]

# 文档的简要描述
description: 部署一个内网穿透工具，以便可以从外部访问我的内网设备

# 文章的封面图片
image: https://pic.netbian.com/uploads/allimg/240709/181400-1720520040848c.jpg

#置顶级别，决定文章在列表中的位置
sticky: 2
---

今天在腾讯云秒杀活动中，成功以首年38元的价格抢购了一台 2 核 2 G的云服务器，这是针对新用户的特价。由于博客配置最低 2 核 4 G的配置，为了更好地利用这台服务器，决定部署一个内网穿透工具，以便我可以从外部访问我的内网设备。由于之前大佬踩坑的经验，选择了 Frp 作为内网穿透工具。接下来，我将分享我的部署过程。

<!-- truncate -->
## 版权声明

:::warning
本教程参考了One作者的教程，并结合自身实际部署过程中积累的经验编写而成。原始教程链接为[实战：docker式部署frp内网穿透-2024.7.13(测试成功)](https://wiki.onedayxyy.cn/blog/docker-install-frp/)，感谢原作者提供的宝贵参考资料。

本教程仅供学习和交流使用，任何人不得将本教程的内容用于商业用途。如需引用或转载，请务必注明原作者及本文出处。如侵权之处，请联系博主进行删除，谢谢~

部分内容引用[One大佬](https://wiki.onedayxyy.cn/)的教程，感谢大佬的贡献。
:::

## 什么是 frp？
FRP（Fast Reverse Proxy）是一款开源的高性能内网穿透工具，它允许你将内网服务器暴露到公网，实现外部访问。FRP 的工作原理是通过在内网和外网各部署一个代理服务，使得外部请求能够通过外网代理转发到内网服务，从而解决了内网环境下的访问问题。

## 为什么需要内网穿透？

在实际应用中，我们常常需要从外部访问位于内网中的应用或服务或者是云服务器太贵，刚好有自己本地的虚拟机，可以将本地虚拟机的内网IP暴露在公网IP进行访问，如远程管理内网服务器、访问开发环境、测试应用等。然而，由于内网环境通常是封闭的，且受限于 NAT（网络地址转换）或防火墙，直接访问这些内网服务是不可行的。

内网穿透技术能够解决这些问题，通过在公网和内网之间建立一个中介服务，使得内网中的服务能够被安全、可靠地访问。这对于开发者、运维人员及需要远程访问的用户来说是非常重要的。

## FRP的特点
- **高效性能**：FRP在高并发情况下仍能保持优异的性能表现，适用于各种网络环境。其设计优化了数据传输效率，确保了稳定的连接质量。
- **简易配置**：FRP的配置文件简洁明了，易于理解和操作。支持多种协议和配置选项，使得部署和管理更加便捷。
- **多种协议支持**：FRP支持TCP、HTTP、HTTPS、QUIC、KCP和WebSocket等多种协议，能够满足大多数应用场景的需求。用户可以根据具体需求选择最适合的协议进行穿透。
- **TCP连接流式复用**：通过在单个连接上承载多个请求，FRP减少了连接建立时间，降低了请求延迟，提高了网络效率。
- **灵活性和扩展性**：FRP客户端和服务端都提供了灵活的配置选项，支持负载均衡和访问控制等高级功能。用户可以根据需求进行高度定制化配置。
- **端口复用**：支持多个服务通过同一个服务端端口进行暴露，减少了端口使用的复杂性和管理难度。
- **P2P通信**：在特定情况下，FRP支持P2P通信，流量可以直接在客户端之间传输，充分利用带宽资源，减少对中转服务器的依赖。
- **服务端插件系统**：FRP的服务端插件系统高度可扩展，允许用户根据自身需求进行功能扩展，提升了系统的灵活性和适应性。
- **用户友好的UI页面**：FRP提供了易于使用的用户界面，使得服务端和客户端的配置、监控和管理变得更加方便。

## FRP的组成

客户端 ( **frpc** ) 和 服务端 ( **frps** )。通常情况下，服务端部署在具有公网 IP 地址的机器上，而客户端部署在需要穿透的内网服务所在的机器上。

## FRP开源地址

**Frp** 是一款在 **Github** 上非常热门的项目，使用 **Golang** 语言开发，目前已经有 **82k** 的 **star** 数，社区也很活跃。

https://github.com/fatedier/frp/releases

![img](https://onedayxyy.cn/images/640-1720748249459-5.png)

## 准备工作
:::info[准备工作]
- 云服务器一台
- 公网IP和流量转发
:::
## 环境
:::info[环境]
- 1台公网服务器（centos7.x系统）
- 1台电脑虚拟机（centos7.x系统）
- Docker和Docker Engine

#frp镜像：
- registry.cn-shenzhen.aliyuncs.com/mogublog_business/frps:latest
- registry.cn-shenzhen.aliyuncs.com/mogublog_business/frpc:latest

#配置
- frp server:
- 腾讯云ecs，CPU - 2核 内存 - 2GB SSD - 40GB 流量包 - 200GB/月（带宽：3Mbps）
:::

## 1.安装Docker

首先来云服务器安装服务端，服务端需要在具有公网 IP 的设备上进行安装，我目前的云服务器是装了 **CentOS 7.6 64bit** 系统。（是linux系统就好）

安装步骤详情查看[ruyu-blog部署详细教程)](https://hydoc.netlify.app/docs/Blog/tutorial/ruyu-blog#11%E5%AE%89%E8%A3%85docker)中的1.1.安装Docker和1.1.1安装 Docker Engine(遇到选择一路按y回车)

## 2.安装服务端

- 使用远程连接工具连接到云服务器，然后使用下面的命令，创建 **frp** 的服务端配置文件

```bash
vim /root/frps.ini
```

- 填写frp服务端配置信息，这里会启动两个端口号

- **7000**：用于和内网设备数据交互；
- **7500**：提供 **frp** 图形化界面，同时需要配置面板访问的账号和密码，以及 **token** 是内网设备和 **frp** 服务端建立连接时的密码。

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

- 启动容器

使用下面 **docker** 命令，下载我们的 frp 服务端。其中，这里使用到了蘑菇的阿里云镜像仓库地址，官方的镜像地址因为被墙的原因，可能很多小伙伴目前无法访问了。

```bash
docker run --restart=always --network host -d -v /root/frps.ini:/etc/frp/frps.ini --name frps registry.cn-shenzhen.aliyuncs.com/mogublog_business/frps
```
:::tip[提示]
细心的小伙伴，可能会发现：命令行中使用了 --network host 定网络模式为 host 模式。

众所周知，Docker 使用了 Linux 的 Namespaces 技术来进行资源隔离，如PID Namespace隔离进程，Mount Namespace隔离文件系统，Network Namespace隔离网络等。一个Network Namespace提供了一份独立的网络环境，包括网卡、路由、Iptable 规则等都与其他的 Network Namespace 隔离。

如果使用 host 模式时，容器中的应用都直接绑定在宿主机的端口上，没有经过 NAT 转换，但容器的其他如文件系统等还是隔离的。
:::

- 查看容器运行状态

```bash
docker ps
```

- 输出：

```bash
CONTAINER ID   IMAGE                                                      COMMAND                   CREATED        STATUS        PORTS     NAMES
12c1f6d8df8e   registry.cn-shenzhen.aliyuncs.com/mogublog_business/frps   "/bin/sh -c '/usr/bi…"   40 hours ago   Up 40 hours             frps
```

![image-20240824123227953](https://ice.frostsky.com/2024/08/24/c4b911b0644fcb9559a79532a9d4f580.png)

- 登录web查看后台:http://IP:7500/ --------------------**这里的IP实际换成您自己云服务器的IP**

同时，**frp** 还提供了图形化的界面，我们使用 http://your_ip:7500 即可打开对应的图形化界面。输入上面配置文件中，配置的账号和密码登录即可。

![img](https://onedayxyy.cn/images/640-1720748249460-10.png)

如果能看到下面的页面，说明就我们的服务端就安装成功了

![image-20240713062222592](https://onedayxyy.cn/images/image-20240713062222592.png)

## 3.客户端安装

客户端需要在我们的内网的机器上进行安装,打开内网机器之前，先使用 **SSH** 工具进行连接。

- 创建 **frp** 的客户端配置文件

```bash
vim /root/frpc.ini
```

- 填写客户端配置

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

- 启动容器

配置完成后，依次执行下面命令下载客户端的 docker 镜像，并加载上面的配置文件，启动 **frp** 的客户端。

```bash
# 运行 FRP 客户端的 Docker 容器
docker run --restart=always --network host -d -v /root/frpc.ini:/etc/frp/frpc.ini --name frpc registry.cn-shenzhen.aliyuncs.com/mogublog_business/frpc
```

![image-20240713104737686](https://onedayxyy.cn/images/image-20240713104737686.png)

- 验证

我们再打开 **frp** 的图形化界面，选中：**Proxies → TCP**，可以看到这几个端口都已经注册上来了

![image-20240713104808493](https://onedayxyy.cn/images/image-20240713104808493.png)

![image-20240713103756614](https://onedayxyy.cn/images/image-20240713103756614.png)

## 4.效果展示

访问公网 IP 的8083端口，即可看到本地虚拟机部署的页面。http://IP:8083/

![alt text](https://ice.frostsky.com/2024/08/18/249883c85ae91abb55f97b4982741af0.png)

## 5.删除Proxies/TCP

首先在**内网客户端**使用**Xftp 7**远程连接，进入 `/root/frps.ini`文件路径双击打开，并找到需要删除的代理项，然后保存退出。

```bash
[nginx-test]
type = http
local_port = 80
remote_port = 8080
...

[ruyu-blog]
type = tcp
local_port = 81
remote_port = 8081
...

[ssh]
type = tcp
local_port = 22
remote_port = 8022
...
```

为了使配置更改生效，您需要在**云服务器**重启 FRP 服务端。如果您是在 Docker 中运行的 FRP 服务端，可以使用以下命令。

```bash
docker restart frps
```

验证代理项已删除

![image-20240824131350884](https://ice.frostsky.com/2024/08/24/c954e2d251d32427dc51baab638a595f.png)