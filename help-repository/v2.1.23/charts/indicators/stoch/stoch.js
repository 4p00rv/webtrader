define(["jquery","lodash","jquery-ui","color-picker","ddslick"],function(a,b){function c(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function d(d,f){var g=function(a,b,c,d){this.level=a,this.stroke=b,this.strokeWidth=c,this.dashStyle=d},h=[new g(30,"red",1,"Dash"),new g(70,"red",1,"Dash")];require(["text!charts/indicators/stoch/stoch.html","text!charts/indicators/indicators.json","css!charts/indicators/stoch/stoch.css"],function(g,i){g=a(g),g.appendTo("body"),i=JSON.parse(i);var j=i.stoch;g.attr("title",j.long_display_name),g.find(".stoch-description").html(j.description),g.find("input[type='button']").button(),g.find("#stoch_k_stroke,#stoch_d_stroke").each(function(){a(this).colorpicker({showOn:"click",position:{at:"right+100 bottom",of:"element",collision:"fit"},part:{map:{size:128},bar:{size:128}},select:function(b,c){a(this).css({background:"#"+c.formatted}).val(""),a(this).data("color","#"+c.formatted)},ok:function(b,c){a(this).css({background:"#"+c.formatted}).val(""),a(this).data("color","#"+c.formatted)}})}),a("#stoch_k_stroke").css("background","#1c1010"),a("#stoch_d_stroke").css("background","#cd0a0a");var k="Solid";a("#stoch_dashStyle").ddslick({imagePosition:"left",width:148,background:"white",onSelected:function(b){a("#stoch_dashStyle .dd-selected-image").css("max-height","5px").css("max-width","115px"),k=b.selectedData.value}}),a("#stoch_dashStyle .dd-option-image").css("max-height","5px").css("max-width","115px");var l=g.find("#stoch_levels").DataTable({paging:!1,scrollY:100,autoWidth:!0,searching:!1,info:!1,columnDefs:[{className:"dt-center",targets:[0,1,2,3]}],aoColumnDefs:[{bSortable:!1,aTargets:[1,3]}]});a.each(h,function(b,c){a(l.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+c.dashStyle+'.svg" /></div>']).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})}),g.find("#stoch_level_delete").click(function(){l.rows(".selected").indexes().length<=0?require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Select level(s) to delete!"})}):l.rows(".selected").remove().draw()}),g.find("#stoch_level_add").click(function(){require(["indicator_levels"],function(b){b.open(d,function(b){a.each(b,function(b,c){a(l.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+c.dashStyle+'.svg" /></div>']).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})})})})});var m={autoOpen:!1,resizable:!1,width:350,height:400,modal:!0,my:"center",at:"center",of:window,dialogClass:"stoch-ui-dialog",buttons:[{text:"OK",click:function(){var d=!0;if(a(".stoch_input_width_for_period").each(function(){var c=a(this);return b.isInteger(b.toNumber(c.val()))&&b.inRange(c.val(),parseInt(c.attr("min")),parseInt(c.attr("max"))+1)?void 0:(require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+c.attr("min")+" to "+c.attr("max")+" is allowed for "+c.closest("tr").find("td:first").text()+"!"})}),c.val(c.prop("defaultValue")),void(d=!1))}),d){var f=[];a.each(l.rows().nodes(),function(){var b=a(this).data("level");b&&f.push({color:b.stroke,dashStyle:b.dashStyle,width:b.strokeWidth,value:b.level,label:{text:b.level}})});var h={fastKPeriod:parseInt(a("#stoch_k_period").val()),fastDPeriod:parseInt(a("#stoch_d_period").val()),fastDMaType:a("#stoch_d_ma_type").val(),stroke:a("#stoch_k_stroke").css("background-color"),dStroke:a("#stoch_d_stroke").css("background-color"),strokeWidth:parseInt(a("#stoch_stroke_width").val()),dashStyle:k,appliedTo:parseInt(a("#stoch_applied_to").val()),levels:f};e&&e(),a(a(".stoch").data("refererChartID")).highcharts().series[0].addIndicator("stoch",h),c.call(g)}}},{text:"Cancel",click:function(){c.call(this)}}],icons:{close:"custom-icon-close",minimize:"custom-icon-minimize",maximize:"custom-icon-maximize"}};g.dialog(m).dialogExtend(b.extend(m,{maximizable:!1,minimizable:!1,collapsable:!1})),g.find("select").each(function(b,c){a(c).selectmenu({width:150}).selectmenu("menuWidget").css("max-height","85px")}),"function"==typeof f&&f(d)})}var e=null;return{open:function(b,c){e=c||e;var f=function(){a(".stoch").data("refererChartID",b).dialog("open")};0==a(".stoch").length?d(b,this.open):f()}}});