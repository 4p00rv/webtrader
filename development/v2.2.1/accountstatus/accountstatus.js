define(["exports","babel-runtime/regenerator","jquery","../websockets/binary_websockets","lodash","shownotice/shownotice","../tc/tc","../financialassessment/financialassessment","../taxInformation/taxInformation","../common/util"],function(a,b,c,d,e,f,g,h,i){"use strict";function j(a){return a&&a.__esModule?a:{"default":a}}function k(a){return function(){var b=a.apply(this,arguments);return new Promise(function(a,c){function d(e,f){try{var g=b[e](f),h=g.value}catch(i){return void c(i)}return g.done?void a(h):Promise.resolve(h).then(function(a){d("next",a)},function(a){d("throw",a)})}return d("next")})}}function l(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0}),a.init=void 0;var m=j(b),n=j(c),o=j(d),p=j(e),q=j(f),r=j(g),s=j(h),t=j(i),u=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(i){e=!0,f=i}finally{try{!d&&h["return"]&&h["return"]()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),v=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),w=function(){function a(){var b=this;l(this,a);var c=this,d=n["default"]("#msg-notification");o["default"].events.on("login",function(){var a=k(m["default"].mark(function e(a){var f,g,h,i,j,k,l;return m["default"].wrap(function(b){for(;;)switch(b.prev=b.next){case 0:if(1!==+a.authorize.is_virtual){b.next=4;break}return d.is(":visible")&&d.slideUp(500),n["default"](".webtrader-dialog").parent().animate({top:"110px"}),b.abrupt("return");case 4:return b.next=6,c.getStatus(a.authorize);case 6:f=b.sent,g=u(f,5),h=g[0],i=g[1],j=g[2],k=g[3],l=g[4],c.tc_accepted=!1,c.financial_assessment_submitted=-1!=h.get_account_status.status.indexOf("financial_assessment_not_complete ")||!0,c.is_mlt=/^malta$/gi.test(a.authorize.landing_company_name),c.is_mf=/^maltainvest$/gi.test(a.authorize.landing_company_name),c.is_cr=/^costarica$/gi.test(a.authorize.landing_company_name),c.has_mt5_account=l.mt5_login_list.length>0,i&&i.website_status&&j&&j.get_settings&&(c.tc_accepted=i.website_status.terms_conditions_version===j.get_settings.client_tnc_status),"high"===h.get_account_status.risk_classification&&k&&(c.financial_assessment_submitted=0!==Object.keys(k.get_financial_assessment).length),c.checkStatus(a.authorize,h.get_account_status.status);case 22:case"end":return b.stop()}},e,b)}));return function(){return a.apply(this,arguments)}}()),o["default"].events.on("logout",function(){return d.is(":visible")&&d.slideUp(500)})}return v(a,[{key:"getStatus",value:function(){return Promise.all([o["default"].send({get_account_status:1}),o["default"].send({website_status:1}),o["default"].send({get_settings:1}),o["default"].send({get_financial_assessment:1}),o["default"].send({mt5_login_list:1})])}},{key:"checkStatus",value:function(a,b){var c=n["default"]("#msg-notification"),d=this,e={tc:{message:"Please [_1]accept the updated Terms and Conditions[_2] to lift your withdrawal and trading limits.".i18n().replace("[_1]","<a href='#'>").replace("[_2]","</a>"),is_valid:function(){return d.tc_accepted},callback:r["default"].init},tax:{message:"Please [_1]complete your account profile[_2] to lift your withdrawal and trading limits.".i18n().replace("[_1]","<a href='#'>").replace("[_2]","</a>"),is_valid:function(){return!d.is_mf||/crs_tin_information/.test(b)},callback:t["default"].init},risk:{message:"Please complete the [_1]financial assessment form[_2] to lift your withdrawal and trading limits.".i18n().replace("[_1]","<a href='#'>").replace("[_2]","</a>"),is_valid:function(){return d.financial_assessment_submitted},callback:s["default"].init},authenticate:{message:"[_1]Authenticate your account[_2] now to take full advantage of all withdrawal options available.".i18n().replace("[_1]","<a href='#'>").replace("[_2]","</a>"),is_valid:function(){return/authenticated/.test(b)&&(/age_verification/.test(b)||d.is_cr)||!/authenticated/.test(b)&&d.is_cr&&(+a.balance<200||!d.has_mt5_account)},callback:q["default"].init},unwelcome:{message:"Your account is restricted. Kindly [_1]contact customer support[_2] for assistance.".i18n().replace("[_1]","<a href='#'>").replace("[_2]","</a>"),is_valid:function(){return!/(unwelcome|(cashier|withdrawal)_locked)/.test(b)},callback:function(){var a=local_storage.get("i18n").value?local_storage.get("i18n").value:"en",b=window.open("http://www.binary.com/"+a+"/contact.html");b.focus()}}},f=p["default"].find(e,function(a){return!a.is_valid()});f?(c.html(f.message),c.find("a").on("click",f.callback),c.is(":hidden")&&(c.slideDown(500),n["default"](".webtrader-dialog").parent().animate({top:"140px"}))):(c.is(":visible")&&c.slideUp(500),n["default"](".webtrader-dialog").parent().animate({top:"110px"}))}}]),a}(),x=a.init=new w;a["default"]={init:x}});