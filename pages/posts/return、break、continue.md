---
title: JavaScript中return、break、continue的区别
toc: true
comments: false
categories: javascript
date: 2018-09-07 13:49:28
tags: 
    - return
    - break
    - continue
---

**break是跳出一层循环，continue是结束一趟循环 ,return才是结束所有层循环!**

如果有多层for循环,break会跳出当前这一层,去执行最外层循环(而不是退出所有层循环);而continue则结束当前次循环(继续)而去执行下次循环,但本层循环没有结束.(注意一层循环和一次循环的区别:一层循环包含若干(i)次循环)

### return

 return 从当前的**方法**中退出,返回到该调用的方法的语句处,继续执行。 

### break

 1. **只能在循环体内和switch语句体内使用break语句。**
 2. 当break出现在循环体中的switch语句体内时，其作用只是跳出该switch语句体。 
 3. 当break出现在循环体中，但并不在switch语句体内时，则在执行break后，跳出本层循环体。
 4. 在循环结构中，应用break语句使流程跳出**本层**循环体，从而提前结束本层循环。

### continue

 其作用是结束本次循环，即跳过本次循环体中余下尚未执行的语句，接着再一次进行循环的条件判定