#StackTrace
跟踪当前函数的调用，初始目的是获取行号，以便打印log时用。

##code
test.js
```javascript
var ct = require('call-trace');

console.log(ct(),'hello');

console.log(ct().location,'hello');

function a() {
    console.log(ct().location,'call a()')
}
a();

function b() {
    console.log(ct().location,'call b()')
}

function c() {
    b();
    console.log(ct().location,'call c()');
}
c();
```

##output

```
{ stack: 
   [ ' Object.<anonymous> (e:\\workspace\\ACTools\\StackTrace\\test\\test.js:3:13)',
     ' Module._compile (module.js:460:26)',
     ' Object.Module._extensions..js (module.js:478:10)',
     ' Module.load (module.js:355:32)',
     ' Function.Module._load (module.js:310:12)',
     ' Function.Module.runMain (module.js:501:10)',
     ' startup (node.js:129:16)',
     ' node.js:814:3' ],
  filePath: 'e:\\workspace\\ACTools\\StackTrace\\test\\test.js',
  row: '3',
  column: '13',
  finaName: 'test.js',
  location: 'test.js:3:13' } 'hello'
  
test.js:5:13 hello

test.js:8:17 call a()

test.js:13:17 call b()

test.js:18:17 call c()

```