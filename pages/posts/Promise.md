---
title: Promise方法
toc: true
comments: false
categories: javascript
date: 2019-12-24 14:21:05
tag: JS,Promise 
keywords: Promise
description: Promise
---


## polyfill初级

    class MyPomise {
    constructor(handle){
        if(typeof handle!=='function){
            throw new Error('MyPromise must accept a function as a parameter')
        }
        //添加状态
        this._status='PENDING'
        //添加值
        this._val=undefined

        // 执行handle
        try{
            handle(this._resolve.bind(this),this._reject.bind(this))
        }catch(err){
            this.reject(err)
        }
    }
        _resolve(val){
            if(this._status!=='PENDING'){
                return
            }
            this._status='FULFILLED'
            this._val=val
        }
        _reject(err){
            if(this._status!=='PENDING'){
                return
            }
            this._status='REJECTED'
            this._val=err
        }
    }

## polyfill中级
