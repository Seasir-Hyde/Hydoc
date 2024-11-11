---
# 文档的URL路径标识符
slug: rsync-windows-to-linux

# 文档标题，显示在页面顶部
title: rsync实现 windows与linux数据备份同步

# 发布日期，用于时间排序
date: 2024-11-04

# 作者名称
# authors: Hyde

# 最后更新日期，用于时间排序
last_update:
  date: 2024/11/04

# 文章标签，帮助分类
tags: [rsync, windows, linux]

#关键词，用于SEO优化
keywords: [rsync, windows, linux]

# 文档的简要描述
description: rsync实现 windows与linux数据备份同步

# 文章的封面图片
image: https://pic.netbian.com/uploads/allimg/241103/175310-17306275903a59.jpg

#置顶级别，决定文章在列表中的位置
sticky: 5
---

有些人可能对图床这个没什么概念，所谓图床，英文叫法应该叫：ImageHost，也就是储存图片的中枢，可以理解为：用户存储图片后，系统提供该图片的直接链接，用来通过网络访问显示该图片。

<!-- truncate -->

# rsync实现 windows与linux数据备份同步

## 前言

最近在搭建`Nginx搭建私有图床`需要对图片数据进行备份同步，因为图床数据都是储存在服务器的，一旦服务器不在续费或者更换其他服务器，需要把Linux某个目录数据同步到Windows的某个目录下



## 环境

- Linux服务器：centos 7 3.10.0-1160.119.1.el7.x86_64
- rsync服务端： version 3.1.2
- rsync客户端： version 3.2.7
- Windows11：23H2



## 版权声明

:::warning

本教程参考了[One大佬](https://wiki.onedayxyy.cn/docs/TuChuang-ngnix)作者的教程，并结合自身实际部署过程中积累的经验编写而成。原始教程链接为[winodows到linux)](https://wiki.onedayxyy.cn/docs/rsync-windows-to-linux)，感谢原作者提供的宝贵参考资料。

本教程仅供学习和交流使用，任何人不得将本教程的内容用于商业用途。如需引用或转载，请务必注明原作者及本文出处。如侵权之处，请联系博主进行删除，谢谢~

部分内容引用[One大佬](https://wiki.onedayxyy.cn/blog)的教程，感谢大佬的贡献。

:::



## 服务器端安装

```bash
# 检查是否安装了 rsync
rpm -qa|grep rsync

# 如果没有安装的话，进行安装
yum install rsync

# 将 rsync 设置成开启自启，并启动
systemctl enable rsyncd  #让服务在系统启动时自动运行
systemctl start rsyncd  #立即启动服务，适合初次配置或手动运行

systemctl restart rsyncd  #停止并重新启动服务，用于应用新的配置或排除故障
```



## 服务器端配置rsync

- 创建`rsyncd.conf`文件

  ```bash
  vim /etc/rsyncd.conf
  ```

- 填写`rsyncd.conf`文件配置

  ```bash
  # 进行通信的端口，如果 firewall 打开的话，需要将对应的端口添加进去
  port=8730
  # 日志文件
  log file=/var/log/rsync.log
  # rsync 的进程 id
  pid file=/var/run/rsync.pid
  # 要同步的模块，这里一般以项目名命名
  [images]
  # 同步的目标文件夹
  path=/images
  # rsync daemon 在传输前是否切换到指定的 path 目录下，并将其监禁在内，用于增加传输的安全性
  use chroot=no
  # 指定最大的连接数
  max connections=4
  # yes 表示只读本地文件无法同步到服务器
  read only=no
  # 客户端请求显示模块列表时，该模块是否显示出来
  list=true
  # 服务运行时的用户
  uid=root
  # 服务运行时的用户组
  gid=root
  # 进行验证时的用户名，必须是系统存在的用户
  auth users = root 
  # 连接用户时的密码
  secrets file=/etc/rsyncd.passwd
  # 允许的 ip
  hosts allow=*
  ```

  注意！

  ```bash
  # 同步的目标文件夹
  path=/images
  
  # 连接用户时的密码
  secrets file=/etc/rsyncd.passwd
  ```

- 创建相应目录

  ```bash
  # 1、创建需同步目标的文件夹
  mkdir /images
  
  # 2、创建密码
  # 创建rsyncd.passwd文件
  vim /etc/rsyncd.passwd
  # 写入密码
  echo "root:123456" > /etc/rsyncd.passwd #这里写入你自己云服务器的密码就行！！！
  
  #更改文件权限
  chmod 600 /etc/rsyncd.passwd
  ```



## windows上配置rsync client端

- [cwRsync client官网下载](https://www.itefix.net/cwrsync/client/downloads)；如果官方不能下载可以下载我提供的：https://www.123684.com/s/nsg0Vv-WyvJv?提取码:qDmy

![image-20241104174321763](https://seasir.top/images/image-20241104174321763.png)

- 下载完成后解压文件，然后放在盘符目录，我这里是放在`D:\cwrsync_6.2.12_x64_free`

- 将`D:\cwrsync_6.2.12_x64_free\bin`目录添加到自己PC端的环境变量里面

  ![image-20241104175314721](https://seasir.top/images/image-20241104175314721.png)

- 在winodws`D盘下创建` `password.txt`创建密码文件，用于存放的是你服务器root密码。例如：123456



## winodws同步命令

- 打开cmd控制台，执行如下命令：

```bash
rsync.exe -avPzruh --delete --port 8730 --password-file=/cygdrive/D/password.txt root@服务器IP::cmi/ /cygdrive/D/Nginx_Images
```

```bash
#选项参数解读：

-a：归档模式，用于保持文件的属性、权限、时间戳等。
-v：显示详细输出，让您了解文件同步的进度和操作。
-p：显示文件传输的进度条和实时速度。
-z：在传输过程中压缩数据，减少网络带宽的使用。
-r：递归复制目录及其内容。
-u：只复制源中更新或新增的文件到目标目录。    **注意：这个很有用的！！！
-h：可读性大小。
--delete：删除目标目录中不在源中存在的文件和目录。

# cmi_password.txt 密码文件 写入 Linux 端配置的密码即可
# cmi 指代模块，我们这边正好按照
```

## 配置winodws定时任务

- 新建`D:\cwrsync_6.2.12_x64_free\Rsync synchronization.bat`文件，填入以下内容

  ```bash
  rsync.exe -avPzruh --delete --port 8730 --password-file=/cygdrive/D/password.txt root@服务器IP::cmi/ /cygdrive/D/Nginx_Images
  ```

  将该文件另存为rysnc.bat文件，编码为ANSI。注意！如果编码为utf8，文本中的中文会出现乱码导致执行出错。

  ![img](https://onedayxyy.cn/images/image-20231130075224.png)

- 开启定时任务

  批处理完成了，怎么来实现周期性的运行该脚本呢？windows自带了非常强大的定时任务功能。进入计算机管理（此电脑右键“管理”），在系统工具->任务计划程序->任务计划程序库中能看到你电脑所有的定时任务，右键可以创建基本任务。 （或者直接在cmd输入`compmgmt.msc`）

  ![img](https://onedayxyy.cn/images/image-20231130075329.png)

  按图中输入名称及描述，点击下一步设置触发器（任务触发时间）

  ![img](https://onedayxyy.cn/images/image-20231130075348.png)

  点击下一步设置任务执行操作，这里选择启动程序

  ![img](https://onedayxyy.cn/images/image-20231130075406.png)

  ![img](https://onedayxyy.cn/images/image-20231130075423.png)

  选择刚才制作的bat脚本，点击下一步

  ![img](https://onedayxyy.cn/images/image-20231130075451.png)

  点击完成创建任务

  ![img](https://onedayxyy.cn/images/image-20231130075508.png)

  选择刚创建的任务，右键点击属性打开属性对话框，点击触发器并双击已设置的触发器设置任务重复执行。`自己的设置重复任务间隔`取消勾选了

  ![img](https://onedayxyy.cn/images/image-20231130075527.png)

  点击确定完成定时任务设置，右击任务启动任务。