define(["exports","jquery","websockets/binary_websockets","windows/windows","common/rivetsExtra","lodash","moment","navigation/navigation","text!realaccount/realaccount.html","css!realaccount/realaccount.css"],function(a,b,c,d,e,f,g,h,i){"use strict";function j(a){return a&&a.__esModule?a:{"default":a}}function k(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)}Object.defineProperty(a,"__esModule",{value:!0}),a.init=void 0;var l=j(b),m=j(c),n=j(d),o=j(e),p=j(f),q=j(g),r=j(h),s=j(i),t=null,u=null,v=null,w=function(a){l["default"].growl.error({message:a.message})},x=a.init=function(a){v=a,a.click(function(){t?t.moveToTop():r["default"].getLandingCompany().then(function(a){return y(s["default"],a)})["catch"](w)})},y=function(a,b){a=l["default"](a).i18n();var c={"upgrade-mlt":"Real Money Account Opening".i18n(),"upgrade-mf":"Financial Account Opening form".i18n()}[b];t=n["default"].createBlankWindow(a,{title:c,resizable:!1,collapsable:!1,minimizable:!0,maximizable:!1,width:380,height:400,close:function(){t.dialog("destroy"),t.trigger("dialogclose"),t.remove(),t=null},open:function(){},destroy:function(){u&&u.unbind(),u=null}}),z(a,b),t.dialog("open");var d=t.dialog("widget").offset();d.top=110,t.dialog("option","position",{my:d.left,at:d.top}),t.dialog("widget").css({left:d.left+"px",top:d.top+"px"})},z=function(a,b){var c=(m["default"].app_id,{route:{value:"user"},empty_fields:{validate:!1,clear:p["default"].debounce(function(){c.empty_fields.validate=!1},4e3),show:function(){c.empty_fields.validate=!0,c.empty_fields.clear()}},what_todo:b,input_disabled:!1,risk:{visible:!1},user:{disabled:!1,accepted:"upgrade-mf"===b,pep:!1,salutation:"Mr",salutation_array:["Mr","Mrs","Ms","Miss"],account_opening_reason_array:["Speculative","Income Earning","Assets Saving","Hedging"],account_opening_reason:"",first_name:"",last_name:"",date_of_birth:"",yearRange:"-100:+0",showButtonPanel:!1,residence:"-",residence_name:"-",address_line_1:"",address_line_2:"",city_address:"",state_address:"-",state_address_array:[{text:"-",value:"-"}],address_postcode:"",phone:"",secret_question_inx:5,secret_question_array:["Mother's maiden name","Name of your pet","Name of first love","Memorable town/city","Memorable date","Favourite dish","Brand of first car","Favourite artist"],secret_answer:"",place_of_birth:"-",country_array:[{text:"-",value:"-"}],tax_residence:"",tax_identification_number:""},financial:{experience_array:["0-1 year","1-2 years","Over 3 years"],frequency_array:["0-5 transactions in the past 12 months","6-10 transactions in the past 12 months","40 transactions or more in the past 12 months"],forex_trading_experience:"",forex_trading_frequency:"",indices_trading_experience:"",indices_trading_frequency:"",commodities_trading_experience:"",commodities_trading_frequency:"",stocks_trading_experience:"",stocks_trading_frequency:"",other_derivatives_trading_experience:"",other_derivatives_trading_frequency:"",other_instruments_trading_experience:"",other_instruments_trading_frequency:"",employment_industry_array:["Construction","Education","Finance","Health","Tourism","Other"],employment_industry:"",education_level_array:["Primary","Secondary","Tertiary"],education_level:"",income_source_array:["Salaried Employee","Self-Employed","Investments & Dividends","Pension","Other"],income_source:"",net_income_array:["Less than $25,000","$25,000 - $50,000","$50,001 - $100,000","$100,001 - $500,000","Over $500,000"],net_income:"",estimated_worth_array:["Less than $100,000","$100,000 - $250,000","$250,001 - $500,000","$500,001 - $1,000,000","Over $1,000,000"],estimated_worth:"",account_turnover_array:["Less than $25,000","$25,000 - $50,000","$50,001 - $100,000","$100,001 - $500,000","Over $500,000"],account_turnover:"",occupation_array:["Chief Executives, Senior Officials and Legislators","Managers","Professionals","Clerks","Personal Care, Sales and Service Workers","Agricultural, Forestry and Fishery Workers","Craft, Metal, Electrical and Electronics Workers","Plant and Machine Operators and Assemblers","Mining, Construction, Manufacturing and Transport Workers","Armed Forces","Government Officers","Others"],occupation:"",employment_status:"",employment_status_array:["Employed","Pensioner","Self-Employed","Student","Unemployed"],source_of_wealth:"",source_of_wealth_array:["Accumulation of Income/Savings","Cash Business","Company Ownership","Divorce Settlement","Inheritance","Investment Income","Sale of Property","Other"],accepted:!1,disabled:!1}});c.input_disabled=local_storage.get("oauth").reduce(function(a,b){return a||/MLT/.test(b.id)},!1)&&"upgrade-mf"===b,c.user.is_valid=function(){var a=c.user;return""!==c.user.account_opening_reason&&""!==a.first_name&&!/[~`!@#\$%\^\&\*\(\)\+=\{\}\[\]\\|:;\",<>?\/\d]/.test(a.first_name)&&""!==a.last_name&&!/[~`!@#\$%\^\&\*\(\)\+=\{\}\[\]\\|:;\",<>?\/\d]/.test(a.last_name)&&q["default"](a.date_of_birth,"YYYY-MM-DD",!0).isValid()&&"-"!==a.residence&&""!==a.address_line_1&&!/[~`!#\$%\^\&\*\(\)\+=\{\}\[\]\\|:;\"<>?]/.test(a.address_line_1)&&!/[~`!#\$%\^\&\*\(\)\+=\{\}\[\]\\|:;\"<>?]/.test(a.address_line_2)&&""!==a.city_address&&!/[~`!@#\$%\^\&\*\(\)\+=\{\}\[\]\\|:;\",<>?\/\d]/.test(a.city_address)&&/^[^+]{0,20}$/.test(a.address_postcode)&&""!==a.phone&&/^\+?[0-9\s]{6,35}$/.test(a.phone)&&(c.input_disabled||/.{4,8}$/.test(a.secret_answer))&&("upgrade-mf"!=c.what_todo||c.user.place_of_birth&&c.user.tax_residence&&c.user.tax_identification_number&&/^[\w-]{0,20}$/.test(c.user.tax_identification_number))},c.user.click=function(){return c.user.is_valid()?"upgrade-mlt"===c.what_todo?void c.user.new_account_real():void c.route.update("financial"):void c.empty_fields.show()},c.user.new_account_real=function(){var a=c.user,b={new_account_real:1,salutation:a.salutation,first_name:a.first_name,last_name:a.last_name,account_opening_reason:a.account_opening_reason,date_of_birth:a.date_of_birth,residence:a.residence,address_line_1:a.address_line_1,address_line_2:a.address_line_2||void 0,address_city:a.city_address,address_state:a.state_address||void 0,address_postcode:a.address_postcode||void 0,phone:a.phone,secret_question:a.secret_question_array[a.secret_question_inx],secret_answer:a.secret_answer.replace('""',"'")};c.user.disabled=!0,m["default"].send(b).then(function(a){c.user.disabled=!1;var b=a.new_account_real,d=local_storage.get("oauth");return d.push({id:b.client_id,token:b.oauth_token,is_virtual:0}),local_storage.set("oauth",d),l["default"].growl.notice({message:"Account successfully created"}),l["default"].growl.notice({message:"Switching to your new account ..."}),m["default"].switch_account(b.client_id).then(function(){t&&t.dialog("close"),v.hide()})})["catch"](function(a){c.user.disabled=!1,w(a)})},c.financial.empty_fields=function(){return""===c.financial.forex_trading_experience||""===c.financial.forex_trading_frequency||""===c.financial.indices_trading_experience||""===c.financial.indices_trading_frequency||""===c.financial.commodities_trading_experience||""===c.financial.commodities_trading_frequency||""===c.financial.stocks_trading_experience||""===c.financial.stocks_trading_frequency||""===c.financial.other_derivatives_trading_experience||""===c.financial.other_derivatives_trading_frequency||""===c.financial.other_instruments_trading_experience||""===c.financial.other_instruments_trading_frequency||""===c.financial.employment_industry||""===c.financial.occupation||""===c.financial.education_level||""===c.financial.income_source||""===c.financial.net_income||""===c.financial.account_turnover||""===c.financial.estimated_worth||""===c.financial.employment_status||""===c.financial.source_of_wealth},c.user.pep_window=function(a){a.preventDefault();var b="A Politically Exposed Person (PEP) is an individual who is or has been entrusted with a prominent public function including his/her immediate family members or persons known to be close associates of such persons, but does not include middle ranking or more junior officials.<br><br>\n         Such individuals include Heads of State, Ministers, Parliamentary Secretaries, Members of Parliament, Judges, Ambassadors, Senior Government Officials, High Ranking Officers in the Armed Forces, Audit Committees of the boards of central banks, and Directors of state-owned corporations.<br><br>\n         The “immediate family members” of the above examples will also be considered as PEP, and these include their spouses/partners, parents, and children. Additionally, “persons known to be close associates” of PEPs include their business partners, will also be considered as such.<br><br>\n         As a general rule, a person considered to be a PEP and who has ceased to be entrusted with a prominent public function for a period of at least twelve months no longer qualifies as a PEP.";n["default"].createBlankWindow('<div style="padding:15px;">'+b+"</div>",{title:"PEP",modal:!0,resizable:!1,collapsable:!1,minimizable:!1,maximizable:!1,closeOnEscape:!0,width:500,height:"auto"}).dialog("open")},c.financial.click=function(){return c.financial.empty_fields()?(c.empty_fields.show(),void l["default"].growl.error({message:"Not all financial information are completed"})):c.financial.accepted?void(c.risk.visible=!0):void l["default"].growl.error({message:"Binary.com terms and conditions unchecked."})},c.financial.create_request=function(){var a=c.user,b=c.financial,d={new_account_maltainvest:1,salutation:a.salutation,first_name:a.first_name,account_opening_reason:a.account_opening_reason,last_name:a.last_name,date_of_birth:a.date_of_birth,residence:a.residence,address_line_1:a.address_line_1,address_line_2:a.address_line_2||void 0,address_city:a.city_address,address_state:a.state_address||void 0,address_postcode:a.address_postcode||void 0,phone:a.phone,place_of_birth:c.user.place_of_birth,tax_residence:c.user.tax_residence.join(","),tax_identification_number:c.user.tax_identification_number,affiliate_token:"",forex_trading_experience:b.forex_trading_experience,forex_trading_frequency:b.forex_trading_frequency,indices_trading_experience:b.indices_trading_experience,indices_trading_frequency:b.indices_trading_frequency,commodities_trading_experience:b.commodities_trading_experience,commodities_trading_frequency:b.commodities_trading_frequency,stocks_trading_experience:b.stocks_trading_experience,stocks_trading_frequency:b.stocks_trading_frequency,other_derivatives_trading_experience:b.other_derivatives_trading_experience,other_derivatives_trading_frequency:b.other_derivatives_trading_frequency,other_instruments_trading_experience:b.other_instruments_trading_experience,other_instruments_trading_frequency:b.other_instruments_trading_frequency,employment_industry:b.employment_industry,occupation:b.occupation,education_level:b.education_level,income_source:b.income_source,net_income:b.net_income,estimated_worth:b.estimated_worth,employment_status:b.employment_status,source_of_wealth:b.source_of_wealth,account_turnover:b.account_turnover,accept_risk:1};return d},c.financial.new_account_maltainvest=function(){c.financial.create_request()},c.risk.accept=function(){var a=c.financial.create_request();c.input_disabled||(a.secret_question=c.user.secret_question_array[c.user.secret_question_inx],a.secret_answer=c.user.secret_answer),c.risk.visible=!1,c.financial.disabled=!0,m["default"].send(a).then(function(a){var b=a.new_account_maltainvest,c=local_storage.get("oauth");return c.push({id:b.client_id,token:b.oauth_token,is_virtual:0}),local_storage.set("oauth",c),l["default"].growl.notice({message:"Account successfully created"}),l["default"].growl.notice({message:"Switching to your new account ..."}),m["default"].switch_account(b.client_id).then(function(){t&&t.dialog("close"),v.hide()})})["catch"](function(a){c.financial.disabled=!1,w(a)})},c.risk.decline=function(){c.risk.visible=!1},c.route.update=function(a){c.route.value=a,t.dialog("widget").trigger("dialogresizestop")},u=o["default"].bind(a[0],c);var d=m["default"].send({get_settings:1}).then(function(a){a=a.get_settings,c.user.salutation=a.salutation||c.user.salutation,c.user.first_name=a.first_name||"",c.user.last_name=a.last_name||"",c.user.account_opening_reason=a.account_opening_reason||"",c.user.date_of_birth=a.date_of_birth?q["default"].unix(a.date_of_birth).format("YYYY-MM-DD"):q["default"]().subtract(18,"years").format("YYYY-MM-DD"),c.user.address_line_1=a.address_line_1||"",c.user.address_line_2=a.address_line_2||"",c.user.city_address=a.address_city||"",c.user.state_address=a.address_state||"",c.user.address_postcode=a.address_postcode||"",c.user.phone=a.phone||"",c.user.residence=a.country_code||"",c.user.residence_name=a.country||""})["catch"](w);d.then(function(){return m["default"].cached.send({residence_list:1})}).then(function(a){c.user.country_array=a.residence_list,c.user.place_of_birth=a.residence_list[0].value;var b=p["default"].find(a.residence_list,{value:c.user.residence});c.user.phone=c.user.phone?c.user.phone:b.phone_idd?"+"+b.phone_idd:""})["catch"](w),d.then(function(){return m["default"].cached.send({states_list:c.user.residence})}).then(function(a){c.user.state_address_array=[{text:"Please select",value:""}].concat(k(a.states_list)),c.user.state_address=c.user.state_address_array[0].value})["catch"](w)};a["default"]={init:x}});