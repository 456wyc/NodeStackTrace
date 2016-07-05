/********************************************************************
 * Copyright (C) 2015 上海魔霸网络科技有限公司. All Rights Reserved.
 *
 * @project StackTrace
 * @file WebStorm
 * @brief
 * @author wangyinchuan
 * @email wangyinchuan@7fgame.com
 * @date 2016/7/5
 *
 ********************************************************************
 */


var st = require('../index');

console.log(st(),'hello');

console.log(st().location,'hello');

function a() {
    console.log(st().location,'call a()')
}
a();

function b() {
    console.log(st().location,'call b()')
}

function c() {
    b();
    console.log(st().location,'call c()');
}
c();
