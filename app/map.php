<html>

<head>
    <?php
session_start();
//mysql_query("SET NAMES ‘UTF8′");
echo $_GET["map"];
?>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Knowledge Structure Editor Mode</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        <script src="../bower_components/jquery/dist/jquery.js"></script>
        <!-- build:css(.) styles/vendor.css -->
        <!-- bower:css -->
        <!-- endbower -->
        <!-- endbuild -->
        <!-- build:css(.tmp) styles/main.css -->
        <link rel="stylesheet" href="styles/main.css">
        <link rel="stylesheet" href="styles/slide_menu.css">
        <!-- endbuild -->
        <!-- build:js scripts/vendor/modernizr.js -->
        <script src="../bower_components/modernizr/modernizr.js"></script>
        <!-- endbuild -->
        <script src="../bower_components/d3/d3.js"></script>
        <link rel="stylesheet" type="text/css" href="../bower_components/bootstrap/dist/css/bootstrap.css">
        <script src="../bower_components/bootstrap/dist/js/bootstrap.js"></script>
        <script src="../bower_components/jquery-ui-progressbar/jquery-ui.js"></script>
        <link rel="stylesheet" href="../bower_components/jquery-ui-progressbar/jquery-ui.min.css">
        <!--Use starfield on github site: https://github.com/rocketwagon/jquery-starfield -->
        <script src="../bower_components/jquery-starfield-master/dist/jquery-starfield.js"></script>
        <script src="../bower_components/typeahead.js/typeahead.min.js"></script>
</head>

<body>
    <!--[if lt IE 10]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
    <script>
    (function(b, o, i, l, e, r) {
        b.GoogleAnalyticsObject = l;
        b[l] || (b[l] =
            function() {
                (b[l].q = b[l].q || []).push(arguments)
            });
        b[l].l = +new Date;
        e = o.createElement(i);
        r = o.getElementsByTagName(i)[0];
        e.src = 'https://www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e, r)
    }(window, document, 'script', 'ga'));
    ga('create', 'UA-XXXXX-X');
    ga('send', 'pageview');
    </script>
      <div class="backToPage" style="display:inline;">
                        <a id="backTopage" href="../../../modules.php?op=index.php">
                            <button type="button" class="btn btn-success" aria-label="Left Align">
                                <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
                            </button>
                        </a>
                    </div>
    <div class="Menus_group" style="position: absolute;display: none; background-color: #B4B4B4;">
        <ul class="menus">
            <li><a href="learn_video\video_learn_list.php?indicator=" <?php echo "fuck" ?>>教學媒體</a></li>
            <li><a href="#">診斷測驗</a></li>
            <li><a href="#">互動教學</a>
                <ul class="menus_lv2">
                    <li><a href="#">開放式教學</a></li>
                    <li><a href="#">動態評量教學</a></li>
                </ul>
            </li>
        </ul>
    </div>

    <!--  build: Menu Left Slide Menu -->
    <div id="o-wrapper" class="o-wrapper">
        <div class="c-buttons">
            <!-- <button  class=" glyphicon glyphicon-menu-hamburger"></button> -->
            <button id="c-button--slide-left" type="button" class="c-button btn btn-default" aria-label="Left Align">
                <span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
            </button>
        </div>
    </div>
    <!-- menus here -->
    <div id="c-mask" class="c-mask"></div>
    <!-- /c-mask -->
     <nav id="c-menu--slide-left" class="c-menu c-menu--slide-left">
        <button class="c-menu__close">&larr; Close Menu</button>
        <ul class="c-menu__items">
            <li class="c-menu__item">
            <a class="c-menu__link">科目</a>
                <ul>
                   <!-- <li><a id="map" mapSN="mapSN_1">星空</a></li>
                    <li><a id="map" mapSN="mapSN_2">星空2</a></li>
                    <li><a id="map" mapSN="mapSN_3">國小關西</a></li>
                    <li><a id="map" mapSN="mapSN_4">國小空間與型狀</a></li>
                    <li><a id="map" mapSN="mapSN_5">國小統計圖表</a></li>
                    <li><a id="map" mapSN="mapSN_6">國中數與量</a></li>
                    <li><a id="map" mapSN="mapSN_7">國中幾何</a></li>
                    <li><a id="map" mapSN="mapSN_8">國中帶數與函數</a></li>
                    <li><a id="map" mapSN="mapSN_9">國中資料與不確定性</a></li>-->
                </ul>
            </li>
        </ul>
    </nav>

    <script>
    </script>
    <!-- endbuild -->
    <div id="user_Function" style="position: absolute;">

        <div class="editStarField">
            <input type="text" name="nodes" id="NodeText" placeholder="節點文字" maxlength="2000" style="width:100%;">
            <input type="button" value="增加大節點" class="btn btn-primary" id="bNodes">
            <input type="button" value="增加小節點" class="btn btn-primary" id="sNodes">
            <input type="button" value="畫線" class="drawLine btn btn-primary">
            <input type="button" value="刪除物件" class="btn btn-primary" id="DelObj">
            <input type="button" value="顯示大節點文字" class="btn btn-primary" id="nodebText">
            <input type="button" value="顯示小節點文字" class="btn btn-primary" id="nodesText">
        </div>
    </div>
    <div class="lightbox">
        <div id="progressbar"></div>
    </div>
    <div id="starSkill">
        <div id="star_1"></div>
        <div id="star_2"></div>
        <div id="star_3"></div>
        <div id="star_4"></div>
    </div>
    <!-- build:js scripts/main.js-->
    <script src="scripts/main.js"></script>
    <script src="scripts/slide_menu.js"></script>
    <!--endbuild -->
    <script type="application/javascript">
    $("span[class='twitter-typeahead']").removeAttr('style');
    var mapSN;
    $("a[id^='map']").click(function() {
    mapSN = $(this).attr("mapSN");
    mapSN = mapSN.split("_");
    mapSN = mapSN[1];
    });
    $('#search.typeahead').typeahead({
        name: 'typeahead',
        remote: 'php/Search.php?key=%QUERY?map=%'+mapSN,
        limit: 10
    });
    $('body').starfield({
        starDensity: 1.0,
        //mouseScale: 1.0
    });
        $("#save").click(function(){

            var saveGrade = $('#saveGrade').val();
            console.log( [typeof(saveGrade), saveGrade] );
            var mapSN = $(this).attr('mapsn');
            if( saveGrade>4 && (mapSN==4 || mapSN==5 || mapSN==10) ) return alert('自然或國語只有分四個年段。');
            //if( mapSN=='1' || mapSN=='2' || mapSN=='3'  ){
              $('svg>g>g').each( function(e){

                var gId = $(this).attr('id');
                //console.log(gId);
                //if( gId!=null ) return true;
                var indicator = $(this).children('circle').attr('indicator');
                var indicatorSplit = indicator.split('-');
                if( mapSN==3 )
                  var grade=indicatorSplit[0];
                else if( mapSN==4 ){
                  var grade=indicatorSplit[1].split('',1);
                  //console.log(grade);
                }else if( mapSN==5 || mapSN==10){
                  var grade=indicatorSplit[1];
                }

                if( saveGrade !='0' && grade!=saveGrade ) $(this).remove();
                $(this).attr({
                  'id':'g_'+indicator,
                  'grade':grade,
                });
              } );
              $('svg>g>line').each( function(){
                var nodesAry = $(this).attr('nodes_relation').split(',');
                //console.log([mapSN,saveGrade]);
                if(mapSN==3){
                  if( saveGrade !='0' && (nodesAry[0].substr(0,1)!=saveGrade || nodesAry[1].substr(0,1)!=saveGrade) )
                    $(this).remove();
                }else if( mapSN==4 ){
                  var nodes_relation_str = $(this).attr('nodes_relation').replace(' ','');
                  var nodesAry = nodes_relation_str.split(',');
                  if( nodes_relation_str.length>20 ){
                    console.log( $(this).attr('nodes_relation') );
                    $(this).remove();
                    return;
                  }
                  var nodeLowSplit = nodesAry[0].split('-');
                  //console.log( [nodeLowSplit[1],typeof(nodeLowSplit[1])] );
                  if( typeof(nodeLowSplit[1])==='undefined' ) return $(this).remove();
                  var nodesLowGrade = nodeLowSplit[1].split('',1).join('');
                  var nodeHighSplit = nodesAry[1].split('-');
                  //console.log( nodeHighSplit );
                  if( typeof(nodeHighSplit[1])==='undefined' ) return $(this).remove();
                  var nodesHighGrade = nodeHighSplit[1].split('',1).join('');
                  console.log( [ [nodesLowGrade,typeof(nodesLowGrade)], [ nodesHighGrade,typeof(nodesHighGrade) ], [saveGrade,typeof(saveGrade)] ] );
                  if( saveGrade !='0' && (nodesLowGrade!=saveGrade || nodesHighGrade!=saveGrade) )
                    $(this).remove();
                }else if( mapSN==5  || mapSN==10){
                  var nodesAry = $(this).attr('nodes_relation').split(',');
                  var nodeLowSplit = nodesAry[0].split('-');
                  var nodesLowGrade = nodeLowSplit[1];
                  var nodeHighSplit = nodesAry[1].split('-');
                  var nodesHighGrade = nodeHighSplit[1];
                  if( saveGrade !='0' && (nodesLowGrade!=saveGrade || nodesHighGrade!=saveGrade) )
                    $(this).remove();
                }
                $(this).attr( 'maxNodes', nodesAry[1]);

              } );
            //}

            var SVG = $("svg").html();
            //console.log(SVG);
            $.ajax({
                url: 'map_write.php',
                type: 'POST',
                data: {
                    'mapSN': mapSN,
                    'svg': SVG,
                    'grade':saveGrade,
                },
            })
            .done(function(data) {
              alert('save svg success.');
                console.log("success" + data);
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

        })
        
       
    </script>
</body>

</html>
