---
title: apidoc自动生成api接口文档
toc: true
comments: false
categories: RESTful
date: 2019-04-24 13:18:07
tag: RESTful,ApiDoc
description: 自动生成接口文档
---
[【ApiDoc】官方文档(翻译)](https://www.jianshu.com/p/9353d5cc1ef8)

## 安装

    npm install apidoc -g

## 运行

    pidoc -i myapp/ -o apidoc/ -t mytemplate/

## 配置

## 添加apidoc.json

        {
        "name": "example",
        "version": "0.1.0",
        "description": "apiDoc basic example",
        "title": "Custom apiDoc browser title",
        "url" : "https://api.github.com/v1"
        }

## 直接在package.json中配置

    {
        "name": "example",
        "version": "0.1.0",
        "description": "apiDoc basic example",
        "apidoc": {
            "title": "Custom apiDoc browser title",
            "url" : "https://api.github.com/v1"
        }
    }

## 在项目代码中添加注释

## demo

    /** 
    * @api {get} /user/:id Request User information 
    * @apiName GetUser 
    * @apiGroup User 
    * 
    * @apiParam {Number} id Users unique ID. 
    * 
    * @apiSuccess {String} firstname Firstname of the User. 
    * @apiSuccess {String} lastname Lastname of the User. 
    */

具体其他的apidoc注释参数参考官网或者文章顶部的中文翻译链接
