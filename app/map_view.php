<html>

<head>
    <?php
 session_start();
// mysql_query("SET NAMES ‘UTF8′");
// require_once "../../../auth_chk.php";
// echo $_SESSION[user_d3_level]  = $user_data -> access_level;
// $_SESSION['map'] = $_SERVER[REQUEST_URI];
// echo "<script>console.log(".$_SESSION[map].")</script>";
?>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>knowledge Structure Viewer Mode</title>
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
        <link rel="stylesheet" href="../bower_components/tipsy-master/src/stylesheets/tipsy.css">
        <!--Use starfield on github site: https://github.com/rocketwagon/jquery-starfield -->
        <script src="../bower_components/jquery-starfield-master/dist/jquery-starfield.js"></script>
        <script src="../bower_components/typeahead.js/typeahead.min.js"></script>
        <script src="../bower_components/d3plus/js/d3plus.js"></script>
        <script src="../bower_components//tipsy-master/src/javascripts/jquery.tipsy.js"></script>
</head>

<body style="background-color: #4B2E1D;">
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
    <?php
    echo $_SESSION[user_d3_level]  = $user_data -> access_level;
 $_SESSION[user_d3_level]  = 1;
// echo $_SESSION[user_d3_level] =;
 if($_SESSION[user_d3_level] ==  1){ ?>
        <div class="Menus_group" style="position: absolute;display: none; background-color: #B4B4B4;">
            <ul class="menus">
                <li><a id="media_edu" href="">教學媒體</a></li>
                <li><a id="practice" href="#">診斷測驗</a></li>
                <li><a href="#">互動教學</a>
                    <ul class="menus_lv2">
                        <li><a id="RC" href="#">開放式教學</a></li>
                        <li><a id="DA" href="#">動態評量教學</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <?php } ?>
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
                    <li class="c-menu__item"><a class="c-menu__link">主題</a>
                        <ul>
                            <li><a id="map" mapSN="mapSN_1">星空</a></li>
                            <li><a id="map" mapSN="mapSN_2">國小數與量</a></li>
                            <li><a id="map" mapSN="mapSN_3">國小關西</a></li>
                            <li><a id="map" mapSN="mapSN_4">國小空間與型狀</a></li>
                            <li><a id="map" mapSN="mapSN_5">國小統計圖表</a></li>
                            <li><a id="map" mapSN="mapSN_6">國中數與量</a></li>
                            <li><a id="map" mapSN="mapSN_7">國中幾何</a></li>
                            <li><a id="map" mapSN="mapSN_8">國中帶數與函數</a></li>
                            <li><a id="map" mapSN="mapSN_9">國中資料與不確定性</a></li>
                        </ul>
                    </li>
                    <li class="c-menu__item"><a class="c-menu__link">年級
                        <select style="color:black">
                          <option value="volvo">康軒</option>
                          <option value="saab">南一</option>
                          <option value="opel">翰林</option>
                        </select>
                    </a>
                        <ul>
                            <li><a id="map" mapSN="mapSN_10">數學-國小一年級</a></li>
                            <li><a id="map" mapSN="mapSN_11">數學-國小二年級</a></li>
                            <li><a id="map" mapSN="mapSN_12">數學-國小三年級</a></li>
                            <li><a id="map" mapSN="mapSN_13">數學-國小四年級</a></li>
                            <li><a id="map" mapSN="mapSN_14">數學-國小五年級</a></li>
                            <li><a id="map" mapSN="mapSN_15">數學-國小六年級</a></li>
                            <li><a id="map" mapSN="mapSN_16">數學-國中一年級</a></li>
                            <li><a id="map" mapSN="mapSN_17">數學-國中二年級</a></li>
                            <li><a id="map" mapSN="mapSN_18">數學-國中三年級</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div id="user_Function" style="position: absolute;">
                <div class="editStarField">
                    <!--
      <input type="text" name="nodes" id="NodeText" placeholder="節點文字">
      <input type="button" value="增加大節點" class="btn btn-primary" id="bNodes">
      <input type="button" value="增加小節點" class="btn btn-primary" id="sNodes">
      <input type="button" value="畫線" class="drawLine btn btn-primary">
      <input type="button" value="選擇/刪除物件" class="add_cancel btn btn-primary">
-->
                    <div class="backToPage" style="display:inline;">
                        <a href="window.location.host + "/index.php?op=main"">
                            <button type="button" class="btn btn-success" aria-label="Left Align">
                                <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
                            </button>
                        </a>
                    </div>
                    <div class="searchbar">
                        <input type="text" placeholder="搜尋節點" name="typeahead" id="search" class="typeahead">
                        <button type="submit" class="btn btn-primary">
                            <span class="glyphicon glyphicon-search" aria-hidden="true" id="search-ico"></span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="skilLV" style="display:block;">
                <div>
                    <img src="images/p4-01.png" style="width:32px;height:32px;"><span style="color:white; font-size:15pt;">未測驗</span>
                </div>
                <div>
                    <img src="images/p4-03.png" style="width:32px;height:32px;"><span style="color:white; font-size:15pt;">精熟</span>
                </div>
                <div>
                    <img src="images/p5-4-02.png" style="width:32px;height:32px;"><span style="color:white; font-size:15pt;">待補救</span>
                </div>
            </div>
<!--             <div class="lightbox">
                <div id="progressbar"></div>
            </div> -->
            <!-- <div style="position: absolute; z-index: 10; visibility: hidden; color:white;">a simple tooltip</div> -->
            
            <!-- build:js scripts/main.js-->
            

             
                                     <?php 
                $fp = fopen("svg5.svg", "r");
                echo fread($fp , filesize("svg.svg"));
                fclose($fp);
             ?>
             <script src="scripts/viewer.js"></script>
            <script src="scripts/slide_menu.js"></script>
            <!--<script src="scripts/main.js"></script>
 endbuild -->



            <script type="application/javascript">
            var currentURL = window.location.href;
            currentURL = currentURL.split("=");
            currentURL = currentURL[1];

            $('#search.typeahead').typeahead({
                name: 'typeahead',
                remote: 'php_PDO/Search.php?key=%QUERY',
                limit: 100
            });

            // $('body').starfield({
            //     starDensity: 1.0,
            //     //mouseScale: 1.0
            // });
            

            </script>
</body>

</html>
