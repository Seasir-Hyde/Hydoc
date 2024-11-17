---
# 文档的URL路径标识符
slug: docker-linux-install

# 文档标题，显示在页面顶部
title: linux镜像源错误

# 发布日期，用于时间排序
date: 2024-09-02

# 作者名称
# authors: Hyde

# 最后更新日期，用于时间排序
last_update:
  date: 2024/09/01

# 文章标签，帮助分类
tags: [随笔, yum, install, image]

#关键词，用于SEO优化
keywords: [随笔, yum, install, image]

# 文档的简要描述
description: 使用 yum 安装或更新软件包时，出现无法解析 mirrorlist.centos.org 主机地址的错误

# 文章的封面图片
image: https://static.salesmartly.com/prod/project/fj3mnx/material/image/20241117/1731835068716/234050-171907085047ed.jpg

#置顶级别，决定文章在列表中的位置
sticky: 4
---

初始化安装linux系统，安装在使用 yum 安装或更新软件包时遇到了镜像源的问题。错误信息显示 yum 无法解析 mirrorlist.centos.org 的主机地址，导致无法获取镜像列表。这通常是由于网络问题、DNS配置错误或者镜像源本身的问题引起的。以下是一些解决此问题的方法：

<!-- truncate -->

## 错误信息
```bash
[root@localhost ~]# sudo yum install -y yum-utils
已加载插件：fastestmirror, langpacks
Loading mirror speeds from cached hostfile
Could not retrieve mirrorlist http://mirrorlist.centos.org/?release=7&arch=x86_64&repo=os&infra=stock error was
14: curl#6 - "Could not resolve host: mirrorlist.centos.org; 未知的错误"


 One of the configured repositories failed (未知),
 and yum doesn't have enough cached data to continue. At this point the only
 safe thing yum can do is fail. There are a few ways to work "fix" this:

     1. Contact the upstream for the repository and get them to fix the problem.

     2. Reconfigure the baseurl/etc. for the repository, to point to a working
        upstream. This is most often useful if you are using a newer
        distribution release than is supported by the repository (and the
        packages for the previous distribution release still work).

     3. Run the command with the repository temporarily disabled
            yum --disablerepo=<repoid> ...

     4. Disable the repository permanently, so yum won't use it by default. Yum
        will then just ignore the repository until you permanently enable it
        again or use --enablerepo for temporary usage:

            yum-config-manager --disable <repoid>
        or
            subscription-manager repos --disable=<repoid>

     5. Configure the failing repository to be skipped, if it is unavailable.
        Note that yum will try to contact the repo. when it runs most commands,
        so will have to try and fail each time (and thus. yum will be be much
        slower). If it is a very temporary problem though, this is often a nice
        compromise:

            yum-config-manager --save --setopt=<repoid>.skip_if_unavailable=true

Cannot find a valid baseurl for repo: base/7/x86_64
```

## 解决方法

在/etc/yum.repos.d/CentOS-Base.repo文件中添加以下代码：
```bash
# CentOS-Base.repo
#
# The mirror system uses the connecting IP address of the client and the
# update status of each mirror to pick mirrors that are updated to and
# geographically close to the client.  You should use this for CentOS updates
# unless you are manually picking other mirrors.
#
# If the mirrorlist= does not work for you, as a fall back you can try the 
# remarked out baseurl= line instead.
#
#
 
[base]
name=CentOS-$releasever - Base - mirrors.aliyun.com
failovermethod=priority
baseurl=http://mirrors.aliyun.com/centos/$releasever/os/$basearch/
        http://mirrors.aliyuncs.com/centos/$releasever/os/$basearch/
        http://mirrors.cloud.aliyuncs.com/centos/$releasever/os/$basearch/
gpgcheck=1
gpgkey=http://mirrors.aliyun.com/centos/RPM-GPG-KEY-CentOS-7
 
#released updates 
[updates]
name=CentOS-$releasever - Updates - mirrors.aliyun.com
failovermethod=priority
baseurl=http://mirrors.aliyun.com/centos/$releasever/updates/$basearch/
        http://mirrors.aliyuncs.com/centos/$releasever/updates/$basearch/
        http://mirrors.cloud.aliyuncs.com/centos/$releasever/updates/$basearch/
gpgcheck=1
gpgkey=http://mirrors.aliyun.com/centos/RPM-GPG-KEY-CentOS-7
 
#additional packages that may be useful
[extras]
name=CentOS-$releasever - Extras - mirrors.aliyun.com
failovermethod=priority
baseurl=http://mirrors.aliyun.com/centos/$releasever/extras/$basearch/
        http://mirrors.aliyuncs.com/centos/$releasever/extras/$basearch/
        http://mirrors.cloud.aliyuncs.com/centos/$releasever/extras/$basearch/
gpgcheck=1
gpgkey=http://mirrors.aliyun.com/centos/RPM-GPG-KEY-CentOS-7
 
#additional packages that extend functionality of existing packages
[centosplus]
name=CentOS-$releasever - Plus - mirrors.aliyun.com
failovermethod=priority
baseurl=http://mirrors.aliyun.com/centos/$releasever/centosplus/$basearch/
        http://mirrors.aliyuncs.com/centos/$releasever/centosplus/$basearch/
        http://mirrors.cloud.aliyuncs.com/centos/$releasever/centosplus/$basearch/
gpgcheck=1
enabled=0
gpgkey=http://mirrors.aliyun.com/centos/RPM-GPG-KEY-CentOS-7
 
#contrib - packages by Centos Users
[contrib]
name=CentOS-$releasever - Contrib - mirrors.aliyun.com
failovermethod=priority
baseurl=http://mirrors.aliyun.com/centos/$releasever/contrib/$basearch/
        http://mirrors.aliyuncs.com/centos/$releasever/contrib/$basearch/
        http://mirrors.cloud.aliyuncs.com/centos/$releasever/contrib/$basearch/
gpgcheck=1
enabled=0
gpgkey=http://mirrors.aliyun.com/centos/RPM-GPG-KEY-CentOS-7
```

## 测试验证
```bash
sudo yum install -y yum-utils
```

## 成功输出
```bash
[root@localhost ~]# sudo yum install -y yum-utils
已加载插件：fastestmirror, langpacks
Loading mirror speeds from cached hostfile
 * base: mirrors.aliyun.com
 * extras: mirrors.aliyun.com
 * updates: mirrors.aliyun.com
base                                                                                                                                | 3.6 kB  00:00:00     
docker-ce-stable                                                                                                                    | 3.5 kB  00:00:00     
extras                                                                                                                              | 2.9 kB  00:00:00     
updates                                                                                                                             | 2.9 kB  00:00:00     
(1/6): docker-ce-stable/7/x86_64/updateinfo                                                                                         |   55 B  00:00:00     
(2/6): base/7/x86_64/group_gz                                                                                                       | 153 kB  00:00:01     
(3/6): docker-ce-stable/7/x86_64/primary_db                                                                                         | 152 kB  00:00:01     
(4/6): extras/7/x86_64/primary_db                                                                                                   | 253 kB  00:00:01     
base/7/x86_64/primary_db       FAILED                                                                                    ] 151 kB/s | 3.5 MB  00:03:26 ETA 
http://mirrors.aliyuncs.com/centos/7/os/x86_64/repodata/6d0c3a488c282fe537794b5946b01e28c7f44db79097bb06826e1c0c88bad5ef-primary.sqlite.bz2: [Errno 14] curl#7 - "Failed connect to mirrors.aliyuncs.com:80; Connection refused"
正在尝试其它镜像。
(5/6): base/7/x86_64/primary_db                                                                                                     | 6.1 MB  00:00:38     
(6/6): updates/7/x86_64/primary_db                                                                                                  |  27 MB  00:03:01     
软件包 yum-utils-1.1.31-54.el7_8.noarch 已安装并且是最新版本
无须任何处理
```
