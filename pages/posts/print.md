---
title: 谷歌浏览器实现直接打印效果
toc: true
comments: false
categories: javascript
date: 2019-02-28 16:55:39
tag: 直接打印,谷歌,--kiosk-printing
---

1. 创建快捷方式;
2. 右击->属性->目标 的尾部添加  --kiosk-printing 注意前面有空格 
![img](/images/add--kiosk-printing.png)
3. 调用 `window.print()` 就可以实现直接打印了