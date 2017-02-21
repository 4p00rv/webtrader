define(["exports","common/rivetsExtra","jquery","windows/windows","websockets/binary_websockets","common/util","jquery-growl"],function(a,b,c,d,e){"use strict";function f(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(a,"__esModule",{value:!0}),a.init=void 0;var g=(f(b),f(c)),h=f(d),i=f(e);i["default"].events.on("login",function(){k("event")["catch"](function(a){})}),i["default"].events.on("buy",function(){k("event")["catch"](function(a){})});var j=null,k=a.init=function(a){var b="";return new Promise(function(c,d){i["default"].send({get_account_status:1}).then(function(e){var f=e.get_account_status.status,i="";if(-1!==g["default"].inArray("authenticated",f)?-1!==g["default"].inArray("unwelcome",f)?(b="withdrawal_allowed",i=g["default"]("<span/>",{html:"Your account is currently suspended. Only withdrawals are now permitted. For further information, please contact %1.".i18n().replace("%1",'<a href="mailto:support@binary.com">support@binary.com</a>')})):-1!==g["default"].inArray("cashier_locked",f)?(b="cashier_locked",i=g["default"]("<span/>",{html:"Deposits and withdrawal for your account is not allowed at this moment. Please contact %1 to unlock it.".i18n().replace("%1",'<a href="mailto:support@binary.com">support@binary.com</a>')})):-1!==g["default"].inArray("withdrawal_locked",f)&&(b="withdrawal_locked",i=g["default"]("<span/>",{html:"Withdrawal for your account is not allowed at this moment. Please contact %1 to unlock it.".i18n().replace("%1",'<a href="mailto:support@binary.com">support@binary.com</a>')})):-1!==g["default"].inArray("unwelcome",f)&&(b="locked",i=g["default"]("<span/>",{html:"To authenticate your account, kindly email the following to %1:".i18n().replace("%1",'<a href="mailto:support@binary.com">support@binary.com</a>')}),i.append(g["default"]('<ul class="checked">').append(g["default"]("<li>",{html:"A scanned copy of your passport, driving licence (provisional or full) or identity card, showing your name and date of birth. Your document must be valid for at least 6 months after this date.".i18n()}),g["default"]("<li>",{html:"A scanned copy of a utility bill or bank statement (no more than 3 months old).".i18n()})))),i){if(j)return j.moveToTop(),void d({msg:"Problem with account"});i=g["default"]("<div class='notice-msg' />").append(i),j=h["default"].createBlankWindow(g["default"]("<div/>").append(i).i18n(),{title:"Notice Message".i18n(),dialogClass:"dialog-message",width:700,height:"auto",resizable:!1,collapsable:!1,minimizable:!1,maximizable:!1,closable:!0,closeOnEscape:!1,modal:!0,ignoreTileAction:!0,close:function(){j.dialog("destroy"),j=null}}),"event"!==a||"locked"!==b&&"withdrawal_allowed"!==b||(j.dialog("open"),d({msg:"Problem with account"})),"withdrawal"===a&&"withdrawal_allowed"!==b&&(j.dialog("open"),d({msg:"Withdrawal not allowed"})),"deposit"!==a||"locked"!==b&&"cashier_locked"!==b||(j.dialog("open"),d({message:"Deposit not allowed"}))}else c()})})};a["default"]={init:k}});