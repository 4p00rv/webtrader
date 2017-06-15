define(["exports","jquery","windows/windows","websockets/binary_websockets","charts/chartingRequestMap","common/rivetsExtra","moment","lodash","jquery-growl","common/util"],function(a,b,c,d,e,f,g,h){"use strict";function i(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(a,"__esModule",{value:!0}),a.init=void 0;var j=i(b),k=i(c),l=i(d),m=i(e),n=i(f),o=i(g),p=i(h),q={};require(["css!viewtransaction/viewTransaction.css"]),require(["text!viewtransaction/viewTransaction.html"]);var r=null,s=function(){if(r)return void r.moveToTop();var a="There was a market data disruption during the contract period. For real-money accounts we will attempt to correct this and settle the contract properly, otherwise the contract will be cancelled and refunded. Virtual-money contracts will be cancelled and refunded.".i18n(),b=j["default"]('<div class="data-disruption-dialog">'+a+"</div>");r=k["default"].createBlankWindow(b,{title:" There was an error ".i18n(),height:200,resizable:!1,collapsable:!1,minimizable:!1,maximizable:!1,destroy:function(){r&&r.dialog("destroy").remove(),r=null},"data-authorized":"true"}),r.dialog("open"),window.dd=r},t=function(a,b,c){var d=[],e="",f=0;if(c.history){e="line";for(var g=c.history,h=g.times,i=g.prices,j=0;j<h.length;++j)d.push([1e3*h[j],1*i[j]]),f=Math.max(f,i[j].substring(i[j].indexOf(".")+1).length)}c.candles&&(e="candlestick",d=c.candles.map(function(a){return[1e3*a.epoch,1*a.open,1*a.high,1*a.low,1*a.close]}));var k=c.title,l=a.find(".transaction-chart")[0],m={credits:{href:"#",text:""},chart:{type:"line",renderTo:l,backgroundColor:null,width:0,height:0,marginLeft:20,marginRight:20},title:{text:""},tooltip:{xDateFormat:"%A, %b %e, %H:%M:%S GMT",valueDecimals:f||void 0},xAxis:{type:"datetime",categories:null,startOnTick:!1,endOnTick:!1,min:d.length?p["default"].first(d)[0]:null,max:d.length?p["default"].last(d)[0]:null,labels:{overflow:"justify",format:"{value:%H:%M:%S}"}},yAxis:{labels:{align:"left",x:0,y:-2},title:""},series:[{name:k,data:d,type:e}],exporting:{enabled:!1,enableImages:!1},legend:{enabled:!1},navigator:{enabled:!0},plotOptions:{line:{marker:{radius:2}},candlestick:{lineColor:"black",color:"red",upColor:"green",upLineColor:"black",shadow:!0}},rangeSelector:{enabled:!1}},n=new Highcharts.Chart(m);return n.addPlotLineX=function(a){n.xAxis[0].addPlotLine({value:a.value,id:a.id||a.value,label:{text:a.label||"label",x:a.text_left?-15:5},color:a.color||"#e98024",zIndex:4,width:a.width||2})},n.addPlotLineY=function(a){n.yAxis[0].addPlotLine({id:a.id||a.label,value:a.value,label:{text:a.label,align:"center"},color:a.color||"green",zIndex:4,width:2})},l.chart=n},u=a.init=function(a,b){return new Promise(function(c,d){return q[b]?(q[b].moveToTop(),void c()):void l["default"].send({proposal_open_contract:1,contract_id:a}).then(function(a){var d=a.proposal_open_contract;return void 0===d.underlying&&void 0===d.shortcode?void s(d):(d.transaction_id=b,d.symbol=d.underlying,w(d),void c())})["catch"](function(a){j["default"].growl.error({message:a.message}),d()})})},v=function(a,b){{var c=a.proposal_open_contract,d=c.contract_id||a.echo_req.contract_id;c.bid_price}if(c.is_sold&&!c.exit_tick&&!c.exit_level&&!b.table.user_sold&&!c.sell_spot)return void l["default"].send({contract_id:d,proposal_open_contract:1});if(b.table.user_sold=c.sell_time&&c.sell_time<c.date_expiry,d==b.contract_id){if(c.validation_error?b.validation=c.validation_error:c.is_expired?b.validation="This contract has expired".i18n():c.is_valid_to_sell&&(b.validation="Note: Contract will be sold at the prevailing market price when the request is received by our servers. This price may differ from the indicated price.".i18n()),b.fwd_starting=c.is_forward_starting&&1*c.date_start>1*c.current_spot_time?"* Contract is not yet started.".i18n():"",1*b.table.date_expiry>=1*c.current_spot_time?(b.table.current_spot=c.current_spot,b.table.current_spot_time=c.current_spot_time,b.table.bid_price=c.bid_price,b.sell.bid_prices.length>40&&b.sell.bid_prices.shift(),b.sell.bid_prices.push(c.bid_price),void 0!==c.bid_price&&(b.sell.bid_price.value=c.bid_price,b.sell.bid_price.unit=c.bid_price.split(/[\.,]+/)[0],b.sell.bid_price.cent=c.bid_price.split(/[\.,]+/)[1]),b.sell.is_valid_to_sell=!1,b.sell.is_valid_to_sell=c.is_valid_to_sell,b.chart.manual_reflow()):b.table.current_spot_time=b.table.date_expiry,"SPREAD"===b.table.contract_type)return b.table.profit=c.current_value_in_dollar,b.table.profit_point=c.current_value_in_point,b.table.entry_tick=c.entry_level+"",b.table.entry_tick&&(b.table.current_spot=c.current_level),void(c.is_sold&&(b.table.status="Closed",b.table.is_sold=c.is_sold,b.table.exit_tick=c.exit_level,b.table.exit_tick_time=c.sell_time));b.table.entry_tick=c.entry_tick?c.entry_tick:b.table.entry_tick,b.table.entry_tick_time=c.entry_tick_time?c.entry_tick_time:b.table.entry_tick_time,c.is_sold&&(b.table.is_sold=c.is_sold,b.table.exit_tick=c.exit_tick,b.table.exit_tick_time=c.exit_tick_time,b.table.sell_price=c.sell_price,b.table.final_price=c.sell_price,!b.table.user_sold&&b.table.exit_tick_time&&b.chart.chart.addPlotLineX({value:1e3*b.table.exit_tick_time,label:"Exit Spot".i18n(),text_left:!0}),!b.table.user_sold&&b.table.date_expiry&&b.chart.chart.addPlotLineX({value:1e3*b.table.date_expiry,label:"End Time".i18n()}),b.table.user_sold&&b.table.sell_price&&b.chart.chart.addPlotLineX({value:1e3*c.sell_time,label:"Sell Time".i18n()})),!b.chart.barrier&&c.barrier&&(b.chart.barrier=c.barrier,b.chart.barrier&&b.chart.chart.addPlotLineY({value:1*b.chart.barrier,label:"Barrier (".i18n()+b.chart.barrier+")"})),!b.chart.high_barrier&&c.high_barrier&&(b.chart.high_barrier=c.high_barrier,b.chart.high_barrier&&b.chart.chart.addPlotLineY({value:1*b.chart.high_barrier,label:"High Barrier (".i18n()+b.chart.high_barrier+")"})),!b.chart.low_barrier&&c.low_barrier&&(b.chart.low_barrier=c.low_barrier,b.chart.low_barrier&&b.chart.chart.addPlotLineY({value:1*b.chart.low_barrier,label:"Low Barrier (".i18n()+b.chart.low_barrier+")",color:"red"}))}},w=function(a){require(["text!viewtransaction/viewTransaction.html"],function(b){var c=j["default"](b).i18n(),d=y(a,c),e=function(a){return v(a,d)},f=k["default"].createBlankWindow(c,{title:a.display_name+" ("+a.transaction_id+")",width:700,minWidth:490,minHeight:480,height:480,destroy:function(){},close:function(){g&&g.unbind(),l["default"].proposal_open_contract.forget(a.contract_id),l["default"].events.off("proposal_open_contract",e);for(var b=0;b<d.onclose.length;++b)d.onclose[b]();j["default"](this).dialog("destroy").remove(),q[a.transaction_id]=void 0},open:function(){l["default"].proposal_open_contract.subscribe(a.contract_id),l["default"].events.on("proposal_open_contract",e)},resize:function(){d.chart.manual_reflow()},"data-authorized":"true"});f.dialog("open");var g=n["default"].bind(c[0],d);q[a.transaction_id]=f})},x=function(a,b){a.sell.sell_at_market_enabled=!1,require(["text!viewtransaction/viewTransactionConfirm.html","css!viewtransaction/viewTransactionConfirm.css"]),l["default"].send({sell:a.contract_id,price:0}).then(function(c){a.table.user_sold=!0;var d=c.sell;require(["text!viewtransaction/viewTransactionConfirm.html","css!viewtransaction/viewTransactionConfirm.css"],function(c){var e=a.table.buy_price,f={longcode:a.longcode,buy_price:e,sell_price:d.sold_for,return_percent:(100*(d.sold_for-e)/e).toFixed(2)+"%",transaction_id:d.transaction_id,balance:d.balance_after,currency:a.table.currency},g=j["default"](c).i18n();b.after(g);var h=n["default"].bind(g[0],f);a.onclose.push(function(){h&&h.unbind()})})})["catch"](function(a){j["default"].growl.error({message:a.message})})},y=function(a,b){var c={route:{value:"table",update:function(a){c.route.value=a}},contract_id:a.contract_id,longcode:a.longcode,validation:a.validation_error||!a.is_valid_to_sell&&"Resale of this contract is not offered".i18n()||(a.is_settleable||a.is_sold)&&"This contract has expired".i18n()||"-",table:{is_ended:a.is_settleable||a.is_sold,currency:(a.currency||"USD")+" ",current_spot_time:a.current_spot_time,current_spot:a.current_spot,contract_type:a.contract_type,date_start:a.date_start,date_expiry:a.date_expiry,user_sold:a.sell_time&&a.sell_time<a.date_expiry,entry_tick:a.entry_tick||a.entry_spot,entry_tick_time:a.entry_tick_time?1*a.entry_tick_time:1*a.date_start,exit_tick:a.exit_tick,exit_tick_time:a.exit_tick_time,barrier_count:a.barrier_count,low_barrier:a.low_barrier,high_barrier:a.high_barrier,buy_price:a.buy_price,bid_price:void 0,final_price:a.is_sold?a.sell_price&&formatPrice(a.sell_price):void 0,tick_count:a.tick_count,prediction:a.prediction,sell_time:1*a.sell_spot_time||void 0,sell_spot:a.sell_spot,sell_price:a.is_sold?a.sell_price:void 0,purchase_time:a.purchase_time,is_sold_at_market:!1},chart:{chart:null,symbol:a.symbol,display_name:a.display_name,barrier:a.barrier,high_barrier:a.high_barrier,low_barrier:a.low_barrier,loading:"Loading "+a.display_name+" ...",type:"ticks"},sell:{bid_prices:[],bid_price:{unit:void 0,cent:void 0,value:void 0},sell_at_market_enabled:!0,is_valid_to_sell:!1},onclose:[]};if(0===a.contract_type.indexOf("SPREAD")){var d=a.shortcode.toUpperCase(),e=d.replace(a.underlying.toUpperCase()+"_","").split("_");c.table.contract_type="SPREAD",c.table.status=a.is_sold?"Closed":"Open",c.table.per_point=e[1],c.table.stop_loss=e[3],c.table.stop_profit=e[4],c.table.is_point="POINT"===e[5],c.table.is_up="U"===a.shortcode["spread".length],c.table.direction=c.table.is_up?1:-1,c.table.amount_per_point=c.table.is_up?"+"+c.table.per_point:"-"+c.table.per_point,c.table.is_sold=a.is_sold||a.is_expired,c.table.exit_tick=a.exit_level,c.table.exit_tick_time=c.table.is_sold?a.sell_time:void 0,c.table.profit=parseFloat(a.current_value_in_dollar),c.table.profit_point=parseFloat(a.current_value_in_point),c.table.pro_los="Profit/Loss ("+c.table.currency.replace(" ","")+")",c.table.entry_tick=a.entry_level,c.table.entry_tick_time=a.purchase_time,c.table.current_spot=a.current_level,c.table.current_spot_time=a.current_spot_time,c.table.stop_loss_level=a.stop_loss_level,c.table.stop_profit_level=a.stop_profit_level,c.table.request={proposal:1,symbol:a.underlying,currency:a.currency,contract_type:e[0],amount_per_point:c.table.per_point,stop_loss:c.table.stop_loss,stop_profit:c.table.stop_profit,stop_type:e[5].toLowerCase()}}return c.sell.sell=function(){return x(c,b)},c.chart.manual_reflow=function(){var a=-1*(b.find(".longcode").height()+b.find(".tabs").height()+b.find(".footer").height())-16;if(c.chart.chart){var d=b,e=(d.find(".transaction-chart"),d.width()-10),f=d.height();c.chart.chart.setSize(e,f+a,!1),c.chart.chart.hasUserSize=null,c.chart.chart.series[0]&&0===c.chart.chart.series[0].data.length?c.chart.chart.showLoading():c.chart.chart.hideLoading()}},A(c,b),c},z=function(a,b){var c=m["default"].keyFor(a.chart.symbol,b);if(m["default"][c])m["default"].subscribe(c);else{var d={symbol:a.chart.symbol,subscribe:1,granularity:b,style:0===b?"ticks":"candles"};m["default"].register(d)["catch"](function(a){j["default"].growl.error({message:a.message})})}var e=void 0,f=void 0;if(0===b){var g=null;e=l["default"].events.on("tick",function(b){if(b.tick&&b.tick.symbol===a.chart.symbol){var c=a.chart.chart,d=b.tick;c&&c.series[0].addPoint([1e3*d.epoch,1*d.quote]),(1*d.epoch>1*a.table.date_expiry||a.table.is_sold)&&(g&&"SPREAD"!==a.table.contract_type&&(a.table.exit_tick=g.quote,a.table.exit_tick_time=1*g.epoch,a.validation="This contract has expired".i18n(),a.table.is_ended=!0),i()),g=d}})}else f=l["default"].events.on("ohlc",function(b){var d=m["default"].keyFor(b.ohlc.symbol,b.ohlc.granularity);if(c==d){var e=a.chart.chart;if(e){var f=e.series[0],g=f.data[f.data.length-1],h=b.ohlc,j=[1e3*h.open_time,1*h.open,1*h.high,1*h.low,1*h.close];g.x!=j[0]?f.addPoint(j,!0,!0):g.update(j,!0),1*h.epoch>1*a.table.date_expiry&&i()}}});var h=!1,i=function(){h||(h=!0,m["default"].unregister(c),e&&l["default"].events.off("tick",e),f&&l["default"].events.off("candles",f))};a.onclose.push(i)},A=function(a,b){var c=(a.table,Math.min(1*a.table.date_expiry,o["default"].utc().unix())-(a.table.purchase_time||a.table.date_start)),d=0,e=0;d=3600>=c?0:7200>=c?60:21600>=c?120:86400>=c?300:3600,e=0===d?Math.max(3,30*c/3600|0):3*d;var f={ticks_history:a.chart.symbol,start:1*(a.table.purchase_time||a.table.date_start)-e,end:a.table.sell_time?1*a.table.sell_time+e:a.table.exit_tick_time?1*a.table.exit_tick_time+e:"latest",style:"ticks",count:4999};return 0!==d&&(f.granularity=d,f.style="candles",a.chart.type="candles"),a.table.is_ended||z(a,d),l["default"].send(f).then(function(c){a.chart.loading="";var d={title:a.chart.display_name};c.history&&(d.history=c.history),c.candles&&(d.candles=c.candles);var e=t(b,a,d);a.table.entry_tick_time&&e.addPlotLineX({value:1e3*a.table.entry_tick_time,label:"Entry Spot".i18n()}),(!a.table.user_sold||"SPREAD"===a.table.contract_type)&&e.addPlotLineX({value:1e3*a.table.exit_tick_time,label:"Exit Spot".i18n(),text_left:!0}),a.table.entry_tick_time&&e.addPlotLineX({value:1e3*a.table.entry_tick_time,label:"Entry Spot".i18n()}),!a.table.user_sold&&a.table.exit_tick_time&&e.addPlotLineX({value:1e3*a.table.exit_tick_time,label:"Exit Spot".i18n(),text_left:!0}),!a.table.user_sold&&a.table.date_expiry&&e.addPlotLineX({value:1e3*a.table.date_expiry,label:"End Time".i18n()}),a.table.date_start&&e.addPlotLineX({value:1e3*a.table.date_start,label:"Start Time".i18n(),text_left:!0}),a.chart.barrier&&e.addPlotLineY({value:1*a.chart.barrier,label:"Barrier (".i18n()+a.chart.barrier+")"}),a.chart.high_barrier&&e.addPlotLineY({value:1*a.chart.high_barrier,label:"High Barrier (".i18n()+a.chart.high_barrier+")"}),a.chart.low_barrier&&e.addPlotLineY({value:1*a.chart.low_barrier,label:"Low Barrier (".i18n()+a.chart.low_barrier+")",color:"red"}),a.table.stop_loss_level&&e.addPlotLineY({value:1*a.table.stop_loss_level,label:"Stop Loss (".i18n()+a.table.stop_loss_level+")",color:"red"}),a.table.stop_profit_level&&e.addPlotLineY({value:1*a.table.stop_profit_level,label:"Stop Profit (".i18n()+a.table.stop_profit_level+")"}),a.table.user_sold&&e.addPlotLineX({value:1e3*a.table.sell_time,label:"Sell Spot".i18n(),text_left:!0}),a.chart.chart=e,a.chart.manual_reflow()})["catch"](function(b){a.chart.loading=b.message})};a["default"]={init:u}});