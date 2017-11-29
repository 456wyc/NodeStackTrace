# wstacktrace
跟踪当前函数的调用，初始目的是获取行号，以便打印log时用。

## code
```javascript
var st = require('wstacktrace');

console.log(st(), 'hello');

console.log(st().location, 'hello');

function a() {
    console.log(st().location, 'call a()')
}

a();

function b() {
    console.log(st().location, 'call b()')
}

function c() {
    b();
    console.log(st().location, 'call c()');
}

c();

function promiseFn(a) {
    return new Promise(function (res, rej) {
        if (a === 1) {
            res(true)
        } else {
            rej(new Error('not 1'))
        }
    })
}

promiseFn(1).then(function (r) {
    console.log(st().location, r);
}).catch(function (e) {
    console.log(st().location, e);
});

promiseFn(2).then(function (r) {
    console.log(st().location, r);
}).catch(function (e) {
    console.log(st().location, e.message);
});
```

## output

```
StackTrace {
  stack: 
   [ 'at Object.<anonymous> (/Users/wyc/workspace/my-npm/wstacktrace/test/test.js:12:13)',
     'at Module._compile (module.js:624:30)',
     'at Object.Module._extensions..js (module.js:635:10)',
     'at Module.load (module.js:545:32)',
     'at tryModuleLoad (module.js:508:12)',
     'at Function.Module._load (module.js:500:3)',
     'at Function.Module.runMain (module.js:665:10)',
     'at startup (bootstrap_node.js:187:16)',
     'at bootstrap_node.js:607:3' ],
  filePath: '/Users/wyc/workspace/my-npm/wstacktrace/test/test.js',
  row: '12',
  column: '13',
  fileName: 'test.js',
  location: 'test.js:12:13' } 'hello'
test.js:14:13 hello
test.js:17:17 call a()
test.js:23:17 call b()
test.js:28:17 call c()
test.js:44:17 true
test.js:52:17 not 1

```