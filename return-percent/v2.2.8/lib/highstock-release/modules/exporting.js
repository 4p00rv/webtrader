!function(a){"object"==typeof module&&module.exports?module.exports=a:a(Highcharts)}(function(a){!function(a){var b=a.defaultOptions,c=a.doc,d=a.Chart,e=a.addEvent,f=a.removeEvent,g=a.fireEvent,h=a.createElement,i=a.discardElement,j=a.css,k=a.merge,l=a.pick,m=a.each,n=a.extend,o=a.isTouchDevice,p=a.win,q=a.Renderer.prototype.symbols;n(b.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"}),b.navigation={buttonOptions:{theme:{},symbolSize:14,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,verticalAlign:"top",width:24}},k(!0,b.navigation,{menuStyle:{border:"1px solid #999999",background:"#ffffff",padding:"5px 0"},menuItemStyle:{padding:"0.5em 1em",background:"none",color:"#333333",fontSize:o?"14px":"11px",transition:"background 250ms, color 250ms"},menuItemHoverStyle:{background:"#335cad",color:"#ffffff"},buttonOptions:{symbolFill:"#666666",symbolStroke:"#666666",symbolStrokeWidth:3,theme:{fill:"#ffffff",stroke:"none",padding:5}}}),b.exporting={type:"image/png",url:"https://export.highcharts.com/",printMaxWidth:780,scale:2,buttons:{contextButton:{className:"highcharts-contextbutton",menuClassName:"highcharts-contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}},a.post=function(a,b,d){var e;a=h("form",k({method:"post",action:a,enctype:"multipart/form-data"},d),{display:"none"},c.body);for(e in b)h("input",{type:"hidden",name:e,value:b[e]},null,a);a.submit(),i(a)},n(d.prototype,{sanitizeSVG:function(a,b){if(b&&b.exporting&&b.exporting.allowHTML){var c=a.match(/<\/svg>(.*?$)/);c&&c[1]&&(c='<foreignObject x="0" y="0" width="'+b.chart.width+'" height="'+b.chart.height+'"><body xmlns="http://www.w3.org/1999/xhtml">'+c[1]+"</body></foreignObject>",a=a.replace("</svg>",c+"</svg>"))}return a=a.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\(("|&quot;)(\S+)("|&quot;)\)/g,"url($2)").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g," xlink:href=").replace(/\n/," ").replace(/<\/svg>.*?$/,"</svg>").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,'$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g," ").replace(/&shy;/g,"­"),a=a.replace(/<IMG /g,"<image ").replace(/<(\/?)TITLE>/g,"<$1title>").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/ id=([^" >]+)/g,' id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(a){return a.toLowerCase()})},getChartHTML:function(){return this.container.innerHTML},getSVG:function(b){var d,e,f,g,j,l=k(this.options,b);return c.createElementNS||(c.createElementNS=function(a,b){return c.createElement(b)}),e=h("div",null,{position:"absolute",top:"-9999em",width:this.chartWidth+"px",height:this.chartHeight+"px"},c.body),f=this.renderTo.style.width,j=this.renderTo.style.height,f=l.exporting.sourceWidth||l.chart.width||/px$/.test(f)&&parseInt(f,10)||600,j=l.exporting.sourceHeight||l.chart.height||/px$/.test(j)&&parseInt(j,10)||400,n(l.chart,{animation:!1,renderTo:e,forExport:!0,renderer:"SVGRenderer",width:f,height:j}),l.exporting.enabled=!1,delete l.data,l.series=[],m(this.series,function(a){g=k(a.userOptions,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:a.visible}),g.isInternal||l.series.push(g)}),m(this.axes,function(b){b.userOptions.internalKey||(b.userOptions.internalKey=a.uniqueKey())}),d=new a.Chart(l,this.callback),b&&m(["xAxis","yAxis","series"],function(a){var c={};b[a]&&(c[a]=b[a],d.update(c))}),m(this.axes,function(b){var c=a.find(d.axes,function(a){return a.options.internalKey===b.userOptions.internalKey}),e=b.getExtremes(),f=e.userMin,e=e.userMax;!c||void 0===f&&void 0===e||c.setExtremes(f,e,!0,!1)}),f=d.getChartHTML(),f=this.sanitizeSVG(f,l),l=null,d.destroy(),i(e),f},getSVGForExport:function(a,b){var c=this.options.exporting;return this.getSVG(k({chart:{borderRadius:0}},c.chartOptions,b,{exporting:{sourceWidth:a&&a.sourceWidth||c.sourceWidth,sourceHeight:a&&a.sourceHeight||c.sourceHeight}}))},exportChart:function(b,c){c=this.getSVGForExport(b,c),b=k(this.options.exporting,b),a.post(b.url,{filename:b.filename||"chart",type:b.type,width:b.width||0,scale:b.scale,svg:c},b.formAttributes)},print:function(){var a,b,d=this,e=d.container,f=[],h=e.parentNode,i=c.body,j=i.childNodes,k=d.options.exporting.printMaxWidth;d.isPrinting||(d.isPrinting=!0,d.pointer.reset(null,0),g(d,"beforePrint"),(b=k&&d.chartWidth>k)&&(a=[d.options.chart.width,void 0,!1],d.setSize(k,void 0,!1)),m(j,function(a,b){1===a.nodeType&&(f[b]=a.style.display,a.style.display="none")}),i.appendChild(e),p.focus(),p.print(),setTimeout(function(){h.appendChild(e),m(j,function(a,b){1===a.nodeType&&(a.style.display=f[b])}),d.isPrinting=!1,b&&d.setSize.apply(d,a),g(d,"afterPrint")},1e3))},contextMenu:function(a,b,d,f,g,i,k){var l,o,p=this,q=p.options.navigation,r=p.chartWidth,s=p.chartHeight,t="cache-"+a,u=p[t],v=Math.max(g,i);u||(p[t]=u=h("div",{className:a},{position:"absolute",zIndex:1e3,padding:v+"px"},p.container),l=h("div",{className:"highcharts-menu"},null,u),j(l,n({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},q.menuStyle)),o=function(){j(u,{display:"none"}),k&&k.setState(0),p.openMenu=!1},p.exportEvents.push(e(u,"mouseleave",function(){u.hideTimer=setTimeout(o,500)}),e(u,"mouseenter",function(){clearTimeout(u.hideTimer)}),e(c,"mouseup",function(b){p.pointer.inClass(b.target,a)||o()})),m(b,function(a){if(a){var b;a.separator?b=h("hr",null,null,l):(b=h("div",{className:"highcharts-menu-item",onclick:function(b){b&&b.stopPropagation(),o(),a.onclick&&a.onclick.apply(p,arguments)},innerHTML:a.text||p.options.lang[a.textKey]},null,l),b.onmouseover=function(){j(this,q.menuItemHoverStyle)},b.onmouseout=function(){j(this,q.menuItemStyle)},j(b,n({cursor:"pointer"},q.menuItemStyle))),p.exportDivElements.push(b)}}),p.exportDivElements.push(l,u),p.exportMenuWidth=u.offsetWidth,p.exportMenuHeight=u.offsetHeight),b={display:"block"},d+p.exportMenuWidth>r?b.right=r-d-g-v+"px":b.left=d-v+"px",f+i+p.exportMenuHeight>s&&"top"!==k.alignOptions.verticalAlign?b.bottom=s-f-v+"px":b.top=f+i-v+"px",j(u,b),p.openMenu=!0},addButton:function(a){var b,c,d=this,e=d.renderer,f=k(d.options.navigation.buttonOptions,a),g=f.onclick,h=f.menuItems,i=f.symbolSize||12;if(d.btnCount||(d.btnCount=0),d.exportDivElements||(d.exportDivElements=[],d.exportSVGElements=[]),!1!==f.enabled){var j,m=f.theme,o=m.states,p=o&&o.hover,o=o&&o.select;delete m.states,g?j=function(a){a.stopPropagation(),g.call(d,a)}:h&&(j=function(){d.contextMenu(c.menuClassName,h,c.translateX,c.translateY,c.width,c.height,c),c.setState(2)}),f.text&&f.symbol?m.paddingLeft=l(m.paddingLeft,25):f.text||n(m,{width:f.width,height:f.height,padding:0}),c=e.button(f.text,0,0,j,m,p,o).addClass(a.className).attr({"stroke-linecap":"round",title:d.options.lang[f._titleKey],zIndex:3}),c.menuClassName=a.menuClassName||"highcharts-menu-"+d.btnCount++,f.symbol&&(b=e.symbol(f.symbol,f.symbolX-i/2,f.symbolY-i/2,i,i).addClass("highcharts-button-symbol").attr({zIndex:1}).add(c),b.attr({stroke:f.symbolStroke,fill:f.symbolFill,"stroke-width":f.symbolStrokeWidth||1})),c.add().align(n(f,{width:c.width,x:l(f.x,d.buttonOffset)}),!0,"spacingBox"),d.buttonOffset+=(c.width+f.buttonSpacing)*("right"===f.align?-1:1),d.exportSVGElements.push(c,b)}},destroyExport:function(a){var b=a?a.target:this;a=b.exportSVGElements;var c,d=b.exportDivElements,e=b.exportEvents;a&&(m(a,function(a,d){a&&(a.onclick=a.ontouchstart=null,c="cache-"+a.menuClassName,b[c]&&delete b[c],b.exportSVGElements[d]=a.destroy())}),a.length=0),d&&(m(d,function(a,c){clearTimeout(a.hideTimer),f(a,"mouseleave"),b.exportDivElements[c]=a.onmouseout=a.onmouseover=a.ontouchstart=a.onclick=null,i(a)}),d.length=0),e&&(m(e,function(a){a()}),e.length=0)}}),q.menu=function(a,b,c,d){return["M",a,b+2.5,"L",a+c,b+2.5,"M",a,b+d/2+.5,"L",a+c,b+d/2+.5,"M",a,b+d-1.5,"L",a+c,b+d-1.5]},d.prototype.renderExporting=function(){var a,b=this.options.exporting,c=b.buttons,d=this.isDirtyExporting||!this.exportSVGElements;if(this.buttonOffset=0,this.isDirtyExporting&&this.destroyExport(),d&&!1!==b.enabled){this.exportEvents=[];for(a in c)this.addButton(c[a]);this.isDirtyExporting=!1}e(this,"destroy",this.destroyExport)},d.prototype.callbacks.push(function(a){a.renderExporting(),e(a,"redraw",a.renderExporting),m(["exporting","navigation"],function(b){a[b]={update:function(c,d){a.isDirtyExporting=!0,k(!0,a.options[b],c),l(d,!0)&&a.redraw()}}})})}(a)});