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


var path = require('path');
var util = require('util');

function StackTrace(stack) {
    var stackArray        = stack.split(/\s+at/).slice(2);
    var parsedFinalInvoke = stackArray[0].match(/\((.+):(\d+):(\d+)\)$/);
    this.stack            = stackArray;
    this.filePath         = parsedFinalInvoke[1];
    this.row              = parsedFinalInvoke[2];
    this.column           = parsedFinalInvoke[3];
    this.finaName         = path.parse(this.filePath).base;
    this.location         = util.format('%s:%s:%s', this.finaName, this.row, this.column);
}


module.exports = function () {
    try {
        //noinspection ExceptionCaughtLocallyJS
        throw new Error('lineNumber')
    } catch (e) {
        return new StackTrace(e.stack);
    }
};