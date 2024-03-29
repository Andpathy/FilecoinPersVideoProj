# 基于Filecoin的个人私密视频库

## 项目简介

​		**本项目借助web3.storage上传用户个人视频至ipfs上生成视频链接，并利用filecoin永久储存的特性生成用户的个人永久私密视频库网盘，用户可以对上传视频进行封面选取，名称以及各种视频详细资料的设置。本项目对用户上传的视频进行了视频与信息可视化处理，并提供了web播放器。**

​		**用户需要设置自己的Web3.storage Token并可以在Web3.storage中管理自己的内容或进行扩容，每个用户的视频均上传至自己的仓库并借助Filecoin永久储存实现了用户视频的私密性与安全性，无需担心视频偷偷被“某某网盘”私自审核与限制。**

​		**项目采用NetFlix风格进行可视化，并显示用户设置的视频资料，项目提供web在线播放器，让用户的视频仓库看起来井然有序的同时便于使用。**

​		**借助moralis连接用户的个人钱包，适应web3时代，并利用moralis特性储存用户资料。**

​		**不仅仅是个人的”私密+永久“视频仓库，本项目上传视频生成的IPFS/Filecoin链接可作为“某某网盘”链接似的功能进行分享，无需担心链接被取消或失效，永久有效！！并且可扩展智能合约服务赚取受益！**



### 可视化界面

![](https://raw.githubusercontent.com/Andpathy/FilecoinPersVideoProj/main/%E5%9F%BA%E4%BA%8Efilecoin%E7%9A%84%E4%B8%AA%E4%BA%BA%E7%A7%81%E5%AF%86%E8%A7%86%E9%A2%91%E5%BA%93/imgs/1.png)

### 视频详情页

![](https://raw.githubusercontent.com/Andpathy/FilecoinPersVideoProj/main/%E5%9F%BA%E4%BA%8Efilecoin%E7%9A%84%E4%B8%AA%E4%BA%BA%E7%A7%81%E5%AF%86%E8%A7%86%E9%A2%91%E5%BA%93/imgs/2.png)

### 视频播放页

![](https://raw.githubusercontent.com/Andpathy/FilecoinPersVideoProj/main/%E5%9F%BA%E4%BA%8Efilecoin%E7%9A%84%E4%B8%AA%E4%BA%BA%E7%A7%81%E5%AF%86%E8%A7%86%E9%A2%91%E5%BA%93/imgs/3.png)

### 视频上传界面

![](https://raw.githubusercontent.com/Andpathy/FilecoinPersVideoProj/main/%E5%9F%BA%E4%BA%8Efilecoin%E7%9A%84%E4%B8%AA%E4%BA%BA%E7%A7%81%E5%AF%86%E8%A7%86%E9%A2%91%E5%BA%93/imgs/4.png)

### 正在上传

![](https://raw.githubusercontent.com/Andpathy/FilecoinPersVideoProj/main/%E5%9F%BA%E4%BA%8Efilecoin%E7%9A%84%E4%B8%AA%E4%BA%BA%E7%A7%81%E5%AF%86%E8%A7%86%E9%A2%91%E5%BA%93/imgs/5.png)

### Filecoin/IPFS使用：

**本项目中用户的个人视频与视频封面等图像资料均存储在IPFS/Filecoin中，并借助Web3.storage与Moralis进行信息的获取与钱包的登录等。**

![](https://raw.githubusercontent.com/Andpathy/FilecoinPersVideoProj/main/%E5%9F%BA%E4%BA%8Efilecoin%E7%9A%84%E4%B8%AA%E4%BA%BA%E7%A7%81%E5%AF%86%E8%A7%86%E9%A2%91%E5%BA%93/imgs/6.png)

![](https://raw.githubusercontent.com/Andpathy/FilecoinPersVideoProj/main/%E5%9F%BA%E4%BA%8Efilecoin%E7%9A%84%E4%B8%AA%E4%BA%BA%E7%A7%81%E5%AF%86%E8%A7%86%E9%A2%91%E5%BA%93/imgs/7.png)

## 运行指南

npm install

npm start

注意需要在index.js中设置Moralis appid 与 serverurl

## 参考

本项目参考了IPFS/Filecoin的B站教程与demo并参考了Moralis官方demo



