
### TY

学习网址：
https://jkchao.github.io/typescript-book-chinese/project/declarationspaces.html

中文翻译网址：
https://zhongsp.gitbooks.io/typescript-handbook/doc/handbook/tutorials/Gulp.html

1、类型注解
三种使用方式：
```
interface Bar {}
class Bar {}
type Bar = {}
```
2、全局模块
```
定义 declare module ‘homeopath’ {}
例如在 global.d.ts 里面定义 declare module ‘foo’ { export var bar: number; }
在其他文件里面 import \* as list from ‘foo’ //foo 就是{bar: number}
```
3、命名空间 namespace
```
namespace Utility {
  export function log(msg) {
    console.log(msg);
  }
  export function error(msg) {
    console.log(msg);
  }
}
```

// useage
Utility.log('Call me');
Utility.error('maybe’);

4、基本注解
```
变量、参数、函数返回值的类型注解如下：
const num: number = 123
function identity(num: number): number { return num }
```
数组注解
```
const : boolean[];
boolArray = [true, false];
console.log(boolArray[0]); // true
console.log(boolArray.length); // 2

boolArray[1] = true;
boolArray = [false, false];

boolArray[0] = 'false'; // Error
boolArray = 'false'; // Error
boolArray = [true, 'false']; // Error

接口：interface 注意：定义后里面的值不可多不可少，类型还必须要一直才可以
interface Name {
first: string;
second: string;
}
```

特殊类型：
```
any：
null，undefined 这两个值可以给任何定义了类型的值赋值
如 let num：number num=null
void：使用它表示一个函数没有返回值
function log(message: string): void {
console.log(message);
}

```
联合类型： 用 | 分开
```
command: string[] | string
```
泛型：
```
<T>自己定义一个名字，告诉函数自动检查传入的数组，也就是 ts 推断参数类型，自动赋上安全类型，如例子中给的是 number 数组，那么返回的值也应该是这个，并且在更改的时候也必须为 number，如果不是则会报错
function reverse<T>(items: T[]): T[] {  
  const toreturn = [];
  for (let i = items.length - 1; i >= 0; i--) {
    toreturn.push(items[i]);
  }
  return toreturn;
}
const simple = [1, 2, 3];
const reversed = reverse(simple);
reversed[1] = '1'
```
5、declare 环境申明
```
一般用在.d.ts 的申明文件里面
例如全局模块 globals.d.ts， 可以向上看
```
6、@types 模块的 install。 其实就是一种声明
```
例如@types/react @types/react-dom 相当于安装文件声明
然后导入 react 到你的.tsx 文件（import \* as React from ‘react）
使用@types/前缀表示我们额外要获取 React 和 React-DOM 的声明文件
```
7、类型断言
```
当你比类型检查起更加清楚一个表达式的类型的时候，可以用类型断言，
在 react 当中用 as Foo 来进行类型断言，例如下：
document.getElementById('root') as HTMLElement
```
8、在.js 文件里面使用类型，俗称 JSDoc
```
声明的方式可以查看https://github.com/Microsoft/TypeScript/wiki/JSDoc-support-in-JavaScript
例如/**@types {number}\*/ var a. a=1 //true. a=‘123’ //error
也就是前面两个** 后面一个\*
```
