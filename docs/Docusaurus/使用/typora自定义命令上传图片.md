---
# 文档ID，唯一标识符
id: typora-image-uploader

# 文档的URL路径标识符，用于生成文档URL
slug: /typora-image-uploader

# 文档标题，显示在页面标题
title: typora自定义命令上传图片

# 发布日期，用于时间排序
date: 2024/11/03

#用于在侧边栏中显示文档的顺序，数字越小越靠前
sidebar_position: 16
# 作者名称
author: Hyde

# 最后更新日期，用于时间排序
last_update:
  date: 2024-11-03

# 关键词，用于SEO优化
keywords: [typora,image,uploader ]

# 文章标签，帮助分类
tags: [ypora,image,uploader ]
---

## 前言

在现代文档编辑和技术写作中，图像的使用越来越普遍，尤其是在需要展示代码示例、数据可视化或用户界面设计的情况下。[Typora](https://typora.io/) 作为一款流行的 Markdown 编辑器，支持直接将图像插入文档中，从而提升了写作的效率和可读性。然而，处理图像上传和管理的过程可能会让许多用户感到困惑。为了解决这一问题，我[typora_image_uploader](https://github.com/obgnail/typora_image_uploader)，一个旨在简化图像上传流程的工具就此诞生！

本教程将介绍[typora_image_uploader](https://github.com/obgnail/typora_image_uploader) 的安装与使用，帮助您轻松上传和管理图像，提升 Typora 的使用体验。无需服务器0成本，图片均上传到[github](https://github.com/)并且有CDN加速效果

![图标](https://github.com/obgnail/typora_image_uploader/raw/master/assets/icon.jpg)

## 环境要求

- 操作系统：Windows、macOS

- 安装了 Typora 的最新版本，自己使用的是**V1.9.3**

  [MarkDown编辑器Typora v1.9.3下载地址](https://www.x6g.com/i-wz-24216.html)

- 网络连接（用于图像上传）



## 使用方法

- ### [在 github 上创建一个图片仓库](https://docs.github.com/cn/enterprise-server@2.22/get-started/quickstart/create-a-repo)

- ### [创建 github 个人访问令牌](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)

- ### 根据您的平台从[版本下载对应二进制文件](https://github.com/obgnail/typora_image_uploader/releases/latest)

  把下载的文件放到`英文目录`下，比如我放的是：`D:\code\imageUploader_windows_amd64.exe`   记住这个路径，等会需要用到

  

- 配置命令

  在运行命令之前，您需要替换以下信息：

  1. **your_token**: 这是您在 GitHub 上生成的个人访问令牌。它用于身份验证，以便程序能够访问您的 GitHub 账户和仓库。您可以在 GitHub 设置中的“开发者设置”->“个人访问令牌”中生成这个令牌。
  2. **your_user_name_in_github**: 这是您在 GitHub 上的用户名，通常是您注册时使用的名称。例如，如果您的 GitHub 用户名是 `Seasir-Hyde`，那么这里您应该填 `Seasir-Hyde`。
  3. **your_repo_name**: 这是您在 GitHub 上创建的图片库的名称。例如，如果您创建的仓库名为 `typora_image_uploader`，那么这里您应该填 `typora_image_uploader`。
  4. **your/path/to/imageUploader_windows_amd64.exe**: 这是您下载的二进制文件的实际路径。假设您将其下载到 `D:\code` 目录下，那么这里您应该填 `D:\code\imageUploader_windows_amd64.exe`

  ```bash
  your/path/to/imageUploader_windows_amd64.exe -token=your_token -owner=your_user_name_in_github -repo=your_repo_name
  ```

  结合以上信息，命令的格式应该是这样的：

  ```bash
  D:\code\imageUploader_windows_amd64.exe -token=替换您实际的your_token -owner=Seasir-Hyde -repo=typora_image_uploader
  ```

  

## 配置 Typora

打开 Typora，前往`文件`，`偏好设置`，`图像`，如下图设置。`其中命令就是输入上面您的命令格式，参考步骤三的配置命令`

![image-20241103025718494](https://raw.githubusercontent.com/Seasir-Hyde/typora_image_uploader/main/image/1730573838_0.png)



## 验证

上面配置好点击左侧验证图片上传选项，成功如图所示

![测试](https://github.com/obgnail/typora_image_uploader/raw/master/assets/test.png)

## 测试效果

![preview](https://github.com/obgnail/typora_image_uploader/raw/master/assets/preview.gif)

注意：MacOS（尤其是M系列芯片）需要该文件有可执行权限，请`chmod a+x your/path/to/imageUploader_macos_arm64`在步骤三种的第四个之前运行该命令
