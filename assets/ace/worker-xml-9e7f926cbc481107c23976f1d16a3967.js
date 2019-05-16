!function(t){if(!(void 0!==t.window&&t.document||t.require&&t.define)){t.console||(t.console=function(){var t=Array.prototype.slice.call(arguments,0)
postMessage({type:"log",data:t})},t.console.error=t.console.warn=t.console.log=t.console.trace=t.console),t.window=t,t.ace=t,t.onerror=function(t,e,n,r,i){postMessage({type:"error",data:{message:t,data:i.data,file:e,line:n,col:r,stack:i.stack}})},t.normalizeModule=function(e,n){if(-1!==n.indexOf("!")){var r=n.split("!")
return t.normalizeModule(e,r[0])+"!"+t.normalizeModule(e,r[1])}if("."==n.charAt(0)){var i=e.split("/").slice(0,-1).join("/")
for(n=(i?i+"/":"")+n;-1!==n.indexOf(".")&&o!=n;){var o=n
n=n.replace(/^\.\//,"").replace(/\/\.\//,"/").replace(/[^\/]+\/\.\.\//,"")}}return n},t.require=function(e,n){if(n||(n=e,e=null),!n.charAt)throw new Error("worker.js require() accepts only (parentId, id) as arguments")
n=t.normalizeModule(e,n)
var r=t.require.modules[n]
if(r)return r.initialized||(r.initialized=!0,r.exports=r.factory().exports),r.exports
if(!t.require.tlns)return console.log("unable to load "+n)
var i=function(t,e){var n=t,r=""
for(;n;){var i=e[n]
if("string"==typeof i)return i+r
if(i)return i.location.replace(/\/*$/,"/")+(r||i.main||i.name)
if(!1===i)return""
var o=n.lastIndexOf("/")
if(-1===o)break
r=n.substr(o)+r,n=n.slice(0,o)}return t}(n,t.require.tlns)
return".js"!=i.slice(-3)&&(i+=".js"),t.require.id=n,t.require.modules[n]={},importScripts(i),t.require(e,n)},t.require.modules={},t.require.tlns={},t.define=function(e,n,r){if(2==arguments.length?(r=n,"string"!=typeof e&&(n=e,e=t.require.id)):1==arguments.length&&(r=e,n=[],e=t.require.id),"function"==typeof r){n.length||(n=["require","exports","module"])
var i=function(n){return t.require(e,n)}
t.require.modules[e]={exports:{},factory:function(){var t=this,e=r.apply(this,n.slice(0,r.length).map(function(e){switch(e){case"require":return i
case"exports":return t.exports
case"module":return t
default:return i(e)}}))
return e&&(t.exports=e),t}}}else t.require.modules[e]={exports:r,initialized:!0}},t.define.amd={},require.tlns={},t.initBaseUrls=function(t){for(var e in t)require.tlns[e]=t[e]},t.initSender=function(){var e=t.require("ace/lib/event_emitter").EventEmitter,n=t.require("ace/lib/oop"),r=function(){}
return function(){n.implement(this,e),this.callback=function(t,e){postMessage({type:"call",id:e,data:t})},this.emit=function(t,e){postMessage({type:"event",name:t,data:e})}}.call(r.prototype),new r}
var e=t.main=null,n=t.sender=null
t.onmessage=function(r){var i=r.data
if(i.event&&n)n._signal(i.event,i.data)
else if(i.command)if(e[i.command])e[i.command].apply(e,i.args)
else{if(!t[i.command])throw new Error("Unknown command:"+i.command)
t[i.command].apply(t,i.args)}else if(i.init){t.initBaseUrls(i.tlns),require("ace/lib/es5-shim"),n=t.sender=t.initSender()
var o=require(i.module)[i.classname]
e=t.main=new o(n)}}}}(this),ace.define("ace/lib/oop",[],function(t,e,n){"use strict"
e.inherits=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})},e.mixin=function(t,e){for(var n in e)t[n]=e[n]
return t},e.implement=function(t,n){e.mixin(t,n)}}),ace.define("ace/lib/lang",[],function(t,e,n){"use strict"
e.last=function(t){return t[t.length-1]},e.stringReverse=function(t){return t.split("").reverse().join("")},e.stringRepeat=function(t,e){for(var n="";e>0;)1&e&&(n+=t),(e>>=1)&&(t+=t)
return n}
var r=/^\s\s*/,i=/\s\s*$/
e.stringTrimLeft=function(t){return t.replace(r,"")},e.stringTrimRight=function(t){return t.replace(i,"")},e.copyObject=function(t){var e={}
for(var n in t)e[n]=t[n]
return e},e.copyArray=function(t){for(var e=[],n=0,r=t.length;n<r;n++)t[n]&&"object"==typeof t[n]?e[n]=this.copyObject(t[n]):e[n]=t[n]
return e},e.deepCopy=function t(e){if("object"!=typeof e||!e)return e
var n
if(Array.isArray(e)){n=[]
for(var r=0;r<e.length;r++)n[r]=t(e[r])
return n}if("[object Object]"!==Object.prototype.toString.call(e))return e
for(var r in n={},e)n[r]=t(e[r])
return n},e.arrayToMap=function(t){for(var e={},n=0;n<t.length;n++)e[t[n]]=1
return e},e.createMap=function(t){var e=Object.create(null)
for(var n in t)e[n]=t[n]
return e},e.arrayRemove=function(t,e){for(var n=0;n<=t.length;n++)e===t[n]&&t.splice(n,1)},e.escapeRegExp=function(t){return t.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1")},e.escapeHTML=function(t){return(""+t).replace(/&/g,"&#38;").replace(/"/g,"&#34;").replace(/'/g,"&#39;").replace(/</g,"&#60;")},e.getMatchOffsets=function(t,e){var n=[]
return t.replace(e,function(t){n.push({offset:arguments[arguments.length-2],length:t.length})}),n},e.deferredCall=function(t){var e=null,n=function(){e=null,t()},r=function(t){return r.cancel(),e=setTimeout(n,t||0),r}
return r.schedule=r,r.call=function(){return this.cancel(),t(),r},r.cancel=function(){return clearTimeout(e),e=null,r},r.isPending=function(){return e},r},e.delayedCall=function(t,e){var n=null,r=function(){n=null,t()},i=function(t){null==n&&(n=setTimeout(r,t||e))}
return i.delay=function(t){n&&clearTimeout(n),n=setTimeout(r,t||e)},i.schedule=i,i.call=function(){this.cancel(),t()},i.cancel=function(){n&&clearTimeout(n),n=null},i.isPending=function(){return n},i}}),ace.define("ace/range",[],function(t,e,n){"use strict"
var r=function(t,e,n,r){this.start={row:t,column:e},this.end={row:n,column:r}};(function(){this.isEqual=function(t){return this.start.row===t.start.row&&this.end.row===t.end.row&&this.start.column===t.start.column&&this.end.column===t.end.column},this.toString=function(){return"Range: ["+this.start.row+"/"+this.start.column+"] -> ["+this.end.row+"/"+this.end.column+"]"},this.contains=function(t,e){return 0==this.compare(t,e)},this.compareRange=function(t){var e,n=t.end,r=t.start
return 1==(e=this.compare(n.row,n.column))?1==(e=this.compare(r.row,r.column))?2:0==e?1:0:-1==e?-2:-1==(e=this.compare(r.row,r.column))?-1:1==e?42:0},this.comparePoint=function(t){return this.compare(t.row,t.column)},this.containsRange=function(t){return 0==this.comparePoint(t.start)&&0==this.comparePoint(t.end)},this.intersects=function(t){var e=this.compareRange(t)
return-1==e||0==e||1==e},this.isEnd=function(t,e){return this.end.row==t&&this.end.column==e},this.isStart=function(t,e){return this.start.row==t&&this.start.column==e},this.setStart=function(t,e){"object"==typeof t?(this.start.column=t.column,this.start.row=t.row):(this.start.row=t,this.start.column=e)},this.setEnd=function(t,e){"object"==typeof t?(this.end.column=t.column,this.end.row=t.row):(this.end.row=t,this.end.column=e)},this.inside=function(t,e){return 0==this.compare(t,e)&&(!this.isEnd(t,e)&&!this.isStart(t,e))},this.insideStart=function(t,e){return 0==this.compare(t,e)&&!this.isEnd(t,e)},this.insideEnd=function(t,e){return 0==this.compare(t,e)&&!this.isStart(t,e)},this.compare=function(t,e){return this.isMultiLine()||t!==this.start.row?t<this.start.row?-1:t>this.end.row?1:this.start.row===t?e>=this.start.column?0:-1:this.end.row===t?e<=this.end.column?0:1:0:e<this.start.column?-1:e>this.end.column?1:0},this.compareStart=function(t,e){return this.start.row==t&&this.start.column==e?-1:this.compare(t,e)},this.compareEnd=function(t,e){return this.end.row==t&&this.end.column==e?1:this.compare(t,e)},this.compareInside=function(t,e){return this.end.row==t&&this.end.column==e?1:this.start.row==t&&this.start.column==e?-1:this.compare(t,e)},this.clipRows=function(t,e){if(this.end.row>e)var n={row:e+1,column:0}
else if(this.end.row<t)n={row:t,column:0}
if(this.start.row>e)var i={row:e+1,column:0}
else if(this.start.row<t)i={row:t,column:0}
return r.fromPoints(i||this.start,n||this.end)},this.extend=function(t,e){var n=this.compare(t,e)
if(0==n)return this
if(-1==n)var i={row:t,column:e}
else var o={row:t,column:e}
return r.fromPoints(i||this.start,o||this.end)},this.isEmpty=function(){return this.start.row===this.end.row&&this.start.column===this.end.column},this.isMultiLine=function(){return this.start.row!==this.end.row},this.clone=function(){return r.fromPoints(this.start,this.end)},this.collapseRows=function(){return 0==this.end.column?new r(this.start.row,0,Math.max(this.start.row,this.end.row-1),0):new r(this.start.row,0,this.end.row,0)},this.toScreenRange=function(t){var e=t.documentToScreenPosition(this.start),n=t.documentToScreenPosition(this.end)
return new r(e.row,e.column,n.row,n.column)},this.moveBy=function(t,e){this.start.row+=t,this.start.column+=e,this.end.row+=t,this.end.column+=e}}).call(r.prototype),r.fromPoints=function(t,e){return new r(t.row,t.column,e.row,e.column)},r.comparePoints=function(t,e){return t.row-e.row||t.column-e.column},r.comparePoints=function(t,e){return t.row-e.row||t.column-e.column},e.Range=r}),ace.define("ace/apply_delta",[],function(t,e,n){"use strict"
e.applyDelta=function(t,e,n){var r=e.start.row,i=e.start.column,o=t[r]||""
switch(e.action){case"insert":if(1===e.lines.length)t[r]=o.substring(0,i)+e.lines[0]+o.substring(i)
else{var s=[r,1].concat(e.lines)
t.splice.apply(t,s),t[r]=o.substring(0,i)+t[r],t[r+e.lines.length-1]+=o.substring(i)}break
case"remove":var a=e.end.column,c=e.end.row
r===c?t[r]=o.substring(0,i)+o.substring(a):t.splice(r,c-r+1,o.substring(0,i)+t[c].substring(a))}}}),ace.define("ace/lib/event_emitter",[],function(t,e,n){"use strict"
var r={},i=function(){this.propagationStopped=!0},o=function(){this.defaultPrevented=!0}
r._emit=r._dispatchEvent=function(t,e){this._eventRegistry||(this._eventRegistry={}),this._defaultHandlers||(this._defaultHandlers={})
var n=this._eventRegistry[t]||[],r=this._defaultHandlers[t]
if(n.length||r){"object"==typeof e&&e||(e={}),e.type||(e.type=t),e.stopPropagation||(e.stopPropagation=i),e.preventDefault||(e.preventDefault=o),n=n.slice()
for(var s=0;s<n.length&&(n[s](e,this),!e.propagationStopped);s++);return r&&!e.defaultPrevented?r(e,this):void 0}},r._signal=function(t,e){var n=(this._eventRegistry||{})[t]
if(n){n=n.slice()
for(var r=0;r<n.length;r++)n[r](e,this)}},r.once=function(t,e){var n=this
if(this.addEventListener(t,function r(){n.removeEventListener(t,r),e.apply(null,arguments)}),!e)return new Promise(function(t){e=t})},r.setDefaultHandler=function(t,e){var n=this._defaultHandlers
if(n||(n=this._defaultHandlers={_disabled_:{}}),n[t]){var r=n[t],i=n._disabled_[t]
i||(n._disabled_[t]=i=[]),i.push(r)
var o=i.indexOf(e);-1!=o&&i.splice(o,1)}n[t]=e},r.removeDefaultHandler=function(t,e){var n=this._defaultHandlers
if(n){var r=n._disabled_[t]
if(n[t]==e)r&&this.setDefaultHandler(t,r.pop())
else if(r){var i=r.indexOf(e);-1!=i&&r.splice(i,1)}}},r.on=r.addEventListener=function(t,e,n){this._eventRegistry=this._eventRegistry||{}
var r=this._eventRegistry[t]
return r||(r=this._eventRegistry[t]=[]),-1==r.indexOf(e)&&r[n?"unshift":"push"](e),e},r.off=r.removeListener=r.removeEventListener=function(t,e){this._eventRegistry=this._eventRegistry||{}
var n=this._eventRegistry[t]
if(n){var r=n.indexOf(e);-1!==r&&n.splice(r,1)}},r.removeAllListeners=function(t){this._eventRegistry&&(this._eventRegistry[t]=[])},e.EventEmitter=r}),ace.define("ace/anchor",[],function(t,e,n){"use strict"
var r=t("./lib/oop"),i=t("./lib/event_emitter").EventEmitter,o=e.Anchor=function(t,e,n){this.$onChange=this.onChange.bind(this),this.attach(t),void 0===n?this.setPosition(e.row,e.column):this.setPosition(e,n)};(function(){function t(t,e,n){var r=n?t.column<=e.column:t.column<e.column
return t.row<e.row||t.row==e.row&&r}r.implement(this,i),this.getPosition=function(){return this.$clipPositionToDocument(this.row,this.column)},this.getDocument=function(){return this.document},this.$insertRight=!1,this.onChange=function(e){if(!(e.start.row==e.end.row&&e.start.row!=this.row||e.start.row>this.row)){var n=function(e,n,r){var i="insert"==e.action,o=(i?1:-1)*(e.end.row-e.start.row),s=(i?1:-1)*(e.end.column-e.start.column),a=e.start,c=i?a:e.end
if(t(n,a,r))return{row:n.row,column:n.column}
if(t(c,n,!r))return{row:n.row+o,column:n.column+(n.row==c.row?s:0)}
return{row:a.row,column:a.column}}(e,{row:this.row,column:this.column},this.$insertRight)
this.setPosition(n.row,n.column,!0)}},this.setPosition=function(t,e,n){var r
if(r=n?{row:t,column:e}:this.$clipPositionToDocument(t,e),this.row!=r.row||this.column!=r.column){var i={row:this.row,column:this.column}
this.row=r.row,this.column=r.column,this._signal("change",{old:i,value:r})}},this.detach=function(){this.document.removeEventListener("change",this.$onChange)},this.attach=function(t){this.document=t||this.document,this.document.on("change",this.$onChange)},this.$clipPositionToDocument=function(t,e){var n={}
return t>=this.document.getLength()?(n.row=Math.max(0,this.document.getLength()-1),n.column=this.document.getLine(n.row).length):t<0?(n.row=0,n.column=0):(n.row=t,n.column=Math.min(this.document.getLine(n.row).length,Math.max(0,e))),e<0&&(n.column=0),n}}).call(o.prototype)}),ace.define("ace/document",[],function(t,e,n){"use strict"
var r=t("./lib/oop"),i=t("./apply_delta").applyDelta,o=t("./lib/event_emitter").EventEmitter,s=t("./range").Range,a=t("./anchor").Anchor,c=function(t){this.$lines=[""],0===t.length?this.$lines=[""]:Array.isArray(t)?this.insertMergedLines({row:0,column:0},t):this.insert({row:0,column:0},t)};(function(){r.implement(this,o),this.setValue=function(t){var e=this.getLength()-1
this.remove(new s(0,0,e,this.getLine(e).length)),this.insert({row:0,column:0},t)},this.getValue=function(){return this.getAllLines().join(this.getNewLineCharacter())},this.createAnchor=function(t,e){return new a(this,t,e)},0==="aaa".split(/a/).length?this.$split=function(t){return t.replace(/\r\n|\r/g,"\n").split("\n")}:this.$split=function(t){return t.split(/\r\n|\r|\n/)},this.$detectNewLine=function(t){var e=t.match(/^.*?(\r\n|\r|\n)/m)
this.$autoNewLine=e?e[1]:"\n",this._signal("changeNewLineMode")},this.getNewLineCharacter=function(){switch(this.$newLineMode){case"windows":return"\r\n"
case"unix":return"\n"
default:return this.$autoNewLine||"\n"}},this.$autoNewLine="",this.$newLineMode="auto",this.setNewLineMode=function(t){this.$newLineMode!==t&&(this.$newLineMode=t,this._signal("changeNewLineMode"))},this.getNewLineMode=function(){return this.$newLineMode},this.isNewLine=function(t){return"\r\n"==t||"\r"==t||"\n"==t},this.getLine=function(t){return this.$lines[t]||""},this.getLines=function(t,e){return this.$lines.slice(t,e+1)},this.getAllLines=function(){return this.getLines(0,this.getLength())},this.getLength=function(){return this.$lines.length},this.getTextRange=function(t){return this.getLinesForRange(t).join(this.getNewLineCharacter())},this.getLinesForRange=function(t){var e
if(t.start.row===t.end.row)e=[this.getLine(t.start.row).substring(t.start.column,t.end.column)]
else{(e=this.getLines(t.start.row,t.end.row))[0]=(e[0]||"").substring(t.start.column)
var n=e.length-1
t.end.row-t.start.row==n&&(e[n]=e[n].substring(0,t.end.column))}return e},this.insertLines=function(t,e){return console.warn("Use of document.insertLines is deprecated. Use the insertFullLines method instead."),this.insertFullLines(t,e)},this.removeLines=function(t,e){return console.warn("Use of document.removeLines is deprecated. Use the removeFullLines method instead."),this.removeFullLines(t,e)},this.insertNewLine=function(t){return console.warn("Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead."),this.insertMergedLines(t,["",""])},this.insert=function(t,e){return this.getLength()<=1&&this.$detectNewLine(e),this.insertMergedLines(t,this.$split(e))},this.insertInLine=function(t,e){var n=this.clippedPos(t.row,t.column),r=this.pos(t.row,t.column+e.length)
return this.applyDelta({start:n,end:r,action:"insert",lines:[e]},!0),this.clonePos(r)},this.clippedPos=function(t,e){var n=this.getLength()
void 0===t?t=n:t<0?t=0:t>=n&&(t=n-1,e=void 0)
var r=this.getLine(t)
return null==e&&(e=r.length),{row:t,column:e=Math.min(Math.max(e,0),r.length)}},this.clonePos=function(t){return{row:t.row,column:t.column}},this.pos=function(t,e){return{row:t,column:e}},this.$clipPosition=function(t){var e=this.getLength()
return t.row>=e?(t.row=Math.max(0,e-1),t.column=this.getLine(e-1).length):(t.row=Math.max(0,t.row),t.column=Math.min(Math.max(t.column,0),this.getLine(t.row).length)),t},this.insertFullLines=function(t,e){var n=0;(t=Math.min(Math.max(t,0),this.getLength()))<this.getLength()?(e=e.concat([""]),n=0):(e=[""].concat(e),t--,n=this.$lines[t].length),this.insertMergedLines({row:t,column:n},e)},this.insertMergedLines=function(t,e){var n=this.clippedPos(t.row,t.column),r={row:n.row+e.length-1,column:(1==e.length?n.column:0)+e[e.length-1].length}
return this.applyDelta({start:n,end:r,action:"insert",lines:e}),this.clonePos(r)},this.remove=function(t){var e=this.clippedPos(t.start.row,t.start.column),n=this.clippedPos(t.end.row,t.end.column)
return this.applyDelta({start:e,end:n,action:"remove",lines:this.getLinesForRange({start:e,end:n})}),this.clonePos(e)}
this.removeInLine=function(t,e,n){var r=this.clippedPos(t,e),i=this.clippedPos(t,n)
return this.applyDelta({start:r,end:i,action:"remove",lines:this.getLinesForRange({start:r,end:i})},!0),this.clonePos(r)},this.removeFullLines=function(t,e){t=Math.min(Math.max(0,t),this.getLength()-1)
var n=(e=Math.min(Math.max(0,e),this.getLength()-1))==this.getLength()-1&&t>0,r=e<this.getLength()-1,i=n?t-1:t,o=n?this.getLine(i).length:0,a=r?e+1:e,c=r?0:this.getLine(a).length,u=new s(i,o,a,c),l=this.$lines.slice(t,e+1)
return this.applyDelta({start:u.start,end:u.end,action:"remove",lines:this.getLinesForRange(u)}),l},this.removeNewLine=function(t){t<this.getLength()-1&&t>=0&&this.applyDelta({start:this.pos(t,this.getLine(t).length),end:this.pos(t+1,0),action:"remove",lines:["",""]})},this.replace=function(t,e){return t instanceof s||(t=s.fromPoints(t.start,t.end)),0===e.length&&t.isEmpty()?t.start:e==this.getTextRange(t)?t.end:(this.remove(t),e?this.insert(t.start,e):t.start)},this.applyDeltas=function(t){for(var e=0;e<t.length;e++)this.applyDelta(t[e])},this.revertDeltas=function(t){for(var e=t.length-1;e>=0;e--)this.revertDelta(t[e])},this.applyDelta=function(t,e){var n="insert"==t.action;(n?t.lines.length<=1&&!t.lines[0]:!s.comparePoints(t.start,t.end))||(n&&t.lines.length>2e4?this.$splitAndapplyLargeDelta(t,2e4):(i(this.$lines,t,e),this._signal("change",t)))},this.$splitAndapplyLargeDelta=function(t,e){for(var n=t.lines,r=n.length-e+1,i=t.start.row,o=t.start.column,s=0,a=0;s<r;s=a){a+=e-1
var c=n.slice(s,a)
c.push(""),this.applyDelta({start:this.pos(i+s,o),end:this.pos(i+a,o=0),action:t.action,lines:c},!0)}t.lines=n.slice(s),t.start.row=i+s,t.start.column=o,this.applyDelta(t,!0)},this.revertDelta=function(t){this.applyDelta({start:this.clonePos(t.start),end:this.clonePos(t.end),action:"insert"==t.action?"remove":"insert",lines:t.lines.slice()})},this.indexToPosition=function(t,e){for(var n=this.$lines||this.getAllLines(),r=this.getNewLineCharacter().length,i=e||0,o=n.length;i<o;i++)if((t-=n[i].length+r)<0)return{row:i,column:t+n[i].length+r}
return{row:o-1,column:t+n[o-1].length+r}},this.positionToIndex=function(t,e){for(var n=this.$lines||this.getAllLines(),r=this.getNewLineCharacter().length,i=0,o=Math.min(t.row,n.length),s=e||0;s<o;++s)i+=n[s].length+r
return i+t.column}}).call(c.prototype),e.Document=c}),ace.define("ace/worker/mirror",[],function(t,e,n){"use strict"
t("../range").Range
var r=t("../document").Document,i=t("../lib/lang"),o=e.Mirror=function(t){this.sender=t
var e=this.doc=new r(""),n=this.deferredUpdate=i.delayedCall(this.onUpdate.bind(this)),o=this
t.on("change",function(t){var r=t.data
if(r[0].start)e.applyDeltas(r)
else for(var i=0;i<r.length;i+=2){if(Array.isArray(r[i+1]))var s={action:"insert",start:r[i],lines:r[i+1]}
else s={action:"remove",start:r[i],end:r[i+1]}
e.applyDelta(s,!0)}if(o.$timeout)return n.schedule(o.$timeout)
o.onUpdate()})};(function(){this.$timeout=500,this.setTimeout=function(t){this.$timeout=t},this.setValue=function(t){this.doc.setValue(t),this.deferredUpdate.schedule(this.$timeout)},this.getValue=function(t){this.sender.callback(this.doc.getValue(),t)},this.onUpdate=function(){},this.isPending=function(){return this.deferredUpdate.isPending()}}).call(o.prototype)}),ace.define("ace/mode/xml/sax",[],function(t,e,n){var r=/[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,i=new RegExp("[\\-\\.0-9"+r.source.slice(1,-1)+"·̀-ͯ\\ux203F-⁀]"),o=new RegExp("^"+r.source+i.source+"*(?::"+r.source+i.source+"*)?$"),s=0,a=1,c=2,u=3,l=4,h=5,f=6,p=7
function d(){}function m(t,e){return e.lineNumber=t.lineNumber,e.columnNumber=t.columnNumber,e}function g(t,e,n,r,i){for(var o,d=++e,m=s;;){var g=t.charAt(d)
switch(g){case"=":if(m===a)o=t.slice(e,d),m=u
else{if(m!==c)throw new Error("attribute equal must after attrName")
m=u}break
case"'":case'"':if(m===u){if(e=d+1,!((d=t.indexOf(g,e))>0))throw new Error("attribute value no end '"+g+"' match")
w=t.slice(e,d).replace(/&#?\w+;/g,r),n.add(o,w,e-1),m=h}else{if(m!=l)throw new Error('attribute value must after "="')
w=t.slice(e,d).replace(/&#?\w+;/g,r),n.add(o,w,e),i.warning('attribute "'+o+'" missed start quot('+g+")!!"),e=d+1,m=h}break
case"/":switch(m){case s:n.setTagName(t.slice(e,d))
case h:case f:case p:m=p,n.closed=!0
case l:case a:case c:break
default:throw new Error("attribute invalid close char('/')")}break
case"":i.error("unexpected end of input")
case">":switch(m){case s:n.setTagName(t.slice(e,d))
case h:case f:case p:break
case l:case a:"/"===(w=t.slice(e,d)).slice(-1)&&(n.closed=!0,w=w.slice(0,-1))
case c:m===c&&(w=o),m==l?(i.warning('attribute "'+w+'" missed quot(")!!'),n.add(o,w.replace(/&#?\w+;/g,r),e)):(i.warning('attribute "'+w+'" missed value!! "'+w+'" instead!!'),n.add(w,w,e))
break
case u:throw new Error("attribute value missed!!")}return d
case"":g=" "
default:if(g<=" ")switch(m){case s:n.setTagName(t.slice(e,d)),m=f
break
case a:o=t.slice(e,d),m=c
break
case l:var w=t.slice(e,d).replace(/&#?\w+;/g,r)
i.warning('attribute "'+w+'" missed quot(")!!'),n.add(o,w,e)
case h:m=f}else switch(m){case c:i.warning('attribute "'+o+'" missed value!! "'+o+'" instead!!'),n.add(o,o,e),e=d,m=a
break
case h:i.warning('attribute space is required"'+o+'"!!')
case f:m=a,e=d
break
case u:m=l,e=d
break
case p:throw new Error("elements closed character '/' and '>' must be connected to")}}d++}}function w(t,e,n){for(var r=t.tagName,i=null,o=n[n.length-1].currentNSMap,s=t.length;s--;){var a=t[s],c=a.qName,u=a.value
if((p=c.indexOf(":"))>0)var l=a.prefix=c.slice(0,p),h=c.slice(p+1),f="xmlns"===l&&h
else h=c,l=null,f="xmlns"===c&&""
a.localName=h,!1!==f&&(null==i&&(i={},b(o,o={})),o[f]=i[f]=u,a.uri="http://www.w3.org/2000/xmlns/",e.startPrefixMapping(f,u))}for(s=t.length;s--;){(l=(a=t[s]).prefix)&&("xml"===l&&(a.uri="http://www.w3.org/XML/1998/namespace"),"xmlns"!==l&&(a.uri=o[l]))}var p;(p=r.indexOf(":"))>0?(l=t.prefix=r.slice(0,p),h=t.localName=r.slice(p+1)):(l=null,h=t.localName=r)
var d=t.uri=o[l||""]
if(e.startElement(d,h,r,t),t.closed){if(e.endElement(d,h,r),i)for(l in i)e.endPrefixMapping(l)}else t.currentNSMap=o,t.localNSMap=i,n.push(t)}function v(t,e,n,r,i){if(/^(?:script|textarea)$/i.test(n)){var o=t.indexOf("</"+n+">",e),s=t.substring(e+1,o)
if(/[&<]/.test(s))return/^script$/i.test(n)?(i.characters(s,0,s.length),o):(s=s.replace(/&#?\w+;/g,r),i.characters(s,0,s.length),o)}return e+1}function y(t,e,n,r){var i=r[n]
return null==i&&(i=r[n]=t.lastIndexOf("</"+n+">")),i<e}function b(t,e){for(var n in t)e[n]=t[n]}function N(t,e,n,r){switch(t.charAt(e+2)){case"-":return"-"===t.charAt(e+3)?(i=t.indexOf("--\x3e",e+4))>e?(n.comment(t,e+4,i-e-4),i+3):(r.error("Unclosed comment"),-1):-1
default:if("CDATA["==t.substr(e+3,6)){var i=t.indexOf("]]>",e+9)
return n.startCDATA(),n.characters(t,e+9,i-e-9),n.endCDATA(),i+3}var o=function(t,e){var n,r=[],i=/'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g
i.lastIndex=e,i.exec(t)
for(;n=i.exec(t);)if(r.push(n),n[1])return r}(t,e),s=o.length
if(s>1&&/!doctype/i.test(o[0][0])){var a=o[1][0],c=s>3&&/^public$/i.test(o[2][0])&&o[3][0],u=s>4&&o[4][0],l=o[s-1]
return n.startDTD(a,c&&c.replace(/^(['"])(.*?)\1$/,"$2"),u&&u.replace(/^(['"])(.*?)\1$/,"$2")),n.endDTD(),l.index+l[0].length}}return-1}function E(t,e,n){var r=t.indexOf("?>",e)
if(r){var i=t.substring(e,r).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/)
if(i){i[0].length
return n.processingInstruction(i[1],i[2]),r+2}return-1}return-1}function _(t){}function D(t,e){return t.__proto__=e,t}return d.prototype={parse:function(t,e,n){var r=this.domBuilder
r.startDocument(),b(e,e={}),function(t,e,n,r,i){function o(t){var e=t.slice(1,-1)
return e in n?n[e]:"#"===e.charAt(0)?function(t){if(t>65535){var e=55296+((t-=65536)>>10),n=56320+(1023&t)
return String.fromCharCode(e,n)}return String.fromCharCode(t)}(parseInt(e.substr(1).replace("x","0x"))):(i.error("entity not found:"+t),t)}function s(e){var n=t.substring(d,e).replace(/&#?\w+;/g,o)
h&&a(d),r.characters(n,0,e-d),d=e}function a(e,n){for(;e>=u&&(n=l.exec(t));)c=n.index,u=c+n[0].length,h.lineNumber++
h.columnNumber=e-c+1}var c=0,u=0,l=/.+(?:\r\n?|\n)|.*$/g,h=r.locator,f=[{currentNSMap:e}],p={},d=0
for(;;){var b=t.indexOf("<",d)
if(b<0){if(!t.substr(d).match(/^\s*$/)){var D=r.document,x=D.createTextNode(t.substr(d))
D.appendChild(x),r.currentElement=x}return}switch(b>d&&s(b),t.charAt(b+1)){case"/":var T,O=t.indexOf(">",b+3),S=t.substring(b+2,O)
if(!(f.length>1)){i.fatalError("end tag name not found for: "+S)
break}var A=(T=f.pop()).localNSMap
if(T.tagName!=S&&i.fatalError("end tag name: "+S+" does not match the current start tagName: "+T.tagName),r.endElement(T.uri,T.localName,S),A)for(var L in A)r.endPrefixMapping(L)
O++
break
case"?":h&&a(b),O=E(t,b,r)
break
case"!":h&&a(b),O=N(t,b,r,i)
break
default:try{h&&a(b)
var C=new _,O=g(t,b,C,o,i),R=C.length
if(R&&h){for(var j=m(h,{}),b=0;b<R;b++){var P=C[b]
a(P.offset),P.offset=m(h,{})}m(j,h)}!C.closed&&y(t,O,C.tagName,p)&&(C.closed=!0,n.nbsp||i.warning("unclosed xml attribute")),w(C,r,f),"http://www.w3.org/1999/xhtml"!==C.uri||C.closed?O++:O=v(t,O,C.tagName,o,r)}catch(I){i.error("element parse error: "+I),O=-1}}O<0?s(b+1):d=O}}(t,e,n,r,this.errorHandler),r.endDocument()}},_.prototype={setTagName:function(t){if(!o.test(t))throw new Error("invalid tagName:"+t)
this.tagName=t},add:function(t,e,n){if(!o.test(t))throw new Error("invalid attribute:"+t)
this[this.length++]={qName:t,value:e,offset:n}},length:0,getLocalName:function(t){return this[t].localName},getOffset:function(t){return this[t].offset},getQName:function(t){return this[t].qName},getURI:function(t){return this[t].uri},getValue:function(t){return this[t].value}},D({},D.prototype)instanceof D||(D=function(t,e){function n(){}for(e in n.prototype=e,n=new n,t)n[e]=t[e]
return n}),d}),ace.define("ace/mode/xml/dom",[],function(t,e,n){function r(t,e){for(var n in t)e[n]=t[n]}function i(t,e){var n=function(){},i=t.prototype
if(Object.create){var o=Object.create(e.prototype)
i.__proto__=o}i instanceof e||(n.prototype=e.prototype,r(i,n=new n),t.prototype=i=n),i.constructor!=t&&("function"!=typeof t&&console.error("unknown Class:"+t),i.constructor=t)}var o="http://www.w3.org/1999/xhtml",s={},a=s.ELEMENT_NODE=1,c=s.ATTRIBUTE_NODE=2,u=s.TEXT_NODE=3,l=s.CDATA_SECTION_NODE=4,h=s.ENTITY_REFERENCE_NODE=5,f=s.ENTITY_NODE=6,p=s.PROCESSING_INSTRUCTION_NODE=7,d=s.COMMENT_NODE=8,m=s.DOCUMENT_NODE=9,g=s.DOCUMENT_TYPE_NODE=10,w=s.DOCUMENT_FRAGMENT_NODE=11,v=s.NOTATION_NODE=12,y={},b={},N=(y.INDEX_SIZE_ERR=(b[1]="Index size error",1),y.DOMSTRING_SIZE_ERR=(b[2]="DOMString size error",2),y.HIERARCHY_REQUEST_ERR=(b[3]="Hierarchy request error",3),y.WRONG_DOCUMENT_ERR=(b[4]="Wrong document",4),y.INVALID_CHARACTER_ERR=(b[5]="Invalid character",5),y.NO_DATA_ALLOWED_ERR=(b[6]="No data allowed",6),y.NO_MODIFICATION_ALLOWED_ERR=(b[7]="No modification allowed",7),y.NOT_FOUND_ERR=(b[8]="Not found",8)),E=(y.NOT_SUPPORTED_ERR=(b[9]="Not supported",9),y.INUSE_ATTRIBUTE_ERR=(b[10]="Attribute in use",10))
y.INVALID_STATE_ERR=(b[11]="Invalid state",11),y.SYNTAX_ERR=(b[12]="Syntax error",12),y.INVALID_MODIFICATION_ERR=(b[13]="Invalid modification",13),y.NAMESPACE_ERR=(b[14]="Invalid namespace",14),y.INVALID_ACCESS_ERR=(b[15]="Invalid access",15)
function _(t,e){if(e instanceof Error)var n=e
else n=this,Error.call(this,b[t]),this.message=b[t],Error.captureStackTrace&&Error.captureStackTrace(this,_)
return n.code=t,e&&(this.message=this.message+": "+e),n}function D(){}function x(t,e){this._node=t,this._refresh=e,T(this)}function T(t){var e=t._node._inc||t._node.ownerDocument._inc
if(t._inc!=e){var n=t._refresh(t._node)
K(t,"length",n.length),r(n,t),t._inc=e}}function O(){}function S(t,e){for(var n=t.length;n--;)if(t[n]===e)return n}function A(t,e,n,r){if(r?e[S(e,r)]=n:e[e.length++]=n,t){n.ownerElement=t
var i=t.ownerDocument
i&&(r&&M(i,t,r),function(t,e,n){t&&t._inc++,"http://www.w3.org/2000/xmlns/"==n.namespaceURI&&(e._nsMap[n.prefix?n.localName:""]=n.value)}(i,t,n))}}function L(t,e,n){var r=S(e,n)
if(!(r>=0))throw new _(N,new Error)
for(var i=e.length-1;r<i;)e[r]=e[++r]
if(e.length=i,t){var o=t.ownerDocument
o&&(M(o,t,n),n.ownerElement=null)}}function C(t){if(this._features={},t)for(var e in t)this._features=t[e]}function R(){}function j(t){return("<"==t?"&lt;":">"==t&&"&gt;")||"&"==t&&"&amp;"||'"'==t&&"&quot;"||"&#"+t.charCodeAt()+";"}function P(t,e){if(e(t))return!0
if(t=t.firstChild)do{if(P(t,e))return!0}while(t=t.nextSibling)}function I(){}function M(t,e,n,r){t&&t._inc++,"http://www.w3.org/2000/xmlns/"==n.namespaceURI&&delete e._nsMap[n.prefix?n.localName:""]}function $(t,e,n){if(t&&t._inc){t._inc++
var r=e.childNodes
if(n)r[r.length++]=n
else{for(var i=e.firstChild,o=0;i;)r[o++]=i,i=i.nextSibling
r.length=o}}}function F(t,e){var n=e.previousSibling,r=e.nextSibling
return n?n.nextSibling=r:t.firstChild=r,r?r.previousSibling=n:t.lastChild=n,$(t.ownerDocument,t),e}function k(t,e,n){var r=e.parentNode
if(r&&r.removeChild(e),e.nodeType===w){var i=e.firstChild
if(null==i)return e
var o=e.lastChild}else i=o=e
var s=n?n.previousSibling:t.lastChild
i.previousSibling=s,o.nextSibling=n,s?s.nextSibling=i:t.firstChild=i,null==n?t.lastChild=o:n.previousSibling=o
do{i.parentNode=t}while(i!==o&&(i=i.nextSibling))
return $(t.ownerDocument||t,t),e.nodeType==w&&(e.firstChild=e.lastChild=null),e}function U(){this._nsMap={}}function q(){}function B(){}function V(){}function z(){}function H(){}function G(){}function X(){}function Y(){}function W(){}function Q(){}function Z(){}function J(){}function K(t,e,n){t[e]=n}_.prototype=Error.prototype,r(y,_),D.prototype={length:0,item:function(t){return this[t]||null}},x.prototype.item=function(t){return T(this),this[t]},i(x,D),O.prototype={length:0,item:D.prototype.item,getNamedItem:function(t){for(var e=this.length;e--;){var n=this[e]
if(n.nodeName==t)return n}},setNamedItem:function(t){var e=t.ownerElement
if(e&&e!=this._ownerElement)throw new _(E)
var n=this.getNamedItem(t.nodeName)
return A(this._ownerElement,this,t,n),n},setNamedItemNS:function(t){var e,n=t.ownerElement
if(n&&n!=this._ownerElement)throw new _(E)
return e=this.getNamedItemNS(t.namespaceURI,t.localName),A(this._ownerElement,this,t,e),e},removeNamedItem:function(t){var e=this.getNamedItem(t)
return L(this._ownerElement,this,e),e},removeNamedItemNS:function(t,e){var n=this.getNamedItemNS(t,e)
return L(this._ownerElement,this,n),n},getNamedItemNS:function(t,e){for(var n=this.length;n--;){var r=this[n]
if(r.localName==e&&r.namespaceURI==t)return r}return null}},C.prototype={hasFeature:function(t,e){var n=this._features[t.toLowerCase()]
return!(!n||e&&!(e in n))},createDocument:function(t,e,n){var r=new I
if(r.implementation=this,r.childNodes=new D,r.doctype=n,n&&r.appendChild(n),e){var i=r.createElementNS(t,e)
r.appendChild(i)}return r},createDocumentType:function(t,e,n){var r=new G
return r.name=t,r.nodeName=t,r.publicId=e,r.systemId=n,r}},R.prototype={firstChild:null,lastChild:null,previousSibling:null,nextSibling:null,attributes:null,parentNode:null,childNodes:null,ownerDocument:null,nodeValue:null,namespaceURI:null,prefix:null,localName:null,insertBefore:function(t,e){return k(this,t,e)},replaceChild:function(t,e){this.insertBefore(t,e),e&&this.removeChild(e)},removeChild:function(t){return F(this,t)},appendChild:function(t){return this.insertBefore(t,null)},hasChildNodes:function(){return null!=this.firstChild},cloneNode:function(t){return function t(e,n,r){var i=new n.constructor
for(var o in n){var s=n[o]
"object"!=typeof s&&s!=i[o]&&(i[o]=s)}n.childNodes&&(i.childNodes=new D)
i.ownerDocument=e
switch(i.nodeType){case a:var u=n.attributes,l=i.attributes=new O,h=u.length
l._ownerElement=i
for(var f=0;f<h;f++)i.setAttributeNode(t(e,u.item(f),!0))
break
case c:r=!0}if(r)for(var p=n.firstChild;p;)i.appendChild(t(e,p,r)),p=p.nextSibling
return i}(this.ownerDocument||this,this,t)},normalize:function(){for(var t=this.firstChild;t;){var e=t.nextSibling
e&&e.nodeType==u&&t.nodeType==u?(this.removeChild(e),t.appendData(e.data)):(t.normalize(),t=e)}},isSupported:function(t,e){return this.ownerDocument.implementation.hasFeature(t,e)},hasAttributes:function(){return this.attributes.length>0},lookupPrefix:function(t){for(var e=this;e;){var n=e._nsMap
if(n)for(var r in n)if(n[r]==t)return r
e=2==e.nodeType?e.ownerDocument:e.parentNode}return null},lookupNamespaceURI:function(t){for(var e=this;e;){var n=e._nsMap
if(n&&t in n)return n[t]
e=2==e.nodeType?e.ownerDocument:e.parentNode}return null},isDefaultNamespace:function(t){return null==this.lookupPrefix(t)}},r(s,R),r(s,R.prototype),I.prototype={nodeName:"#document",nodeType:m,doctype:null,documentElement:null,_inc:1,insertBefore:function(t,e){if(t.nodeType==w){for(var n=t.firstChild;n;){var r=n.nextSibling
this.insertBefore(n,e),n=r}return t}return null==this.documentElement&&1==t.nodeType&&(this.documentElement=t),k(this,t,e),t.ownerDocument=this,t},removeChild:function(t){return this.documentElement==t&&(this.documentElement=null),F(this,t)},importNode:function(t,e){return function t(e,n,r){var i
switch(n.nodeType){case a:(i=n.cloneNode(!1)).ownerDocument=e
case w:break
case c:r=!0}i||(i=n.cloneNode(!1))
i.ownerDocument=e
i.parentNode=null
if(r)for(var o=n.firstChild;o;)i.appendChild(t(e,o,r)),o=o.nextSibling
return i}(this,t,e)},getElementById:function(t){var e=null
return P(this.documentElement,function(n){if(1==n.nodeType&&n.getAttribute("id")==t)return e=n,!0}),e},createElement:function(t){var e=new U
return e.ownerDocument=this,e.nodeName=t,e.tagName=t,e.childNodes=new D,(e.attributes=new O)._ownerElement=e,e},createDocumentFragment:function(){var t=new Q
return t.ownerDocument=this,t.childNodes=new D,t},createTextNode:function(t){var e=new V
return e.ownerDocument=this,e.appendData(t),e},createComment:function(t){var e=new z
return e.ownerDocument=this,e.appendData(t),e},createCDATASection:function(t){var e=new H
return e.ownerDocument=this,e.appendData(t),e},createProcessingInstruction:function(t,e){var n=new Z
return n.ownerDocument=this,n.tagName=n.target=t,n.nodeValue=n.data=e,n},createAttribute:function(t){var e=new q
return e.ownerDocument=this,e.name=t,e.nodeName=t,e.localName=t,e.specified=!0,e},createEntityReference:function(t){var e=new W
return e.ownerDocument=this,e.nodeName=t,e},createElementNS:function(t,e){var n=new U,r=e.split(":"),i=n.attributes=new O
return n.childNodes=new D,n.ownerDocument=this,n.nodeName=e,n.tagName=e,n.namespaceURI=t,2==r.length?(n.prefix=r[0],n.localName=r[1]):n.localName=e,i._ownerElement=n,n},createAttributeNS:function(t,e){var n=new q,r=e.split(":")
return n.ownerDocument=this,n.nodeName=e,n.name=e,n.namespaceURI=t,n.specified=!0,2==r.length?(n.prefix=r[0],n.localName=r[1]):n.localName=e,n}},i(I,R),U.prototype={nodeType:a,hasAttribute:function(t){return null!=this.getAttributeNode(t)},getAttribute:function(t){var e=this.getAttributeNode(t)
return e&&e.value||""},getAttributeNode:function(t){return this.attributes.getNamedItem(t)},setAttribute:function(t,e){var n=this.ownerDocument.createAttribute(t)
n.value=n.nodeValue=""+e,this.setAttributeNode(n)},removeAttribute:function(t){var e=this.getAttributeNode(t)
e&&this.removeAttributeNode(e)},appendChild:function(t){return t.nodeType===w?this.insertBefore(t,null):function(t,e){var n=e.parentNode
if(n){var r=t.lastChild
n.removeChild(e),r=t.lastChild}return r=t.lastChild,e.parentNode=t,e.previousSibling=r,e.nextSibling=null,r?r.nextSibling=e:t.firstChild=e,t.lastChild=e,$(t.ownerDocument,t,e),e}(this,t)},setAttributeNode:function(t){return this.attributes.setNamedItem(t)},setAttributeNodeNS:function(t){return this.attributes.setNamedItemNS(t)},removeAttributeNode:function(t){return this.attributes.removeNamedItem(t.nodeName)},removeAttributeNS:function(t,e){var n=this.getAttributeNodeNS(t,e)
n&&this.removeAttributeNode(n)},hasAttributeNS:function(t,e){return null!=this.getAttributeNodeNS(t,e)},getAttributeNS:function(t,e){var n=this.getAttributeNodeNS(t,e)
return n&&n.value||""},setAttributeNS:function(t,e,n){var r=this.ownerDocument.createAttributeNS(t,e)
r.value=r.nodeValue=""+n,this.setAttributeNode(r)},getAttributeNodeNS:function(t,e){return this.attributes.getNamedItemNS(t,e)},getElementsByTagName:function(t){return new x(this,function(e){var n=[]
return P(e,function(r){r===e||r.nodeType!=a||"*"!==t&&r.tagName!=t||n.push(r)}),n})},getElementsByTagNameNS:function(t,e){return new x(this,function(n){var r=[]
return P(n,function(i){i===n||i.nodeType!==a||"*"!==t&&i.namespaceURI!==t||"*"!==e&&i.localName!=e||r.push(i)}),r})}},I.prototype.getElementsByTagName=U.prototype.getElementsByTagName,I.prototype.getElementsByTagNameNS=U.prototype.getElementsByTagNameNS,i(U,R),q.prototype.nodeType=c,i(q,R),B.prototype={data:"",substringData:function(t,e){return this.data.substring(t,t+e)},appendData:function(t){t=this.data+t,this.nodeValue=this.data=t,this.length=t.length},insertData:function(t,e){this.replaceData(t,0,e)},appendChild:function(t){throw new Error(b[3])},deleteData:function(t,e){this.replaceData(t,e,"")},replaceData:function(t,e,n){n=this.data.substring(0,t)+n+this.data.substring(t+e),this.nodeValue=this.data=n,this.length=n.length}},i(B,R),V.prototype={nodeName:"#text",nodeType:u,splitText:function(t){var e=this.data,n=e.substring(t)
e=e.substring(0,t),this.data=this.nodeValue=e,this.length=e.length
var r=this.ownerDocument.createTextNode(n)
return this.parentNode&&this.parentNode.insertBefore(r,this.nextSibling),r}},i(V,B),z.prototype={nodeName:"#comment",nodeType:d},i(z,B),H.prototype={nodeName:"#cdata-section",nodeType:l},i(H,B),G.prototype.nodeType=g,i(G,R),X.prototype.nodeType=v,i(X,R)
Y.prototype.nodeType=f,i(Y,R),W.prototype.nodeType=h,i(W,R),Q.prototype.nodeName="#document-fragment",Q.prototype.nodeType=w,i(Q,R),Z.prototype.nodeType=p,i(Z,R),J.prototype.serializeToString=function(t){var e=[]
return function t(e,n){switch(e.nodeType){case a:var r=e.attributes,i=r.length,s=e.firstChild,f=e.tagName,v=o===e.namespaceURI
n.push("<",f)
for(var y=0;y<i;y++)t(r.item(y),n)
if(s||v&&!/^(?:meta|link|img|br|hr|input|button)$/i.test(f)){if(n.push(">"),v&&/^script$/i.test(f))s&&n.push(s.data)
else for(;s;)t(s,n),s=s.nextSibling
n.push("</",f,">")}else n.push("/>")
return
case m:case w:for(var s=e.firstChild;s;)t(s,n),s=s.nextSibling
return
case c:return n.push(" ",e.name,'="',e.value.replace(/[<&"]/g,j),'"')
case u:return n.push(e.data.replace(/[<&]/g,j))
case l:return n.push("<![CDATA[",e.data,"]]>")
case d:return n.push("\x3c!--",e.data,"--\x3e")
case g:var b=e.publicId,N=e.systemId
if(n.push("<!DOCTYPE ",e.name),b)n.push(' PUBLIC "',b),N&&"."!=N&&n.push('" "',N),n.push('">')
else if(N&&"."!=N)n.push(' SYSTEM "',N,'">')
else{var E=e.internalSubset
E&&n.push(" [",E,"]"),n.push(">")}return
case p:return n.push("<?",e.target," ",e.data,"?>")
case h:return n.push("&",e.nodeName,";")
default:n.push("??",e.nodeName)}}(t,e),e.join("")},R.prototype.toString=function(){return J.prototype.serializeToString(this)}
try{Object.defineProperty&&(Object.defineProperty(x.prototype,"length",{get:function(){return T(this),this.$$length}}),Object.defineProperty(R.prototype,"textContent",{get:function(){return function t(e){switch(e.nodeType){case 1:case 11:var n=[]
for(e=e.firstChild;e;)7!==e.nodeType&&8!==e.nodeType&&n.push(t(e)),e=e.nextSibling
return n.join("")
default:return e.nodeValue}}(this)},set:function(t){switch(this.nodeType){case 1:case 11:for(;this.firstChild;)this.removeChild(this.firstChild);(t||String(t))&&this.appendChild(this.ownerDocument.createTextNode(t))
break
default:this.data=t,this.value=value,this.nodeValue=t}}}),K=function(t,e,n){t["$$"+e]=n})}catch(tt){}return C}),ace.define("ace/mode/xml/dom-parser",[],function(t,e,n){"use strict"
var r=t("./sax"),i=t("./dom")
function o(t){this.options=t||{locator:{}}}function s(){this.cdata=!1}function a(t,e){e.lineNumber=t.lineNumber,e.columnNumber=t.columnNumber}function c(t){if(t)return"\n@"+(t.systemId||"")+"#[line:"+t.lineNumber+",col:"+t.columnNumber+"]"}function u(t,e,n){return"string"==typeof t?t.substr(e,n):t.length>=e+n||e?new java.lang.String(t,e,n)+"":t}function l(t,e){t.currentElement?t.currentElement.appendChild(e):t.document.appendChild(e)}return o.prototype.parseFromString=function(t,e){var n=this.options,i=new r,o=n.domBuilder||new s,a=n.errorHandler,u=n.locator,l=n.xmlns||{},h={lt:"<",gt:">",amp:"&",quot:'"',apos:"'"}
return u&&o.setDocumentLocator(u),i.errorHandler=function(t,e,n){if(!t){if(e instanceof s)return e
t=e}var r={},i=t instanceof Function
function o(e){var o=t[e]
if(!o)if(i)o=2==t.length?function(n){t(e,n)}:t
else for(var s=arguments.length;--s&&!(o=t[arguments[s]]););r[e]=o&&function(t){o(t+c(n),t,n)}||function(){}}return n=n||{},o("warning","warn"),o("error","warn","warning"),o("fatalError","warn","warning","error"),r}(a,o,u),i.domBuilder=n.domBuilder||o,/\/x?html?$/.test(e)&&(h.nbsp=" ",h.copy="©",l[""]="http://www.w3.org/1999/xhtml"),t?i.parse(t,l,h):i.errorHandler.error("invalid document source"),o.document},s.prototype={startDocument:function(){this.document=(new i).createDocument(null,null,null),this.locator&&(this.document.documentURI=this.locator.systemId)},startElement:function(t,e,n,r){var i=this.document,o=i.createElementNS(t,n||e),s=r.length
l(this,o),this.currentElement=o,this.locator&&a(this.locator,o)
for(var c=0;c<s;c++){t=r.getURI(c)
var u=r.getValue(c),h=(n=r.getQName(c),i.createAttributeNS(t,n))
h.getOffset&&a(h.getOffset(1),h),h.value=h.nodeValue=u,o.setAttributeNode(h)}},endElement:function(t,e,n){var r=this.currentElement
r.tagName
this.currentElement=r.parentNode},startPrefixMapping:function(t,e){},endPrefixMapping:function(t){},processingInstruction:function(t,e){var n=this.document.createProcessingInstruction(t,e)
this.locator&&a(this.locator,n),l(this,n)},ignorableWhitespace:function(t,e,n){},characters:function(t,e,n){if(t=u.apply(this,arguments),this.currentElement&&t){if(this.cdata){var r=this.document.createCDATASection(t)
this.currentElement.appendChild(r)}else{r=this.document.createTextNode(t)
this.currentElement.appendChild(r)}this.locator&&a(this.locator,r)}},skippedEntity:function(t){},endDocument:function(){this.document.normalize()},setDocumentLocator:function(t){(this.locator=t)&&(t.lineNumber=0)},comment:function(t,e,n){t=u.apply(this,arguments)
var r=this.document.createComment(t)
this.locator&&a(this.locator,r),l(this,r)},startCDATA:function(){this.cdata=!0},endCDATA:function(){this.cdata=!1},startDTD:function(t,e,n){var r=this.document.implementation
if(r&&r.createDocumentType){var i=r.createDocumentType(t,e,n)
this.locator&&a(this.locator,i),l(this,i)}},warning:function(t){console.warn(t,c(this.locator))},error:function(t){console.error(t,c(this.locator))},fatalError:function(t){throw console.error(t,c(this.locator)),t}},"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(t){s.prototype[t]=function(){return null}}),{DOMParser:o}}),ace.define("ace/mode/xml_worker",[],function(t,e,n){"use strict"
var r=t("../lib/oop"),i=(t("../lib/lang"),t("../worker/mirror").Mirror),o=t("./xml/dom-parser").DOMParser,s=e.Worker=function(t){i.call(this,t),this.setTimeout(400),this.context=null}
r.inherits(s,i),function(){this.setOptions=function(t){this.context=t.context},this.onUpdate=function(){var t=this.doc.getValue()
if(t){var e=new o,n=[]
e.options.errorHandler={fatalError:function(t,e,r){n.push({row:r.lineNumber,column:r.columnNumber,text:e,type:"error"})},error:function(t,e,r){n.push({row:r.lineNumber,column:r.columnNumber,text:e,type:"error"})},warning:function(t,e,r){n.push({row:r.lineNumber,column:r.columnNumber,text:e,type:"warning"})}},e.parseFromString(t),this.sender.emit("error",n)}}}.call(s.prototype)}),ace.define("ace/lib/es5-shim",[],function(t,e,n){function r(){}Function.prototype.bind||(Function.prototype.bind=function(t){var e=this
if("function"!=typeof e)throw new TypeError("Function.prototype.bind called on incompatible "+e)
var n=f.call(arguments,1),i=function(){if(this instanceof i){var r=e.apply(this,n.concat(f.call(arguments)))
return Object(r)===r?r:this}return e.apply(t,n.concat(f.call(arguments)))}
return e.prototype&&(r.prototype=e.prototype,i.prototype=new r,r.prototype=null),i})
var i,o,s,a,c,u=Function.prototype.call,l=Array.prototype,h=Object.prototype,f=l.slice,p=u.bind(h.toString),d=u.bind(h.hasOwnProperty)
if((c=d(h,"__defineGetter__"))&&(i=u.bind(h.__defineGetter__),o=u.bind(h.__defineSetter__),s=u.bind(h.__lookupGetter__),a=u.bind(h.__lookupSetter__)),2!=[1,2].splice(0).length)if(function(){function t(t){var e=new Array(t+2)
return e[0]=e[1]=0,e}var e,n=[]
if(n.splice.apply(n,t(20)),n.splice.apply(n,t(26)),e=n.length,n.splice(5,0,"XXX"),n.length,e+1==n.length)return!0}()){var m=Array.prototype.splice
Array.prototype.splice=function(t,e){return arguments.length?m.apply(this,[void 0===t?0:t,void 0===e?this.length-t:e].concat(f.call(arguments,2))):[]}}else Array.prototype.splice=function(t,e){var n=this.length
t>0?t>n&&(t=n):null==t?t=0:t<0&&(t=Math.max(n+t,0)),t+e<n||(e=n-t)
var r=this.slice(t,t+e),i=f.call(arguments,2),o=i.length
if(t===n)o&&this.push.apply(this,i)
else{var s=Math.min(e,n-t),a=t+s,c=a+o-s,u=n-a,l=n-s
if(c<a)for(var h=0;h<u;++h)this[c+h]=this[a+h]
else if(c>a)for(h=u;h--;)this[c+h]=this[a+h]
if(o&&t===l)this.length=l,this.push.apply(this,i)
else for(this.length=l+o,h=0;h<o;++h)this[t+h]=i[h]}return r}
Array.isArray||(Array.isArray=function(t){return"[object Array]"==p(t)})
var g,w,v=Object("a"),y="a"!=v[0]||!(0 in v)
if(Array.prototype.forEach||(Array.prototype.forEach=function(t){var e=R(this),n=y&&"[object String]"==p(this)?this.split(""):e,r=arguments[1],i=-1,o=n.length>>>0
if("[object Function]"!=p(t))throw new TypeError
for(;++i<o;)i in n&&t.call(r,n[i],i,e)}),Array.prototype.map||(Array.prototype.map=function(t){var e=R(this),n=y&&"[object String]"==p(this)?this.split(""):e,r=n.length>>>0,i=Array(r),o=arguments[1]
if("[object Function]"!=p(t))throw new TypeError(t+" is not a function")
for(var s=0;s<r;s++)s in n&&(i[s]=t.call(o,n[s],s,e))
return i}),Array.prototype.filter||(Array.prototype.filter=function(t){var e,n=R(this),r=y&&"[object String]"==p(this)?this.split(""):n,i=r.length>>>0,o=[],s=arguments[1]
if("[object Function]"!=p(t))throw new TypeError(t+" is not a function")
for(var a=0;a<i;a++)a in r&&(e=r[a],t.call(s,e,a,n)&&o.push(e))
return o}),Array.prototype.every||(Array.prototype.every=function(t){var e=R(this),n=y&&"[object String]"==p(this)?this.split(""):e,r=n.length>>>0,i=arguments[1]
if("[object Function]"!=p(t))throw new TypeError(t+" is not a function")
for(var o=0;o<r;o++)if(o in n&&!t.call(i,n[o],o,e))return!1
return!0}),Array.prototype.some||(Array.prototype.some=function(t){var e=R(this),n=y&&"[object String]"==p(this)?this.split(""):e,r=n.length>>>0,i=arguments[1]
if("[object Function]"!=p(t))throw new TypeError(t+" is not a function")
for(var o=0;o<r;o++)if(o in n&&t.call(i,n[o],o,e))return!0
return!1}),Array.prototype.reduce||(Array.prototype.reduce=function(t){var e=R(this),n=y&&"[object String]"==p(this)?this.split(""):e,r=n.length>>>0
if("[object Function]"!=p(t))throw new TypeError(t+" is not a function")
if(!r&&1==arguments.length)throw new TypeError("reduce of empty array with no initial value")
var i,o=0
if(arguments.length>=2)i=arguments[1]
else for(;;){if(o in n){i=n[o++]
break}if(++o>=r)throw new TypeError("reduce of empty array with no initial value")}for(;o<r;o++)o in n&&(i=t.call(void 0,i,n[o],o,e))
return i}),Array.prototype.reduceRight||(Array.prototype.reduceRight=function(t){var e=R(this),n=y&&"[object String]"==p(this)?this.split(""):e,r=n.length>>>0
if("[object Function]"!=p(t))throw new TypeError(t+" is not a function")
if(!r&&1==arguments.length)throw new TypeError("reduceRight of empty array with no initial value")
var i,o=r-1
if(arguments.length>=2)i=arguments[1]
else for(;;){if(o in n){i=n[o--]
break}if(--o<0)throw new TypeError("reduceRight of empty array with no initial value")}do{o in this&&(i=t.call(void 0,i,n[o],o,e))}while(o--)
return i}),Array.prototype.indexOf&&-1==[0,1].indexOf(1,2)||(Array.prototype.indexOf=function(t){var e=y&&"[object String]"==p(this)?this.split(""):R(this),n=e.length>>>0
if(!n)return-1
var r=0
for(arguments.length>1&&(r=C(arguments[1])),r=r>=0?r:Math.max(0,n+r);r<n;r++)if(r in e&&e[r]===t)return r
return-1}),Array.prototype.lastIndexOf&&-1==[0,1].lastIndexOf(0,-3)||(Array.prototype.lastIndexOf=function(t){var e=y&&"[object String]"==p(this)?this.split(""):R(this),n=e.length>>>0
if(!n)return-1
var r=n-1
for(arguments.length>1&&(r=Math.min(r,C(arguments[1]))),r=r>=0?r:n-Math.abs(r);r>=0;r--)if(r in e&&t===e[r])return r
return-1}),Object.getPrototypeOf||(Object.getPrototypeOf=function(t){return t.__proto__||(t.constructor?t.constructor.prototype:h)}),!Object.getOwnPropertyDescriptor){Object.getOwnPropertyDescriptor=function(t,e){if("object"!=typeof t&&"function"!=typeof t||null===t)throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object: "+t)
if(d(t,e)){var n
if(n={enumerable:!0,configurable:!0},c){var r=t.__proto__
t.__proto__=h
var i=s(t,e),o=a(t,e)
if(t.__proto__=r,i||o)return i&&(n.get=i),o&&(n.set=o),n}return n.value=t[e],n}}}(Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(t){return Object.keys(t)}),Object.create)||(g=null===Object.prototype.__proto__?function(){return{__proto__:null}}:function(){var t={}
for(var e in t)t[e]=null
return t.constructor=t.hasOwnProperty=t.propertyIsEnumerable=t.isPrototypeOf=t.toLocaleString=t.toString=t.valueOf=t.__proto__=null,t},Object.create=function(t,e){var n
if(null===t)n=g()
else{if("object"!=typeof t)throw new TypeError("typeof prototype["+typeof t+"] != 'object'")
var r=function(){}
r.prototype=t,(n=new r).__proto__=t}return void 0!==e&&Object.defineProperties(n,e),n})
function b(t){try{return Object.defineProperty(t,"sentinel",{}),"sentinel"in t}catch(e){}}if(Object.defineProperty){var N=b({}),E="undefined"==typeof document||b(document.createElement("div"))
if(!N||!E)var _=Object.defineProperty}if(!Object.defineProperty||_){Object.defineProperty=function(t,e,n){if("object"!=typeof t&&"function"!=typeof t||null===t)throw new TypeError("Object.defineProperty called on non-object: "+t)
if("object"!=typeof n&&"function"!=typeof n||null===n)throw new TypeError("Property description must be an object: "+n)
if(_)try{return _.call(Object,t,e,n)}catch(u){}if(d(n,"value"))if(c&&(s(t,e)||a(t,e))){var r=t.__proto__
t.__proto__=h,delete t[e],t[e]=n.value,t.__proto__=r}else t[e]=n.value
else{if(!c)throw new TypeError("getters & setters can not be defined on this javascript engine")
d(n,"get")&&i(t,e,n.get),d(n,"set")&&o(t,e,n.set)}return t}}Object.defineProperties||(Object.defineProperties=function(t,e){for(var n in e)d(e,n)&&Object.defineProperty(t,n,e[n])
return t}),Object.seal||(Object.seal=function(t){return t}),Object.freeze||(Object.freeze=function(t){return t})
try{Object.freeze(function(){})}catch(j){Object.freeze=(w=Object.freeze,function(t){return"function"==typeof t?t:w(t)})}if(Object.preventExtensions||(Object.preventExtensions=function(t){return t}),Object.isSealed||(Object.isSealed=function(t){return!1}),Object.isFrozen||(Object.isFrozen=function(t){return!1}),Object.isExtensible||(Object.isExtensible=function(t){if(Object(t)===t)throw new TypeError
for(var e="";d(t,e);)e+="?"
t[e]=!0
var n=d(t,e)
return delete t[e],n}),!Object.keys){var D=!0,x=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],T=x.length
for(var O in{toString:null})D=!1
Object.keys=function(t){if("object"!=typeof t&&"function"!=typeof t||null===t)throw new TypeError("Object.keys called on a non-object")
var e=[]
for(var n in t)d(t,n)&&e.push(n)
if(D)for(var r=0,i=T;r<i;r++){var o=x[r]
d(t,o)&&e.push(o)}return e}}Date.now||(Date.now=function(){return(new Date).getTime()})
var S="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"
if(!String.prototype.trim||S.trim()){S="["+S+"]"
var A=new RegExp("^"+S+S+"*"),L=new RegExp(S+S+"*$")
String.prototype.trim=function(){return String(this).replace(A,"").replace(L,"")}}function C(t){return(t=+t)!=t?t=0:0!==t&&t!==1/0&&t!==-1/0&&(t=(t>0||-1)*Math.floor(Math.abs(t))),t}var R=function(t){if(null==t)throw new TypeError("can't convert "+t+" to object")
return Object(t)}})
