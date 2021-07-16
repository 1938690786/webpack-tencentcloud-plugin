# webpack-tencentcloud-plugin

## 介绍

腾讯云文件上传，支持文件夹形式上传

## 配置参数

| 参数      | 介绍                   |
| --------- | ---------------------- |
| SecretId  | 密钥 id                |
| SecretKey | 密钥                   |
| Bucket    | 桶名称                 |
| Region    | 存储桶所在地域         |
| localDir  | 要上传的本地文件夹地址 |
| remoteDir | 远程文件夹地址         |

## 安装

- npm 安装：
  npm install webpack-tencentcloud-plugin

## 使用方法

```
import TencentcloudPlugin from "webpack-tencentcloud-plugin";

const uploadOption = {
    SecretId: '',
    SecretKey: '',
    Bucket: '',
    Region: '',
    bucketName: '',
    localDir: '',
    remoteDir: ''
};

// webpack.config.js
module.exports = {
    ...,
    plugins: [
        ...,
        new UcloudPlugin(uploadOption)
    ]
}
```
