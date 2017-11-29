/********************************************************************
 * @project wstacktrace
 * @brief
 * @author wangyinchuan
 * @date 2016/7/5
 ********************************************************************
 */


var st = require('../index');

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