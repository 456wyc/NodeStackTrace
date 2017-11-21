/********************************************************************
 *
 * @project wstacktrace
 * @brief
 * @author wangyinchuan
 * @date 2016/7/5
 *
 ********************************************************************
 */


var path = require('path');
var util = require('util');

function StackTrace(stack) {
    if (stack) {
        var stackArray        = stack.split(/\s+at/).slice(2) || 'unknown';
        var parsedFinalInvoke = stackArray[0].match(/\((.+):(\d+):(\d+)\)$/) || 'unknown';
        this.stack            = stackArray || 'unknown';
        this.filePath         = parsedFinalInvoke[1] || 'unknown';
        this.row              = parsedFinalInvoke[2] || 'unknown';
        this.column           = parsedFinalInvoke[3] || 'unknown';
        this.fileName         = path.parse(this.filePath).base || 'unknown';
        this.location         = util.format('%s:%s:%s', this.fileName, this.row, this.column) || 'unknown';
    } else {
        this.stack    = 'unknown';
        this.filePath = 'unknown';
        this.row      = 'unknown';
        this.column   = 'unknown';
        this.fileName = 'unknown';
        this.location = 'unknown';
    }
}

/**
 *
 * @returns {StackTrace}
 * @returns {StackTrace.stack   } invoke stack
 * @returns {StackTrace.filePath} file full path
 * @returns {StackTrace.row     } row number
 * @returns {StackTrace.column  } column number
 * @returns {StackTrace.fileName} file name
 * @returns {StackTrace.location} formatted 'filename:row:column'
 */
module.exports = function () {
    try {
        //noinspection ExceptionCaughtLocallyJS
        throw new Error('lineNumber');
    } catch (e) {
        return new StackTrace(e.stack);
    }
};