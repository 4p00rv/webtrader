define(["jquery","windows/windows","websockets/binary_websockets","lodash","common/rivetsExtra","moment","jquery-growl","common/util"],function(a,b,c,d,e,f){function g(a){if(i){var b=i.dialog("widget");a?(i.dialog({height:k}),b.find(".realitycheck_firstscreen").show(),b.find(".realitycheck_secondscreen").hide()):(i.dialog({height:l}),b.find(".realitycheck_firstscreen").hide(),b.find(".realitycheck_secondscreen").show())}}function h(){return i?Promise.resolve(!0):new Promise(function(d){c.cached.authorize().then(function(f){n.loginId=f.authorize.loginid,c.cached.send({landing_company_details:f.authorize.landing_company_name}).then(function(c){c&&c.landing_company_details.has_reality_check?require(["text!realitycheck/realitycheck.html","css!realitycheck/realitycheck.css"],function(c){var f=a(c).i18n();i=b.createBlankWindow(a("<div/>"),{title:"Reality check".i18n(),width:600,minHeight:k,height:k,resizable:!1,collapsable:!1,minimizable:!1,maximizable:!1,closable:!1,modal:!0,closeOnEscape:!1,ignoreTileAction:!0,"data-authorized":"true"}),f.appendTo(i),a("body").append(i.dialog("widget")),g(!0),e.bind(f[0],n),d()}):local_storage.remove("realitycheck")})})["catch"](function(){local_storage.remove("realitycheck")})})}var i=null,j=null,k=260,l=310,m=[],n={timeOutInMins:(local_storage.get("realitycheck")||{}).timeOutInMins||10,timeOutMin:10,timeOutMax:120,loginId:null,durationInMins:null,bought:null,turnOver:null,loginTime:null,sold:null,pnl:null,currentTime:null,open:null,potentialProfit:null,currency:null,continueTrading:function(b,c){return c.timeOutInMins<c.timeOutMin||c.timeOutInMins>c.timeOutMax?void a.growl.error({message:"Please enter a number between ".i18n()+c.timeOutMin+" and ".i18n()+c.timeOutMax}):(i.dialog("close"),local_storage.set("realitycheck",{timeOutInMins:0|c.timeOutInMins,accepted_time:f.utc().valueOf()}),void o(c.timeOutInMins))},openStatement:function(){require(["statement/statement"],function(b){var c=a("#nav-menu").find("a.statement");b.init(c),c.click()})},logout:function(){c.invalidate()}},o=function(a){j&&clearTimeout(j);var b=60*a*1e3;j=setTimeout(function(){c.send({reality_check:1}).then(function(a){if(!local_storage.get("authorize").is_virtual){var b=f.utc().valueOf()-1e3*a.reality_check.start_time,c=1728e5;b>c&&(b=c),n.durationInMins=f.duration(b).humanize(),n.bought=a.reality_check.buy_count,n.turnOver=a.reality_check.buy_amount,n.loginTime=f.utc(1e3*a.reality_check.start_time).format("MMM D, YYYY hh:mm")+" GMT",n.sold=a.reality_check.sell_count,n.pnl=a.reality_check.sell_amount-a.reality_check.buy_amount,n.currentTime=f.utc().format("MMM D, YYYY hh:mm")+" GMT",n.open=a.reality_check.open_contract_count,n.potentialProfit=a.reality_check.potential_profit,n.currency=a.reality_check.currency,g(!1),i.moveToTop()}})},b)},p=function(){i&&i.dialog("close"),j&&clearTimeout(j),j=null,n.timeOutInMins=10,n.loginId=null,n.durationInMins=null,n.bought=null,n.turnOver=null,n.loginTime=null,n.sold=null,n.pnl=null,n.currentTime=null,n.open=null,n.potentialProfit=null,n.currency=null},q=function(){if(p(),!local_storage.get("authorize").is_virtual){var a=h();m.push(a),Promise.all(m).then(function(){g(!0),i.dialog("open"),m=[]})}};return c.events.on("oauth-login",q),c.events.on("login",function(a){n.loginId!=a.authorize.loginid&&p();var b=local_storage.get("realitycheck");if(b&&!local_storage.get("authorize").is_virtual){var c=(f.utc().valueOf()-b.accepted_time)/60/1e3;h().then(function(){o(c>=b.timeOutInMins?0:Math.abs(b.timeOutInMins-c))})}else q()}),c.events.on("reset_realitycheck",function(){p(),local_storage.remove("realitycheck")}),c.events.on("switch_account",function(){local_storage.remove("realitycheck"),q()}),{}});