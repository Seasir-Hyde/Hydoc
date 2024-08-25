
# ruyu-blog部署详细教程

:::tip
## 版权声明[](https://wiki.onedayxyy.cn/blog#版权声明)

> 本着开源共享、共同学习的精神：
>
> 本文是在 博主[Ruyu](https://www.kuailemao.xyz/) 文章：《项目部署文档》https://www.kuailemao.xyz/article/48 基础上增加了自己实践过程的一些细节，转载无需和我联系，但请注明文章来源。如果侵权之处，请联系博主进行删除，谢谢~
:::

<svg t="1716800756587" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3176" width="18" height="18"><path d="M512 960c-246.4 0-448-201.6-448-448s201.6-448 448-448 448 201.6 448 448-201.6 448-448 448z" fill="#D81E06" p-id="3177"></path><path d="M721.664 467.968h-235.52a22.272 22.272 0 0 0-20.736 20.736v51.776c0 10.368 10.368 20.736 20.736 20.736H628.48c10.368 0 20.736 10.304 20.736 20.672v10.368c0 33.664-28.48 62.08-62.144 62.08H392.896a22.272 22.272 0 0 1-20.672-20.672V436.928c0-33.664 28.48-62.08 62.08-62.08h287.36a22.272 22.272 0 0 0 20.736-20.736v-51.84a22.272 22.272 0 0 0-20.736-20.672h-287.36A152.96 152.96 0 0 0 281.6 434.368v287.36c0 10.304 10.368 20.672 20.736 20.672h302.848c75.072 0 137.216-62.08 137.216-137.216v-116.48a22.272 22.272 0 0 0-20.736-20.736z" fill="#FFFFFF" p-id="3178"></path></svg> [Gitee地址](https://gitee.com/kuailemao/ruyu-blog)

[Github地址](https://github.com/kuailemao/Ruyu-Blog)

## 环境准备

## 1.1.安装Docker

官方网站地址：https://docs.docker.com/engine/install/#server
**命令：**

**下载所需工具包**

```bash
sudo yum install -y yum-utils
```

![image-20240811132111646](https://ice.frostsky.com/2024/08/11/387468071c1cbbcc065923f5a6b4ea2f.png)

**设置阿里云镜像源**

```bash
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

![image-20240811132215074](https://ice.frostsky.com/2024/08/11/074e166a1e2a6f30c304b76631b7576b.png)

#### 1.1.1安装 Docker Engine(遇到选择一路按y回车)

```bash
sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

![image-20240811132259865](https://ice.frostsky.com/2024/08/11/8c5c048b665d5b7db8f4b52d64fca4bf.png)

**启动 Docker 服务**

```bash
 sudo systemctl start docker
```

**测试是否安装成功(正确显示版本表示安装成功)**

```bash
docker -v
```

![img](https://image.kuailemao.xyz/blog/article/articleImage/0c981758-2b87-4e74-835d-60f4145c11b3.png)

### 1.1.2设置国内镜像

```bash
vi  /etc/docker/daemon.json
```

添加以下代码：

```bash
{
    "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com",
    "https://hub.uuuadc.top",
    "https://docker.anyhub.us.kg",
    "https://dockerhub.jobcher.com",
    "https://dockerhub.icu",
    "https://docker.ckyl.me",
    "https://docker.awsl9527.cn"
    ],
    "live-restore": true
}
```

添加好后按下esc，然后输入:wq       退出保存

![image-20240811132513429](https://ice.frostsky.com/2024/08/11/48566ee74e800de578b8032afbc9942a.png)

依次执行以下命令，重新启动 Docker 服务。

```bash
systemctl daemon-reload
```

```bash
service docker restart
```

检查是否生效

```bash
docker info
```

是否有以下信息：

![image-20240811132819749](https://ice.frostsky.com/2024/08/11/477ab3d13c5a922be074a0672c97b89e.png)

### 1.1.3安装 Docker Compose

下载地址：https://github.com/docker/compose/releases/download/1.28.6/docker-compose-Linux-x86_64
下载后把文件重命名docker-compose ！！！

```bash
cd /usr/local/bin
rz #直接通过rz导入文件
```

![image-20240811133251213](https://ice.frostsky.com/2024/08/11/6e399cb50c67ea313a64963b360ade44.png)

验证码是否上传成功

![image-20240811133333988](https://ice.frostsky.com/2024/08/11/fc0ba71e4f19c7fcc22dcf119027fbca.png)

将可执行权限应用于二进制文件：

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

测试是否安装成功：

```bash
docker-compose --version
```

测试是否安装成功：

![img](https://image.kuailemao.xyz/blog/article/articleImage/228c283e-5b96-4de2-a3cc-feb560dae5ea.png)

### 遇到问题------(本人部署过程中没有遇到过)

1. 报错 Error: Nothing to do

![img](https://image.kuailemao.xyz/blog/article/articleImage/329c5dc2-3e09-48aa-98e3-4712c4231829.png)

### 解决办法，更新yum源：

```bash
yum -y update
```
## 1.2部署Mysql

依次执行创建挂载目录

```bash
mkdir -p /data/mysql/data;
```

```bash
mkdir -p /data/mysql/conf;
```

创建yml文件

```bash
vim /data/mysql/docker-compose.yml
```

填入配置，添加好后按下esc，然后输入:wq       退出保存

注意坑！！！填写配置检测前面是不是没有黏贴上，建议用FinalShell自带文本编辑器

```bash
version: '3'
services:
  mysql:
    image: mysql:8.0 #mysql版本
    container_name: mysql
    volumes:
      - /data/mysql/data:/var/lib/mysql
      - /data/mysql/conf/my.cnf:/etc/mysql/mysql.conf.d/mysqld.cnf
    restart: always
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: 123456 #root用户密码
      TZ: Asia/Shanghai
    command: --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

创建Mysql配置文件

```bash
vim /data/mysql/conf/my.cnf
```

<details >
  <summary>点击展开</summary>
```bash
[mysqld]
default-storage-engine=INNODB  # 创建新表时将使用的默认存储引擎
character-set-server=utf8mb4      # 设置mysql服务端默认字符集
pid-file        = /var/run/mysqld/mysqld.pid  # pid文件所在目录
socket          = /var/run/mysqld/mysqld.sock # 用于本地连接的socket套接字
datadir         = /var/lib/mysql              # 数据文件存放的目录
symbolic-links=0
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION # 定义mysql应该支持的sql语法，数据校验等!
允许最大连接数

max_connections=200

同一局域网内注意要唯一

server-id=3306

开启二进制日志功能 & 日志位置存放位置`/var/lib/mysql`

#log-bin=mysql-bin
log-bin=/var/lib/mysql/mysql-bin

binlog格式

1. STATEMENT：基于SQL语句的模式，binlog 数据量小，但是某些语句和函数在复制过程可能导致数据不一致甚至出错；

2. MIXED：混合模式，根据语句来选用是 STATEMENT 还是 ROW 模式；

3. ROW：基于行的模式，记录的是行的完整变化。安全，但 binlog 会比其他两种模式大很多；

binlog_format=ROW

FULL：binlog记录每一行的完整变更 MINIMAL：只记录影响后的行

binlog_row_image=FULL

日志文件大小

max_binlog_size=100M

定义清除过期日志的时间(这里设置为7天)

expire_logs_days=7

================= ↑↑↑ mysql主从同步配置end ↑↑↑ =================

[mysql]
default-character-set=utf8mb4

[client]
default-character-set=utf8mb4  # 设置mysql客户端默认字符集
```
</details>

```bash
#cd到对应目录下
cd /data/mysql
#创建容器并启动
docker-compose up -d
```

![image-20240811135624505](https://ice.frostsky.com/2024/08/11/0fb15f644d230c6e5343c1e8fcc0ee27.png)

看见以下信息代表成功

![img](https://image.kuailemao.xyz/blog/article/articleImage/775ba3fd-3caa-4811-b630-0e1cdcead3ef.png)

**记得防火墙开对应的端口号 !!!**
**一定要记得换端口和复杂密码，不然等着被比特币勒索！！！**

**navicate测试链接成功**

![image-20240811134940156](https://ice.frostsky.com/2024/08/11/7c0d5569aa10606392e1432c9e41d955.png)

**最后新建一个blog数据库，我已经新建了blog数据库，图中为演示。把项目目录下的sql文件放进去运行！！！**

![recording](https://ice.frostsky.com/2024/08/11/9054151faf3485340ddf1002b65e6459.gif)

## 1.3.部署Redis

创建挂载目录

```bash
mkdir -p /data/redis
```

创建yml文件

```bash
vim /data/redis/docker-compose.yml
```

填入配置，添加好后按下esc，然后输入:wq       退出保存

注意坑！！！填写配置检测前面是不是没有黏贴上，建议用FinalShell自带文本编辑器

```bash
version: '3'
services:
  redis:
    image: redis:7.2.3
    container_name: redis
    restart: always
    ports:
      - 6379:6379
    volumes:
      - /data/redis/redis.conf:/etc/redis/redis.conf
      - /data/redis/data:/data
      - /data/redis/logs:/logs
    command: ["redis-server","/etc/redis/redis.conf"]
```

创建挂载的配置文件

```shell
vim /data/redis/redis.conf
```

**注意：protected-mode no 不加，无法连接！**

```bash
protected-mode no
port 6379
timeout 0
#rdb配置
save 900 1
save 300 10
save 60 10000
rdbcompression yes
dbfilename dump.rdb
dir /data
appendonly yes
appendfsync everysec
#设置你的redis密码
requirepass 123456
```

到对应目录下启动容器

```bash
cd /data/redis
docker-compose up -d
#如果需要强制重新构建
docker-compose up --force-recreate -d
```

![image-20240811135731675](https://ice.frostsky.com/2024/08/11/93112207ed063a9a0c5292d436e874ad.png)

看见以上信息代表成功

记得防火墙开启对应的端口！！！

![img](https://image.kuailemao.xyz/blog/article/articleImage/d3939ef1-96af-4c5a-9820-70db419b5237.png)

使用工具测试连接

![image-20240811135922792](https://ice.frostsky.com/2024/08/11/be34bf92a638a1c2c0421c7888307e3d.png)

## 1.4.部署RabbitMQ

```bash
docker pull rabbitmq
```

根据下载的镜像创建和启动容器

```bash
docker run -d --hostname my-rabbit --name rabbit -p 15672:15672 -p 5672:5672 rabbitmq
```

参数说明：

```bash
-d 后台运行容器；
--name 指定容器名；
-p 指定服务运行的端口（5672：应用访问端口；15672：控制台Web端口号）；
-v 映射目录或文件；
--hostname  主机名（RabbitMQ的一个重要注意事项是它根据所谓的 “节点名称” 存储数据，默认为主机名）；
-e 指定环境变量；（RABBITMQ_DEFAULT_VHOST：默认虚拟机名；RABBITMQ_DEFAULT_USER：默认的用户名；RABBITMQ_DEFAULT_PASS：默认用户名的密码）
```

查看正在运行容器

```bash
docker ps
```

![image-20240811140111747](https://ice.frostsky.com/2024/08/11/d595875e3e2a53ac03001e032a8aef14.png)

进入容器内部，比如我自己的：docker exec -it f765634fe9c9 /bin/bash

```bash
docker exec -it 容器id /bin/bash
```

运行web插件

```bash
rabbitmq-plugins enable rabbitmq_management
```

![img](https://image.kuailemao.xyz/blog/article/articleImage/a4cfe25c-3ee0-404e-8544-8218cb2f9b79.png)

浏览器运行，您的服务器ip+端口：http://ip:15672/       比如我的本地虚拟机ip是：192.168.222.128，浏览器输入：http://192.168.222.128:15672/

![img](https://image.kuailemao.xyz/blog/article/articleImage/6b2830ae-d24a-4c0b-8f8c-bab0cb311c9b.png)

默认用户名和密码是**guest**

![image-20240811140626498](https://ice.frostsky.com/2024/08/11/76c21d3a7237672af624cc0a8710257c.png)

解决：⚠ All stable feature flags must be enabled after completing an upgrade. [Learn more]

全部启用

![image-20240811140902920](https://ice.frostsky.com/2024/08/11/94d5f56cd2362503bec89d2838518c6c.png)

解决不显示图表问题

正常首页应该是这样

![img](https://image.kuailemao.xyz/blog/article/articleImage/45b1c9ab-733c-4fcb-9299-e591e8764dee.png)

**解决方法：**

查看所有容器（看id）

```bash
docker ps -a
```

进入容器内部

```bash
docker exec -it 容器id /bin/bash
```

进入指定目录

```bash
cd /etc/rabbitmq/conf.d/
```

修改 management_agent.disable_metrics_collector = false

```bash
echo management_agent.disable_metrics_collector = false > management_agent.disable_metrics_collector.conf
```

退出容器

```bash
exit
```

重启容器

```bash
docker restart 容器Id
```

**修改密码：**

1. 进入容器内部

2. 查看RabbitMQ当前的用户列表

   ```bash
   rabbitmqctl list_users
   ```

   ![img](https://image.kuailemao.xyz/blog/article/articleImage/a8c0d6bd-7e8a-4d72-995d-f0453dbcae17.png)

修改密码

```bash
rabbitmqctl change_password 用户名 '[密码]'
```

## 1.5.部署Minio

创建挂载目录

```bash
mkdir -p /data/minio
```

创建yml文件

```bash
vim /data/minio/docker-compose.yml
```

填入配置，添加好后按下esc，然后输入:wq       退出保存

注意坑！！！填写配置检测前面是不是没有黏贴上，建议用FinalShell自带文本编辑器

```bash
version: '3'
services:
  minio:
    image: "minio/minio"
    container_name: minio
    ports:
      - "9000:9000" # api 端口
      - "9001:9001" # 控制台端口
    environment:
      MINIO_ROOT_USER: admin # 管理后台用户名
      MINIO_ROOT_PASSWORD: 12345678 # 管理后台密码，最小8个字符
      MINIO_COMPRESS: "off" # 开启压缩 on 开启 off 关闭
      MINIO_COMPRESS_EXTENSIONS: "" # 扩展名 .pdf,.doc 为空 所有类型均压缩
      MINIO_COMPRESS_MIME_TYPES: "" # mime 类型 application/pdf 为空 所有类型均压缩
    volumes:
      - /data/minio/data:/data/ # 映射当前目录下的data目录至容器内/data目录
      - /data/minio/config:/root/.minio/ # 映射配置目录
    command: server --address ':9000' --console-address ':9001' /data  # 指定容器中的目录 /data
    privileged: true
```

到对应目录下启动容器

```bash
cd /data/minio
docker-compose up -d
#如果需要强制重新构建
docker-compose up --force-recreate -d
```

打开对应的控制台: http://ip:9001/  您的服务器ip+端口：http://ip:9001/       比如我的本地虚拟机ip是：192.168.222.128，浏览器输入：http://192.168.222.128:9001/
**记得服务器防火墙开启9000，9001端口！！！使用对应的账号密码登录！**

默认账号：admin             默认密码：12345678

![image-20240812003329621](https://ice.frostsky.com/2024/08/12/213a291aa0a0b1672f37b55a2dbb4a78.png)

创建一个对应的桶

![image-20240812003420907](https://ice.frostsky.com/2024/08/12/c87c225b5581f6920b8f3cee86c8f2c2.png)

输入桶的名称：blog，然后点击右下角Create Bucket

![image-20240812003549865](https://ice.frostsky.com/2024/08/12/021bbab9ef7bb67477907ea396a94e38.png)

设置访问权限，把【Private】权限改成【Custom】

![img](https://image.kuailemao.xyz/blog/article/articleImage/69d52702-4b61-4dc5-a518-0483df391797.png)

![image-20240812003659349](https://ice.frostsky.com/2024/08/12/311559cea03daaec9d8c535731ce9570.png)

将以下信息填写在Write Policy（图二）
<details >
  <summary>点击展开</summary>
```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "*"
                ]
            },
            "Action": [
                "s3:GetBucketLocation"
            ],
            "Resource": [
                "arn:aws:s3:::blog"
            ]
        },
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "*"
                ]
            },
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::blog"
            ],
            "Condition": {
                "StringEquals": {
                    "s3:prefix": [
                        "*"
                    ]
                }
            }
        },
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "*"
                ]
            },
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::blog/**"
            ]
        }
    ]
}
```
</details>
![image-20240811142237847](https://ice.frostsky.com/2024/08/13/bd946bd389ab9688acfd504596537b46.png)

创建密钥

密钥只要第一次可见，创建后记得保存好

![img](https://image.kuailemao.xyz/blog/article/articleImage/2f42813f-8a36-4571-84c8-4fdee368e87f.png)

![image-20240812003715494](https://ice.frostsky.com/2024/08/12/25505f380dc8a3e572858c629a9b5a72.png)

## 1.6.部署音乐后端

拉取镜像

```bash
docker pull binaryify/netease_cloud_music_api
```

![image-20240812003938193](https://ice.frostsky.com/2024/08/12/ec570efa999e70cc2548dee3f116772c.png)

运行

```bash
docker run -p 3000:3000 --name netease_cloud_music_api -d binaryify/netease_cloud_music_api
```

记得服务器防火墙开启对应端口！！！

## 1.7.部署一言接口

:::info
详情部署请点击：[docker部署一言接口服务](https://hydoc.netlify.app/docs/Blog/tutorial/Ruyu-Blog/hitokoto)
:::

## 2.申请第三方登录

### 2.1.Gitee

## 4.1.拉取项目

项目地址：[kuailemao/Ruyu-Blog](https://gitee.com/kuailemao/ruyu-blog)

小白请下载最新的发行版本

![img](https://image.kuailemao.xyz/blog/article/articleImage/b463f357-602b-4551-be81-a23141540233.png)

拉取命令，提前安装好git

```bash
git clone git@gitee.com:kuailemao/ruyu-blog.git
```

![img](https://image.kuailemao.xyz/blog/article/articleImage/bef26efa-f4ea-4015-a606-3f05ebff132e.png)

## 4.2.运行后端

使用idea打开，下载后端依赖

![image-20240812004257952](https://ice.frostsky.com/2024/08/12/18762c780c0e7ac56abd99f280ae988f.png)

【blog-backend/src/main/resources】目录下新建application-dev.yml

![image-20240812004427075](https://ice.frostsky.com/2024/08/12/48c67ec0d1d4f9671a0b6c886cba5941.png)

添加application-dev.yml配置

<details >
  <summary>点击展开</summary>
```bash
spring:
  security:
    jwt:
      key: jwt-key
      # jwt 的有效时间（天）
      expire: 7
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://192.168.222.128:3306/blog?useSSL=false&allowPublicKeyRetrieval=true
    username: root
    password: 123456
  data:
    redis:
      # redis 端口
      port: 6379
      # redis 地址
      host: 192.168.222.128
      # redis 密码
      password: 123456
      # redis连接超时时间（毫秒）
      timeout: 10000
      # 数据库索引，默认为0
      database: 1
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
  rabbitmq:
    # rabbitmq 地址
    host: 192.168.222.128
    # rabbitmq 端口
    port: 5672
    # rabbitmq 用户名
    username: guest
    # rabbitmq 密码
    password: guest
    listener:
      simple:
        retry:
          enabled: true #是否开启消费者重试
          max-attempts: 3 #最大重试次数
          initial-interval: 6000 #重试间隔时间（单位毫秒）
          multiplier: 2 #间隔时间乘子，间隔时间*乘子=下一次的间隔时间，最大不能超过设置的最大间隔时间
          max-interval: 10000 #重试最大时间间隔（单位毫秒）
    # 邮箱队列名称
    queue:
      email: email_queue
      log-login: log_login_queue
      log-system: log_system_queue
    # 邮箱交换机名称
    exchange:
      email: email_exchange
      log: log_exchange
    # 邮箱路由键
    routingKey:
      email: email_routing_key
      log-login: log_routing_key_login
      log-system: log_routing_key_system
  mail:
    host: smtp.qq.com
    username:
    password:
    chat-gpt:
      email:
      password:
    properties:
      mail.smtp.auth: true
      mail.smtp.starttls.enable: true
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB
  quartz:
    # 将 Quartz 持久化方式修改为 jdbc
    job-store-type: jdbc
    properties:
      org:
        quartz:
          scheduler:
            # 实例节点 ID 自动生成
            instanceId: AUTO
          jobStore:
            class: org.quartz.impl.jdbcjobstore.JobStoreTX
            dataSource: quartz_jobs
          dataSource:
            quartz_jobs:
              driver: com.mysql.cj.jdbc.Driver
              URL: jdbc:mysql://192.168.222.128:3306/blog?useSSL=false&allowPublicKeyRetrieval=true
              user: root
              password: 123456
mybatis:
  mapper-locations: classpath:mapper/*.xml
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  global-config:
    db-config:
      # 逻辑删除
      logic-delete-field: isDeleted
      # 逻辑删除值
      logic-delete-value: 1
      # 逻辑未删除值
      logic-not-delete-value: 0
      # id 自增
      id-type: auto
# springdoc-openapi项目配置，访问 http://127.0.0.1:8088/doc.html
springdoc:
  swagger-ui:
    path: /swagger-ui.html
    tags-sorter: alpha
    operations-sorter: alpha
  api-docs:
    path: /v3/api-docs
  group-configs:
    - group: 'default'
      paths-to-match: '/**'
      packages-to-scan: xyz.kuailemao
oauth:
  # gitee 登录
  gitee:
    client-id:
    client-secret:
    redirect-uri:
  # gitub 登录
  github:
    client-id:
    client-secret:
    redirect-uri:
web:
  index:
    # 网站前端首页
    path:  http://localhost:99/
# knife4j的增强配置，不需要增强可以不配
knife4j:
  enable: true
  setting:
    language: zh_cn
http_pool:
  max_total: 200
  default_max_per_route: 100
  connect_timeout: 5000
  connection_request_timeout: 1000
  socket_timeout: 65000
  validate_after_inactivity: 2000
# 连接 minio
minio:
  # minio地址+9000端口
  endpoint: http://192.168.222.128:9000
  #minio访问密钥
  accessKey: #必填！上传自己的accessKey
  #minio密钥
  secretKey: #必填！上传自己的secretKey
  # 桶名称
  bucketName: blog
```
</details>

**把上面准备好的环境找到对应的地方配置好各种ip跟端口或者密钥，运行BlogBackendApplication**

![image-20240812004612802](https://ice.frostsky.com/2024/08/12/d8c12b5710ae6c158f5a4d6d697b8d97.png)

看到以下信息，恭喜你，后端启动成功！

![image-20240812004836528](https://ice.frostsky.com/2024/08/12/f4025d7065a42b32e453b972451628e9.png)

遇到的问题提示以下报错：

![1723395136268](https://ice.frostsky.com/2024/08/12/2125624df4379fc9e2b4f72e322c878a.jpeg)

![1723395136256](https://ice.frostsky.com/2024/08/12/46a394bb7d87f468f08ccf9e05c8c541.jpeg)

原因是数据库没改对，把[]去掉

```bash
    #错误的
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://[192.168.222.128]:[3306]/blog?useSSL=false&allowPublicKeyRetrieval=true
    #正确的
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://192.168.222.128:3306/blog?useSSL=false&allowPublicKeyRetrieval=true
   #第87行 
dataSource:
quartz_jobs:
driver: com.mysql.cj.jdbc.Driver
URL: jdbc:mysql://192.168.222.128:3306/blog?useSSL=false&allowPublicKeyRetrieval=true
```

## 4.3.运行前端

**前提具备条件：**

- pnpm >= 8.12.0
- node >= 16.17.0

### 4.3.1.运行博客前台

1. 找到打开 `kuailemao-blog` 目录

![img](https://image.kuailemao.xyz/blog/article/articleImage/84bb99df-fd2c-4ea1-b171-36d5b5f74530.png)

**右键打开终端**

![img](https://image.kuailemao.xyz/blog/article/articleImage/c5a30281-50d7-4b1c-a7e1-16a7abb7c296.png)

运行命令

```bash
pnpm install
```

![img](https://image.kuailemao.xyz/blog/article/articleImage/e2400a16-2b68-4b1e-932f-d25c11c79082.png)

打开\ruyu-blog/blog-frontend/kuailemao-blog/目录下的【.env.development】配置文件，填写好对应的配置信息

<details >
  <summary>点击展开博客前台开发环境配置</summary>
```bash
# 开发环境配置
NODE_ENV = development
博客代理地址

VITE_APP_BASE_API = '/api'

项目后端地址（来自blog-frontend/kuailemao-admin/.env.development配置文件中VITE_APP_BASE_URL）

VITE_SERVE='http://localhost:8088/'

前台域名

VITE_FRONTEND_URL = 'http://localhost:99/'

音乐代理地址

VITE_MUSIC_BASE_API = '/wapi'

第三方开源集成的音乐前端地址，如果不配置上面菜单栏就不会出现音乐选项

VITE_MUSIC_FRONTEND_URL = ''

左下角音乐后台

VITE_MUSIC_SERVE='http://192.168.222.128:3000/'

自己部署的一言接口，如果不填写会默认使用官网的接口，官网接口有每分钟qps限制，有时会得不到想要的结果

VITE_YIYAN_API = ''
```
</details>

```bash
pnpm run dev
```

![img](https://image.kuailemao.xyz/blog/article/articleImage/20df1734-87ff-401f-a3d6-9fdb29b5a81f.png)

看到以上信息访问链接后恭喜你运行成功！！！

![img](https://image.kuailemao.xyz/blog/article/articleImage/a437f3bf-8e6e-4691-99ce-811b3f0d0c59.png)

### 4.3.2.运行博客后台

与上面同样的方式，找到`kuailemao-admin`文件夹，打开终端
**运行命令：**

```shell
pnpm install
```

打开blog-frontend/kuailemao-admin/配置文件目录下的【.env.development】配置文件，填写好对应的配置信息

<details >
  <summary>点击展开博客后台开发环境配置</summary>
```bash
# 开发环境
代理前缀

VITE_APP_BASE_API=/api

后端地址

VITE_APP_BASE_URL=http://localhost:8088
VITE_APP_LOAD_ROUTE_WAY=BACKEND
#minio ip地址+9001上传端口
VITE_APP_DOMAIN_NAME=http://192.168.222.128:9001

VITE_APP_BASE_API_DEV=/dev-api

VITE_APP_BASE_URL_DEV=http://localhost:8080

The title of your application (string)

#标题
VITE_GLOB_APP_TITLE="antdv-pro"

是否显示侧边配置按钮

VITE_APP_PROD=true
```
</details>

```shell
pnpm dev
```

![img](https://image.kuailemao.xyz/blog/article/articleImage/7343fb44-80e8-41d4-8fde-217a867d9b4a.png)

看到以上信息访问链接后恭喜你运行成功！！！

**效果如下：**

账号：admin    密码：123456

![img](https://image.kuailemao.xyz/blog/article/articleImage/28435382-530a-44aa-ac20-eb886ce329bd.png)

### 4.3.3.音乐模块（可选）

:::info
这个页面是单独部署的并非集成在项目内，需要的自己参考开源大佬的文档部署

详情部署请点击：[音乐模块(可选)](https://hydoc.netlify.app/docs/Blog/tutorial/Ruyu-Blog/Music-module)
:::

![img](https://image.kuailemao.xyz/blog/article/articleImage/56edb3d9-5efb-4969-885b-7a8fff2111c1.png)

# 5.部署

## 5.1.部署后端

### 5.1.1.构建生成jar包

idea运行打包命令

![img](https://image.kuailemao.xyz/blog/article/articleImage/d6ee0859-3a57-4906-971d-258bfee45fb6.png)

得到一个打包好的Jar包

![img](https://image.kuailemao.xyz/blog/article/articleImage/d876b54d-88ff-4a8a-a746-080c4982dda6.png)

### 5.1.2.上传jar包

```bash
#新建backend文件夹
mkdir /blog/backend -p

#进入backend文件夹
cd /blog/backend
```

上传打包文件，把你打包好的后端Jar包上传

```bash
rz  # Enter

#验证是否上传成功
ls
#或者
ll
#输出 blog-backend-0.0.1-SNAPSHOT.jar  或者   总用量 91480 -r--------. 1 root root 93672039 8月  11 04:14 blog-backend-0.0.1-SNAPSHOT.jar
```
### 5.1.3.创建后端镜像
新建 Dockerfile

```bash
#进入backend文件夹
cd /blog/backend

#新建Dockerfile文件
vim Dockerfile
```

**写入Dockerfile内容配置：(覆盖掉原来文件的内容)**

添加好后按下esc，然后输入:wq       退出保存

注意坑！！！填写配置检测前面是不是没有黏贴上，建议用FinalShell自带文本编辑器

```bash
# 使用官方的OpenJDK 17镜像作为基础镜像
FROM openjdk:17

# 设置工作目录
WORKDIR /app

# 复制项目的jar文件到容器中
COPY blog-backend-0.0.1-SNAPSHOT.jar /app/app.jar

# 暴露应用运行的端口
EXPOSE 8088

# 运行Spring Boot应用
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
```

![image-20240812005927275](https://ice.frostsky.com/2024/08/12/31424c01f8ff2059324bc25746a068ad.png)

### 5.1.4.构建后端镜像
:::warning
```bash
#构建后端镜像前确保镜像已经停止  首次部署请跳过此步骤

#运行后端容器前记得终止掉原来mysql、redis、rabbitmq容器或者直接停止掉所有容器。您可以使用以下命令：

# 停止mysql容器
docker stop ruyu-blog-hd
# 停止redis容器
docker stop redis:7.2.3
# 停止rabbitmq容器
docker stop rabbitmq

#或者停止所有正在运行的Docker容器
docker stop $(docker ps -q)

#删除后端容器
docker rm ruyu-blog-hd
```
:::

![](https://ice.frostsky.com/2024/08/04/1e3660433d36eb57fc8a58de28a317bf.png)


```bash
docker build . -t ruyu-blog-hd
```

![image-20240812010004567](https://ice.frostsky.com/2024/08/12/d048d67681d42ca98476d6f302513f59.png)

### 5.1.5.启动后端镜像
```bash
docker start ruyu-blog-hd
```

### 5.1.6.运行后端容器

```bash
docker run --name ruyu-blog-hd -d -p 8088:8088 ruyu-blog-hd
```

![image-20240812010159849](https://ice.frostsky.com/2024/08/12/10c99f9dcdd2447731ae1a550938acb1.png)
### 5.1.7.验证后端容器
```bash
docker ps
```

成功输出如下图

![image-20240812010235419](https://ice.frostsky.com/2024/08/12/0c30792630e68845081d06247a165727.png)

**记得服务器防火墙开启对应端口！！！**

## 5.2.部署前台
### 5.2.1.填写配置文件
:::tip
不填写也可以打包到服务器，也可以运行
:::
找到 kuailemao-blog 目录下面的生产环境配置文件

![img](https://image.kuailemao.xyz/blog/article/articleImage/f37c5b7a-4311-4085-9b68-812d72789fdf.png)

<details >
  <summary>点击展开前台生产环境配置</summary>
```bash
# 生产环境配置
NODE_ENV = production
博客代理地址

VITE_APP_BASE_API = '/api'

项目后端地址（来自blog-frontend/kuailemao-admin/.env.development配置文件中VITE_APP_BASE_URL）

VITE_SERVE='http://服务器IP:8088/'

前台域名（没有配就填写正确ip）

VITE_FRONTEND_URL = 'http://服务器IP:99/'

音乐代理地址

VITE_MUSIC_BASE_API = '/wapi'

第三方开源集成的音乐前端地址，如果不配置上面菜单栏就不会出现音乐选项

VITE_MUSIC_FRONTEND_URL = ''

左下角音乐后端地址

VITE_MUSIC_SERVE='http://服务器IP:3000/'

自己部署的一言接口，如果不填写会默认使用官网的接口，官网接口有每分钟qps限制，有时会得不到想要的结果

VITE_YIYAN_API = ''
```
</details>

### 5.2.1.打包前台项目

运行打包命令

```bash
pnpm build
```

![img](https://image.kuailemao.xyz/blog/article/articleImage/4f52cb13-5947-4538-8d6e-4a151dc90d92.png)

等待打包完成，根目录下面出现 dist 命令

![img](https://image.kuailemao.xyz/blog/article/articleImage/85008907-98f7-4772-b923-0011613a2461.png)

### 5.2.3.上传dist文件夹

回到服务器，运行命令

```bash
# 新建blog-qt文件夹
mkdir /blog/blog-qt -p

# 进入blog-qt文件夹
cd /blog/blog-qt/
```

把打包好的 dist 文件夹上传，建议用Xftp上传更快，路径在：/blog/blog-qt

```bash
rz
```

![](https://ice.frostsky.com/2024/08/04/367cec9cdc375e35eea7ac91362a0d07.png)

### 5.2.4.创建前台镜像

```bash
vim Dockerfile
```

填入配置，添加好后按下esc，然后输入:wq       退出保存

注意坑！！！填写配置检测前面是不是没有黏贴上，建议用FinalShell自带文本编辑器

```bash
FROM nginx

MAINTAINER 博客前台

RUN rm /etc/nginx/conf.d/default.conf

ADD default.conf /etc/nginx/conf.d/

COPY dist/ /usr/share/nginx/html/
```

新建 default.conf 配置文件

```bash
vim default.conf
```

填入配置，添加好后按下esc，然后输入:wq       退出保存

注意坑！！！填写配置检测前面是不是没有黏贴上，建议用FinalShell自带文本编辑器
<details >
  <summary>点击展开</summary>
```bash
server {
        listen 80;              # 监听端口

        server_name localhost;    # 域名
    
        location / {
             root   /usr/share/nginx/html;
             index  index.html index.htm;
             try_files $uri $uri/ /index.html =404;
        }
    
        # 配置代理路径
        location /api/ {
            proxy_pass http://192.168.222.128:8088/;        # 转发请求的目标地址
            proxy_set_header Host $host;             # 设置请求头中的Host字段
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                            # 设置HTTP头中的X-Forwarded-For字段，表示客户端真实IP，多个IP用逗号隔开
            proxy_set_header X-Real-IP $remote_addr; # 设置请求头中的X-Real-IP字段，表示客户端真实IP
            client_max_body_size 100M;
        }
    
        # 配置代理路径
        location /wapi/ {
            proxy_pass http://192.168.222.128:3000/;        # 转发请求的目标地址
        }
    
        # 配置错误页面
        error_page 404 /404.html;           # 404错误页
        location = /404.html {
            internal;                       # 不接受外部访问
            root /usr/share/nginx/html;     # 404错误页文件所在目录
        }
    }
```
</details>

如果有域名，并且后台不想使用另外一个端口访问，假如 88，因为服务器只有一个 80端口，就可以使用nginx转发，如下配置

<details >
  <summary>点击展开</summary>
```bash
# 定义HTTP服务器
    server {
        listen 80;              # 监听端口

        server_name kuailemao.xyz;    # 域名

        location / {
             root   /usr/share/nginx/html;
             index  index.html index.htm;
             try_files $uri $uri/ /index.html =404;
        }

        # 配置代理路径
        location /api/ {
            proxy_pass http://[域名/ip+端口]/;        # 转发请求的目标地址，项目后端
            proxy_set_header Host $host;             # 设置请求头中的Host字段
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                            # 设置HTTP头中的X-Forwarded-For字段，表示客户端真实IP，多个IP用逗号隔开
            proxy_set_header X-Real-IP $remote_addr; # 设置请求头中的X-Real-IP字段，表示客户端真实IP
        }

        # 配置代理路径
        location /wapi/ {
            proxy_pass http://[域名/ip+端口]/;        # 转发请求的目标地址，音乐后端
        }

        # 配置错误页面
        error_page 404 /404.html;           # 404错误页
        location = /404.html {
            internal;                       # 不接受外部访问
            root /usr/share/nginx/html;     # 404错误页文件所在目录
        }
    }

    # 二级域名反向代理，访问后台
    server {
        listen 80;
        server_name blog.kuailemao.xyz;

        location / {
            proxy_pass http://kuailemao.xyz:81/; # 实际的后台路径
            client_max_body_size 100M;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
```
</details>
![img](https://image.kuailemao.xyz/blog/article/articleImage/3eefe4e3-ae52-473d-ab45-5838ed9a4162.png)

### 5.2.5.构建前台镜像

:::warning
```bash
#构建前台镜像前确保镜像已经停止  首次部署请跳过此步骤

#停止前台容器
docker stop blog-qt
#删除前台容器
docker rm blog-qt
```
:::

```bash
<!-- 导航到/blog/blog-qt/目录下 -->
cd /blog/blog-qt/

# 构建前台镜像
docker build . -t blog-qt
```

![image-20240812010345015](https://ice.frostsky.com/2024/08/12/6d3ab5b1a3d186494abb702e8bb8a51c.png)

### 5.2.6.运行前台镜像

```bash
docker run --name blog-qt -d -p 80:80 blog-qt
```

### 5.2.7.验证前台容器

```bash
docker ps -a
```

![image-20240812010440613](https://ice.frostsky.com/2024/08/12/1b49a1ce0faccbe1f32a4daa285422b1.png)

前台效果

![](https://ice.frostsky.com/2024/08/04/a8545b66a20e60af769bb7f7221fca2c.png)

二级域名反向代理，后台访问效果

![img](https://image.kuailemao.xyz/blog/article/articleImage/5f57a5be-f833-4e4c-8562-2c1da0ae5000.png)

## 5.3.部署后台

### 5.3.1.填写配置文件
:::tip
不填写也可以打包到服务器，也可以运行
:::
找到对应的生产环境配置文件

![img](https://image.kuailemao.xyz/blog/article/articleImage/7d7f6d1c-edec-4ef2-bf7e-30ee23e970e4.png)

填写后端前台生产环境配置

```bash
VITE_APP_BASE_API=/api
#服务器ip+8088端口
VITE_APP_BASE_URL=http://服务器IP:8088
# The title of your application (string)
VITE_GLOB_APP_TITLE="antdv-pro"
VITE_APP_PROD=false
```

### 5.3.2.打包后台项目

打包命令

```bash
pnpm build
```

看见以下信息后表示打包成功

![img](https://image.kuailemao.xyz/blog/article/articleImage/78315543-137c-4374-aaa1-b40fa0e9a1ec.png)

![img](https://image.kuailemao.xyz/blog/article/articleImage/aa5a73e8-0f1c-41e2-bc78-78059e938f64.png)

### 5.3.3.上传dist目录

回到服务器，运行命令

```bash
#新建blog-ht文件夹
mkdir /blog/blog-ht

#进入blog-ht文件夹
cd /blog/blog-ht
```

把打包好的 dist 文件夹上传，建议用Xftp上传更快，路径在：/blog/blog-ht

![](https://ice.frostsky.com/2024/08/04/367cec9cdc375e35eea7ac91362a0d07.png)

### 5.3.4.创建后台镜像

```bash
vim Dockerfile
```
填入配置，添加好后按下esc，然后输入:wq 退出保存

注意坑！！！填写配置检测前面是不是没有黏贴上，建议用FinalShell自带文本编辑器
```bash
FROM nginx

MAINTAINER 博客后台

RUN rm /etc/nginx/conf.d/default.conf

ADD default.conf /etc/nginx/conf.d/

COPY dist/ /usr/share/nginx/html/
```

新建 default.conf 配置文件

```bash
vim default.conf
```

填入后台nginx配置

<details >
  <summary>点击展开</summary>
```bash
server {
        listen 81;              # 监听端口

        server_name localhost;    # 域名
    
        location / {
             root   /usr/share/nginx/html;
             index  index.html index.htm;
             try_files $uri $uri/ /index.html =404;
        }
    
        # 配置代理路径
        location /api/ {
            proxy_pass http://192.168.222.128:8088/;        # 转发请求的目标地址
            proxy_set_header Host $host;             # 设置请求头中的Host字段
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                            # 设置HTTP头中的X-Forwarded-For字段，表示客户端真实IP，多个IP用逗号隔开
            proxy_set_header X-Real-IP $remote_addr; # 设置请求头中的X-Real-IP字段，表示客户端真实IP
            client_max_body_size 100M;
        }
    
        # 配置代理路径
        location /wapi/ {
            proxy_pass http://192.168.222.128:3000/;        # 转发请求的目标地址
        }
    
        # 配置错误页面
        error_page 404 /404.html;           # 404错误页
        location = /404.html {
            internal;                       # 不接受外部访问
            root /usr/share/nginx/html;     # 404错误页文件所在目录
        }
    }
```
</details>
![](https://image.kuailemao.xyz/blog/article/articleImage/91a09b37-a4c6-45cf-b527-2f1985a573a4.png)

### 5.3.5.构建后台镜像
:::warning
```bash
#构建后台镜像前确保镜像已经停止  首次部署请跳过此步骤

#停止后台容器
docker stop blog-ht
#删除后台容器
docker rm blog-ht
```
:::

```bash
<!-- 导航到/blog/blog-ht目录下 -->
cd /blog/blog-ht

<!-- 构建后台镜像 -->
docker build . -t blog-ht
```

![image-20240812010536086](https://ice.frostsky.com/2024/08/12/d714725a3692934e480776219b1d0b87.png)

### 5.3.6.运行后台镜像

```bash
docker run --name blog-ht -d -p 81:81 blog-ht
```

### 5.3.7.验证后台镜像

```bash
docker ps -a
```

![image-20240812010601490](https://ice.frostsky.com/2024/08/12/625bf631819c9d5283bec75dfe1e7c31.png)

后台效果
![](https://image.kuailemao.xyz/blog/article/articleImage/3bb39afd-00bb-44f3-9211-b4b65c75d8a4.png)