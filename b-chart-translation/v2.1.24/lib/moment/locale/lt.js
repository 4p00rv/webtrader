!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(require("../moment")):"function"==typeof define&&define.amd?define(["moment"],b):b(a.moment)}(this,function(a){"use strict";function b(a,b,c,d){return b?"kelios sekundės":d?"kelių sekundžių":"kelias sekundes"}function c(a,b){var c={nominative:"sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split("_"),accusative:"sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_")},d=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(b)?"accusative":"nominative";return c[d][a.month()]}function d(a,b,c,d){return b?f(c)[0]:d?f(c)[1]:f(c)[2]}function e(a){return a%10===0||a>10&&20>a}function f(a){return i[a].split("_")}function g(a,b,c,g){var h=a+" ";return 1===a?h+d(a,b,c[0],g):b?h+(e(a)?f(c)[1]:f(c)[0]):g?h+f(c)[1]:h+(e(a)?f(c)[1]:f(c)[2])}function h(a,b){var c=-1===b.indexOf("dddd HH:mm"),d=j[a.day()];return c?d:d.substring(0,d.length-2)+"į"}var i={m:"minutė_minutės_minutę",mm:"minutės_minučių_minutes",h:"valanda_valandos_valandą",hh:"valandos_valandų_valandas",d:"diena_dienos_dieną",dd:"dienos_dienų_dienas",M:"mėnuo_mėnesio_mėnesį",MM:"mėnesiai_mėnesių_mėnesius",y:"metai_metų_metus",yy:"metai_metų_metus"},j="sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"),k=a.defineLocale("lt",{months:c,monthsShort:"sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),weekdays:h,weekdaysShort:"Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),weekdaysMin:"S_P_A_T_K_Pn_Š".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY [m.] MMMM D [d.]",LLL:"YYYY [m.] MMMM D [d.], HH:mm [val.]",LLLL:"YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",l:"YYYY-MM-DD",ll:"YYYY [m.] MMMM D [d.]",lll:"YYYY [m.] MMMM D [d.], HH:mm [val.]",llll:"YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"},calendar:{sameDay:"[Šiandien] LT",nextDay:"[Rytoj] LT",nextWeek:"dddd LT",lastDay:"[Vakar] LT",lastWeek:"[Praėjusį] dddd LT",sameElse:"L"},relativeTime:{future:"po %s",past:"prieš %s",s:b,m:d,mm:g,h:d,hh:g,d:d,dd:g,M:d,MM:g,y:d,yy:g},ordinalParse:/\d{1,2}-oji/,ordinal:function(a){return a+"-oji"},week:{dow:1,doy:4}});return k});