SUM=function(a,b,c){IndicatorBase.call(this,a,b,c),this.priceData=[],this.CalculateSUMValue=function(a,b){for(var c=0,d=0;d<this.options.period;d++)c+=this.indicators.getIndicatorOrPriceValue(a[b-d],this.options.appliedTo);return toFixed(c,4)};for(var d=0;d<a.length;d++){if(d>=this.options.period-1){var e=this.CalculateSUMValue(a,d);this.indicatorData.push({time:a[d].time,value:e})}else this.indicatorData.push({time:a[d].time,value:0});this.priceData.push(a[d])}},SUM.prototype=Object.create(IndicatorBase.prototype),SUM.prototype.constructor=SUM,SUM.prototype.addPoint=function(a){this.priceData.push(a);var b=this.CalculateSUMValue(this.priceData,this.priceData.length-1);return this.indicatorData.push({time:a.time,value:b}),[{id:this.uniqueID,value:b}]},SUM.prototype.update=function(a){var b=this.priceData.length-1;this.priceData[b].open=a.open,this.priceData[b].high=a.high,this.priceData[b].low=a.low,this.priceData[b].close=a.close;var c=this.CalculateSUMValue(this.priceData,b);return this.indicatorData[b].value=c,[{id:this.uniqueID,value:c}]},SUM.prototype.toString=function(){return"SUM ("+this.options.period+", "+this.indicators.appliedPriceString(this.options.appliedTo)+")"};