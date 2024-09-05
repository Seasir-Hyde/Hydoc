---
# 文档的URL路径标识符
slug: docker-Process-Connection

# 文档标题，显示在页面顶部
title: Docker 守护进程无法连接

# 发布日期，用于时间排序
date: 2024-09-05

# 作者名称
# authors: Hyde

# 最后更新日期，用于时间排序
last_update:
  date: 2024/09/05

# 文章标签，帮助分类
tags: [随笔, docker]

#关键词，用于SEO优化
keywords: [随笔, docker]

# 文档的简要描述
description: 无法连接到 unix:///var/run/docker.sock 上的 Docker 守护程序。docker 守护程序是否正在运行？

# 文章的封面图片
image: https://pic.netbian.com/uploads/allimg/240826/000731-17246020516879.jpg

#置顶级别，决定文章在列表中的位置
sticky: 3
---

无法连接到 unix:///var/run/docker.sock 上的 Docker 守护程序。docker 守护程序是否正在运行？

<!-- truncate -->

## 1.检查 Docker 守护进程状态

运行以下命令来检查 Docker 服务是否正在运行：

```bash
sudo systemctl status docker
```

输出：

```bash
● docker.service - Docker Application Container Engine
   Loaded: loaded (/usr/lib/systemd/system/docker.service; enabled; vendor preset: disabled)
   Active: active (running) since 四 2024-09-05 08:02:21 PDT; 2min 4s ago
     Docs: https://docs.docker.com
 Main PID: 1306 (dockerd)
    Tasks: 103
   Memory: 165.7M
   CGroup: /system.slice/docker.service
           ├─1306 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
           ├─3367 /usr/bin/docker-proxy -proto tcp -host-ip 0.0.0.0 -host-port 6379 -container-ip 172.19.0.2 -container-port 6379
           ├─3377 /usr/bin/docker-proxy -proto tcp -host-ip :: -host-port 6379 -container-ip 172.19.0.2 -container-port 6379
           ├─3388 /usr/bin/docker-proxy -proto tcp -host-ip 0.0.0.0 -host-port 1081 -container-ip 172.25.0.2 -container-port 80
           ├─3398 /usr/bin/docker-proxy -proto tcp -host-ip :: -host-port 1081 -container-ip 172.25.0.2 -container-port 80
           ├─3400 /usr/bin/docker-proxy -proto tcp -host-ip 0.0.0.0 -host-port 8000 -container-ip 172.22.0.2 -container-port 8000
           ├─3408 /usr/bin/docker-proxy -proto tcp -host-ip :: -host-port 8000 -container-ip 172.22.0.2 -container-port 8000
           ├─3410 /usr/bin/docker-proxy -proto tcp -host-ip 0.0.0.0 -host-port 3306 -container-ip 172.18.0.2 -container-port 3306
           ├─3423 /usr/bin/docker-proxy -proto tcp -host-ip :: -host-port 3306 -container-ip 172.18.0.2 -container-port 3306
           ├─3521 /usr/bin/docker-proxy -proto tcp -host-ip 0.0.0.0 -host-port 445 -container-ip 172.25.0.2 -container-port 445
           └─3530 /usr/bin/docker-proxy -proto tcp -host-ip :: -host-port 445 -container-ip 172.25.0.2 -container-port 445

9月 05 08:02:16 localhost.localdomain dockerd[1306]: time="2024-09-05T08:02:16.719047880-07:00" level=warning msg="Error (Unable to complete ato...ing...."
9月 05 08:02:16 localhost.localdomain dockerd[1306]: time="2024-09-05T08:02:16.810528157-07:00" level=info msg="Removing stale sandbox cd2e31f94...de919c)"
9月 05 08:02:16 localhost.localdomain dockerd[1306]: time="2024-09-05T08:02:16.942388191-07:00" level=warning msg="Error (Unable to complete ato...ing...."
9月 05 08:02:17 localhost.localdomain dockerd[1306]: time="2024-09-05T08:02:17.367127239-07:00" level=info msg="Default bridge (docker0) is assi...address"
9月 05 08:02:17 localhost.localdomain dockerd[1306]: time="2024-09-05T08:02:17.640321637-07:00" level=info msg="Firewalld: interface docker0 alr...turning"
9月 05 08:02:20 localhost.localdomain dockerd[1306]: time="2024-09-05T08:02:20.324888025-07:00" level=info msg="Loading containers: done."
9月 05 08:02:20 localhost.localdomain dockerd[1306]: time="2024-09-05T08:02:20.429437179-07:00" level=info msg="Docker daemon" commit=de5c9cf co...n=26.1.4
9月 05 08:02:20 localhost.localdomain dockerd[1306]: time="2024-09-05T08:02:20.429856042-07:00" level=info msg="Daemon has completed initialization"
9月 05 08:02:21 localhost.localdomain dockerd[1306]: time="2024-09-05T08:02:21.073813814-07:00" level=info msg="API listen on /run/docker.sock"
9月 05 08:02:21 localhost.localdomain systemd[1]: Started Docker Application Container Engine.
Hint: Some lines were ellipsized, use -l to show in full.
```

如果显示 Docker 没有运行，可以使用以下命令启动：

```bash
sudo systemctl start docker
```

## 2.确保 Docker 服务已安装并启用

首先，确保 Docker 已经安装并且服务已经启用。你可以使用以下命令来启用 Docker 自启动：

```bash
sudo systemctl enable docker
```

输出：

```bash
[root@localhost ~]# sudo systemctl enable docker

#表示 Docker 的自启动设置已经成功创建。系统在启动时会自动启动 Docker 服务。
Created symlink from /etc/systemd/system/multi-user.target.wants/docker.service to /usr/lib/systemd/system/docker.service.
```

## 3.重启系统以验证自启动

你可以重启系统，确保 Docker 服务在系统启动时自动启动：

```bash
sudo reboot
```

重启后，你可以使用以下命令确认 Docker 服务是否正在运行：

```bash
sudo systemctl status docker
```

