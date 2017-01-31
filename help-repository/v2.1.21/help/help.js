define(["exports","jquery","windows/windows","common/rivetsExtra","text!help/help.html","css!help/help.css"],function(a,b,c,d,e){"use strict";function f(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(a,"__esModule",{value:!0}),a.init_help=void 0;var g=f(b),h=f(c),i=f(d),j=f(e),k=null,l=[],m=function(){var a=g["default"](j["default"]);k=h["default"].createBlankWindow(g["default"]("<div class='help-dialog'/>"),{title:"Help",width:850,height:400,resizable:!1,minimizable:!0,maximizable:!0,modal:!1,ignoreTileAction:!0,close:function(){k.dialog("destroy"),k.remove(),k=null},destroy:function(){d&&d.unbind(),d=null}});var b={current:{list:null,loading:!1,sublist:null,content_page:null,content:null},list:[{text:"About Binary.com",sublist_id:"about_us"},{text:"Getting started",sublist_id:"getting_started"},{text:" Types of trades",sublist_id:"trade_types"},{text:"Indicators",sublist_id:"indicators"},{text:"FAQ",sublist_id:"faq"},{text:"Glossary",sublist_id:"glossary"}],sublist:{about_us:[{text:"About us",url:"about-us.html"},{text:"Group history",url:"group-history.html"}],getting_started:[{text:"Why choose Binary Trading",url:"why-binary.html"},{text:"Benefits of Binary Trading",url:"binary-benefits.html"},{text:"How to trade Binaries",url:"trade-binaries.html"}],trade_types:[{text:"Up/Down",url:"up-down.html"},{text:"Touch/No Touch",url:"touch-no-touch.html"},{text:"In/Out",url:"in-out.html"},{text:"Asians",url:"asians.html"},{text:"Digits",url:"digits.html"},{text:"Spreads",url:"spreads.html"}],indicators:[{text:"Volatility Indicators",url:"volatility-indicators.html"},{text:"Overlap Studies",url:"overlap-studies.html"},{text:"Momentum Indicators",url:"momentum-indicators.html"},{text:"Price Transformation",url:"price-transformation.html"},{text:"Statistical Functions",url:"statistical-functions.html"},{text:"Pattern Recognition",url:"pattern-recognition.html"},{text:"Bill Williams",url:"bill-williams.html"}],faq:[{text:"Opening an account",url:"opening-account.html"},{text:"Financial Security",url:"financial-security.html"},{text:"Depositing and withdrawing funds",url:"deposit-withdraw.html"},{text:"Learning to trade",url:"learn-trade.html"}],glossary:[{text:"Barrier(s)",url:"barriers.html"},{text:"Binary option",url:"binary-option.html"},{text:"Commodities",url:"commodities.html"},{text:"Contract period",url:"contract-period.html"},{text:"Derivative",url:"derivative.html"},{text:"Duration",url:"duration.html"},{text:"Ends Between/Ends Outside trades",url:"ends-between.html"},{text:"Entry spot price",url:"entry-spot.html"},{text:"Expiry price",url:"expiry-price.html"},{text:"Forex",url:"forex.html"},{text:"GMT",url:"gmt.html"},{text:"Higher/Lower trades",url:"h_l-trades.html"},{text:"Indices",url:"indices.html"},{text:"In/Out trades",url:"i_o-trades.html"},{text:"Market exit price",url:"m_exit-price.html"},{text:"No Touch trades",url:"no-touch-trades.html"},{text:"(One) Touch trades",url:"touch-trades.html"},{text:"Payout",url:"payout.html"},{text:"Pip",url:"pip.html"},{text:"Profit",url:"profit.html"},{text:"Volatility Indices",url:"volatility-indices.html"},{text:"Resale price",url:"resale-price.html"},{text:"Return",url:"return.html"},{text:"Rise/Fall trades",url:"r_f-trades.html"},{text:"Sell option",url:"sell-option.html"},{text:"Spot price",url:"spot-price.html"},{text:"Stake",url:"stake.html"},{text:"Stays Between/Goes Outside trades",url:"stays-between-goes-outside-trades.html"},{text:"Tick",url:"tick.html"},{text:"Underlying",url:"underlying.html"}]}};b.updateSublist=function(a){b.current.list=a,b.current.sublist=b.sublist[a.sublist_id],b.getContent(b.current.sublist[0].url)},b.getContent=function(a){b.current.loading=!0,b.current.content_page=a,require(["text!help/"+a],function(a){b.current.loading=!1,b.current.content=a,g["default"](".help-dialog .content").find("a").each(function(a,b){g["default"](b).attr("target","_blank")})})},b.searchSublist=function(a){var c=g["default"](a.target).val().toLowerCase();c.length>0&&(b.current.sublist=l.filter(function(a){return-1!=a.text.toLowerCase().indexOf(c)}),b.current.sublist&&b.current.sublist.length&&b.getContent(b.current.sublist[0].url))};for(var c in b.sublist)l=l.concat(b.sublist[c]);b.current.list=b.list[0],b.updateSublist(b.current.list),b.current.content_page=b.sublist[b.current.list.sublist_id][0].url,b.getContent(b.current.content_page),a.appendTo(k);var d=i["default"].bind(k[0],b);k.dialog("open")},n=a.init_help=function(a){a.click(function(){k?k.moveToTop():m()})};a["default"]={init_help:n}});