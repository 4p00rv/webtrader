define(["exports","babel-runtime/regenerator","jquery","../windows/windows","../common/rivetsExtra","lodash","text!./index.html","websockets/binary_websockets","websockets/validateToken","../instruments/instruments","css!./index.css","../common/util"],function(a,b,c,d,e,f,g,h,i,j){"use strict";function k(a){return a&&a.__esModule?a:{"default":a}}function l(a){return function(){var b=a.apply(this,arguments);return new Promise(function(a,c){function d(e,f){try{var g=b[e](f),h=g.value}catch(i){return void c(i)}return g.done?void a(h):Promise.resolve(h).then(function(a){d("next",a)},function(a){d("throw",a)})}return d("next")})}}Object.defineProperty(a,"__esModule",{value:!0}),a.init=void 0;var m=k(b),n=k(c),o=k(d),p=k(e),q=k(f),r=k(g),s=k(h),t=k(i),u=function(){return local_storage.get("oauth")[0].id},v=[{code:"CALL",name:"Rise"},{code:"CALL",name:"Higher"},{code:"PUT",name:"Fall"},{code:"PUT",name:"Lower"},{code:"ONETOUCH",name:"Touch"},{code:"NOTOUCH",name:"NoTouch"},{code:"EXPIRYMISS",name:"Ends Outside"},{code:"EXPIRYRANGE",name:"Ends Between"},{code:"DIGITDIFF",name:"Digits Differ"},{code:"DIGITMATCH",name:"Digits Match"},{code:"DIGITOVER",name:"Digits Over"},{code:"DIGITUNDER",name:"Digits Under"},{code:"DIGITODD",name:"Digits Odd"},{code:"DIGITEVEN",name:"Digits Even"},{code:"ASIANU",name:"Asians Up"},{code:"ASIAND",name:"Asians Down"},{code:"RANGE",name:"Stays Between"},{code:"UPORDOWN",name:"Goes Outside"}],w=function(){return"copyTrade_"+u()},x=v.slice(0,2).map(function(a){return a.code}),y=function(a){return{copy_start:a,min_trade_stake:10,max_trade_stake:100,assets:q["default"].cloneDeep(D),trade_types:q["default"].cloneDeep(x)}},z=function(a,b){return{open:!1,started:!1,disableStart:!1,loginid:b,yourCopySettings:y(a)}},A=function(a){var b=!1,c="";return a?!a.min_trade_stake||a.min_trade_stake>=1&&a.min_trade_stake<=5e4?!a.max_trade_stake||a.max_trade_stake>=1&&a.max_trade_stake<=5e4?a.min_trade_stake&&a.max_trade_stake&&a.min_trade_stake>a.max_trade_stake?c="Min Trade Stake should be less than Max Trade Stake":b=!0:c="Max Trade Stake should between 1 and 50000":c="Min Trade Stake should between 1 and 50000":c="Enter valid values for copy settings",c&&n["default"].growl.error({message:c}),b},B=q["default"].debounce(function(a){var b=q["default"].cloneDeep(a);delete b.searchToken.disable,local_storage.set(w(),b)},50),C=null,D=null;j.init().then(function(a){C=q["default"].flatten(a.map(function(a){var b=a.display_name;return a.submarkets.map(function(a){return{displayName:b+" - "+a.display_name,instruments:a.instruments}})}));var b=[];a.forEach(function(a){a.submarkets.forEach(function(a){a.instruments.forEach(function(a){var c=a.symbol,d=a.display_name;b.push({code:c,name:d})})})}),I.masterAssetList=b,I.groupedAssets=C,D=b.filter(function(a){return"R_10"===a.code}).map(function(a){return a.code})});var E=function(a,b,c){return s["default"].send({copytrading_statistics:1,trader_id:a}).then(function(d){if(d.copytrading_statistics){var e=q["default"].find(c.traderTokens,function(a){return a.yourCopySettings&&a.yourCopySettings.copy_start===b});e?q["default"].merge(e.traderStatistics,d.copytrading_statistics):c.traderTokens.push(q["default"].merge({traderStatistics:d.copytrading_statistics},z(b,a)))}B(c)})},F=null,G=null,H=q["default"].debounce(function(a){I.allowCopy.allow_copiers=a,s["default"].send({set_settings:1,allow_copiers:a})["catch"](function(b){n["default"].growl.error({message:b.message}),I.allowCopy.allow_copiers=1==a?0:1})},250),I={masterAssetList:[],masterTradeTypeList:q["default"].cloneDeep(v),groupedAssets:[],allowCopy:{allow_copiers:0,onAllowCopyChangeCopierCellClick:function(){return H(0)},onAllowCopyChangeTraderCellClick:function(){return H(1)}},onOpenChange:function(a){I.traderTokens[a].open=!I.traderTokens[a].open},onStartedChange:function(a){I.traderTokens[a].disableStart=!0;var b=!I.traderTokens[a].started;if(b){var c=local_storage.get(w());if(c){var d=c.traderTokens[a];if(d){var e={};q["default"].merge(e,I.traderTokens[a],d),I.traderTokens.splice(a,1),q["default"].defer(function(){I.traderTokens.splice(a,0,e);var b=q["default"].cloneDeep(e.yourCopySettings);b.min_trade_stake||delete b.min_trade_stake,b.max_trade_stake||delete b.max_trade_stake,(!b.assets||b.assets.length<=0)&&delete b.assets,(!b.trade_types||b.trade_types.length<=0)&&delete b.trade_types,s["default"].send(b).then(function(){e.disableStart=!1,e.started=!0,B(I)})["catch"](function(a){n["default"].growl.error({message:a.message}),e.disableStart=!1,B(I)})})}}}else s["default"].send({copy_stop:I.traderTokens[a].yourCopySettings.copy_start}).then(function(){I.traderTokens[a].disableStart=!1,I.traderTokens[a].started=!1,B(I)})["catch"](function(b){n["default"].growl.error({message:b.message}),I.traderTokens[a].disableStart=!1,B(I)})},onRemove:function(a){var b=I.traderTokens[a];I.traderTokens.splice(a,1),B(I),s["default"].send({copy_stop:b.yourCopySettings.copy_start})["catch"](function(){})},onRefresh:function(a){var b=I.traderTokens[a],c=b.loginid,d=b.yourCopySettings.copy_start;c&&d&&(b.disableRefresh=!0,E(c,d,I).then(function(){b.disableRefresh=!1,B(I)})["catch"](function(a){n["default"].growl.error({message:"Refresh failed"}),b.disableRefresh=!1,B(scope)}))},onMinTradeChange:function(a,b){var c=n["default"](a.target).data("index"),d=a.target.value;isNaN(parseInt(d))||(b.traderTokens[c].yourCopySettings.min_trade_stake=parseInt(d))},onMaxTradeChange:function(a,b){var c=n["default"](a.target).data("index"),d=a.target.value;b.traderTokens[c].yourCopySettings.max_trade_stake=d},onUpdateYourSettings:function(a){A(I.traderTokens[a].yourCopySettings)&&(I.traderTokens[a].yourCopySettings.min_trade_stake&&(I.traderTokens[a].yourCopySettings.min_trade_stake=parseInt(I.traderTokens[a].yourCopySettings.min_trade_stake)),I.traderTokens[a].yourCopySettings.max_trade_stake&&(I.traderTokens[a].yourCopySettings.max_trade_stake=parseInt(I.traderTokens[a].yourCopySettings.max_trade_stake)),B(I),n["default"].growl.notice({message:"Updated successfully"}))},searchToken:{token:"",onTokenChange:function(a,b){return b.searchToken.token=a.target.value},disable:!1,onKeyDown:function(a,b){13===a.keyCode&&b.searchToken.addToken(a,b)},addToken:function(a,b){return b.searchToken.token?q["default"].some(I.traderTokens,function(a){return a.yourCopySettings.copy_start===b.searchToken.token})?void n["default"].growl.error({message:"Token already added"}):(b.searchToken.disable=!0,void t["default"](b.searchToken.token).then(function(c){if(!c)throw new Error("Invalid token");E(c.loginid,b.searchToken.token,b).then(function(){b.searchToken.token="",b.searchToken.disable=!1,B(b)})["catch"](function(c){n["default"].growl.error({message:c.message}),b.searchToken.disable=!1,B(b),q["default"].defer(function(){return n["default"](a.target).focus()})})})["catch"](function(a){n["default"].growl.error({message:a.message}),b.searchToken.disable=!1,B(b)})):void n["default"].growl.error({message:"Enter a valid trader token"})}},traderTokens:[],openTokenMgmt:function(){return n["default"]("li.account ul a.token-management").click()}},J=function(){var a=n["default"](r["default"]).i18n();G=p["default"].bind(a[0],I),F=o["default"].createBlankWindow(a,{title:"Copy Trading".i18n(),resizable:!0,collapsable:!0,minimizable:!0,maximizable:!0,modal:!1,width:600,open:function(){var a=local_storage.get(w());a&&(q["default"].merge(I,a),I.traderTokens=q["default"].cloneDeep(I.traderTokens)),s["default"].send({get_settings:1}).then(function(a){var b=a.get_settings,c=void 0===b?{}:b;return I.allowCopy.allow_copiers=c.allow_copiers}),a&&l(m["default"].mark(function b(){var c,d,e,f,g,h,i,j;return m["default"].wrap(function(b){for(;;)switch(b.prev=b.next){case 0:c=!0,d=!1,e=void 0,b.prev=3,f=a.traderTokens[Symbol.iterator]();case 5:if(c=(g=f.next()).done){b.next=20;break}return h=g.value,b.prev=7,i=h.loginid,j=h.yourCopySettings.copy_start,b.next=12,E(i,j,I);case 12:b.next=17;break;case 14:b.prev=14,b.t0=b["catch"](7);case 17:c=!0,b.next=5;break;case 20:b.next=26;break;case 22:b.prev=22,b.t1=b["catch"](3),d=!0,e=b.t1;case 26:b.prev=26,b.prev=27,!c&&f["return"]&&f["return"]();case 29:if(b.prev=29,!d){b.next=32;break}throw e;case 32:return b.finish(29);case 33:return b.finish(26);case 34:case"end":return b.stop()}},b,this,[[3,22,26,34],[7,14],[27,,29,33]])}))()},close:function(){G&&G.unbind(),F&&F.dialog("destroy").remove(),G=F=null,I.traderTokens=[]},"data-authorized":"true"}),F.track({module_id:"copyTrade",is_unique:!0,data:null}),F.dialog("open")},K=a.init=function(a){a.click(function(){F?F.moveToTop():J()})};a["default"]={init:K}});