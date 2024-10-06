---
# 文档的URL路径标识符
slug: docker-automatic-script

# 文档标题，显示在页面顶部
title: Linux 系统设置开机自动运行脚本

# 发布日期，用于时间排序
date: 2024-09-07

# 作者名称
# authors: Hyde

# 最后更新日期，用于时间排序
last_update:
  date: 2024/09/07

# 文章标签，帮助分类
tags: [随笔, docker, Linux]

#关键词，用于SEO优化
keywords: [随笔, docker, Linux]

# 文档的简要描述
description: 通过编辑 /etc/rc.d/rc.local 文件来添加一个脚本，使其在系统启动时自动执行脚本，脚本内容是启动启动没有运行中的docker容器

# 文章的封面图片
image: https://pic.netbian.com/uploads/allimg/240629/195203-1719661923b0b6.jpg

#置顶级别，决定文章在列表中的位置
sticky: 3
---

在工作中，我们经常有个需求，那就是在系统启动之后，自动启动某个脚本或服务。在 Windows 下，我们有很多方法可以设置开机启动，但在 Linux 系统下我们需要如何操作呢？

Linux 下同样可以设置开机启动，但可能需要我们敲一些命令（可能也有 UI 界面的设置方法，但我不熟，我更多是玩命令）。下面我们就介绍三种简单但可行的开机启动设置方法。

<!-- truncate -->

## 版权声明

:::warning
本教程参考了One作者的教程，并结合自身实际部署过程中积累的经验编写而成。原始教程链接为[Linux 系统设置开机自动运行脚本的方法)](https://wiki.onedayxyy.cn/docs/linux-KaiJiZiQiShell/)，感谢原作者提供的宝贵参考资料。

本教程仅供学习和交流使用，任何人不得将本教程的内容用于商业用途。如需引用或转载，请务必注明原作者及本文出处。如侵权之处，请联系博主进行删除，谢谢~

部分内容引用[One大佬](https://wiki.onedayxyy.cn/)的教程，感谢大佬的贡献。
:::



## 方法一：修改 /etc/rc.d/rc.local 文件

`/etc/rc.d/rc.local 文件`会在 Linux 系统各项服务都启动完毕之后再被运行。所以你想要自己的脚本在开机后被运行的话，可以将自己脚本路径加到该文件里。

:::tip

这种方法，在任何 Linux 系统上都可以使用。

:::

- 环境：

CentOS Linux 7.9 (2009) (Core)

- 我们先来查看下这个文件的内容是什么

```bash
cat  /etc/rc.d/rc.local
```

输出：

```bash
#!/bin/bash
# THIS FILE IS ADDED FOR COMPATIBILITY PURPOSES
#
# It is highly advisable to create own systemd services or udev rules
# to run scripts during boot instead of using this file.
#
# In contrast to previous versions due to parallel execution during boot
# this script will NOT be run after all other services.
#
# Please note that you must run 'chmod +x /etc/rc.d/rc.local' to ensure
# that this script will be executed during boot.

#创建一个空文件 /var/lock/subsys/local，该文件的存在通常用来指示某个服务或任务已经成功运行
#这是旧版 Linux 系统中的一种惯例，但在现代系统中，它的作用已经非常有限。
touch /var/lock/subsys/local
```

这个脚本是位于 `/etc/rc.d/rc.local` 的示例文件，主要用于兼容性目的，特别是在 CentOS 7 中。`/etc/rc.d/rc.local` 是传统的启动脚本文件，允许用户在系统启动时执行自定义的脚本或命令，因此可以往里写开机要执行的命令或脚本。

:::warning

`/etc/rc.local`为`/etc/rc.d/rc.local`的软链

:::

- **可执行权限**: 要确保这个脚本在系统启动时被执行，需要给脚本添加可执行权限：

```bash
chmod +x /etc/rc.d/rc.local
```

### 演示

- 首先，在根目录目录或指定的位置创建一个脚本文件，例如 `/blog/start_all_containers.sh`：

```bash
vim /blog/start_all_containers.sh
```

- 添加脚本内容

```bash
#!/bin/bash

# 定义一个函数来启动所有未运行的Docker容器
start_stopped_containers() {
    # 查找所有未运行的容器
    stopped_containers=$(docker ps -a -f "status=exited" -q)
    
    # 如果有未运行的容器，启动它们
    if [ ! -z "$stopped_containers" ]; then
        echo "启动所有未运行的Docker容器..."
        docker start $stopped_containers
    else
        echo "没有未运行的Docker容器需要启动。"
    fi
}

# 调用函数
start_stopped_containers
```

- 保存退出后，确保文件有执行权限

```bash
chmod +x /blog/start_all_containers.sh
```

- 然后，我们再将脚本添加到 /etc/rc.d/rc.local 文件最后一行：

```bash
vim /etc/rc.d/rc.local
```

```bash
/blog/start_all_containers.sh
```

添加后的内容：

```tsx
#!/bin/bash
# THIS FILE IS ADDED FOR COMPATIBILITY PURPOSES
#
# It is highly advisable to create own systemd services or udev rules
# to run scripts during boot instead of using this file.
#
# In contrast to previous versions due to parallel execution during boot
# this script will NOT be run after all other services.
#
# Please note that you must run 'chmod +x /etc/rc.d/rc.local' to ensure
# that this script will be executed during boot.

touch /var/lock/subsys/local

#这里添加刚刚在/blog文件夹下创建的"start_all_containers.sh"脚本
// highlight-next-line
/blog/start_all_containers.sh
```

- 直接重启系统验证测试：

```bash
reboot
```

可以看到开机自启动所有未运行的Docker容器，输出如下：

```bash
[root@localhost ~]# docker ps
CONTAINER ID   IMAGE                                                      COMMAND                   CREATED        STATUS              PORTS                                                                                                                                      NAMES
ba8627412252   ruyu-blog-hd                                               "java -jar /app/app.…"   37 hours ago   Up About a minute   0.0.0.0:8088->8088/tcp, :::8088->8088/tcp                                                                                                  ruyu-blog-hd
115838d43850   blog-ht                                                    "/docker-entrypoint.…"   2 days ago     Up About a minute   80/tcp, 0.0.0.0:81->81/tcp, :::81->81/tcp                                                                                                  blog-ht
3334358ca32b   blog-qt                                                    "/docker-entrypoint.…"   2 days ago     Up About a minute   0.0.0.0:80->80/tcp, :::80->80/tcp                                                                                                          blog-qt
d14e0fc37e68   filesite/machete                                           "/var/www/machete/do…"   2 days ago     Up About a minute   0.0.0.0:445->445/tcp, :::445->445/tcp, 9000/tcp, 0.0.0.0:1081->80/tcp, :::1081->80/tcp                                                     machete
19abde9750b1   registry.cn-shenzhen.aliyuncs.com/mogublog_business/frpc   "/bin/sh -c '/usr/bi…"   2 days ago     Up About a minute                                                                                                                                              frpc
e9f405df3cfe   binaryify/netease_cloud_music_api                          "docker-entrypoint.s…"   4 days ago     Up About a minute   0.0.0.0:3000->3000/tcp, :::3000->3000/tcp                                                                                                  netease_cloud_music_api
de384f1f541f   hitokoto/api                                               "docker-entrypoint.s…"   4 days ago     Up About a minute   0.0.0.0:8000->8000/tcp, :::8000->8000/tcp                                                                                                  hitokoto_hitokoto_api_1
86e5cf8d6306   redis:6.0.8                                                "docker-entrypoint.s…"   4 days ago     Up About a minute   6379/tcp                                                                                                                                   hitokoto_hitokoto_db_1
6726bc097856   minio/minio                                                "/usr/bin/docker-ent…"   4 days ago     Up About a minute   0.0.0.0:9000-9001->9000-9001/tcp, :::9000-9001->9000-9001/tcp                                                                              minio
d2c98432baa2   rabbitmq                                                   "docker-entrypoint.s…"   4 days ago     Up About a minute   4369/tcp, 0.0.0.0:5672->5672/tcp, :::5672->5672/tcp, 5671/tcp, 15691-15692/tcp, 25672/tcp, 0.0.0.0:15672->15672/tcp, :::15672->15672/tcp   rabbit
61da49911e67   redis:7.2.3                                                "docker-entrypoint.s…"   4 days ago     Up About a minute   0.0.0.0:6379->6379/tcp, :::6379->6379/tcp                                                                                                  redis
ec44863c383e   mysql:8.0                                                  "docker-entrypoint.s…"   5 days ago     Up About a minute   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp                                                                                       mysql
```

完成这些步骤后，脚本将在系统启动时自动运行，并尝试启动所有未运行的 Docker 容器。

- 有关 /etc/rc.d/rc.local 执行时机如下：

![image-20220625120119559](https://onedayxyy.cn/images/image-20220625120119559.png)

## 方法二：使用 crontab

:::tip

这种方法，在任何 Linux 系统上都可以使用。

:::

- 环境：

CentOS Linux 7.9 (2009) (Core)

crontab 是 Linux 下的计划任务，当时间达到我们设定的时间时，可以自动触发某些脚本的运行。

我们可以自己设置计划任务时间，然后编写对应的脚本。但是，有个特殊的任务，叫作 @reboot ，我们其实也可以直接从它的字面意义看出来，这个任务就是在系统重启之后自动运行某个脚本。

### 演示

下面是如何使用 `crontab` 来创建一个任务，以便定期启动所有未运行的 Docker 容器。

1. 编写脚本

创建一个脚本文件，例如 `/blog/start_stopped_docker_containers.sh`

```bash
vim /blog/start_stopped_docker_containers.sh
```

并添加启动未运行的 Docker 容器的内容：

```bash
#!/bin/bash

# 定义一个函数来启动所有未运行的Docker容器
start_stopped_containers() {
    # 查找所有未运行的容器
    stopped_containers=$(docker ps -a -f "status=exited" -q)
    
    # 如果有未运行的容器，启动它们
    if [ ! -z "$stopped_containers" ]; then
        echo "启动所有未运行的Docker容器..."
        docker start $stopped_containers
    else
        echo "没有未运行的Docker容器需要启动。"
    fi
}

# 调用函数
start_stopped_containers
```

- 保存退出后，确保文件有执行权限

```bash
chmod +x /blog/start_stopped_docker_containers.sh
```

2. 编辑 crontab

使用 `crontab -e` 打开 `crontab` 编辑器，然后添加以下行：

```bash
crontab -e
```

在打开的编辑器中，添加以下行在每次系统启动时，执行 `/blog/start_stopped_docker_containers.sh` 脚本

```bash
@reboot /blog/start_stopped_docker_containers.sh
```

- 然后，直接重启即可。运行的效果跟上面类似。

```bash
reboot
```

## 方法三：使用-systemd-服务（推荐）

- 环境：

CentOS Linux 7.9 (2009) (Core)

:::warning

- **次方法仅适用于 systemd 系统**。如何区分是不是 systemd 系统？很简单，只需运行 `ps aux|more` 命令，查看 `pid` 为 `1 `的进程是不是 `systemd` 

:::

`ps aux|more` 命令输出：

```bash
[root@localhost ~]# ps aux|more
USER        PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root          1  0.3  0.1 194092  7156 ?        Ss   21:54   0:04 /usr/lib/systemd/systemd --switched-root --system --deserialize 22
root          2  0.0  0.0      0     0 ?        S    21:54   0:00 [kthreadd]
root          4  0.0  0.0      0     0 ?        S<   21:54   0:00 [kworker/0:0H]
root          6  0.0  0.0      0     0 ?        S    21:54   0:00 [ksoftirqd/0]
root          7  0.0  0.0      0     0 ?        S    21:54   0:00 [migration/0]
root          8  0.0  0.0      0     0 ?        S    21:54   0:00 [rcu_bh]
root          9  0.7  0.0      0     0 ?        S    21:54   0:12 [rcu_sched]
```

### 演示

使用 `systemd` 创建一个服务来在系统启动时运行脚本是一种更现代和灵活的方法。以下是如何创建一个 `systemd` 服务来启动未运行的 Docker 容器的步骤。

1. **创建脚本**

创建一个 `systemd` 启动服务单元文件

```bash
vim /blog/start_stopped_docker_containers.sh
```

例如，你的脚本路径为 `/blog/start_stopped_docker_containers.sh`   添加以下内容：

```bash
#!/bin/bash

# 定义一个函数来启动所有未运行的Docker容器
start_stopped_containers() {
    # 查找所有未运行的容器
    stopped_containers=$(docker ps -a -f "status=exited" -q)
    
    # 如果有未运行的容器，启动它们
    if [ ! -z "$stopped_containers" ]; then
        echo "启动所有未运行的Docker容器..."
        docker start $stopped_containers
    else
        echo "没有未运行的Docker容器需要启动。"
    fi
}

# 调用函数
start_stopped_containers
```

保存退出后，确保脚本具有执行权限：

```bash
sudo chmod +x /blog/start_stopped_docker_containers.sh
```

2. **创建 `systemd` 服务文件**

:::warning

请注意，这时后缀是 .service ，而不是 .sh 

:::

```bash
vim /etc/systemd/system/start-docker-containers.service
```

创建一个 `systemd` 服务单元文件，例如 `/etc/systemd/system/start-docker-containers.service`，并添加以下内容：

```bash
[Unit]
Description=Start stopped Docker containers
After=network.target docker.service

[Service]
ExecStart=/blog/start_stopped_docker_containers.sh
Type=oneshot
RemainAfterExit=true

[Install]
WantedBy=multi-user.target
```

解释：

- `[Unit]` 部分定义了服务的描述和依赖。`After=network.target docker.service` 表示该服务在网络和 Docker 服务启动后运行。
- `[Service]` 部分定义了服务的执行方式。`ExecStart` 指定了要运行的脚本。`Type=oneshot` 表示脚本运行一次即完成。`RemainAfterExit=true` 确保服务在脚本执行后仍然处于活动状态。
- `[Install]` 部分定义了服务的安装目标，`WantedBy=multi-user.target` 表示服务在多用户运行级别启动时启动。

3. **重新加载 `systemd` 配置**

在创建或修改服务文件后，重新加载 `systemd` 配置以使更改生效：

```bash
sudo systemctl daemon-reload
```

4. **启用并启动服务**

启用服务，使其在每次系统启动时自动运行：

```bash
sudo systemctl enable start-docker-containers.service
```

立即启动服务以测试它是否正常工作：

```bash
sudo systemctl start start-docker-containers.service
```

5. **检查服务状态**

检查服务状态以确保它正在运行：

```
sudo systemctl status start-docker-containers.service
```

可以看到服务的当前状态以及最近的日志输出：

```
[root@localhost ~]# sudo systemctl status start-docker-containers.service
● start-docker-containers.service - Start stopped Docker containers
   Loaded: loaded (/etc/systemd/system/start-docker-containers.service; enabled; vendor preset: disabled)
   Active: active (exited) since 五 2024-09-06 23:35:42 PDT; 7s ago
  Process: 130731 ExecStart=/bin/bash /blog/start_stopped_docker_containers.sh (code=exited, status=0/SUCCESS)
 Main PID: 130731 (code=exited, status=0/SUCCESS)

9月 06 23:35:42 localhost.localdomain systemd[1]: Starting Start stopped Docker containers...
9月 06 23:35:42 localhost.localdomain bash[130731]: 没有未运行的Docker容器需要启动。
9月 06 23:35:42 localhost.localdomain systemd[1]: Started Start stopped Docker containers.
```

通过这些步骤，你将成功创建一个 `systemd` 服务，该服务在每次系统启动时运行脚本，以启动所有未运行的 Docker 容器。

## 方法四：`/etc/rc.d/init.d目录`

### 演示

1. **创建启动脚本**

   在 `/etc/rc.d/init.d` 目录下创建一个新的启动脚本，例如 `start-docker-containers`：

   ```bash
   vim /etc/rc.d/init.d/start-docker-containers.sh
   ```

2. **编写脚本内容**

   在脚本中添加以下内容：

   ```bash
   #!/bin/bash
   # chkconfig: 2345 99 01
   # description: Start stopped Docker containers
   
   ### BEGIN INIT INFO
   # Provides:          start-docker-containers
   # Required-Start:    $network $local_fs $remote_fs $docker
   # Required-Stop:     $network $local_fs $remote_fs
   # Default-Start:     3 4 5
   # Default-Stop:      0 1 2 6
   # Short-Description: Start stopped Docker containers at boot time
   # Description:       Starts all stopped Docker containers.
   ### END INIT INFO
   
   case "$1" in
       start)
           echo "Starting stopped Docker containers..."
        	#确保路径有这个文件   
           /usr/local/bin/start_stopped_docker_containers.sh
           ;;
       stop)
           echo "Stopping Docker containers (not implemented)..."
           ;;
       restart)
           echo "Restarting Docker containers (not implemented)..."
           ;;
       status)
           echo "Status of Docker containers (not implemented)..."
           ;;
       *)
           echo "Usage: $0 {start|stop|restart|status}"
           exit 1
           ;;
   esac
   
   exit 0
   ```

   解释：

   - `chkconfig` 行用于设置运行级别。
   - `### BEGIN INIT INFO` 和 `### END INIT INFO` 块提供了有关脚本的信息。
   - `case "$1"` 部分处理 `start`, `stop`, `restart`, 和 `status` 参数。

3. **赋予脚本可执行权限**

   使脚本可执行：

   ```bash
   sudo chmod +x /etc/rc.d/init.d/start-docker-containers.sh
   ```

4. **设置脚本开机自启**

   使用 `chkconfig` 工具来确保脚本在系统启动时运行（适用于基于 SysVinit 的系统）：

   ```bash
   sudo chkconfig --add start-docker-containers.sh
   ```

   然后，确保脚本在所需的运行级别中启动（通常是 3, 4, 5）：

   ```bash
   sudo chkconfig start-docker-containers.sh on
   ```

5. 在`/usr/local/bin`目录下创建`start_stopped_docker_containers.sh`脚本

   ```
   vim /usr/local/bin/start_stopped_docker_containers.sh
   ```

   

6. **编写脚本内容**

   在脚本中添加以下内容：

   ```bash
   #!/bin/bash
   
   # 定义日志文件
   LOGFILE="/var/log/start_docker_containers.log"
   
   # 写入开始时间
   echo "Starting stopped Docker containers at $(date)" >> $LOGFILE
   
   # 获取所有停止的 Docker 容器
   stopped_containers=$(docker ps -a -q -f "status=exited")
   
   # 检查是否有停止的容器
   if [ -z "$stopped_containers" ]; then
     echo "No stopped Docker containers to start." >> $LOGFILE
   else
     # 启动每一个停止的容器
     for container in $stopped_containers; do
       echo "Starting container $container" >> $LOGFILE
       docker start $container >> $LOGFILE 2>&1
     done
   fi
   
   # 写入结束时间
   echo "Finished starting Docker containers at $(date)" >> $LOGFILE
   ```

7. **赋予脚本可执行权限**

   使脚本可执行：

   ```bash
   sudo chmod +x /usr/local/bin/start_stopped_docker_containers.sh
   ```

8. **手动测试脚本**

   你可以手动启动脚本来测试其是否工作正常：

   ```bash
   sudo /etc/rc.d/init.d/start-docker-containers.sh start
   
   输出：
   [root@localhost ~]# sudo /etc/rc.d/init.d/start-docker-containers.sh start
   Starting stopped Docker containers...
   ```

解释

- **脚本内容**：脚本用于在启动时执行 Docker 容器启动操作。
- **`chkconfig` 工具**：用于管理系统服务的开机启动。
- **SysVinit**：传统的初始化系统，通常在老旧系统中使用。

如果你的系统使用 `systemd`，建议优先使用 `systemd` 服务单元文件，因为 `systemd` 提供了更强大的服务管理功能。如果你的系统确实使用 SysVinit，这些步骤应该可以帮助你设置服务。
