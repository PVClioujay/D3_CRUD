var addLines = false;
var addBigNodes = false;
var addSmallNodes = false;
var dragObj = false;
var dragBoo = false;
var svgBoo = true;
var svg, x, y, line, json_data, inputText;
var count = 0;
var re;
var id;
var svgX, svgY;

// $("#backTopage").attr("href", window.location.host + "/index.php?op=main");

$(function(){
    $.ajax({
        url: 'php_PDO/data_map.php'
    }).done(function (data) {
        //    console.log(data);
        $.each(JSON.parse(data), function (key, value) {
            console.log(value.map_sn, value.map_name);
            $(".c-menu__item > ul").append('<li><a id="map" mapSN="mapSN_' + value.map_sn + '">' + value.map_name + '</a></li>');
           
        })
        Map();
    })
})
//Don't let user first time see the data
$('#o-wrapper').css("display", "none");
$('#bNodes').css("display", "none");
$('#sNodes, #NodeText, #nodebText, #nodesText').css("display", "none");
$('.drawLine').css("display", "none");
$('#DelObj, .searchbar').css("display", "none");

$("#nodebText").click(function() {
    if ($(this).css("background-color") == "rgb(249, 72, 40)") {

        $(this).css("background-color", "#286090");
        $("text[class=bNodes]").css("display", "block");

    } else {
        $(this).css("background-color", "rgb(249, 72, 40)");

        $("text[class=bNodes]").css("display", "none");
    }
})

$("#nodesText").click(function() {
    if ($(this).css("background-color") == "rgb(249, 72, 40)") {
        $(this).css("background-color", "#286090");
        $("text[class=sNodes]").css("display", "block");
    } else {
        $(this).css("background-color", "rgb(249, 72, 40)");

        $("text[class=sNodes]").css("display", "none");
    }
})

$("#root").hide();
$(".sNodes").css("display", "none");

//init transform position
$("svg > g").attr("transform", "translate(0,0)");
$(function() {
    //$(".sNodes").css("display", "none");
    //use mouse wheel to get the wheel data
    $("svg").bind('mousewheel', function(e) {
        //console.log("init value:" + e.originalEvent.wheelDelta);
        if (e.originalEvent.wheelDelta > 0) {
            count += e.originalEvent.wheelDelta;
            console.log("up value:" + count);
        } else {
            count += e.originalEvent.wheelDelta;
            console.log("down value:" + count);
        }
        //Javascript RegExp to check count value
        re = /^-?\d+$/;
        if (re.test(count) == false) {
            count = 120;
            console.log("count value is minus set value" + count);
        }
        switch (count) {
            case 0:
                console.log("case 0 show all Big Nodes");
                $(".sNodes").css("display", "none");
                break;
            case 120:
                console.log("Now the wheelDelta:" + count + "in case 120 show all Nodes");
                $(".bNodes").css("display", "block");
                $(".sNodes").css("display", "block");
                $("#sarrow").css('display', "block");
                $("#barrow").css('display', "block");
                break;
            case 240:
                console.log("Now the wheelDelta:" + count + "in case 240 show all small Nodes");
                $(".bNodes").css("display", "none");
                $(".sNodes").css("display", "block");
                $("#sarrow").css('display', "block");
                $("#barrow").css('display', "none");
                break;
            default:
                count -= e.originalEvent.wheelDelta;
                //$(".sNodes").css("display", "none");
                //正負數判斷
                //re = /^-?\d+$/;
                if (re.test(count) == false || count == 0) {
                    count = 0;
                }
                console.log("over value:" + count);
                break;
        }
    });
});

$(document).mousemove(function(event) {
    pageX = event.pageX - $(document).scrollLeft();
    pageY = event.pageY - $(document).scrollTop();
    //console.log(pageX, pageY);
    svgX = pageX;
    svgY = pageY;

    $('g > g').mousedown(function(event) {
        svgBoo = false;
        dragBoo = true;
    });

    $('g > g').mouseup(function(event) {
        svgBoo = true;
        dragBoo = false;
        //console.log("hds");
    });


    if (dragBoo) {
        console.log("dragBoo:" + dragBoo);
        $('.Menus_group').css('display', 'none');
        var elemDrag = svg.select("g")
            .selectAll('g')
            .call(drag);
    }



    if (svgBoo) {
        //console.log("svgBoo:" + svgBoo);
        svg.call(zoom);
        /*$("g > g").click(function(event) {
          $(this).attr("transform");
          console.log($(this).attr("transform"));
        });*/
    }
});

var drag = d3.behavior.drag()
    .on('dragstart', function(d) {
        d3.select(this).attr('fill', 'black');
    })
    .on('drag', function(d) {

        if ($(".drawLine").css("background-color") == 'rgb(255, 192, 203)') {
            return dragBoo = false;
        } else {
            dragBoo = true;
            d3.select(this).attr("transform", "translate(" + d3.event.x + "," + d3.event.y + ")");
        }
    })
    .on('dragend', function(d) {
        var selectNode = $(this);
        console.log(selectNode.children("circle").attr('id').substr(7, 9));
        console.log(selectNode.attr("transform"));
        $.ajax({
                method: "POST",
                url: "php_PDO/config_Update.php",
                data: {
                    transform: "" + selectNode.attr("transform") + "",
                    id: "" + selectNode.children("circle").attr('id').substr(7, 9) + ""
                }
            }).done(function() {
                console.log("success");
            })
            .fail(function() {
                console.log("fail");
            });
    });

svg = d3.select('body')
    .append('svg')
    .attr('id', 'root')
    .attr('width', "100%")
    .attr('height', "100%");

var container = svg.append('g');

function zoomed() {
    if (addLines == false && svgBoo == true) {
        container.attr("transform", "translate(" + d3.event.translate + ")");
    }
}

var zoom = d3.behavior.zoom()
    .translate([0, 0])
    .on("zoom", zoomed);

//big nodes arrow
var arrowMarker = svg.select("g").append("marker")
    .attr("id", "arrow")
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", "12")
    .attr("markerHeight", "12")
    .attr("viewBox", "0 0 12 12")
    .attr("refX", "6")
    .attr("refY", "6")
    .attr("orient", "auto");

var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";

arrowMarker.append("path")
    .attr("d", arrow_path);

//get search bar value when "enter" was press or the search icon was click
$("#search-ico").click(function() {
    var ty = $("input[name=typeahead]").val();
    //console.log(ty);
    var node = $('g > g > text');
    console.log(node);
});

$("#search").keypress(function(event) {
    if (event.which == 13) {
        var ty = $("input[name=typeahead]").val();
        console.log(ty);
        var nodeText = [];
        var nodeTrans = [];
        $("g >g").each(function() {
            nodeTrans.push($(this).attr("transform"));
        });
        $("g > g > text").each(function() {
            nodeText.push($(this).text());
        });
        console.log(nodeText);
        console.log("nodeTrans:" + nodeTrans);
        for (var i = 0; i <= nodeText.length; i++) {
            if (ty == nodeText[i]) {
                console.log(ty + "==" + nodeText[i]);
                console.log(nodeText[i], nodeTrans[i]);
                console.log("nodeTrans:" + nodeTrans[i]);
                var zoomfactory = 0;
                var w = $(document).width();
                var h = $(document).height();
                var xycoordinate = nodeTrans[i].split("(");
                xycoordinate = xycoordinate[1].split(")");
                xycoordinate = xycoordinate[0].split(",");

                var xcoordinate = parseInt(xycoordinate[0]);
                var transX = (-xcoordinate * zoomfactory + w / 2);
                var ycoordinate = parseInt(xycoordinate[1]);
                var transY = (-ycoordinate * zoomfactory + h / 2);

                var ckText = nodeText[i].split(")");
                ckText = ckText[0];
                console.log(ckText);
                ckText = ckText.split("(");
                ckText = ckText[1];
                console.log(ckText);
                ckTextlength = ckText.length;
                console.log(ckTextlength);
                if (ckTextlength >= 10) {
                    ckText = ckText.split("-");
                    ckText = ckText[3];
                    console.log(ckText);
                    if (ckText.match(/S/g)) {
                        console.log(ckText);
                        $(".bNodes").css('display', "none");
                        $(".sNodes").css('display', 'block');
                    }
                };

                container.transition().attr("transform", "translate(" + transX + "," + transY + ") scale(" + zoomfactory + ")");
                zoom.translate([transX, transY]);
                //$("#root > g").attr("transform", nodeTrans[i]);
            }
        }
    }
});


var $pG = $('#progressbar').progressbar();
var pGress = setInterval(function() {
    var pVal = $pG.progressbar('option', 'value');
    var pCnt = !isNaN(pVal) ? (pVal + 1) : 1;
    ////console.log(pCnt);
    if (pCnt > 100) {
        clearInterval(pGress);
    } else {
        $pG.progressbar({
            value: pCnt
        });
    }
    if (pCnt == 101) {
        $("#progressbar").hide();
        $('#user_Function, #o-wrapper').css("display", "block");
        $("#root").show();
        $('#save').attr('mapSN', '1');
        //get php encode JSON data-Nodes
        d3.json("php_PDO/data_nodes.php", function(error, data) {
            console.log(data);
            //data = $.parseJSON(data);
            //console.log(error);
            data.forEach(function(d) {
                //console.log(d.source, d.target);
                var elemEnter = svg.select("g")
                    .append('g')
                    .attr("transform", d.transform);

                elemEnter.append('pattern')
                    .attr('class', d.class)
                    .attr('id', function() {
                        if (d.class == "bNodes") {
                            return 'image';
                        } else {
                            return 'image2';
                        }
                    })
                    .attr('width', '100%')
                    .attr('height', '100%')
                    .append('image')
                    .attr('xlink:href', function() {
                        if (d.class == "bNodes") {
                            return 'images/p4-01.png';
                        } else {
                            return 'images/1-01.png';
                        }
                    })
                    .attr('id', 'node_id' + d.node_sn)
                    .attr('width', function() {
                        if (d.class == "bNodes") {
                            return "50px";
                        } else {
                            return "20px";
                        }
                    })
                    .attr('height', function() {
                        if (d.class == "bNodes") {
                            return "50px";
                        } else {
                            return "20px";
                        }
                    });
                // elemEnter.append('circle')
                // .attr("r", 25)
                // .attr("fill", d.fill)
                // .attr("class", "grade" + d.grade_sn)
                // .attr("id", "grade" + d.grade_sn)
                // .attr("onclick", "NodesDown(" + d.grade_sn + ")");
                var iid = d.indicate_id;
                // iid = iid.split("(");
                // console.log(iid);
                // iid = iid[1].split(")");

                // console.log(iid[0])
                elemEnter.append("circle")
                    .attr("r", d.r)
                    .attr("class", d.class)
                    .attr("id", "node_id" + d.node_sn)
                    .attr("indicator", iid)
                    .attr("map_sn", d.map_sn)

                .attr("fill", function() {
                        if (d.class == "bNodes") {
                            return 'url(#image)';
                        } else {
                            return 'url(#image2)';
                        }
                    })
                    .attr("onclick", function() {
                        if (d.class == "sNodes") {
                            return "NodesDownInlv3(" + d.node_sn + ")";
                        } else {
                            return;
                        }
                    });
                //wrap text --bai
                var text = d.indicate_name;
                var text_split = text.split('');
                var str_ary = [];
                str_ary[0] = d.indicate_id;
                var str_row = 0;

                for (var i = 1; i <= text_split.length; i++) {
                    if (text_split[(i - 1)] == null) continue;
                    if (i % 10 == 0) {
                        str_ary[str_row] = str_ary[str_row] + text_split[(i - 1)];
                        str_row = str_row + 1;
                        str_ary[str_row] = '';
                    } else {
                        str_ary[str_row] = str_ary[str_row] + text_split[(i - 1)];
                    }
                }
                elemEnter.append('text')
                    .attr("class", d.class)
                    .attr("id", "node_id_text" + d.node_sn)
                    .attr("style", "text-anchor:middle")
                    .attr("x", function(d) {
                        if ($(this).attr("class") == "bNodes") {
                            return 25;
                        } else {
                            return 10;
                        }
                    })
                    .attr("y", function(d) {
                        if ($(this).attr("class") == "bNodes") {
                            return 40;
                        } else {
                            return 30;
                        }
                    })
                    .attr("id", "node_id" + d.node_sn)
                    .selectAll('tspan')
                    .data(str_ary)
                    .enter()
                    .append('tspan')
                    .attr('dy', '1em')
                    .text(function(e) {
                        // var text = d.indicate_id;
                        // text = text.split(")");
                        // //console.log("("+text[0] + ")");
                        // return "(" + text[0] + ")";
                        //return d.indicate_id + d.indicate_name;
                        return e;
                    });
                $('text[id="node_id' + d.node_sn + '"]').children('tspan').each(function(e) {
                    if (e == 0) {
                        var e_dx = 0;
                        $(this).attr('dx', e_dx + 'em');
                    } else {
                        var e_dx = -10;
                        $(this).attr('dx', e_dx + 'em');
                    }
                });
            });
        });

        //get php encode JSON data-Links
        d3.json("php_PDO/data_lines.php", function(error, data) {
            data.forEach(function(d) {
                ////console.log(d);
                d3.select("body").select("svg").select("g")
                    .append('marker')
                    .attr("id", "arrow")
                    .attr("class", d.class)
                    .attr("markerWidth", 12)
                    .attr("markerHeight", 12)
                    .attr("viewBox", "0 0 12 12")
                    .attr("refX", 6)
                    .attr("refY", 6)
                    .attr("orient", 'auto')
                    .append('path')
                    .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
                    .attr("fill", function() {
                        if (d.class == "bNodes") {
                            return "#00d8ff";
                        } else {
                            return "#FFF143";
                        }
                    })
                    .attr("onclick", "arrow(" + d.arrow_sn + ")")
                    .attr("map_sn", d.map_sn);

                d3.select("body").select("svg").select("g").append('line')
                    .attr("id", "arrow" + d.arrow_sn)
                    .attr("x1", d.x1)
                    .attr("y1", d.y1)
                    .attr("x2", d.x2)
                    .attr("y2", d.y2)
                    .attr("stroke", function() {
                        if (d.class == "bNodes") {
                            return "#00d8ff";
                        } else {
                            return "#FFF143";
                        }
                    })
                    .attr("stroke-width", function() {
                        if (d.class == "bNodes") {
                            return "2.5";
                        } else {
                            return "2.5";
                        }
                    })
                    .attr("marker-end", "url(#arrow)")
                    .attr("onclick", "arrow(" + d.lid + ")")
                    .attr("class", d.class)
                    .attr("map_sn", d.map_sn);
            });
        });
    }
}, 10);

var mapSN;
function Map(){
    $("a[id^='map']").click(function () {
        $("svg > g > marker").remove();
        $("svg > g > line").remove();

        $("svg > g > g").remove();

        $('#bNodes').css("display", "inline");
        $('#sNodes, #NodeText, #nodebText, #nodesText').css("display", "inline");
        $('.drawLine').css("display", "inline");
        $('#DelObj, .searchbar').css("display", "inline");
        mapSN = $(this).attr("mapSN");
        mapSN = mapSN.split("_");
        mapSN = mapSN[1];
        console.log(mapSN);
        $('#save').attr('mapSN', mapSN);
        $("#bNodes, #sNodes, .drawLine").attr("map_sn", mapSN)
        $.ajax({
            url: 'php_PDO/data_nodes.php',
            type: 'POST',
            data: {
                map_SN: parseInt(mapSN)
            },
        })
            .done(function (data) {
                var json_data = $.parseJSON(data);
                if (json_data.length == 0) {
                    alert("there is no map data")
                } else {
                    json_data.forEach(function (d) {
                        var elemEnter = svg.select("g")
                            .append('g')
                            .attr("transform", d.transform);

                        elemEnter.append('pattern')
                            .attr('class', d.class)
                            .attr('id', function () {
                                if (d.class == "bNodes") {
                                    return 'image';
                                } else {
                                    return 'image2';
                                }
                            })
                            .attr('width', '100%')
                            .attr('height', '100%')
                            .append('image')
                            .attr('xlink:href', function () {
                                if (d.class == "bNodes") {
                                    return 'images/p4-01.png';
                                } else {
                                    return 'images/1-01.png';
                                }
                            })
                            .attr('id', 'node_id' + d.node_sn)
                            .attr('width', function () {
                                if (d.class == "bNodes") {
                                    return "50px";
                                } else {
                                    return "20px";
                                }
                            })
                            .attr('height', function () {
                                if (d.class == "bNodes") {
                                    return "50px";
                                } else {
                                    return "20px";
                                }
                            });

                        var iid = d.indicate_id;


                        elemEnter.append("circle")
                            .attr("r", d.r)
                            .attr("class", d.class)
                            .attr("id", "node_id" + d.node_sn)
                            .attr("onclick", function () {
                                if (d.class == "sNodes") {
                                    return "NodesDownInlv3(" + d.node_sn + ")";
                                } else {
                                    return;
                                }
                            })
                            .attr("fill", function () {
                                if (d.class == "bNodes") {
                                    return 'url(#image)';
                                } else {
                                    return 'url(#image2)';
                                }
                            })
                            .attr("menus", function () {
                                if (d.CR == 1 && d.DA == 0) {
                                    return 1;
                                }

                                if (d.DA == 1 && d.CR == 0) {
                                    return 2;
                                }

                                if (d.CR == 1 && d.DA == 1) {
                                    return 4;
                                }

                                if (d.CR == 0 && d.DA == 0) {
                                    return 0;
                                }
                            })
                            .attr("indicator", iid)
                            .attr("map_sn", d.map_sn);

                        // .attr("onclick", function() {
                        //     if (d.class == "sNodes") {
                        //         return "NodesDownInlv3(" + d.node_sn + ")";
                        //     } else {
                        //         return;
                        //     }
                        // });

                        //wrap text --bai
                        var text = d.indicate_name;
                        var text_split = text.split('');
                        var str_ary = [];
                        str_ary[0] = d.indicate_id;
                        var str_row = 0;

                        for (var i = 1; i <= text_split.length; i++) {
                            if (text_split[(i - 1)] == null) continue;
                            if (i % 10 == 0) {
                                str_ary[str_row] = str_ary[str_row] + text_split[(i - 1)];
                                str_row = str_row + 1;
                                str_ary[str_row] = '';
                            } else {
                                str_ary[str_row] = str_ary[str_row] + text_split[(i - 1)];
                            }
                        }

                        elemEnter.append('text')
                            .attr("class", d.class)
                            .attr("id", "node_id_text" + d.node_sn)
                            .attr("style", "text-anchor:middle")
                            .attr("x", function (d) {
                                if ($(this).attr("class") == "bNodes") {
                                    return 25;
                                } else {
                                    return 10;
                                }
                            })
                            .attr("y", function (d) {
                                if ($(this).attr("class") == "bNodes") {
                                    return 40;
                                } else {
                                    return 30;
                                }
                            })
                            .attr("id", "node_id" + d.node_sn)
                            .attr("text", d.indicate_name)
                            .text(d.indicate_id);

                        $('text[id="node_id' + d.node_sn + '"]').children('tspan').each(function (e) {
                            if (e == 0) {
                                var e_dx = 0;
                                $(this).attr('dx', e_dx + 'em');
                            } else {
                                var e_dx = -10;
                                $(this).attr('dx', e_dx + 'em');
                            }
                        });
                    });
                    $.ajax({
                        url: 'php_PDO/data_lines.php',
                        type: 'POST',
                        data: {
                            map_SN: parseInt(mapSN)
                        }
                    })
                        .done(function (data) {
                            console.log("success");
                            var json_data = $.parseJSON(data);
                            console.log(json_data);

                            json_data.forEach(function (d) {
                                d3.select("body").select("svg").select("g")
                                    .append('marker')
                                    .attr("class", "arrow" + d.arrow_sn + " " + d.class)
                                    .attr("id", "arrow")
                                    .attr("markerUnits", "strokeWidth")
                                    .attr("markerWidth", 12)
                                    .attr("markerHeight", 12)
                                    .attr("viewBox", "0 0 12 12")
                                    .attr("refX", 6)
                                    .attr("refY", 6)
                                    .attr("orient", "auto")
                                    .attr("style", function () {
                                        if (d.class == "bNodes") {
                                            return "fill:#149BED";
                                        } else {
                                            return "fill:#FFF143";
                                        }
                                    })
                                    .attr("nodes_relation", d.nodes_connection)
                                    .append('path')
                                    .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
                                    .attr("onclick", "arrow(" + d.arrow_sn + ")")
                                    .attr("map_sn", d.map_sn);

                                d3.select("body").select("svg").select("g").append('line')
                                    .attr("id", "arrow" + d.arrow_sn)
                                    .attr("x1", d.x1)
                                    .attr("y1", d.y1)
                                    .attr("x2", d.x2)
                                    .attr("y2", d.y2)
                                    .attr("stroke", "#149BED")
                                    .attr("nodes_relation", d.nodes_connection)
                                    .attr("marker-end", "url(#arrow)")
                                    .attr("class", d.class)
                                    .attr("map_sn", d.map_sn);
                            });
                        })
                        .fail(function () {
                            console.log("error");
                        })
                        .always(function () {
                            console.log("complete");
                        });
                };
            })
            .fail(function () {
                console.log("error");
            })
            .always(function () {
                console.log("complete");
            });
    })
}


var mouseX;
var mouseY;
$(document).mousemove(function(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
});

$("#root").mousedown(function() {
    $('.Menus_group').css("display", "none");
})

//Delete function
// function Delete(){
//     console.log(mapSN);
//     var id = $("circle[id^=node_id]").attr("id").split("d");


// }

$("#DelObj").click(function(event) {
    if ($("#DelObj").css("background-color") == "rgb(249, 72, 40)") {
        $("#DelObj").css("background-color", "#286090");
        $("circle").removeAttr("stroke");
        $("line").css('stroke-width', '1px');
    } else {
        $("#DelObj").css("background-color", "rgb(249, 72, 40)");
        $("circle").attr("stroke", "white");
        $("line").css('stroke-width', '4px');
    }
    $("circle").click(function() {
        //dragBoo = false;
        if ($("#DelObj").css("background-color") == "rgb(249, 72, 40)") {
            var circleId = $(this).attr("id").split("d");
            console.log(circleId);
            $.ajax({
                    url: 'php_PDO/config_Del.php',
                    type: 'POST',
                    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                    data: {
                        id: parseInt(circleId[2])
                    },
                })
                .done(function(data) {
                    // $("circle[id=node_id" + circleId[2] + "]").remove();
                    // $("text[id=node_id" + circleId[2] + "]").remove();
                    // $("pattern[id=node_id" + circleId[2] + "]").remove();
                    console.log("success"+data);
                    location.reload();
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
        }
    })
    $("line").click(function() {
        //dragBoo = false;
        if ($("#DelObj").css("background-color") == "rgb(249, 72, 40)") {
            var lineId = $(this).attr("id").split("w");
            console.log(lineId[1]);
            $.ajax({
                    url: 'php_PDO/config_Delines.php',
                    type: 'POST',
                    //dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                    data: {
                        id: parseInt(lineId[1])
                    },
                })
                .done(function() {
                    $(".arrow" + lineId[1]).remove();
                    $("#arrow" + lineId[1]).remove();
                    //$("pattern[id=node_id"+circleId[2]+"]").remove();
                    console.log("success");
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
        }
    })
})


//End Delete

/**
 * Build Nodes and Arrow:
 * bNodes: Big Nodes
 * sNodes: Small Nodes
 * Create Nodes and arrow Event
 */
// var hash = window.location.hash;
// hash = hash.split("#");
// console.log(hash[1]);
// 



var map_sn;
$('#bNodes').click(function() {
    addBigNodes = true;
    map_sn = $(this).attr('map_sn');
    svg.on("mousedown", BigNodes)
        .on("mouseup", function DisableAdd() {
            addBigNodes = false;
            //svg.call(zoom);
            console.log(addBigNodes);
        });
});

function BigNodes() {
    var mapSN = $("#bNodes").attr("map_sn");
    console.log(mapSN);
    console.log(addBigNodes);
    var mousePoint = d3.mouse(this),
        p = {
            x: mousePoint[0],
            y: mousePoint[1]
        };
    var point = document.getElementById('root').createSVGPoint();
    point.x = p.x; //mouse position X
    point.y = p.y; //mouse position Y
    var newPoint = point.matrixTransform(container.node().getCTM().inverse());

    console.log(addBigNodes);

    //draw circles
    if (addBigNodes) {
        console.log(addBigNodes);

        if ($("#NodeText").val() == null || $("#NodeText").val() == "") {
            alert("Befor u add big Nodes, please input text first");
            //console.log(container.select("circle").attr("transform", "translate(" + NowPointX + "," + NowPointY + ")"))
            $("#NodeText").val("");
        } else {
            var nodesText = $("#NodeText").val();
            nodesText = nodesText.split(")");
            var nodesIndicate = nodesText[0].split("(");

            var CR;
            if ($("#CR").is(":checked")) {
                console.log("cr checked");
                CR = 1;
            } else {
                CR = 0;
            }

            var DA;
            if ($("#DA").is(":checked")) {
                console.log("da checked");
                DA = 1;
            } else {
                DA = 0;
            }
            //insert Nodes data use AJAX
            $.ajax({
                    method: "POST",
                    url: "php_PDO/config_insert.php",
                    dataType: 'json',
                    data: {
                        transform: "translate(" + parseInt(newPoint.x) + "," + parseInt(newPoint.y) + ")",
                        indicate_id: "" + nodesIndicate[1] + "",
                        indicate_name: "" + nodesText[1] + "",
                        cx: parseInt(newPoint.x),
                        cy: parseInt(newPoint.y),
                        r: '25',
                        class: "bNodes",
                        map_SN: parseInt(mapSN),
                        CR: CR,
                        DA: DA,
                    },
                })
                .done(function(data) {
                    console.log("success:" + data);
                    ShowInsertNodes(data);
                })
                .fail(function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.responseText);
                    console.log(thrownError);
                })
                .always(function(data) {
                    console.log("complete:" + data);
                });
            $("#NodeText").val("");
        }
    }
}

function ShowInsertNodes(lastId) {
    $.ajax({
            url: 'php_PDO/data_insertNode.php',
            type: 'POST',
            //dataType: 'json',
            data: {
                node_sn: lastId
            },
        })
        .done(function(data) {

            console.log("success" + data);
            var json_data = $.parseJSON(data);
            console.log(json_data);
            if (json_data.length == 0) {
                alert("there is no map data")
            } else {
                json_data.forEach(function(d) {
                    var elemEnter = svg.select("g")
                        .append('g')
                        .attr({"transform": d.transform,'id':'g_'+d.indicate_id});

                    elemEnter.append('pattern')
                        .attr('class', d.class)
                        .attr('id', function() {
                            if (d.class == "bNodes") {
                                return 'image';
                            } else {
                                return 'image2';
                            }
                        })
                        .attr('width', '100%')
                        .attr('height', '100%')
                        .append('image')
                        .attr('xlink:href', function() {
                            if (d.class == 'bNodes') {
                                return 'images/p4-01.png';
                            } else {
                                return 'images/1-01.png';
                            }
                        })
                        .attr('id', 'node_id' + d.node_sn)
                        .attr('width', function() {
                            if (d.class == "bNodes") {
                                return "50px";
                            } else {
                                return "20px";
                            }
                        })
                        .attr('height', function() {
                            if (d.class == "bNodes") {
                                return "50px";
                            } else {
                                return "20px";
                            }
                        })
                        .attr("map_sn", d.map_sn);
                    // elemEnter.append('circle')
                    // .attr("r", 25)
                    // .attr("fill", d.fill)
                    // .attr("class", "grade" + d.grade_sn)
                    // .attr("id", "grade" + d.grade_sn)

                    var iid = d.indicate_id;
                    // iid = iid.split("(");
                    // iid = iid[1].split(")");
                    elemEnter.append("circle")
                        .attr("r", d.r)
                        .attr("class", d.class)
                        .attr("id", "node_id" + d.node_sn)
                        .attr("fill", function() {
                            if (d.class == "bNodes") {
                                return 'url(#image)';
                            } else {
                                return 'url(#image2)';
                            }
                        })
                        .attr("onclick", function() {
                            if (d.class == "sNodes") {
                                return "NodesDownInlv3(" + d.node_sn + ")";
                            } else {
                                return;
                            }
                        })
                        .attr("menus", function() {
                            if (d.CR == 1 && d.DA == 0) {
                                return 1;
                            }

                            if (d.DA == 1 && d.CR == 0) {
                                return 2;
                            }

                            if (d.CR == 1 && d.DA == 1) {
                                return 4;
                            }

                            if (d.CR == 0 && d.DA == 0) {
                                return 0;
                            }
                        })
                        .attr("indicator", d.indicate_id)
                        .attr("onclick", "NodesDownInlv3(" + d.node_sn + ")");

                    $("circle[id=node_id" + d.node_sn + "]").css("display", "block");
                    $("text[id=node_id" + d.node_sn + "]").css("display", "block");
                    // .attr("onclick", function() {
                    //     if (d.class == "sNodes") {
                    //         return "NodesDownInlv3(" + d.node_sn + ")";
                    //     } else {
                    //         return;
                    //     }
                    // });

                    //wrap text --bai
                    var text = d.indicate_name;
                    var text_split = text.split('');
                    var str_ary = [];
                    str_ary[0] = d.indicate_id;
                    var str_row = 0;

                    for (var i = 1; i <= text_split.length; i++) {
                        if (text_split[(i - 1)] == null) continue;
                        if (i % 10 == 0) {
                            str_ary[str_row] = str_ary[str_row] + text_split[(i - 1)];
                            str_row = str_row + 1;
                            str_ary[str_row] = '';
                        } else {
                            str_ary[str_row] = str_ary[str_row] + text_split[(i - 1)];
                        }
                    }

                    elemEnter.append('text')
                        .attr("class", d.class)
                        .attr("id", "node_id_text" + d.node_sn)
                        .attr("style", "text-anchor:middle")
                        .attr("x", function(d) {
                            if ($(this).attr("class") == "bNodes") {
                                return 25;
                            } else {
                                return 10;
                            }
                        })
                        .attr("y", function(d) {
                            if ($(this).attr("class") == "bNodes") {
                                return 40;
                            } else {
                                return 30;
                            }
                        })
                        .attr("id", "node_id" + d.node_sn)
                        .attr("text", d.indicate_name)
                        .text(d.indicate_id);
                    // $('text[id="node_id' + d.node_sn + '"]').children('tspan').each(function(e) {
                    //     if (e == 0) {
                    //         var e_dx = 0;
                    //         $(this).attr('dx', e_dx + 'em');
                    //     } else {
                    //         var e_dx = -10;
                    //         $(this).attr('dx', e_dx + 'em');
                    //     }
                    // });

                })
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}

$('#sNodes').click(function() {
    addSmallNodes = true;
    map_sn = $(this).attr('map_sn');
    svg.on("mousedown", SmallNodes)
        .on("mouseup", function() {
            addSmallNodes = false;
            //svg.call(zoom);
            console.log(addBigNodes);
        });
});


function SmallNodes() {
    var mapSN = $("#sNodes").attr("map_sn");
    console.log(map_sn);
    console.log(addBigNodes);
    var mousePoint = d3.mouse(this),
        p = {
            x: mousePoint[0],
            y: mousePoint[1]
        };
    var point = document.getElementById('root').createSVGPoint();
    point.x = p.x; //mouse position X
    point.y = p.y; //mouse position Y
    var newPoint = point.matrixTransform(container.node().getCTM().inverse());

    console.log(addBigNodes);

    //draw circles
    if (addSmallNodes) {
        console.log(addSmallNodes);

        if ($("#NodeText").val() == null || $("#NodeText").val() == "") {
            alert("Befor u add small Nodes, please input text first");
            //console.log(container.select("circle").attr("transform", "translate(" + NowPointX + "," + NowPointY + ")"))
            $("#NodeText").val("");
        } else {
            var nodesText = $("#NodeText").val();
            var elemEnter = svg.select("g")
                .append('g')
                .attr("transform", "translate(" + parseInt(newPoint.x) + "," + parseInt(newPoint.y) + ")");
            //.call(drag);
            // elemEnter.append('circle')
            //     .attr("r", "15")
            //     .attr("fill", "#146DED")
            //     .attr("class", "sNodes");
            // elemEnter.append('text')
            //     .attr("x", 10)
            //     .attr("y", 30)
            //     .append('tspan')
            //     .attr("dx", 20)
            //     .text(function() {
            //         var text = nodesText;
            //         text = text.split(")");
            //         console.log(text[0] + ")");
            //         return text[0] + ")";
            //     })
            //     .append('tspan')
            //     .attr("dx", -120)
            //     .attr("dy", 20)
            //     .text(function() {
            //         var text = nodesText;
            //         text = text.split(")");
            //         console.log(text[1]);
            //         return text[1];
            //     });

            nodesText = nodesText.split(")");
            var nodesIndicate = nodesText[0].split("(");

            var CR;
            if ($("#CR").is(":checked")) {
                console.log("cr checked");
                CR = 1;
            } else {
                CR = 0;
            }

            var DA;
            if ($("#DA").is(":checked")) {
                console.log("da checked");
                DA = 1;
            } else {
                DA = 0;
            }
            //insert Nodes data use AJAX
            $.ajax({
                    method: "POST",
                    url: "php_PDO/config_insert.php",
                    dataType: 'json',
                    data: {
                        transform: "translate(" + parseInt(newPoint.x) + "," + parseInt(newPoint.y) + ")",
                        indicate_id: "" + nodesIndicate[1] + "",
                        indicate_name: "" + nodesText[1] + "",
                        cx: parseInt(newPoint.x),
                        cy: parseInt(newPoint.y),
                        r: '10',
                        class: "sNodes",
                        map_SN: parseInt(mapSN),
                        CR: CR,
                        DA: DA,
                    }
                })
                .done(function(data) {
                    console.log("success" + data);
                    ShowInsertNodes(data);
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
            $("#NodeText").val("");
        }
    }
}

var obj = [];
var obj_relation = [];
var objChkNode = [];
$('.drawLine').click(function(event) {
    var drawLineBoo = false;
    var mapSN = $("#bNodes").attr("map_sn");
    if ($(this).css('color') === 'rgb(0, 0, 0)') {
        $(this).css({
            'color': 'white',
            'background-color': 'blue'
        });
        //$(this).removeAttr('color');
        //$(this).removeAttr('background-color');
        $('circle').removeAttr('stroke');

    } else {
        $(this).css({
            'color': 'black',
            'background-color': 'pink'
        });
        $('circle').attr('stroke', 'white');
        if ($(".drawLine").css("background-color") == "rgb(255, 192, 203)") {
            $('g > g').click(function(event) {
                var elemDrag = svg.select("g")
                    .selectAll('g')
                    .call(drag);
                console.log(map_sn);

                $('.Menus_group').css("display", "none");
                map_sn = $(this).attr('map_sn');

                var regexp = /([0-9]+)/;
                var el = $(this).attr("transform").split(",");
                el[0] = el[0].split("(");
                el[1] = el[1].split(")");
                el[0] = el[0][1];
                el[1] = el[1][0];
                console.log(el[0][1], el[1][0], el);
                obj.push(el);
                console.log(obj);

                var nodes_relation = $(this).children('circle').attr('indicator');
                console.log(nodes_relation);
                obj_relation.push(nodes_relation);

                //check attr class value prevent user try to make sNode connected with bNodes
                var ChkNode = $(this).children().attr("class");
                objChkNode.push(ChkNode);
                if (objChkNode.length == 2) {
                    if (objChkNode[0] != objChkNode[1]) {
                        alert("can't add line");
                        objChkNode.length = 0;
                        obj.length = 0;
                    } else {
                        var linkClass;
                        if ($(this).children().attr("class") == "bNodes") {
                            linkClass = "bNodes";
                        } else if ($(this).children().attr("class") == "sNodes") {
                            linkClass = "sNodes";
                        }

                        if (obj.length == 2) {
                            if (linkClass == "bNodes") {
                                console.log(obj);
                                //計算偏移量.bai.go
                                /*斜率*/
                                var line_m = Math.round((obj[1][1] - obj[0][1]) / (obj[1][0] - obj[0][0]) * 1000) / 1000; //* 1000) / <1000></1000>四捨五入
                                console.log(line_m);
                                /*x距離*/
                                var line_x_d = Math.round(Math.abs(obj[1][0] - obj[0][0]) * 1000) / 1000;
                                console.log(line_x_d);
                                /*y距離*/
                                var line_y_d = Math.round(Math.abs(obj[1][1] - obj[0][1]) * 1000) / 1000;
                                console.log(line_y_d);
                                /*斜邊比*/
                                var line_ratio = Math.round((25 / Math.sqrt(line_x_d * line_x_d + line_y_d * line_y_d)) * 1000) / 1000;
                                console.log(line_ratio);
                                /*x偏移*/
                                var offset_x = Math.round((line_ratio * line_x_d) * 1000) / 1000;
                                console.log(offset_x);
                                /*y偏移*/
                                var offset_y = Math.round((line_ratio * line_y_d) * 1000) / 1000;
                                console.log(offset_y);
                                if (line_m > 0) {
                                    console.log("bug: " + line_m);
                                    /*修正後x2*/
                                    var correct_x2 = (parseInt(obj[1][0], 10) + parseInt(offset_x, 10));

                                    /*修正後x1*/
                                    var correct_x1 = parseInt(obj[0][0], 10) - parseInt(offset_x, 10);

                                    /*修正後y2*/
                                    var correct_y2 = (parseInt(obj[1][1], 10) + parseInt(offset_y, 10));

                                    /*修正後y1*/
                                    var correct_y1 = parseInt(obj[0][1], 10) - parseInt(offset_y, 10);
                                    console.log(correct_x2);
                                    console.log(correct_x1);
                                    console.log(correct_y2);
                                    console.log(correct_y1);
                                } else if (line_m == "-Infinity") {
                                    console.log("bug: " + line_m);
                                    /*修正後x2*/
                                    var correct_x2 = (parseInt(obj[1][0], 10) - parseInt(offset_x, 10)) + 1;
                                    /*修正後x1*/
                                    var correct_x1 = (parseInt(obj[0][0], 10) + parseInt(offset_x, 10)) - 1;
                                    /*修正後y2*/
                                    var correct_y2 = (parseInt(obj[1][1], 10) + parseInt(offset_y, 10));
                                    /*修正後y1*/
                                    var correct_y1 = (parseInt(obj[0][1], 10) - parseInt(offset_y, 10));
                                } else if (line_m == 0) {
                                    console.log("bug: " + line_m);
                                    /*修正後x2*/
                                    var correct_x2 = (parseInt(obj[1][0], 10) - parseInt(offset_x, 10));
                                    /*修正後x1*/
                                    var correct_x1 = (parseInt(obj[0][0], 10) + parseInt(offset_x, 10));
                                    /*修正後y2*/
                                    var correct_y2 = (parseInt(obj[1][1], 10) + parseInt(offset_y, 10));
                                    /*修正後y1*/
                                    var correct_y1 = (parseInt(obj[0][1], 10) - parseInt(offset_y, 10));
                                } else {
                                    console.log("bug: " + line_m);
                                    /*修正後x2*/
                                    var correct_x2 = (parseInt(obj[1][0], 10) - parseInt(offset_x, 10));

                                    /*修正後x1*/
                                    var correct_x1 = (parseInt(obj[0][0], 10) + parseInt(offset_x, 10));
                                    /*修正後y2*/
                                    var correct_y2 = (parseInt(obj[1][1], 10) + parseInt(offset_y, 10));
                                    /*修正後y1*/
                                    var correct_y1 = parseInt(obj[0][1], 10) - parseInt(offset_y, 10);
                                    console.log(correct_x2);
                                    console.log(correct_x1);
                                    console.log(correct_y2);
                                    console.log(correct_y1);
                                }
                            } else if (linkClass == "sNodes") {
                                console.log(linkClass)
                                console.log(obj);
                                //計算偏移量.bai.go
                                /*斜率*/
                                var line_m = Math.round((obj[1][1] - obj[0][1]) / (obj[1][0] - obj[0][0]) * 1000) / 1000;
                                console.log(line_m);
                                /*x距離*/
                                var line_x_d = Math.round(Math.abs(obj[1][0] - obj[0][0]) * 1000) / 1000;
                                console.log(line_x_d);
                                /*y距離*/
                                var line_y_d = Math.round(Math.abs(obj[1][1] - obj[0][1]) * 1000) / 1000;
                                console.log(line_y_d);
                                /*斜邊比*/
                                var line_ratio = Math.round((10 / Math.sqrt(line_x_d * line_x_d + line_y_d * line_y_d)) * 1000) / 1000;
                                console.log(line_ratio);
                                /*x偏移*/
                                var offset_x = Math.round((line_ratio * line_x_d) * 1000) / 1000;
                                console.log(offset_x);
                                /*y偏移*/
                                var offset_y = Math.round((line_ratio * line_y_d) * 1000) / 1000;
                                console.log(offset_y);
                                if (line_m > 0) {
                                    console.log("bug: " + line_m);
                                    /*修正後x2*/
                                    var correct_x2 = (parseInt(obj[1][0], 10) + parseInt(offset_x, 10));

                                    /*修正後x1*/
                                    var correct_x1 = parseInt(obj[0][0], 10) - parseInt(offset_x, 10);

                                    /*修正後y2*/
                                    var correct_y2 = (parseInt(obj[1][1], 10) + parseInt(offset_y, 10));

                                    /*修正後y1*/
                                    var correct_y1 = parseInt(obj[0][1], 10) - parseInt(offset_y, 10);
                                    console.log(correct_x2);
                                    console.log(correct_x1);
                                    console.log(correct_y2);
                                    console.log(correct_y1);
                                } else if (line_m == "-Infinity") {
                                    console.log("bug: " + line_m);
                                    /*修正後x2*/
                                    var correct_x2 = (parseInt(obj[1][0], 10) - parseInt(offset_x, 10)) + 1;
                                    /*修正後x1*/
                                    var correct_x1 = (parseInt(obj[0][0], 10) + parseInt(offset_x, 10)) - 1;
                                    /*修正後y2*/
                                    var correct_y2 = (parseInt(obj[1][1], 10) + parseInt(offset_y, 10));
                                    /*修正後y1*/
                                    var correct_y1 = (parseInt(obj[0][1], 10) - parseInt(offset_y, 10));
                                } else if (line_m == 0) {
                                    console.log("bug: " + line_m);
                                    /*修正後x2*/
                                    var correct_x2 = (parseInt(obj[1][0], 10) - parseInt(offset_x, 10)) + 10;
                                    /*修正後x1*/
                                    var correct_x1 = (parseInt(obj[0][0], 10) + parseInt(offset_x, 10)) - 14;
                                    /*修正後y2*/
                                    var correct_y2 = (parseInt(obj[1][1], 10) + parseInt(offset_y, 10));
                                    /*修正後y1*/
                                    var correct_y1 = (parseInt(obj[0][1], 10) - parseInt(offset_y, 10));
                                } else {
                                    console.log("bug: " + line_m);
                                    /*修正後x2*/
                                    var correct_x2 = (parseInt(obj[1][0], 10) - parseInt(offset_x, 10));
                                    /*修正後x1*/
                                    var correct_x1 = parseInt(obj[0][0], 10) + parseInt(offset_x, 10);
                                    /*修正後y2*/
                                    var correct_y2 = (parseInt(obj[1][1], 10) + parseInt(offset_y, 10));
                                    /*修正後y1*/
                                    var correct_y1 = parseInt(obj[0][1], 10) - parseInt(offset_y, 10);
                                    console.log(correct_x2);
                                    console.log(correct_x1);
                                    console.log(correct_y2);
                                    console.log(correct_y1);
                                }
                            }


                            // console.log(correct_x2);
                            // console.log(correct_x1);
                            // console.log(correct_y2);
                            // console.log(correct_y1);

                            obj[0][0] = correct_x1;
                            obj[0][1] = correct_y1;
                            obj[1][0] = correct_x2;
                            obj[1][1] = correct_y2;
                            // line = svg.select("g").append("line")
                            //     .attr("x1", obj[0][0])
                            //     .attr("y1", obj[0][1])
                            //     .attr("x2", obj[1][0])
                            //     .attr("y2", obj[1][1])
                            //     .attr("stroke", "#ED7F14")
                            //     .attr("stroke-width", 4)
                            //     .attr("marker-end", "url(#arrow)");
                            //.attr("class", linkClass);

                            console.log(obj, obj_relation);
                            if (parseInt(obj[0][0]) != 0 && parseInt(obj[1][0]) != parseInt(obj[0][0])) {
                                console.log(obj_relation);
                                $.ajax({
                                    method: "POST",
                                    url: "php_PDO/config_insertLines.php",
                                    data: {
                                        x1: obj[0][0],
                                        y1: obj[0][1],
                                        x2: obj[1][0],
                                        y2: obj[1][1],
                                        class: "" + linkClass + "",
                                        map_SN: mapSN,
                                        nodes_connection: "" + obj_relation + "",
                                    }
                                }).done(function(data) {
                                    // line = svg.select("g").append("line")
                                    //     .attr("x1", obj[0][0])
                                    //     .attr("y1", obj[0][1])
                                    //     .attr("x2", obj[1][0])
                                    //     .attr("y2", obj[1][1])
                                    //     .attr("stroke", "#ED7F14")
                                    //     .attr("stroke-width", 4)
                                    //     .attr("marker-end", "url(#arrow)")
                                    //     .attr("class", linkClass);
                                    ShowInserLine(data);
                                    obj.length = 0;
                                    obj_relation.length = 0;
                                    console.log("success:" + data);
                                }).fail(function(data) {
                                    console.log("fail" + data);
                                });
                            }
                            //insert line into db
                        }
                        objChkNode.length = 0;
                    }
                }
            });
        }
    }


});

function ShowInserLine(lastId) {
    //$(".sNodes").css("display","block");
    $.ajax({
            url: 'php_PDO/data_insertlines.php',
            type: 'POST',
            data: {
                arrow_SN: lastId
            }
        })
        .done(function(data) {
            console.log("success");
            var json_data = $.parseJSON(data);
            console.log(json_data);

            json_data.forEach(function(d) {
                d3.select("body").select("svg").select("g")
                    .append('marker')
                    .attr("id", "arrow" + d.arrow_sn)
                    .attr("markerUnits", "strokeWidth")
                    .attr("markerWidth", 12)
                    .attr("markerHeight", 12)
                    .attr("viewBox", "0 0 12 12")
                    .attr("refX", 6)
                    .attr("refY", 6)
                    .attr("orient", "auto")
                    .attr("style", function() {
                        if (d.class == "bNodes") {
                            return "fill:#149BED";
                        } else {
                            return "fill:#FFF143";
                        }
                    })
                    .append('path')
                    .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
                    .attr("onclick", "arrow(" + d.arrow_sn + ")")
                    .attr("map_sn", d.map_sn);

                d3.select("body").select("svg").select("g").append('line')
                    .attr("id", "arrow" + d.arrow_sn)
                    .attr("x1", d.x1)
                    .attr("y1", d.y1)
                    .attr("x2", d.x2)
                    .attr("y2", d.y2)
                    .attr("stroke", "#149BED")
                    .attr("marker-end", "url(#arrow" + d.arrow_sn + ")")
                    .attr('nodes_relation', d.nodes_connection)
                    .attr("onclick", "arrow(" + d.arrow_sn + ")")
                    .attr("class", d.class)
                    .attr("map_sn", d.map_sn);

                $("line[id=arrow" + d.arrow_sn + "]").css("display", "block");
            });
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
};

//check Nodes Text Field are input
$("#bNodes, #sNodes").click(function(event) {
    if ($("#NodeText").val() == null || $("#NodeText").val() == "") {
        alert("please add text first!!");
    }
});

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function NodesDownInlv3(id) {
    console.log("we")
    var menus = $("circle[id=node_id" + id + "]").attr("menus");
    $("#updateNodeText").removeAttr("onclick");
    $("#updateNodeText").attr("onclick","updateNodeText("+id+")");
    $(this).attr("class")
    $("#DA").prop("checked", false);
    $("#CR").prop("checked", false);
    switch (parseInt(menus)) {
        case 1:
            $("#CR").prop("checked", true)
            break;
        case 2:
            $("#DA").prop("checked", true)
            break;
        case 4:
            $("#CR").prop("checked", true);
            $("#DA").prop("checked", true);
            break;
        default:
            // statements_def
            break;
    }
    var indiId = "("+$("text[id=node_id" + id + "]").text()+")";
    var indiText = $("text[id=node_id" + id + "]").attr("text");
    var fullNodeName = indiId + indiText;
    var nodesText = $("#NodeText").val(fullNodeName);
    //nodesText = ;
}
function updateNodeText(node_id){
    let newIndicateID = $("#NodeText").val().split(")")[0].split("(")[1];
    let newIndicateName = $("#NodeText").val().split(")")[1];
    console.log(newIndicateID);
    $.ajax({
        url: "php_PDO/updateNodeText.php",
        method: 'POST',
        data:{
            nodeId: node_id,
            indicate_id: newIndicateID,
            indicate_name: newIndicateName
        }
    })
    .done(function(data){
        console.log(data)
    }) 
    .fail(function(err){
        console.log(err)
    })

}

