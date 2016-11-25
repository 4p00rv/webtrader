"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();define(["jquery","charts/chartWindow","common/rivetsExtra"],function(a,b,c){require(["text!charts/chartTemplateManager.html"]),local_storage.get("templates")||local_storage.set("templates",[]);var d=function(){function d(a,b){var e=this;_classCallCheck(this,d);var f=this,g=local_storage.get("templates");g.forEach(function(a){a.random||(a=f.setRandom(a))}),local_storage.set("templates",g);var h=this.init_state(a,b);require(["text!charts/chartTemplateManager.html"],function(b){a.append(b.i18n()),e.view=c.bind(a[0],h)})}return _createClass(d,[{key:"init_state",value:function(c,d){var e=this,f=(a("#"+d+"_chart").highcharts(),{route:{value:"menu"},menu:{save_changes_disabled:!0},templates:{array:local_storage.get("templates"),save_as_value:"",rename_tmpl:null,rename_value:"",current:null}}),g=f.route,h=f.templates,i=f.menu,j=this.setRandom(b.get_chart_options(d));return h.array=local_storage.get("templates"),-1!==_.findIndex(h.array,function(a){return a.random===j.random})&&(h.current=j),g.update=function(a){g.value=a},i.save_as=function(){var a=b.get_chart_options(d)||{};a.name=[a.timePeriod+" "+a.type].concat(a.indicators.map(function(a){return a.name})).concat(a.overlays.map(function(a){return a.displaySymbol})).join(" + "),h.save_as_value=a.name,g.update("save-as")},i.templates=function(){h.array=local_storage.get("templates"),g.update("templates")},i.save_changes=function(){var c=e.setRandom(b.get_chart_options(d)),f=c.name,g=local_storage.get("templates"),i=_.findIndex(g,function(a){return a.name===f});-1!==i?g[i]=c:g.push(c),local_storage.set("templates",g),h.array=g,h.current=c,a.growl.notice({message:"Template changes saved ".i18n()+"("+c.name+")"})},i.open_file_selector=function(){a(c).find("input[type=file]").click()},i.upload=function(b){var c=e,d=b.target.files[0];if(b.target.files=null,b.target.value=null,d){var f=new FileReader;f.onload=function(b){var d=b.target.result,e=local_storage.get("templates"),f=null;try{f=JSON.parse(d),f.name=f.name.substring(0,20).replace(/[<>]/g,"-");var g=f.random;if(f=c.setRandom(f),g!==f.random)throw"Invalid JSON file".i18n();if(c.isDuplicate(f,e))return;if(!f.indicators)throw"Invalid template type".i18n()}catch(b){return void a.growl.error({message:b})}for(var i=1,j=f.name;;){if(!e.map(function(a){return a.name}).includes(j)){f.name=j;break}j=f.name+" ("+i+")",i++}h.apply(f),e.push(f),local_storage.set("templates",e),h.array=e,a.growl.notice({message:"Successfully applied the template and saved it as ".i18n()+"<b>"+f.name+"</b>"})},f.readAsText(d)}},h.save_as=function(a){a.preventDefault();var c=h.save_as_value.substring(0,20).replace(/[<>]/g,"-"),f=e.setRandom(b.get_chart_options(d));if(f){f.name=c;var i=local_storage.get("templates");if(e.isDuplicate(f,i))return;i.push(f),h.current=f,local_storage.set("templates",i),h.array=i,g.update("menu"),b.set_chart_options(d,f)}},h.download=function(b){var c=JSON.stringify(b);download_file_in_browser(b.name+".json","text/json;charset=utf-8;",c),a.growl.notice({message:"Downloading template as <b>".i18n()+b.name+".json</b>"})},h.remove=function(a){var b=local_storage.get("templates");h.array=b.filter(function(b){return b.name!==a.name}),local_storage.set("templates",h.array),h.current&&a.name===h.current.name&&(h.current=null)},h.rename=function(a){h.rename_value=a.name,h.rename_tmpl=a,g.update("rename")},h.do_rename=function(c){c.preventDefault();var f=h.rename_tmpl.name,i=h.rename_value.substring(0,20).replace(/[<>]/g,"-"),j=local_storage.get("templates");if(j.map(function(a){return a.name}).includes(i))return void a.growl.error({message:"Template name already exists".i18n()});var k=j.find(function(a){return a.name===f});if(k){k.name=i,local_storage.set("templates",j),h.array=j,g.update("templates");var l=e.setRandom(b.get_chart_options(d));l.name==f&&(l.name=i,b.set_chart_options(d,l),h.current=l)}},h.apply=function(a){b.apply_chart_options(d,a),h.current=a},h.confirm=function(a,b){g.update("confirm");var c=b.currentTarget.text;h.confirm_prevMenu=c==="Delete".i18n()?"templates":"menu",h.confirm_text="Delete"===c?"Are you sure you want to delete template?".i18n():"Are you sure you want to overwrite current template?".i18n(),h.confirm_yes=function(){c==="Delete".i18n()?h.remove(a):i.save_changes(),h.confirm_no()},h.confirm_no=function(){g.update(h.confirm_prevMenu)}},f}},{key:"setRandom",value:function(a){var b=a.name;return delete a.name,delete a.random,a.random=this.hashCode(JSON.stringify(a)),a.name=b,a}},{key:"hashCode",value:function(a){return a.split("").reduce(function(a,b){return a=(a<<5)-a+b.charCodeAt(0),a&a},0)}},{key:"isDuplicate",value:function(b,c){var d=c.find(function(a){return a.random==b.random?a:void 0});return d?(a.growl.error({message:"Template already saved as ".i18n()+"<b>"+d.name+"</b>."}),!0):!1}},{key:"unbind",value:function(){this.view&&this.view.unbind(),this.view=null}}]),d}();return{init:function(a,b){return new d(a,b)}}});