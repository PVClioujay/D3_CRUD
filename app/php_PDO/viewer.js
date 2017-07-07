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

$("#dialog").dialog({
    autoOpen: false,
});


$(function () {
    $.ajax({
        url: 'php_PDO/data_map2.php'
    }).done(function (data) {
        //console.log(data);
        $.each(JSON.parse(data), function (key, value) {
            //console.log(value.map_sn, value.map_name);
            $(".c-menu__item > ul").append('<li><a id="map" mapSN="mapSN_' + value.map_sn + '">' + value.map_name + '</a></li>');
        })
        Map();
    })
})

//Don't let user first time see the data

$("#searchResult").hide();
$("#root").hide();
$("text").attr("x", 0);
$("line").removeAttr('stroke-width');
//get search bar value when "enter" was press or the search icon was click
$("#search-ico").click(function () {
    var ty = $("input[name=typeahead]").val();
    ////console.log(ty);
    var node = $('g > g > text');
    //console.log(node);
});


//修正畫線錯誤，假如x1 x2 y1 y2 = 0
chkLine();



//$("#backTopage").attr("href", window.location.host + "/index.php?op=main");
//visibility: visible;

//alert('test');
$(function () {
    //use mouse wheel to get the wheel data
    $("svg").bind('mousewheel', function (e) {
        //console.log("123");
        ////console.log("init value:" + e.originalEvent.wheelDelta);
        if (e.originalEvent.wheelDelta > 0) {
            count += 120;
            //console.log("up value:" + count);
        }else if( e.originalEvent.wheelDelta<0 ) {
            count -= 120;
            //console.log("down value:" + count);
        }
        //Javascript RegExp to check count value
        re = /^-?\d+$/;
        if (re.test(count) == false) {
            count = 120;
            $('#chaL').val(2);
            //console.log("count value is minus set value" + count);
        }
        //count -= e.originalEvent.wheelDelta;
        if (count >= 240) {
            count = 240;
            $('#chaL').val(3);
        } else if (count <= 0) {
            count = 0;
            $('#chaL').val(1);
        }else
          $('#chaL').val(2);

        // console.log(count)
        selectLV(count)
    });
    
    $("#chaL").on('click', function (e) {
        //alert(count);
        var chaLval=parseInt($(this).val());
        chaLval++;
        if( chaLval>3 ) chaLval=1;
        $(this).val( chaLval );
        
        if( chaLval==1 ){
          count = 0;
        }else if( chaLval==2 ){
          count = 120;
        }else if( chaLval==3 ){
          count = 240;
        }

        // console.log(count)
        selectLV(count)
    });


});

$(document).mousemove(function (event) {
    pageX = event.pageX - $(document).scrollLeft();
    pageY = event.pageY - $(document).scrollTop();
    ////console.log(pageX, pageY);
    svgX = pageX;
    svgY = pageY;



    $('g > g').mousedown(function (event) {
        svgBoo = false;
        dragBoo = true;
        $(".Menus_group").css("display", "none");
    });

    $('g > g').mouseup(function (event) {
        svgBoo = true;
        dragBoo = false;
    });
});

svg = d3.select('body')
    .attr('width', "100%")
    .attr('height', "100%");



var container = svg.select("svg").select('g');

function zoomed() {

    if ($("svg > g").css("transform")) {
        $("svg > g").css("transform", "");
        $("svg > g").removeAttr('style');
    }

    var transAttr = $("svg > g").attr("transform");


    //container.attr("transform", "translate(" + d3.event.translate + ")");
    //container.attr("transform", "translate(2248,685)");
    container.attr("transform",
        "translate(" + zoom.translate() + ")" +
        "scale(" + zoom.scale() + ")"
    );
}

var zoom = d3.behavior.zoom()
    .translate([0, 0])
    .on("zoom", zoomed);

svg.call(zoom);

function interpolateZoom(translate, scale) {
    var self = this;
    return d3.transition().duration(350).tween("zoom", function () {
        var iTranslate = d3.interpolate(zoom.translate(), translate),
            iScale = d3.interpolate(zoom.scale(), scale);
        return function (t) {
            zoom
                .scale(iScale(t))
                .translate(iTranslate(t));
            zoomed();
        };
    });
}

function zoomClick() {
    //alert( d3.event.type );
    let width = $(window).width();
    let height = $(window).height();
    var clicked = d3.event.target,
        direction = 1,
        factor = 0.2,
        target_zoom = 1,
        center = [width / 2, height / 2],
        extent = zoom.scaleExtent(),
        translate = zoom.translate(),
        translate0 = [],
        l = [],
        view = { x: translate[0], y: translate[1], k: zoom.scale() };

    d3.event.preventDefault();
    direction = (this.id === 'zoom_in') ? 1 : -1;
    target_zoom = zoom.scale() * (1 + factor * direction);

    if (target_zoom < extent[0] || target_zoom > extent[1]) {
        return false;
    }

    translate0 = [(center[0] - view.x) / view.k, (center[1] - view.y) / view.k];
    view.k = target_zoom;
    l = [translate0[0] * view.k + view.x, translate0[1] * view.k + view.y];

    view.x += center[0] - l[0];
    view.y += center[1] - l[1];

    interpolateZoom([view.x, view.y], view.k);
}

d3.selectAll('.zoom').on('click', zoomClick);
//d3.selectAll('.zoom').on('touch', zoomClick);
d3.selectAll(".sNodes")
    .on("mouseover", function () {
        return tooltip.style("visibility", "visible");
    })
    .on("mousemove", function () {
        return tooltip.style("top", (d3.event.pageY - 50) + "px").style("left", (d3.event.pageX + 10) + "px");
    })
    .on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
    });

var tooltip = d3.select("body")
    .append("div")
    .attr('id', 'tooltip')
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "visible")
var tooltip2 = tooltip.append('div')
    .attr('id', 'tooltip-content');
tooltip2.append('img')
    .attr('id', 'star')
    .attr('src', 'images/s_02.png');
tooltip2.append('img')
    .attr('id', 'star2')
    .attr('src', 'images/s_02.png');
tooltip2.append('img')
    .attr('id', 'star3')
    .attr('src', 'images/s_02.png');
tooltip2.append('img')
    .attr('id', 'star4')
    .attr('src', 'images/s_02.png');


$('#user_Function').css("display", "block");
$("#root").show();


var elemEnter = svg.select("g")
    .selectAll('g');

var imgUrl = setImageUrl();
var imgUrl2 = setImageUrl2();

elemEnter.select("circle")
    .on("mouseover", function () {
        var indi = $(this).attr("indicator");
        //console.log(ind);
        let practiceScore = $(this).attr("practice:");
        let crScore = $(this).attr("rc:");
        let daScore = $(this).attr("da:");
        let videoScore = $(this).attr('video');

        if (parseInt(practiceScore) >= 70) {
            console.log($("#star2"));
            $("#star2").attr("src", "images/star_01.png").css({
                "opacity": 1,
                "width": "50px",
                "height": "50px"
            });
            if (parseInt(practiceScore) >= 100) {
                $("#star3").attr("src", "images/star_01.png").css({
                    "opacity": 1,
                    "width": "50px",
                    "height": "50px"
                });
            } else {
                $("#star3").attr("src", "images/s_02.png").css({
                    "opacity": 1,
                    "width": "40px",
                    "height": "40px"
                });
            }

        } else {
            $("#star2").attr("src", "images/s_02.png").css({
                "opacity": 1,
                "width": "40px",
                "height": "40px"
            });
            if (parseInt(practiceScore) >= 100) {
                $("#star3").attr("src", "images/star_01.png").css({
                    "opacity": 1,
                    "width": "50px",
                    "height": "50px"
                });
            } else {
                $("#star3").attr("src", "images/s_02.png").css({
                    "opacity": 1,
                    "width": "40px",
                    "height": "40px"
                });
            }
        }

        if (parseInt(crScore) == 100 || parseInt(daScore) == 100) {
            $("#star4").attr("src", "images/star_01.png").css({
                "opacity": 1,
                "width": "50px",
                "height": "50px"
            });
        } else {
            $("#star4").attr("src", "images/s_02.png").css({
                "opacity": 1,
                "width": "40px",
                "height": "40px"
            });
        }

        if (parseInt(videoScore) == 100) {
            $("#star").attr("src", "images/star_01.png").css({
                "opacity": 1,
                "width": "50px",
                "height": "50px"
            });
        } else {
            $("#star").attr("src", "images/s_02.png").css({
                "opacity": 1,
                "width": "40px",
                "height": "40px"
            });
        }

        // setStarsVideo(indi);

        // RCDAQuestion(setImageUrl(), indi);
        // practiceQuestion(imgUrl, indi);

        if ($(this).attr("class") == "sNodes") {
            return tooltip.style("visibility", "visible");
        }
        return
    })
    .on("mousemove", function (event) {

        return tooltip.style("top", (d3.event.pageY - 50) + "px").style("left", (d3.event.pageX + 10) + "px");

    })
    .on("mouseout", function () {

        return tooltip.style("visibility", "hidden");

    });


function setStarsVideo(indicate) {
    console.log(indicate);
    $.ajax({
        url: 'php_PDO/data_star.php',
        type: 'POST',
        async: false,
        data: {
            //map_SN: parseInt(mapSN),
            indicate_id: "" + indicate + ""
        },
    })
        .done(function (data) {
            // console.log(data);
            //$("#star").attr("src", "images/star_01.png");
            var Intdata = $.parseJSON(data);
            Intdata = parseInt(Intdata);
            //console.log(Intdata);
            if (Intdata == 100) {
                $("#tooltip-content").css("margin", "-3px auto");

            } else {
                $("#tooltip-content").css("margin", " ");
                $("#star").attr("src", "images/s_02.png").css({
                    "opacity": 0.5,
                    "width": "30px",
                    "height": "30px"
                });
            }
            //console.log("success");
        })
        .fail(function () {
            //console.log("error");
        })
        .always(function () {
            //console.log("complete");
        });


}
var mapSN;

//Delete Nodes and Arrows
var mouseX;
var mouseY;
$(document).mousemove(function (event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
});

$("svg").mousedown(function () {
    $('.Menus_group').css("display", "none");
    //console.log("123");
})



//¹ücßx†Î
$("circle[class=sNodes]").click(function () {
    $('.Menus_group').removeAttr('style');
    $(this).removeAttr('onclick');


    $('.Menus_group').css('display', 'block');
    $('.Menus_group').css("transform", "translate(" + mouseX + "px," + mouseY + "px)");

    //小節點判斷學習向上
    /*
        if($("line[nodes_relation$="+$(this).attr("indicator")+"]").attr('nodes_relation')){
            var nodeRelationlink = $("line[nodes_relation$="+$(this).attr("indicator")+"]").attr('nodes_relation').split(',');
            var node = nodeRelationlink[0];
            
        }else{
            var node = $("circle[id='"+$(this).attr('id')+"']").attr('indicator');
        }    
       console.log(node);
    
        let nodePracticeScore = $("circle[indicator="+node+"]").attr("practice:");
        let nodeVideoScore = $("circle[indicator="+node+"]").attr("video");
    
        if (nodeVideoScore == 100 && nodePracticeScore >= 70){
            $('.Menus_group').css('display', 'block');
            $('.Menus_group').css("transform", "translate(" + mouseX + "px," + mouseY + "px)");
        }else{
    
         
    
              $( "#dialog" ).dialog( "open" );
    
        }
    */

    //之後有要依節點管理，選單在打開486~503
    // var menus = $(this).attr("menus");
    // switch (parseInt(menus)) {
    //     case 1:
    //         $("#CR").css('display', 'none');
    //         break;
    //     case 2:
    //         $("#DA").css('display', 'none');
    //         break;
    //     case 0:
    //         // $(".menus_lv2").css('display', 'none');
    //         //$("#CR").css('display', 'none');
    //         break;
    //     default:
    //         $(".menus_lv2").css('display', 'block');
    //         $("#DA").css('display', 'block');
    //         $("#CR").css('display', 'block');
    //         break;
    // }

    var indicate = $(this).attr("indicator");
    //$("#media_edu").attr("href", "../../../modules/learn_video" + "\\video_learn_list.php?indicator=" + indicate);
    $("#media_edu").click(function (event) {
        window.open("../../../modules/learn_video" + "\\video_learn_list.php?indicator=" + indicate, "_self");
    });

    let year_Indicator = indicate.substr(0, 6);

    $("#commponent").click(function (event) {
        //	 let year_Indicator = $(this).attr("indicator").substr(0,6);
        window.open("../../../modules/New_CR/" + year_Indicator + "/index.html", "_self");
    })

    RCDAPracticeQuestion(indicate)
})



function setImageUrl() {
    var arr_data;

    $.ajax({
        url: 'php_PDO/data_Skill.php',
        type: 'POST',
        async: false,
        data: {
            map_SN: map_SN()
        },
    }).done(function (data) {
        arr_data = data.split(";");
        arr_data = arr_data.filter(function (str) {
            return /\S/.test(str);
        });
        //str = str.split(';');
    })

    return arr_data;
}

function setImageUrl2() {
    var arr_data;
    $.ajax({
        url: 'php_PDO/data_Skill2.php',
        type: 'POST',
        async: false,
        data: {
            map_SN: map_SN()
        },
    }).done(function (data) {
        arr_data = data.split(";");
        arr_data = arr_data.filter(function (str) {
            return /\S/.test(str);
        });
        //str = str.split(';');
    })
    return arr_data;
}


//console.log(imgUrl);
nodesMasteryB(imgUrl2);
nodesMasteryS(imgUrl);

//¹üc¾«Êì¶È-´óüc
function nodesMasteryB(imgUrl2) {
       // console.log(imgUrl2);
    var img;
    for (var i = 0; i <= imgUrl2.length; i++) {
        if (typeof imgUrl2[i] === 'undefined') {
            break;
            console.log(imgUrl2[i]);
        };
        var indicateID = imgUrl2[i].split(',');
        indicateID = indicateID[0];

        var indicateStatus = imgUrl2[i].split(',');
        indicateStatus = indicateStatus[1];

        if(indicateID.indexOf("[")!=-1){
            var indicateIDCount = indicateID.indexOf("[");
            var circleID = indicateID.substr(0,indicateIDCount);
            var circleID = $("circle[indicator="+circleID+"]").attr("id");
        }else{
            var circleID = $("circle[indicator=" + indicateID + "]").attr("id");    
        }

        
        // console.log(circleID, indicateStatus, indicateID);
        if (parseInt(indicateStatus) == 0) {
            $("circle[id=" + circleID + "]").prev().attr("id", "image1");
            $("circle[id=" + circleID + "]").attr("fill", "url(#image1)");
            img = "images/p5-4-01.png";
            $("circle[id=" + circleID + "]").prev().children("image").attr("xlink:href", img);
        } else if (parseInt(indicateStatus) == -1) {
            $("circle[id=" + circleID + "]").prev().attr("id", "image2");
            $("circle[id=" + circleID + "]").attr("fill", "url(#image2)");
            img = "images/p5-4-02.png";
            $("circle[id=" + circleID + "]").prev().children("image").attr("xlink:href", img);
        } else if (parseInt(indicateStatus) == 2) {
            $("circle[id=" + circleID + "]").prev().attr("id", "image3");
            $("circle[id=" + circleID + "]").attr("fill", "url(#image3)");
            img = "images/p5-4-03.png";
            $("circle[id=" + circleID + "]").prev().children("image").attr("xlink:href", img);
        }
        //console.log(wheelDelta);
    }
    selectLV(120);
    selectLV(0);
}


//¹üc¾«Êì¶È-Ð¡üc
function nodesMasteryS(imgUrl) {
    console.log(imgUrl);
    var img;
    
    for (var i = 0; i <= imgUrl.length; i++) {
        //console.log(imgUrl[i]);
        if (typeof imgUrl[i] === 'undefined') {
            break;
            console.log(imgUrl[i]);
        };
        var setImgIndicate = imgUrl[i].split(",");
        //        console.log(imgUrl[i].length);
        setImgIndicate = setImgIndicate[0];

        
        if(setImgIndicate.indexOf("[")!=-1){
            var indicateIDCount = setImgIndicate.indexOf("[");
            setImgIndicate = setImgIndicate.substr(0,indicateIDCount);
            var setImgIndicate_id = $("circle[indicator="+setImgIndicate+"]").attr("id");
        }else{
            var setImgIndicate_id = $("circle[indicator=" + setImgIndicate + "]").attr("id");    
        }

        // var setImgIndicate_id = $("circle[indicator=" + setImgIndicate + "]").attr("id");
        var mastery = imgUrl[i].split(",");
        mastery = mastery[1];
        // console.log(mastery);
        // console.log(setImgIndicate);
        // console.log(setImgIndicate_id);
        //        console.log($("circle[id=" + setImgIndicate_id + "]").prev().children("image"));
       


        if (parseInt(mastery) == -1) {
            $("circle[id=" + setImgIndicate_id + "]").prev().attr("id", "image01");
            $("circle[id=" + setImgIndicate_id + "]").attr("fill", "url(#image01)");
            img = 'images/1-01.png';
        } else if (parseInt(mastery) == 0) {
            $("circle[id=" + setImgIndicate_id + "]").prev().attr("id", "image02");
            $("circle[id=" + setImgIndicate_id + "]").attr("fill", "url(#image02)");
            img = 'images/p6-4-02.png';
        } else if (parseInt(mastery) == 1) {
            $("circle[id=" + setImgIndicate_id + "]").prev().attr("id", "image04");
            $("circle[id=" + setImgIndicate_id + "]").attr("fill", "url(#image04)");
            img = 'images/p6-1-03.png';
        }
        $("circle[id=" + setImgIndicate_id + "]").prev().children("image").attr("xlink:href", img)
        // i = i + 4;
    }
    selectLV(120);
    selectLV(0);
}

function RCDAQuestion(imgUrl, indi) {
    //RCDA Question
    // console.log(indi);
    var arr_data, arr_data2;
    for (var i = 2; i < imgUrl.length; i) {
        arr_data = imgUrl[i].split(',');
        //console.log("RC:" + arr_data3[1]);
        i = i + 4;
        for (var x = 3; x <= arr_data.length; x) {
            arr_data2 = arr_data[x].split(',');
            console.log("DA:" + arr_data4[1]);
            x = x + 4;
            if (arr_data[0] == indi && arr_data2[0] == indi) {
                if (parseInt(arr_data[1]) + parseInt(arr_data2[1]) >= 100) {
                    $("#tooltip-content").css("margin", "-3px auto");
                    $("#star4").attr("src", "images/star_01.png").css({
                        "opacity": 1,
                        "width": "40px",
                        "height": "40px",
                    });
                    //console.log(parseInt(arr_data4[1]) + parseInt(arr_data3[1]) + "pass");
                } else {
                    $("#tooltip-content").css("margin", "-3px auto");
                    $("#star4").attr("src", "images/s_02.png").css({
                        "opacity": 0.5,
                        "width": "30px",
                        "height": "30px",
                    });
                    //console.log(parseInt(arr_data4[1]) + parseInt(arr_data3[1]) + "unpass");
                }
            } else {
                $("#tooltip-content").css("margin", "");
                $("#star4").attr("src", "images/s_02.png").css({
                    "opacity": 0.5,
                    "width": "30px",
                    "height": "30px",
                });
                //console.log(parseInt(arr_data4[1]) + parseInt(arr_data3[1]) + "unpass");
            }
        }
    }
}

function practiceQuestion(imgUrl, indi) {
    for (var i = 1; i < imgUrl.length; i) {
        var arr_data2 = imgUrl[i].split(',');
        i = i + 4;
        if (arr_data2[0] == indi && parseInt(arr_data2[1]) >= 70) {
            $("#tooltip-content").css("margin", "-3px auto");
            $("#star2").attr("src", "images/star_01.png").css({
                "opacity": 1,
                "width": "25px",
                "height": "25px"
            });
            if (arr_data2[0] == indi && parseInt(arr_data2[1]) == 100) {
                if (parseInt(arr_data2[1]) > 71) {
                    console.log(arr_data2[0]);
                }
                $("#tooltip-content").css("margin", "-3px auto");
                $("#star3").attr("src", "images/star_01.png").css({
                    "opacity": 1,
                    "width": "40px",
                    "height": "40px",
                });
                $("#star2").attr("src", "images/star_01.png").css({
                    "opacity": 1,
                    "width": "40px",
                    "height": "40px",
                });
            }
            return;
        }
    }
}


function wordWrap(str, maxWidth) {
    var newLineStr = "\n";
    done = false;
    res = '';
    do {
        found = false;
        // Inserts new line at first whitespace of the line
        for (i = maxWidth - 1; i >= 0; i--) {
            if (testWhite(str.charAt(i))) {
                res = res + [str.slice(0, i), newLineStr].join('');
                str = str.slice(i + 1);
                found = true;
                break;
            }
        }

        // Inserts new line at maxWidth position, the word is too long to wrap
        if (!found) {
            res += [str.slice(0, maxWidth), newLineStr].join('');
            str = str.slice(maxWidth);
        }

        if (str.length < maxWidth)
            done = true;
    } while (!done);

    return res;
}

function testWhite(x) {
    var white = new RegExp(/^\s$/);
    return white.test(x.charAt(0));
};


//reset indicate_Nmae and Id


$.ajax({
    url: 'php_PDO/data_nodes.php',
    type: 'POST',
    data: {
        'map_sn': map_SN()
    },
})
    .done(function (data) {
        var json_data = $.parseJSON(data);
        json_data.forEach(function (d) {
            $("text[id=node_id" + d.node_sn + "]").text(d.indicate_id);
        })
    })
    .fail(function () {
        console.log("error");
    })
    .always(function () {
        // console.log("complete");
    });


//selectIndicateText
$("svg circle").tipsy({
    gravity: 'e',
    html: true,
    title: function () {
        var id = $(this).attr("id");
        var indicate_text = $("text[id=" + id + "]").attr("text");
        return indicate_text;
    }
})

function chkLine() {

    let line = $("line");

    for (let i = 0; i <= line.length; i++) {
        if ($(line[i]).attr('x1') == 0 && $(line[i]).attr('x2') == 0 && $(line[i]).attr('y1') == 0 && $(line[i]).attr('y2') == 0) {
            $(line[i]).remove();
        }
    }
}

function selectLV(count) {
    switch (count) {
        case 0:
            //console.log("case 0 show all Big Nodes");
            $("img[src='images/1-01.png']").attr("src", "images/p4-01.png").css({
                width: "32px",
                height: "32px"
            });
            $("img[src='images/p6-4-02.png']").attr("src", "images/p5-4-02.png").css({
                width: "32px",
                height: "32px"
            });;
            $("img[src='images/p6-1-03.png']").attr("src", "images/p4-03.png").css({
                width: "32px",
                height: "32px"
            });
            //$("pattern[class='bNodes']").css("display", "block");
            $("circle[class='bNodes']").css("display", "block");
            $(".bNodes").css("display", "block");
            $(".sNodes").css("display", "none");
            $(".skilLV").css("display", "block");
            $("text[class^='sNodes']").css("display", "none");
            $("text[class^='bNodes']").css("display", "block");
            break;
        case 120:
            //console.log("Now the wheelDelta:" + count + "in case 120 show all Nodes");
            //$("img[src='images/star_01.png']").attr("src", "images/star_04.png");
            $(".skilLV").css("display", "none");
            $(".bNodes").css("display", "block");
            $(".sNodes").css("display", "block");
            $("text[id^='node_id']").css("display", "none");
            break;
        case 240:
            // console.log("here" + count);
            //console.log("Now the wheelDelta:" + count + "in case 240 show all small Nodes");

            //Î´¾«Êì
            $("img[src='images/p4-01.png']").attr("src", "images/1-01.png").css({
                width: "16px",
                height: "16px"
            });
            //Ž§Ña¾È
            $("img[src='images/p5-4-02.png']").attr("src", "images/p6-4-02.png").css({
                width: "16px",
                height: "16px"
            });
            //¾«Êì
            $("img[src='images/p4-03.png']").attr("src", "images/p6-1-03.png").css({
                width: "16px",
                height: "16px"
            });
            $(".skilLV").css("display", "block");
            $('.bNodes').css("display", "none");
            $("circle[class=sNodes]").css("display", "block");
            $("pattern[class=sNodes]").css("display", "block");
            $("text[class=sNodes]").css("display", "block");
            break;
    }
    // console.log(count);
}

function map_SN(data) {
    if (data) {
        return parseInt(data);
    } else {
        return 1;
    }

}

function svgMap(map) {
    // var container = svg.select("#svg" + map).select('g');
    var container = svg.select("#svg1").select('g');

    function zoomed() {

        if ($("svg > g").css("transform")) {
            $("svg > g").css("transform", "");
            $("svg > g").removeAttr('style');
        }

        var transAttr = $("svg > g").attr("transform");


        container.attr("transform", "translate(" + d3.event.translate + ")");
        //container.attr("transform", "translate(2248,685)");
    }

    var zoom = d3.behavior.zoom()
        .translate([0, 0])
        .on("zoom", zoomed);

    svg.call(zoom);
}

var map
function Map(){
    $("a[id^='map']").click(function () {
        map = $(this).attr("mapSN");
        console.log(map);

        $.ajax({
            url:'php_PDO/map_select.php',
            type:'POST',
            data:{
                mapSN: map
            }
        }).done(function(data){
            console.log(data);
            $("svg > g").remove();
            $("svg").append(data);
            svgMap(map);
            map_SN(map);
        }).fail(function(error){
            console.log(error);
        })
        //console.log($(this).attr("mapSN"));
        // $("svg").removeAttr("class");
        // $("#svg" + map).attr("class", "enable");
        //$("svg").not($(".enable")).css("display", "")
        // $(".enable").show();
        // $("svg").not($(".enable")).hide();
        

    })
}


//Accordine user grades to decide which Node need to appear or disappear

$("#btn_grade").click(function () {
    var stuGrade = $("#grade").val();
    visShowHide(stuGrade);
})


$('#search.typeahead').autocomplete({
    
    source: function (request, callback) {
        
        var data = { term: request.term, map: map };
        $.ajax({
            url: 'php_PDO/Search.php',
            data: data,
        })
            .done(function (data) {
                //alert(data);
                var dataArray = []
                $(data).filter("li").each(function () {
                    dataArray.push($(this).text())
                });
                
                callback(dataArray);
            })
    }
})

$("#search").on('keypress',function (event) {
    if (event.which == 13) {
        var ty = $("input[name=typeahead]").val();
        //console.log(ty);
        var nodeText = [];
        var nodeTrans = [];

        var tySub = ty.substr(0, 10);
        var RegCk = /([-\d|A-Z]+)([-\d|a-z]+)([-\d|a-z]+)/;
        var tyRegck = tySub.match(RegCk);

        if (tyRegck[0].length == 7) {
            selectLV(120)
            selectLV(240)
        } else {
            $(".bNodes").css("display", "block");
            selectLV(120)
            selectLV(0)
        }

        $("g >g").each(function () {
            nodeTrans.push($(this).attr("transform"));
        });
        $("g > g > text").each(function () {
            nodeText.push($(this).text() + $(this).attr("text"));
        });
        //console.log(nodeText);
        //console.log("nodeTrans:" + nodeTrans);
        for (var i = 0; i <= nodeText.length; i++) {
            if (ty == nodeText[i]) {
                //console.log("work")
                var zoomfactory = 1; //ËÑŒ¤¿s·Å
                var w = $(document).width();
                var h = $(document).height();
                var xycoordinate = nodeTrans[i].split("(");
                xycoordinate = xycoordinate[1].split(")");
                xycoordinate = xycoordinate[0].split(",");

                var xcoordinate = parseInt(xycoordinate[0]);
                var transX = (-xcoordinate * zoomfactory + w / 2);
                var ycoordinate = parseInt(xycoordinate[1]);
                var transY = (-ycoordinate * zoomfactory + h / 2);
                                                     
                container.transition().attr("transform", "translate(" + transX + "," + transY + ") scale(" + zoomfactory + ")");
                zoom.translate([transX, transY]);
                //$("#root > g").attr("transform", nodeTrans[i]);

                nodeText.length = 0;
                nodeTrans.length = 0;
            }

        }
    }
});

$("#go_search").click(function () {
    var ty = $("input[name=typeahead]").val();
    //console.log(ty);
    var nodeText = [];
    var nodeTrans = [];

    var tySub = ty.substr(0, 10);
    var RegCk = /([-\d|A-Z]+)([-\d|a-z]+)([-\d|a-z]+)/;
    var tyRegck = tySub.match(RegCk);

    if (tyRegck[0].length == 7) {
        selectLV(120)
        selectLV(240)
    } else {
        $(".bNodes").css("display", "block");
        selectLV(120)
        selectLV(0)
    }

    $("g >g").each(function () {
        nodeTrans.push($(this).attr("transform"));
    });
    $("g > g > text").each(function () {
        nodeText.push($(this).text() + $(this).attr("text"));
    });
    //console.log(nodeText);
    //console.log("nodeTrans:" + nodeTrans);
    for (var i = 0; i <= nodeText.length; i++) {
        if (ty == nodeText[i]) {
            console.log("work")
            var zoomfactory = 1; //ËÑŒ¤¿s·Å
            var w = $(document).width();
            var h = $(document).height();
            var xycoordinate = nodeTrans[i].split("(");
            xycoordinate = xycoordinate[1].split(")");
            xycoordinate = xycoordinate[0].split(",");

            var xcoordinate = parseInt(xycoordinate[0]);
            var transX = (-xcoordinate * zoomfactory + w / 2);
            var ycoordinate = parseInt(xycoordinate[1]);
            var transY = (-ycoordinate * zoomfactory + h / 2);

            container.transition().attr("transform", "translate(" + transX + "," + transY + ") scale(" + zoomfactory + ")");
            zoom.translate([transX, transY]);
            //$("#root > g").attr("transform", nodeTrans[i]);

            nodeText.length = 0;
            nodeTrans.length = 0;
        }

    }
})
