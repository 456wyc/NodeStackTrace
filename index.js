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

function WStackTraceErr(message, extra) {
    this.name    = this.constructor.name;
    this.message = message;
    this.extra   = extra;
    Error.captureStackTrace(this, this.constructor);
}

util.inherits(WStackTraceErr, Error);

/*
stack style:

[
' /Users/wyc/workspace/SandLacus/slcloud/rdweb/models/account.js:49:25',
  ' newTickHandler (/Users/wyc/workspace/SandLacus/slcloud/rdweb/node_modules/mpromise/lib/promise.js:234:18)',
  ' _combinedTickCallback (internal/process/next_tick.js:131:7)',
  ' process._tickDomainCallback (internal/process/next_tick.js:218:9)'
]


[
'    at Object.<anonymous> (/Users/wyc/workspace/my-npm/wstacktrace/test/test.js:12:13)',
'    at Module._compile (module.js:624:30)',
'    at Object.Module._extensions..js (module.js:635:10)',
'    at Module.load (module.js:545:32)',
'    at tryModuleLoad (module.js:508:12)',
'    at Function.Module._load (module.js:500:3)',
'    at Function.Module.runMain (module.js:665:10)',
'    at startup (bootstrap_node.js:187:16)',
'    at bootstrap_node.js:607:3' ]
*/

/**
 *
 * @param stack
 * @constructor
 */
function StackTrace(stack) {
    this.stack    = 'unknown';
    this.filePath = 'unknown';
    this.row      = 'unknown';
    this.column   = 'unknown';
    this.fileName = 'unknown';
    if (stack) {
        var stackArray        = stack.split(/\n\s*/) || [];
        this.stack            = stackArray.slice(2);
        var parsedFinalInvoke = this.stack.length ? this.stack[0].match(/\(?(\/.+):(\d+):(\d+)\)?$/) : [];
        this.filePath         = parsedFinalInvoke[1] || 'unknown';
        this.row              = parsedFinalInvoke[2] || 'unknown';
        this.column           = parsedFinalInvoke[3] || 'unknown';
        this.fileName         = this.filePath === 'unknown' ? 'unknown' : path.parse(this.filePath).base;
    }
    this.location = util.format('%s:%s:%s', this.fileName, this.row, this.column);
}

/**
 *
 * @param err
 * @returns {StackTrace}
 */
module.exports = function (err) {
    var e = err || new WStackTraceErr('wyc stack trace');
    return new StackTrace(e.stack);
};