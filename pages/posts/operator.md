---
title: JS之操作符
toc: true
comments: false
date: 2018-09-06 15:24:33
categories: javascript
tags: 
    - JavaScript 
    - 操作符
---
记录JS操作符一些重要并容易被忽略的一些用法
<!-- more -->
## 与（&&）操作

![真值表](http://pe5s1kztp.bkt.clouddn.com/images/%E9%80%BB%E8%BE%91%E4%B8%8E%E7%9A%84%E7%9C%9F%E5%80%BC%E8%A1%A8.jpg "逻辑与真值表")

逻辑与操作属于`短路操作`，即如果第一个操作数能够决定结果，那么就不会再对第二个操作数求值,即第一个操作数为false的时候。

例：

```js
var found = true;
var result = (found && someUndefinedVariable); // 这里会发生错误
alert(result); // 这一行不会执行

```

*`若开始found为false，则无论第二个操作符是什么，最后都会执行result为false`*

## 或（||）操作

与逻辑与操作符相似，逻辑或操作符也是`短路操作符`。也就是说，如果第一个操作数的求值结果为true，就不会对第二个操作数求值了。

例：

```js
var found = true;
var result = (found || someUndefinedVariable); // 不会发生错误
alert(result); // 会执行（"true"）
```

## 加

`只要有一个是字符串，另一个也默认转成字符串拼接`

- '5'+null= 5null
- 5+null= 5
- 5+undefined= NaN

1、有一个是字符串，那么另外一个也会转换为字符串进行拼接。假如一个是字符串，另外一个是null或者undefined，那么相加，null或者undefined就会调用String()方法，获得字符串“null”或者“undefined”，然后进行拼接。

2、假如一个数字加null或者undefined，那么还是把null或者undefined进行Number()转换之后再相加。

3、剩下的原则和其他的差不多，就不多说了。

## 乘

在处理特殊值的情况下，乘法操作符遵循下列特殊的规则：

- 如果有一个操作数是 NaN，则结果是 NaN；
- 如果是 Infinity 与 0 相乘，则结果是 NaN；
- 如果是 Infinity 与非 0 数值相乘，则结果是 Infinity 或-Infinity，取决于有符号操作数
的符号；
- 如果是 Infinity 与 Infinity 相乘，则结果是 Infinity；
- 如果有一个操作数不是数值，则在后台调用 `Number()`将其转换为数值，然后再应用上面的规则。

## 减

将结果转换成数值运算

如果操作数是对象，则调用对象`valueOf`方法，如果结果是NaN那么结果就是NaN。如果没有valueOf方法，那么调用`toString()`方法，并将得到的字符串转换为数值。

## 其他

`除了加法以外，几乎都是，只要有一个操作数是数值，另一个也默认使用Number()进行数字转换`

## 除

规则与*乘*类似，总之按照正常的运算逻辑来...

有逻辑不通的请一律参考*乘*的特殊规则

其中：

- 0/0==NaN

### 取余、求模

- 0%0==NaN

### 关系操作符

统一返回true或者false

```text
    如果比较的两个数都是字符串，那么会比较字符串对应的字符串编码值。
    ```
-----

## 几个Number()转化取值

- Number(null)==0
- Number(undefined)==NaN

## 总结

之前对运算的概念比较模糊，遇到正常的值还好，一旦遇到undefined、null这类特殊的预算就完全懵，其实对于有数字的运算，无外乎几种结果：数值、NaN、Infinity，加法才可能产生字符串的结果。

最后，本文写的过程中也学习了,这篇文章 [js操作符类型转换大全（前端面试题之操作符）](https://www.haorooms.com/post/js_czf_mst)
