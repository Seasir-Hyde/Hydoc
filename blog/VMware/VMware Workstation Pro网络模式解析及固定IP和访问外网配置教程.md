---
# 文档的URL路径标识符
slug: VM-Network-IP

# 文档标题，显示在页面顶部
title: VMware Workstation Pro网络模式解析及固定IP和访问外网配置教程

# 发布日期，用于时间排序
date: 2024-11-03

# 作者名称
# authors: Hyde

# 最后更新日期，用于时间排序
last_update:
  date: 2024/11/03

# 文章标签，帮助分类
tags: [VM, Network, IP]

#关键词，用于SEO优化
keywords: [VM, Network, IP]

# 文档的简要描述
description: 本教程将详细介绍如何在 VMware Workstation Pro 中配置网络模式、设置固定 IP 地址以及访问外网的步骤。您将学习不同网络模式的工作原理，包括桥接模式、NAT 模式和仅主机模式，以及如何选择适合您需求的配置。此外，我们还将指导您如何为虚拟机分配固定 IP 地址，以确保网络稳定性和可访问性，最后介绍如何通过 NAT 访问外网。

# 文章的封面图片
image: https://onedayxyy.cn/images/image-20240106205940.png

#置顶级别，决定文章在列表中的位置
sticky: 6
---

本教程将详细介绍如何在 VMware Workstation Pro 中配置网络模式、设置固定 IP 地址以及访问外网的步骤。您将学习不同网络模式的工作原理，包括桥接模式、NAT 模式和仅主机模式，以及如何选择适合您需求的配置。此外，我们还将指导您如何为虚拟机分配固定 IP 地址，以确保网络稳定性和可访问性，最后介绍如何通过 NAT 访问外网。

<!-- truncate -->

# VMware Workstation Pro网络模式解析及固定IP和访问外网配置教程

## 原文

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [www.moguit.cn](https://www.moguit.cn/info/126)来自蘑菇博客分享



## 前言

最近在VMware Workstation Pro虚拟机部署Ruyu-bolg,因为之前不太清楚 VMWare 如何设置固定 IP 地址，所以每次 VMWare 中都是自动获取 IP 的，这样就造成了每次只要本地机器重启，虚拟机中的网络又变化了,导致无法通过远程工具连接到虚拟机，同时虚拟机内网部署的ruyu-blog博客网站也无法访问外网，导致 ruyu-blog博客服务无法正常的启动

这里需要特别感谢群里的小伙伴 **@你钉钉响了** **@清欢渡** 手把手的教学，帮助我学习了一波 VMware 网络知识~，有时间要好好补一补 Linux 网络知识 ...，言归正传，下面开始给 VMware 设置固定 IP 了



## 版权声明

:::warning

本教程参考了[One大佬](https://wiki.onedayxyy.cn/docs/TuChuang-ngnix)作者的教程，并结合自身实际部署过程中积累的经验编写而成。原始教程链接为[vmwareworkstation3种网络区分及如何让虚机固定ip且能访问外网](https://wiki.onedayxyy.cn/blog/vmwareworkstation/)，感谢原作者提供的宝贵参考资料。

本教程仅供学习和交流使用，任何人不得将本教程的内容用于商业用途。如需引用或转载，请务必注明原作者及本文出处。如侵权之处，请联系博主进行删除，谢谢~

部分内容引用[One大佬](https://wiki.onedayxyy.cn/blog)的教程，感谢大佬的贡献。

:::



## VMware 网络模式

我们安装 VMware Workstations 后，进行虚拟机的网络配置时，一般有四种网络连接方式

![img](https://onedayxyy.cn/images/3d9a7f271221407682fc88af961a8d0d-1721115342639-17)

在我们安装好 VMware Workstations 后，我们可以打开网络中心会发现生成 两个虚拟网卡，我们打开网络和共享中心能够看到下面的两个

![img](https://onedayxyy.cn/images/140f074291c243708ab7ddfaebb8ee57.png)

关于这两个网卡对应的规则，我们可以到 VMware 的虚拟网络编辑器查看。可以发现 VMnet1 网卡，对应的是 仅主机模式，VMnet8 对应的是 NAT 模式

![img](https://onedayxyy.cn/images/298d6e62f1a345de839144c30cfc5be9.png)

### 桥接模式 (Bridged)

桥接模式，可以这样进行理解

> 它是通过主机网卡，假设了一条桥，直接连入到网络中了，因此，它使得虚拟机能被分配到一个网络中独立的 IP，所有网络功能完全和在网络中的真实机器一样。
>
> 桥接模式下的虚拟机，我们把它认为是真实计算机就行了~

**虚拟机和主机**：可以相互访问，因为虚拟机在真实网络段中有独立 IP，主机与虚拟机处于同一网络段中，彼此可以通过各自 IP 相互访问

**虚拟机与其它主机**：可以相互访问，同样因为虚拟机在真实网络端中有独立 IP，虚拟机与所有网络其它主机处于同一个网络段中，彼此可以通过各自 IP 相互访问

**虚拟机与虚拟机：** 同样可以相互转换，原因同上

桥接模式下，虚拟机就像一台真正的计算机一样，直接连接到实际网络，与宿主机没有任何联系

![img](https://onedayxyy.cn/images/6ac8f447d98a4141a27b1221573405b1.png)

### NAT 模式

😂（之前这一块儿理解的不透彻哇）

**NAT**：Network Address Translation，网络地址转换

**NAT 模式是最简单的实现虚拟机上网的方式**

> Guest 访问网络的所有数据都是主机提供的，Guest 并不真实存在与网络中，主机与网络中的任何机器都不能查看和访问到 Guest 的存在
>
> Guest 可以访问主机能访问的所有网络，但是对于主机以及主机网络的其它机器，Guest 又是不可见的，甚至主机也访问不到 Guest

**虚拟机与主机**：只能单向访问，虚拟机可以通过网络访问到主机，主机无法通过网络访问到虚拟机

**虚拟机与其它主机**：只能单向访问，虚拟机可以访问到网络中其它主机，其它主机不能通过网络访问到虚拟机

**虚拟机与虚拟机**：相互不能访问，虚拟机与虚拟机各自完全独立，相互间无法通过网络访问彼此

NAT 模式下，虚拟机网络连接到宿主机的 VMnet8 上，此时系统的 VMWare NAT Service 服务器就充当了路由器的作用，负责将虚拟机发送到 VMnet8 的包 进行地址转换之后，发到实际的网络上，再将实际网络上返回的包进行地址转换后通过 VMnet8 发送到虚拟机。VMware DHCP Service 负责为虚拟机提供 DHCP 服务。

也就是说 NAT 模式下，虚拟机网卡连接到宿主机的 VMnet8 的网卡，当 VMnet8 收到虚拟机发送的数据包时，会吧数据包转发给物理机的网卡。相**当于物理网卡不能直接接触虚拟机的数据包**，而是接触 VMnet8 进行处理，实际上 VMnet8 是 NAT 模式，自带 DHCP 功能，能够给虚拟机分配 IP 地址。

![img](https://onedayxyy.cn/images/b623d8e7be014f1cad92bbd9dae534ca.png)

### 主机模式 (Host-only Adapter)

主机模式：**这是一种比较复杂的模式**，需要有比较扎实的网络基础知识才能玩转。可以说前面几种模式所实现的功能，在这个模式下，通过虚拟机及网卡的设置都可以被实现。

我们可以理解为 Guest 在主机中模拟出一张专供虚拟机使用的网卡，所有的虚拟机都是连接到该网卡上的，我们可以通过设置这张网卡来实现上网以及其他功能



## 为什么使用 NAT 模式

桥接模式的配置很简单，但是如果网络环境 ip 资源很缺少，或者对 ip 管理比较严格的时候，那么桥接模式就不适用了，因为我们通过上面的理解可以知道，桥接模式就是创建一个和宿主机同一级别的网络环境，它是在网络地址中真实存在的 ip 地址。

如果我们又想让虚拟机上网，又不想占用真实的 IP 地址，那么就需要使用 NAT 模式是最好的选择，NAT 模式借助虚拟 NAT 设备和虚拟 DHCP 服务器，使得虚拟机可以联网。其网络结构如下图所示：

![img](https://onedayxyy.cn/images/0fa661ca1bc246a9af6729353ccd5898.png)

在 NAT 模式下，主机网卡直接与虚拟 NAT 设备相连，然后虚拟 NAT 设备与虚拟 DHCP 服务器一起连接在虚拟机交换机 VMnet8 上，这样就实现了虚拟机联网。



## NAT配置教程

### 设置宿主机 VMnet8 网卡为自动获取ip方式

因为 NAT 模式需要借助宿主机的 Vmnet8 网卡进行虚拟机与主机之间的通信的，因此我们需要首先找到宿主机上的 VMnet8 网卡

![img](https://onedayxyy.cn/images/4d1df81841f84fc3a1ea77d2d7f0b260.png)

然后我们右键属性，找到 IPv4 协议，然后选择 **自动获取 IP 地址**。

![image-20240727111421253](https://onedayxyy.cn/images/image-20240727111421253.png)

### 编辑虚拟网络编辑器

在设置好 VMnet8 网卡后，我们到 VMware 中，点击 编辑 -> 虚拟网络编辑器，然后选择 还原默认值

![img](https://onedayxyy.cn/images/65db869bfd9845309217f1831b2f0a93.png)

在还原后，我们在上面能够看到有三种模式了，这里我们主要是 操作 NAT 模式

![img](https://onedayxyy.cn/images/85e15733b8914c2ca687bed204e8083e.png)

- 首先选择 NAT 模式
- 然后勾选 2 中的两个选项
- 第三步就是打开 NAT 设置

![img](https://onedayxyy.cn/images/78d70b10a6d04f31a57b14e69cf2342d.png)

然后设置网关 IP 为： 192.168.13.254 【这里需要记住这个值，以后会用到】，然后保存

- 第四步点击 DHCP 设置

![img](https://onedayxyy.cn/images/4473ba149d834bc6b6da13ad7fd16451.png)

这里能看到我们的起始 ip 地址 和 结束 ip 地址，也就是后面我们在设置固定 ip 地址时，必须在这个范围内

- 设置完成后，回到主页面，点击应用



### 设置 CentOS 虚机网络连接方式为NAT

我们到我们的创建的 CentOS 系统，右键选择 设置

![img](https://onedayxyy.cn/images/3d315e7b5be34c7aa444bfaa4d8979ca.png)

然后找到网络适配器，选择 NAT 模式，这样我们的系统就通过 NAT 模式连接了

![img](https://onedayxyy.cn/images/acacdc88183f4fe0af926774831b2b08.png)



### 设置虚机网络

然后我们就可以启动我们的 CentOS 系统进行网络配置了

```bash
vim /etc/sysconfig/network-scripts/ifcfg-ens33
```

然后在文件中，加入如下内容

```bash
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
UUID=1f6d2414-12b7-40ef-8fb1-d2e6db9c739b
DEVICE=ens33
ONBOOT=yes
IPADDR=192.168.13.130
NETMASK=255.255.255.0
GATEWAY=192.168.13.254
DNS1=223.5.5.5
DNS2=114.114.114.114
```

这里需要注意的几个点就是下面几个参数

```bash
BOOTPROTO=static
ONBOOT=yes

IPADDR=192.168.13.130 

NETMASK=255.255.255.0

GATEWAY=192.168.13.254
DNS1=223.5.5.5
DNS2=114.114.114.114
```

配置完成后，我们就重启网络即可

```bash
service network restart
```



### 测试验证

下面我们通过 ping 命令，查看是否能够正常访问网络

```bash
ping www.baidu.com
```

发现能够成功访问网络了，这个时候说明我们虚拟机已经能够正常联网~

![img](https://onedayxyy.cn/images/511fb839435a4662ab507f53fe3cbf6d.png)

### 注意！！！

:::warning

在说一个我遇到的问题，就是在配置好网络后，重启电脑，发现之前配置的虚拟机又不能上网了，后面经过群里小伙伴的指点，发现是重启后，VMware 的 NAT 和 DHCP 服务已经关闭了，所以我们需要手动启动

:::

![img](https://onedayxyy.cn/images/9e5983181d204233b8d1221f33b0b352.png)

重启后打开虚拟机，发现能够成功联网了~

![img](https://onedayxyy.cn/images/635a07423e2149638edb1ec5a0801a4d.png)

## 自己配置如下（截止2024年11月02日）

### win宿主机配置信息

路径：控制面板\所有控制面板项\网络连接-【VMware Virtual Ethernet Adapter for VMnet7】-【Intemnet协议版本4(TCP/IPv4)属性】

**IP地址192.168.80.1，后面1不能改其他的，否则无法远程连接linux虚拟机，亲测！**

![image-20241102131404263](https://raw.githubusercontent.com/Seasir-Hyde/typora_image_uploader/main/image/1730568557_0.png)

### 虚拟网络编辑器

路径：【虚拟机】-【编辑】-【虚拟网络编辑器】

![image-20241102132611464](https://raw.githubusercontent.com/Seasir-Hyde/typora_image_uploader/main/image/1730568571_0.png)

- NAT设置

  **192.168.80.2，后面的2保持默认就好，改了会导致无法ping外网！**

![image-20241102132720543](https://raw.githubusercontent.com/Seasir-Hyde/typora_image_uploader/main/image/1730568587_0.png)

- DHCP设置

  启始IP地址192.168是跟随子网IP固定的，**后面的80.128可以自定义，不能超过起始和结束I P地址指定的范围内！**

![image-20241102195926544](https://raw.githubusercontent.com/Seasir-Hyde/typora_image_uploader/main/image/1730568592_0.png)

- 虚拟机设置

  选择网络适配器-自定义特地虚拟网络，选择刚刚虚拟网络编辑器里面的VMnet7的NAT模式

![image-20241102192553858](https://raw.githubusercontent.com/Seasir-Hyde/typora_image_uploader/main/image/1730568596_0.png)

### ifcfg-ens33文件配置

```bash
#路径
vim /etc/sysconfig/network-scripts/ifcfg-ens33

#自己的配置如下：
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="static"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
#UUID="fefd1422-b10e-480f-8a6f-8e136247fd60"
DEVICE="ens33"
ONBOOT="yes"
#ip
IPADDR=192.168.80.128 #DHCP设置起始IP/宿主机的IP地址
NETMASk=255.255.255.0 #虚拟网络编辑器子网掩码/宿主机的子网掩码
GATEWAY=192.168.80.2  #NAT设置里面的网关IP/宿主机的默认网关
DNS1=114.114.114.114  #首选DNS服务器
DNS2=4.4.4.4          #备用DNS服务器
```

- 这里需要注意的几个点就是下面几个参数

  ```bash
  BOOTPROTO=static
  ONBOOT=yes
  
  IPADDR=192.168.80.128
  NETMASk=255.255.255.0
  GATEWAY=192.168.80.2
  DNS1=114.114.114.114
  DNS2=4.4.4.4
  ```

  上面的信息对应的就是【7.1 win宿主机配置信息】

- 配置完成后，我们就重启网络即可

```bash
service network restart
```

### 测试验证

下面我们通过 ping 命令，查看是否能够正常访问网络

```bash
ping www.baidu.com
```

发现能够成功访问网络了，说明自己的虚拟机已经能够正常联外网~

![image-20241102193659906](https://raw.githubusercontent.com/Seasir-Hyde/typora_image_uploader/main/image/1730568873_0.png)

- 宿主机也能ping通虚机且能 ssh上去

```bash
#格式
ssh 用户名@服务器IP地址

#示例
ssh root@192.168.80.128
```

![image-20241102194059470](https://raw.githubusercontent.com/Seasir-Hyde/typora_image_uploader/main/image/1730568612_0.png)

## 参考

[理解虚拟机中的四种网络连接方式](https://blog.csdn.net/ning521513/article/details/78441392)

[VMware中四种网络连接模式的区别](https://blog.csdn.net/tyutzhangyukang/article/details/78525086)