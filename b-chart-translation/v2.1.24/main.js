function load_ondemand(a,b,c,d,e){var f=null;a.one(b,f=function(){return a.hasClass("disabled")?void a.one(b,f):void require([d],function(a){c&&require(["jquery","jquery-growl"],function(a){a.growl.notice({message:c})}),e&&e(a)})})}requirejs.config({baseUrl:"./",paths:{jquery:"lib/jquery/dist/jquery.min","jquery-ui":"lib/jquery-ui/jquery-ui.min",highstock:"lib/highstock/highstock","highcharts-more":"lib/highstock/highcharts-more","highcharts-exporting":"lib/highstock/modules/offline-exporting","jquery.dialogextend":"lib/binary-com-jquery-dialogextended/jquery.dialogextend.min","jquery-growl":"lib/growl/javascripts/jquery.growl","jquery-validation":"lib/jquery-validation/dist/jquery.validate.min",modernizr:"lib/modernizr/modernizr",lokijs:"lib/lokijs/build/lokijs.min","color-picker":"lib/colorpicker/jquery.colorpicker",datatables:"lib/datatables/media/js/jquery.dataTables.min","datatables-jquery-ui":"lib/datatables/media/js/dataTables.jqueryui.min",currentPriceIndicator:"charts/indicators/highcharts_custom/currentprice","es6-promise":"lib/es6-promise/promise.min",rivets:"lib/rivets/dist/rivets.min",sightglass:"lib/sightglass/index",timepicker:"lib/binary-com-jquery-ui-timepicker/jquery.ui.timepicker",lodash:"lib/lodash/dist/lodash.min","jquery-sparkline":"lib/jquery-sparkline/dist/jquery.sparkline.min",moment:"lib/moment/min/moment.min","moment-locale":"lib/moment/locale",ddslick:"lib/ddslick/jquery.ddslick.min",clipboard:"lib/clipboard/dist/clipboard.min",indicator_levels:"charts/indicators/level",paralleljs:"lib/parallel_js/lib/parallel","binary-style":"https://style.binary.com/binary","babel-runtime/regenerator":"lib/regenerator-runtime/runtime",chosen:"lib/chosen-js/chosen.jquery"},map:{"*":{css:"lib/require-css/css.min",text:"lib/text/text.js"}},waitSeconds:0,shim:{"babel-runtime/regenerator":{exports:"regeneratorRuntime"},timepicker:{deps:["jquery-ui","jquery"]},"jquery-ui":{deps:["jquery"]},highstock:{deps:["jquery"]},"highcharts-exporting":{deps:["highstock","lib/highstock/modules/exporting"]},"jquery-growl":{deps:["jquery"]},datatables:{deps:["jquery-ui"]},currentPriceIndicator:{deps:["highstock"]},sightglass:{exports:"sightglass"},rivets:{deps:["sightglass"],exports:"rivets"},"highcharts-more":{deps:["highstock"]}}}),requirejs.onError=function(a){if("scripterror"!==a.requireType)throw a},require(["modernizr"],function(){return Modernizr.svg&&Modernizr.websockets&&(!Modernizr.touch||!isSmallView()||isAffiliates())&&Modernizr.localstorage&&Modernizr.webworkers&&Object.defineProperty?void 0:void(window.location.href="unsupported_browsers/unsupported_browsers.html")}),require(["websockets/binary_websockets","text!./oauth/app_id.json"]);var i18n_name=(local_storage.get("i18n")||{value:"en"}).value;require(["jquery","text!i18n/"+i18n_name+".json"],function(a,b){"use strict";function c(){require(["affiliates/affiliates","css!main.css","css!binary-style"],function(a){a.init()})}function d(){if(self!==top)return void(top.location=self.location);var b=function(a){load_ondemand(a.find("a.tradingTimes"),"click","Loading Trading Times ...".i18n(),"tradingtimes/tradingTimes",function(b){var c=a.find("a.tradingTimes");b.init(c),c.click()}),load_ondemand(a.find("a.token-management"),"click","Loading Token management ...".i18n(),"token/token",function(b){var c=a.find("a.token-management");b.init(c),c.click()}),load_ondemand(a.find("a.change-password"),"click","Loading Password dialog ...".i18n(),"password/password",function(b){var c=a.find("a.change-password");b.init(c),c.click()}),load_ondemand(a.find("a.assetIndex"),"click","Loading Asset Index ...".i18n(),"assetindex/assetIndex",function(b){var c=a.find("a.assetIndex");b.init(c),c.click()}),load_ondemand(a.find("a.portfolio"),"click","Loading portfolio ...".i18n(),"portfolio/portfolio",function(b){var c=a.find("a.portfolio");b.init(c),c.click()}),load_ondemand(a.find("a.real-account"),"click","Loading Real account opening ...".i18n(),"realaccount/realaccount",function(b){var c=a.find("a.real-account");b.init(c),c.click()}),load_ondemand(a.find("a.deposit"),"click","Loading Deposit funds ...","cashier/deposit",function(b){var c=a.find("a.deposit");b.init(c),c.click()}),load_ondemand(a.find("a.withdraw"),"click","Loading Withdraw funds ...","cashier/withdraw",function(b){b=b["default"]||b;var c=a.find("a.withdraw");b.init(c),c.click()}),load_ondemand(a.find("a.profitTable"),"click","Loading Profit Table ...".i18n(),"profittable/profitTable",function(b){var c=a.find("a.profitTable");b.init(c),c.click()}),load_ondemand(a.find("a.statement"),"click","Loading Statement Table ...".i18n(),"statement/statement",function(b){var c=a.find("a.statement");b.init(c),c.click()}),load_ondemand(a.find("a.download"),"click","Loading Download/View Data ...".i18n(),"download/download",function(b){var c=a.find("a.download");b.init(c),c.click()}),load_ondemand(a.find("a.selfexclusion"),"click","Loading Self-Exclusion ...".i18n(),"selfexclusion/selfexclusion",function(b){var c=a.find("a.selfexclusion");b.init(c),c.click()}),load_ondemand(a.find("a.config"),"click","Loading Configurations ...".i18n(),"config/config",function(b){var c=a.find("a.config");b.init(c),c.click()}),load_ondemand(a.find("a.theme_custom"),"click","Loading custom theme configuration...".i18n(),"themes/custom_theme/custom_theme",function(b){var c=a.find("a.theme_custom");b.init(c),c.click()}),load_ondemand(a.find("a.help"),"click","Loading help docs...".i18n(),"help/help",function(b){var c=a.find("a.help");b.init_help(c),c.click()})};require(["navigation/navigation","jquery-ui","css!main.css","css!binary-style"],function(c){c.init(b),a("#menu").menu(),require(["instruments/instruments","trade/tradeMenu","jquery-growl"],function(b,c){a.growl.notice({message:"Loading chart and trade menus ...".i18n()}),b.init(),c.init()}),require(["windows/windows"],function(b){var c=a("#nav-menu .windows");b.init(c),a(".sk-spinner-container").hide(),b.fixFooterPosition(),a("body > .footer").show()})}),require(["shownotice/shownotice"]),require(["selfexclusion/selfexclusion","chrome/chrome","tc/tc","realitycheck/realitycheck","taxInformation/taxInformation","financialassessment/financialassessment"])}setup_i18n_translation(JSON.parse(b)),"ar"==i18n_name&&a("body").addClass("rtl-direction"),require(["jquery-ui","highstock","lokijs"]),require(["css!lib/jquery-ui/themes/base/jquery-ui.min.css","css!lib/jquery-ui-iconfont/jquery-ui.icon-font.css","css!lib/chosen-js/chosen.css","css!lib/growl/stylesheets/jquery.growl.css","css!lib/datatables/media/css/jquery.dataTables.min.css","css!lib/datatables/media/css/dataTables.jqueryui.min.css","css!lib/colorpicker/jquery.colorpicker.css","css!charts/charts.css"]),isAffiliates()?c():d()}),require(["jquery","jquery-growl"],function(a){["error","notice","warning"].forEach(function(b){var c=a.growl[b].bind(a.growl);a.growl[b]=function(b){b.message.indexOf("rate limit")>-1&&(b.message+=" Please try again after 1 minute.".i18n()),b.title||(b.title=""),a('#growls .growl:contains("'+b.message+'")').remove(),c(b)}})});