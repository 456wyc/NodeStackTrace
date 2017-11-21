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
