---
title: signalr实时推送--javascript客户端
toc: true
comments: false
categories: 
- javascript
- signalR
date: 2019-05-04 15:28:52
tags: signalR
keywords: signalR
description: signalR
---
## 引入

    <script src="/static/js/jquery.signalR-2.2.2.min.js"></script>

## 连接服务端

    <script src="http://192.168.1.77:9999/signalr/hubs"></script>

## 创建createHubProxy

let let obj={commonHub:null};
const connection= $.hubConnection('<http://192.168.1.77:9999>');
obj.commonHub =  connectionTL.createHubProxy('commonHub');

export function register(userId,callback){
    connection.start().done(function (res) {
        obj.commonHub.invoke("register",userId, res.id).done(function () {
            console.log("registerTL",userId,res.id);
            callback(res.id)
        });
    });
    connection.disconnected(function () {
        console.log("断开连接TL");  // 断开连接的处理方法
    });
}

export function connectionStop(){
    connection.stop();
};
export const commonHub = obj.commonHub; // 指向hub

## 进入页面时启动监听并调用register方法，register在监听后调用

    commonHub.on('方法名',()=>{})

## 离开页面时断开连接，调用connectionStop()
