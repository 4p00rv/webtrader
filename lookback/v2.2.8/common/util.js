function isTick(a){return-1!==a.indexOf("t")}function isDotType(a){return"dot"===a}function isLineDotType(a){return"linedot"===a}function convertToTimeperiodObject(a){return{intValue:function(){return parseInt(a.toLowerCase().replace("t","").replace("h","").replace("d","").trim())},suffix:function(){return a.toLowerCase().replace(""+this.intValue(),"").trim().charAt(0)},timeInMillis:function(){var a=this,b={t:function(){return 0},m:function(){return 60*a.intValue()*1e3},h:function(){return 60*a.intValue()*60*1e3},d:function(){return 24*a.intValue()*60*60*1e3}};return b[this.suffix()]()||0},timeInSeconds:function(){return this.timeInMillis()/1e3},humanReadableString:function(){var a={t:"tick",m:"minute(s)",h:"hour(s)",d:"day(s)"};return this.intValue()+" "+a[this.suffix()]}}}function isDataTypeClosePriceOnly(a){return!("candlestick"===a||"ohlc"===a)}function isSmallView(){var a=!1;return window.Modernizr&&(window.Modernizr.mq("all and (max-width: 600px)")||window.Modernizr.mq("all and (max-device-width: 600px)"))&&(a=!0),a}function epoch_to_string(a,b){var c=b&&b.utc?"getUTC":"get",d=new Date(1e3*a);return d[c+"FullYear"]()+"-"+("00"+(d[c+"Month"]()+1)).slice(-2)+"-"+("00"+d[c+"Date"]()).slice(-2)+" "+("00"+d[c+"Hours"]()).slice(-2)+":"+("00"+d[c+"Minutes"]()).slice(-2)+":"+("00"+d[c+"Seconds"]()).slice(-2)}function yyyy_mm_dd_to_epoch(a,b){var c=a.split("-"),d=1*c[0],e=1*c[1],f=1*c[2];return b&&b.utc?Date.UTC(d,e-1,f)/1e3:new Date(d,e-1,f).getTime()/1e3}function formatPrice(a,b){var c=0>a?"-":"";a=a&&Math.abs(a),b=(b||"").toLowerCase().trim();var d=local_storage.get("currencies_config")||{},e=(d[(b||"").toUpperCase()]||{}).fractional_digits||2,f=(window.local_storage.get("i18n")||{value:"en"}).value;return a=new Intl.NumberFormat(f.replace("_","-"),{style:"decimal",minimumFractionDigits:e}).format(a),b&&(a=c+$("<span>",{"class":"symbols "+b,text:a})[0].outerHTML),a}function sortAlphaNum(a){"use strict";var b=/[^a-zA-Z]/g,c=/[^0-9]/g;return function(d,e){var f=d[a].replace(b,""),g=e[a].replace(b,"");if(f===g){var h=parseInt(d[a].replace(c,""),10),i=parseInt(e[a].replace(c,""),10);return h===i?0:h>i?1:-1}return f>g?1:-1}}function toFixed(a,b){return $.isNumeric(a)&&(a=Math.round(a*Math.pow(10,b))/Math.pow(10,b)),a}function uuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"===a?b:3&b|8;return c.toString(16)})}function setLongTimeout(a,b,c){var d;b>2147483647?(d=setTimeout(function(){setLongTimeout(a,b-2147483647,c)},2147483647),c(d)):(d=setTimeout(a,b),c&&c(d))}function validateEmail(a){var b=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return b.test(a)}function isLangSupported(a){return a=(a||"").trim().toLowerCase(),"ar"===a||"de"===a||"en"===a||"es"===a||"fr"===a||"id"===a||"it"===a||"th"===a||"ja"===a||"pl"===a||"pt"===a||"ru"===a||"vi"===a||"zn_cn"===a||"zh_cn"===a||"zh_tw"===a||"ach"===a}function loginids(){return local_storage.get("authorize").account_list.map(function(a){return{id:a.loginid,is_real:0==a.is_virtual,is_disabled:1==a.is_disabled,is_mf:/MF/gi.test(a.loginid),is_mlt:/MLT/gi.test(a.loginid),is_mx:/MX/gi.test(a.loginid),is_cr:/CR/gi.test(a.loginid)}})}function oAuthLoginIds(){var a=local_storage.get("currencies_config")||{};return(local_storage.get("oauth")||[]).map(function(b){return{id:b.id,is_real:!b.is_virtual,is_disabled:!1,is_mf:/MF/gi.test(b.id),is_mlt:/MLT/gi.test(b.id),is_mx:/MX/gi.test(b.id),is_cr:/CR/gi.test(b.id),currency:b.currency,type:a[b.currency]?a[b.currency].type:""}})}function setup_i18n_translation(a){function b(a){var c,d=a.childNodes?a.childNodes:a,e=d.length;for(c=0;e>c;c++)3==d[c].nodeType&&d[c].textContent&&(d[c].textContent=d[c].textContent.i18n()),1==d[c].nodeType&&(d[c].getAttribute("data-balloon")&&d[c].setAttribute("data-balloon",d[c].getAttribute("data-balloon").i18n()),b(d[c]))}var c=Object.keys(a).filter(function(a){return""!==a&&" "!==a});c=c.sort(function(a,b){return b.length-a.length});var d=c.map(function(a){return a.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")});d[0]=/[\?\.]$/.test(d[0])?d[0]+"|":d[0]+"\\b|";var e=new RegExp("\\b("+d.reduce(function(a,b){return/[\?\.]$/.test(b)?a+b+"|":a+b+"\\b|"})+")","g"),f=function(b,c){return a[c]&&a[c][1]||c};String.prototype.i18n=function(){return this.replace(e,f)},$.fn.i18n=function(){return b(this),this},b(document.body)}function getAppURL(){return window.location.href.split("/v")[0]}function download_file_in_browser(a,b,c){var d=new Blob([c],{type:b});if(navigator.msSaveBlob)navigator.msSaveBlob(d,a);else{var e=document.createElement("a");if(void 0!==e.download){var f=URL.createObjectURL(d);e.setAttribute("href",f),e.setAttribute("download",a),e.style.visibility="hidden",document.body.appendChild(e),e.click(),document.body.removeChild(e)}}}function guessDigits(a){var b=0;return(a||[]).forEach(function(a){var c=a+"",d=c.split(".")||[];if(d.length>1){var e=d[1].length;e>b&&(b=e)}}),b||4}function getCurrencyDetail(a,b){var c=(b||local_storage.get("currency")||"").toUpperCase(),d=(local_storage.get("currencies_config")||{})[c]||{};return d[a]}String.prototype.replaceAll=function(a,b){return this.split(a).join(b)},String.prototype.format=function(){var a=arguments;return this.replace(/{(\d+)}/g,function(b,c){return"undefined"!=typeof a[c]?a[c]:b})},"function"!=typeof String.prototype.startsWith&&(String.prototype.startsWith=function(a){return 0===this.lastIndexOf(a,0)},String.prototype.endsWith=function(a){return-1!==this.indexOf(a,this.length-a.length)}),String.prototype.includes||(String.prototype.includes=function(a,b){"use strict";return"number"!=typeof b&&(b=0),b+a.length>this.length?!1:-1!==this.indexOf(a,b)}),Array.prototype.includes||(Array.prototype.includes=function(a){"use strict";if(null==this)throw new TypeError("Array.prototype.includes called on null or undefined");var b=Object(this),c=parseInt(b.length,10)||0;if(0===c)return!1;var d,e=parseInt(arguments[1],10)||0;e>=0?d=e:(d=c+e,0>d&&(d=0));for(var f;c>d;){if(f=b[d],a===f||a!==a&&f!==f)return!0;d++}return!1});var is_beta=function(){var a=-1!==window.location.href.indexOf("/beta")||-1!==window.location.href.indexOf("localhost");return function(){return a}}(),local_storage={get:function(a){a="_webtrader_"+a+(is_beta()?"_beta":"_live");var b=localStorage.getItem(a);return b&&JSON.parse(b)},set:function(a,b){return a="_webtrader_"+a+(is_beta()?"_beta":"_live"),localStorage.setItem(a,JSON.stringify(b))},remove:function(a){return a="_webtrader_"+a+(is_beta()?"_beta":"_live"),localStorage.removeItem(a)}},currencyFractionalDigits=function(){return getCurrencyDetail("fractional_digits")},isCryptoCurrency=function(a){var b="crypto"===getCurrencyDetail("type",a);return b};