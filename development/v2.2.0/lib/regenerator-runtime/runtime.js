!function(a){"use strict";function b(a,b,c,e){var f=b&&b.prototype instanceof d?b:d,g=Object.create(f.prototype),h=new m(e||[]);return g._invoke=i(a,c,h),g}function c(a,b,c){try{return{type:"normal",arg:a.call(b,c)}}catch(d){return{type:"throw",arg:d}}}function d(){}function e(){}function f(){}function g(a){["next","throw","return"].forEach(function(b){a[b]=function(a){return this._invoke(b,a)}})}function h(a){function b(d,e,f,g){var h=c(a[d],a,e);if("throw"!==h.type){var i=h.arg,j=i.value;return j&&"object"==typeof j&&r.call(j,"__await")?Promise.resolve(j.__await).then(function(a){b("next",a,f,g)},function(a){b("throw",a,f,g)}):Promise.resolve(j).then(function(a){i.value=a,f(i)},g)}g(h.arg)}function d(a,c){function d(){return new Promise(function(d,e){b(a,c,d,e)})}return e=e?e.then(d,d):d()}"object"==typeof process&&process.domain&&(b=process.domain.bind(b));var e;this._invoke=d}function i(a,b,d){var e=x;return function(f,g){if(e===z)throw new Error("Generator is already running");if(e===A){if("throw"===f)throw g;return o()}for(d.method=f,d.arg=g;;){var h=d.delegate;if(h){var i=j(h,d);if(i){if(i===B)continue;return i}}if("next"===d.method)d.sent=d._sent=d.arg;else if("throw"===d.method){if(e===x)throw e=A,d.arg;d.dispatchException(d.arg)}else"return"===d.method&&d.abrupt("return",d.arg);e=z;var k=c(a,b,d);if("normal"===k.type){if(e=d.done?A:y,k.arg===B)continue;return{value:k.arg,done:d.done}}"throw"===k.type&&(e=A,d.method="throw",d.arg=k.arg)}}}function j(a,b){var d=a.iterator[b.method];if(d===p){if(b.delegate=null,"throw"===b.method){if(a.iterator["return"]&&(b.method="return",b.arg=p,j(a,b),"throw"===b.method))return B;b.method="throw",b.arg=new TypeError("The iterator does not provide a 'throw' method")}return B}var e=c(d,a.iterator,b.arg);if("throw"===e.type)return b.method="throw",b.arg=e.arg,b.delegate=null,B;var f=e.arg;return f?f.done?(b[a.resultName]=f.value,b.next=a.nextLoc,"return"!==b.method&&(b.method="next",b.arg=p),b.delegate=null,B):f:(b.method="throw",b.arg=new TypeError("iterator result is not an object"),b.delegate=null,B)}function k(a){var b={tryLoc:a[0]};1 in a&&(b.catchLoc=a[1]),2 in a&&(b.finallyLoc=a[2],b.afterLoc=a[3]),this.tryEntries.push(b)}function l(a){var b=a.completion||{};b.type="normal",delete b.arg,a.completion=b}function m(a){this.tryEntries=[{tryLoc:"root"}],a.forEach(k,this),this.reset(!0)}function n(a){if(a){var b=a[t];if(b)return b.call(a);if("function"==typeof a.next)return a;if(!isNaN(a.length)){var c=-1,d=function e(){for(;++c<a.length;)if(r.call(a,c))return e.value=a[c],e.done=!1,e;return e.value=p,e.done=!0,e};return d.next=d}}return{next:o}}function o(){return{value:p,done:!0}}var p,q=Object.prototype,r=q.hasOwnProperty,s="function"==typeof Symbol?Symbol:{},t=s.iterator||"@@iterator",u=s.toStringTag||"@@toStringTag",v="object"==typeof module,w=a.regeneratorRuntime;if(w)return void(v&&(module.exports=w));w=a.regeneratorRuntime=v?module.exports:{},w.wrap=b;var x="suspendedStart",y="suspendedYield",z="executing",A="completed",B={},C={};C[t]=function(){return this};var D=Object.getPrototypeOf,E=D&&D(D(n([])));E&&E!==q&&r.call(E,t)&&(C=E);var F=f.prototype=d.prototype=Object.create(C);e.prototype=F.constructor=f,f.constructor=e,f[u]=e.displayName="GeneratorFunction",w.isGeneratorFunction=function(a){var b="function"==typeof a&&a.constructor;return b?b===e||"GeneratorFunction"===(b.displayName||b.name):!1},w.mark=function(a){return Object.setPrototypeOf?Object.setPrototypeOf(a,f):(a.__proto__=f,u in a||(a[u]="GeneratorFunction")),a.prototype=Object.create(F),a},w.awrap=function(a){return{__await:a}},g(h.prototype),w.AsyncIterator=h,w.async=function(a,c,d,e){var f=new h(b(a,c,d,e));return w.isGeneratorFunction(c)?f:f.next().then(function(a){return a.done?a.value:f.next()})},g(F),F[u]="Generator",F.toString=function(){return"[object Generator]"},w.keys=function(a){var b=[];for(var c in a)b.push(c);return b.reverse(),function d(){for(;b.length;){var c=b.pop();if(c in a)return d.value=c,d.done=!1,d}return d.done=!0,d}},w.values=n,m.prototype={constructor:m,reset:function(a){if(this.prev=0,this.next=0,this.sent=this._sent=p,this.done=!1,this.delegate=null,this.method="next",this.arg=p,this.tryEntries.forEach(l),!a)for(var b in this)"t"===b.charAt(0)&&r.call(this,b)&&!isNaN(+b.slice(1))&&(this[b]=p)},stop:function(){this.done=!0;var a=this.tryEntries[0],b=a.completion;if("throw"===b.type)throw b.arg;return this.rval},dispatchException:function(a){function b(b,d){return f.type="throw",f.arg=a,c.next=b,d&&(c.method="next",c.arg=p),!!d}if(this.done)throw a;for(var c=this,d=this.tryEntries.length-1;d>=0;--d){var e=this.tryEntries[d],f=e.completion;if("root"===e.tryLoc)return b("end");if(e.tryLoc<=this.prev){var g=r.call(e,"catchLoc"),h=r.call(e,"finallyLoc");if(g&&h){if(this.prev<e.catchLoc)return b(e.catchLoc,!0);if(this.prev<e.finallyLoc)return b(e.finallyLoc)}else if(g){if(this.prev<e.catchLoc)return b(e.catchLoc,!0)}else{if(!h)throw new Error("try statement without catch or finally");if(this.prev<e.finallyLoc)return b(e.finallyLoc)}}}},abrupt:function(a,b){for(var c=this.tryEntries.length-1;c>=0;--c){var d=this.tryEntries[c];if(d.tryLoc<=this.prev&&r.call(d,"finallyLoc")&&this.prev<d.finallyLoc){var e=d;break}}e&&("break"===a||"continue"===a)&&e.tryLoc<=b&&b<=e.finallyLoc&&(e=null);var f=e?e.completion:{};return f.type=a,f.arg=b,e?(this.method="next",this.next=e.finallyLoc,B):this.complete(f)},complete:function(a,b){if("throw"===a.type)throw a.arg;return"break"===a.type||"continue"===a.type?this.next=a.arg:"return"===a.type?(this.rval=this.arg=a.arg,this.method="return",this.next="end"):"normal"===a.type&&b&&(this.next=b),B},finish:function(a){for(var b=this.tryEntries.length-1;b>=0;--b){var c=this.tryEntries[b];if(c.finallyLoc===a)return this.complete(c.completion,c.afterLoc),l(c),B}},"catch":function(a){for(var b=this.tryEntries.length-1;b>=0;--b){var c=this.tryEntries[b];if(c.tryLoc===a){var d=c.completion;if("throw"===d.type){var e=d.arg;l(c)}return e}}throw new Error("illegal catch attempt")},delegateYield:function(a,b,c){return this.delegate={iterator:n(a),resultName:b,nextLoc:c},"next"===this.method&&(this.arg=p),B}}}("object"==typeof global?global:"object"==typeof window?window:"object"==typeof self?self:this);