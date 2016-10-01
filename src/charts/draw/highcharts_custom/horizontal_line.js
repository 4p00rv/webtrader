/**
 * Created by Arnab Karmakar on 12/7/15.
 */
define(['highstock', 'common/util'], function () {

    /*
         This is a map storing information as -
         horizontalLineOptions[seriesID] = {
             stroke : 'red',
             strokeWidth : 1,
             dashStyle : 'dash',
             parentSeriesID : seriesID
         }
     */
    var horizontalLineOptionsMap = {};

    return {

        init: function(refererChartID) {

            (function(H,$){
                //Make sure that HighStocks have been loaded
                if (!H) return;

                var chart = $(refererChartID).highcharts();
                require(["charts/draw/properties_selector/properties_selector"], function(popup){
                    var options = {};
                    options.title = 'Horizontal Line'.i18n();
                    options.inputValues = [
                    {
                        name: 'Stroke width'.i18n(),
                        type: 'number',
                        id:'width',
                        default: 2,
                        min: 1,
                        max: 5
                    },
                    {
                        name: 'Stroke color'.i18n(),
                        type: 'colorpicker',
                        id:'color',
                        default: '#ff0000'
                    }];
                    popup.open(options, addEvent);
                });

                function addEvent(css){
                    H.addEvent(chart,'click',function(evt){
                        if(chart.annotate){
                            chart.annotate = false;
                            addPlotLines(evt.yAxis[0].value, evt.yAxis[0].axis, css);
                            H.removeEvent(chart,'click');
                        }
                    });
                }

                function addPlotLines(value, axis, css){
                    var uniqueID = 'horizontalLine_' + new Date().getTime();
                    var options = {
                        value: value,
                        width: 2,
                        color: '#ff0000',
                        dashStyle: 'shortdash',
                        id: uniqueID
                    };
                    if(css){
                        $.extend(options, css);
                    }
                    var line = axis.addPlotLine(options).svgElem
                    .css({'cursor':'pointer'})
                    .attr('id',uniqueID)
                    .translate(0,0)
                    .on('mousedown', updateHorizontalLine)
                    .on('dblclick', removeLine);
                    horizontalLineOptionsMap[uniqueID] = line;
                    return line;
                }

                function updateHorizontalLine(evt) {
                    chart.annotate = true;
                    var lineID = $(this).attr('id'),
                        line = horizontalLineOptionsMap[lineID],
                        mouseUpEventAdded = false;
                    H.wrap(H.Pointer.prototype, 'drag', function(c, e){
                        if(chart.annotate){
                            if(!mouseUpEventAdded){
                                mouseUpEventAdded = true;
                                $(refererChartID).one("mouseup", function(){
                                    chart.annotate = false;
                                    mouseUpEventAdded = false;
                                    H.removeEvent(chart, 'mousemove');
                                });
                            }
                            if(chart.isInsidePlot(e.chartX -chart.plotLeft, e.chartY - chart.plotTop)){
                                if(line.element){
                                    var value = chart.yAxis[0].toValue(e.chartY),
                                        axis = chart.yAxis[0],
                                        css = {
                                            color: line.stroke,
                                            width: line["stroke-width"]
                                        };
                                    removeLineWithID(line.element.id);
                                    line = addPlotLines(value, axis, css);
                                }
                            }
                        } else{
                            c.call(this, e);
                        }
                    });
                }

                function removeLine(evt){
                    var lineID = $(this).attr('id');
                    removeLineWithID(lineID);
                }

                function removeLineWithID(lineID){
                    // Remove all associated events.
                    $("#"+lineID).off();
                    delete horizontalLineOptionsMap[lineID];
                    chart.yAxis[0].removePlotLine(lineID);
                }
            }(Highcharts, jQuery));

        }
    };

});
