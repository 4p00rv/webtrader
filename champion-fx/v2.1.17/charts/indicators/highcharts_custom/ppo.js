PPO=function(a,b,c){b.fastMaType=(b.fastMaType||"SMA").toUpperCase(),b.slowMaType=(b.slowMaType||"SMA").toUpperCase(),b.signalMaType=(b.signalMaType||"SMA").toUpperCase(),IndicatorBase.call(this,a,b,c);var d={maType:b.slowMaType,period:b.slowPeriod,appliedTo:b.appliedTo},e={maType:b.fastMaType,period:b.fastPeriod,appliedTo:b.appliedTo},f={maType:b.signalMaType,period:b.signalPeriod+b.slowPeriod-1};this.fastMa=new window[b.fastMaType](a,e,c),this.slowMa=new window[b.slowMaType](a,d,c),this.histogramData=[],this.uniqueID=[uuid(),uuid(),uuid()];for(var g=0;g<a.length;g++){var h=0;0!==this.slowMa.indicatorData[g].value&&(h=toFixed((this.fastMa.indicatorData[g].value-this.slowMa.indicatorData[g].value)/this.slowMa.indicatorData[g].value*100,4)),this.indicatorData.push({time:a[g].time,value:h,close:h})}this.signalMa=new window[b.signalMaType](this.indicatorData,f,c),this.signalData=this.signalMa.indicatorData;var g=0,i=this;this.indicatorData.forEach(function(b){var c=toFixed(b.value-i.signalData[g].value,4);i.histogramData.push({time:a[g].time,value:c}),g++})},PPO.prototype=Object.create(IndicatorBase.prototype),PPO.prototype.constructor=PPO,PPO.prototype.addPoint=function(a){var b=this.fastMa.addPoint(a)[0].value,c=this.slowMa.addPoint(a)[0].value,d=0;0!==c&&(d=toFixed((b-c)/c*100,4));var e=this.signalMa.addPoint({time:a.time,close:d})[0].value,f=toFixed(d-e,4);return this.signalData=this.signalMa.indicatorData,this.histogramData.push({time:a.time,value:f}),this.indicatorData.push({time:a.time,value:d}),[{id:this.uniqueID[0],value:d},{id:this.uniqueID[1],value:e},{id:this.uniqueID[2],value:f}]},PPO.prototype.update=function(a){var b=this.indicatorData.length-1,c=this.fastMa.update(a)[0].value,d=this.slowMa.update(a)[0].value,e=0;0!==d&&(e=toFixed((c-d)/d*100,4));var f=this.signalMa.update({time:a.time,close:e})[0].value,g=toFixed(e-f,4);return this.signalData=this.signalMa.indicatorData,this.histogramData[b].value=g,this.indicatorData[b].value=e,[{id:this.uniqueID[0],value:e},{id:this.uniqueID[1],value:f},{id:this.uniqueID[2],value:g}]},PPO.prototype.toString=function(){return"PPO ("+this.options.fastPeriod+", "+this.options.slowPeriod+", "+this.options.signalPeriod+", "+this.indicators.appliedPriceString(this.options.appliedTo)+")"},PPO.prototype.buildSeriesAndAxisConfFromData=function(a){var b=[];this.indicatorData.forEach(function(a){b.push([a.time,a.value])});var c=[];this.signalData.forEach(function(a){c.push([a.time,a.value])});var d=[];return this.histogramData.forEach(function(a){d.push([a.time,a.value])}),[{axisConf:{id:a.id+"-"+this.uniqueID[0],title:{text:this.toString(),align:"high",offset:0,rotation:0,y:10,x:30+7.5*this.toString().length},lineWidth:2,plotLines:this.options.levels}},{seriesConf:{id:this.uniqueID[2],name:"Histogram - "+this.toString(),data:d,type:"column",yAxis:a.id+"-"+this.uniqueID[0],color:this.options.ppoHstgrmColor,lineWidth:this.options.strokeWidth,dashStyle:this.options.dashStyle,onChartIndicator:!1}},{seriesConf:{id:this.uniqueID[0],name:"PPO - "+this.toString(),data:b,type:"line",yAxis:a.id+"-"+this.uniqueID[0],color:this.options.ppoStroke,lineWidth:this.options.strokeWidth,dashStyle:this.options.dashStyle,onChartIndicator:!1}},{seriesConf:{id:this.uniqueID[1],name:"SIGNAL - "+this.toString(),data:c,type:"line",yAxis:a.id+"-"+this.uniqueID[0],color:this.options.signalLineStroke,lineWidth:this.options.strokeWidth,dashStyle:this.options.dashStyle,onChartIndicator:!1}}]},PPO.prototype.getIDs=function(){return this.uniqueID},PPO.prototype.isSameInstance=function(a){return _.isEqual(a.sort(),this.uniqueID)};