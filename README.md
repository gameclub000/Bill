# Bill

一个简易的记账本应用程序

## System Requirements

|Env| MacOS:Docker | Ubuntu |
| ------ | ------ |------ |
|Memory|2 GB RAM｜2 GB RAM｜
|Free space|10 GB|10 GB|

## Getting Started

请根据以下指示运行项目：

### MacOS(Docker)

1. 安装 [Docker](https://docs.docker.com/get-docker/)
2. 检查端口`3000`是否被占用
3. 在根目录打开命令行工具
4. 运行以下命令启动项目
```shell
docker-compose -f docker-compose.yml up
```

### Ubuntu

1. 安装 [Node.js](https://nodejs.org/en/download/)

2. 安装依赖

```bash
npm install
# or
yarn install
```
3. 运行以下命令启动项目

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
