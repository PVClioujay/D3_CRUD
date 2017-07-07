<html>

<head>
  <?php

session_start();
require_once "../config.php";

//echo( '<script> console.log('.json_encode($_SESSION).') </script>' );
?>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>knowledge Structure Viewer Mode</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--     <link rel="shortcut icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/apple-touch-icon.png"> -->
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <script src="../bower_components/jquery/dist/jquery.js"></script>
    <!-- build:css(.) styles/vendor.css -->
    <!-- bower:css -->
    <!-- endbower -->
    <!-- endbuild -->
    <!-- build:css(.tmp) styles/main.css -->
    <link rel="stylesheet" href="styles/main.css">

    <!-- endbuild -->
    <!-- build:js scripts/vendor/modernizr.js -->
    <script src="../bower_components/modernizr/modernizr.js"></script>
    <!-- endbuild -->
    <script src="../bower_components/d3/d3.js"></script>
    <link rel="stylesheet" type="text/css" href="../bower_components/bootstrap/dist/css/bootstrap.css">
    <script src="../bower_components/bootstrap/dist/js/bootstrap.js"></script>
    <script src="../bower_components/jquery-ui/jquery-ui.js"></script>
    <link rel="stylesheet" href="../bower_components/jquery-ui/jquery-ui.css">
    <link rel="stylesheet" href="../bower_components/tipsy-master/src/stylesheets/tipsy.css">
    <script src="../bower_components/fullscreen/jquery.fullscreen.js"></script>
    <!--Use starfield on github site: https://github.com/rocketwagon/jquery-starfield -->
    <script src="../bower_components/jquery-starfield-master/dist/jquery-starfield.js"></script>
    <script src="../bower_components/typeahead.js/typeahead.min.js"></script>
    <script src="../bower_components//tipsy-master/src/javascripts/jquery.tipsy.js"></script>
</head>

<body style="background-color: #4B2E1D;">
<style>
a:hover {	color:#F10004; text-decoration:none; }
  .btn01 { margin:20px 0; border-radius:14px; min-width:134px; height:34px; text-align:center; line-height:34px; font-size:17px; color:#fff; display:inline-block; background:#265b78; font-weight:normal; padding:0 10px;}
.btn01:hover { background:#343434; color:#fff;}
a { text-decoration:none; color:#444;
-webkit-transition: all 0.2s ease-out 0s;
-moz-transition: all 0.2s ease-out 0s;
transition: all 0.2s ease-out 0s; }

.btn01:focus{
  color: white;
}

</style>




    <div class="Menus_group">
      <ul class="menus">
        <li id="media_edu">
          <a>教學媒體</a>
        </li>
        <li id="practice">
          <a>練習題</a>
        </li>
        <li id="commponent">
          <a>互動教學</a>
        </li>
        <li id="CR">
          <a>開放式教學</a>
        </li>
        <li id="DA">
          <a>動態評量</a>
        </li>
        <li id="errorItem" style="display:none;">
          <a>觀看錯誤試題</a>
        </li>
      </ul>
    </div>
  <div id="tooltip-content" style="width:100px;height:20px;position:absolute;z-index:10;visibility:visible;display:none;">
    <img id="start_media" src="images/s_02.png" style='width:20px;'>
    <img id="start_practice" src="images/s_02.png" style='width:20px;'>
    <img id="start_RC" src="images/s_02.png" style='width:20px;'>
    <img id="start_DA" src="images/s_02.png" style='width:20px;'>
  </div>

        <div id="user_Function">
          <div class="editStarField"  style="position: absolute;">
            <div class="backToPage" style="display:inline;">
              <a id="backTopage" href="../../../modules.php?op=main" class="btn btn-success" aria-label="Left Align">
                <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
              </a>
            </div>


            <div class="searchbar">

              <input type="text" placeholder="搜尋節點" name="typeahead" id="search" class="typeahead">
              <button type="submit" class="btn btn-primary" id="go_search">
                <span class="glyphicon glyphicon-search" aria-hidden="true" id="search-ico"></span>
              </button>
              
            </div>
            <div id="searchResult" style="position: absolute;background-color: white;top: 35px; left: 50px;width: 80%; height:600px; overflow-x: hidden;overflow-y: scroll; display: none;"></div>

          </div>
        </div>

        <div id="lv1" class="skilLV" style="display:block;">
          <div>
            <img src="images/b_no_exam.png" style="width:32px;height:32px;"><span style="color:white; font-size:15pt;">未測驗</span>
          </div>
          <div>
            <img src="images/b_remedy.png" style="width:32px;height:32px;"><span style="color:white; font-size:15pt;">待補救</span>
          </div>
          <div>
            <img src="images/b_pass.png" style="width:32px;height:32px;"><span style="color:white; font-size:15pt;">精熟</span>
          </div>
        </div>
        <div id="lv3" class="skilLV" style="display:none;">
          <div>
            <img src="images/s_no_exam.png" style="width:32px;height:32px;"><span style="color:white; font-size:15pt;">未測驗</span>
          </div>
          <div>
            <img src="images/s_remedy.png" style="width:32px;height:32px;"><span style="color:white; font-size:15pt;">待補救</span>
          </div>
          <div>
            <img src="images/s_pass.png" style="width:32px;height:32px;"><span style="color:white; font-size:15pt;">精熟</span>
          </div>
        </div>

      <div id="movePanel"></div>

      <div id="zoomPanel">
        <input type="button" id="chaL" value="1"><br><br>
        <div style="display:flex;justify-content:flex-end;align-items:flex-end;background-color:rgba(255,255,255,1);">
          <button type="button" id="zoom_in" class="zoom">
            <div class="glyphicon glyphicon-plus"></div>
          </button>
        </div>
        <div style="display:flex;justify-content:flex-end;align-items:flex-end;background-color:rgba(255,255,255,1);">
          <button type="button" id="zoom_out" class="zoom">
            <div class="glyphicon glyphicon-minus" style="margin:0 0 0 -1px"></div>
          </button>

        </div>
      </div>
      <!-- <img id="arrowImg" src="images/arrowImg.png" style="width:20px;display:none;">-->
<?php
  if( $_REQUEST[viewErrorItem]==1 )
    $viewErrorItem=1;
  else
    $viewErrorItem=0;

  echo('
    <script>
      var map_sn = '.$_GET[map_sn].';
      var viewErrorItem = '.$viewErrorItem.';
    </script>
  ');


  $user_id=base64_decode($_GET['aa']);
  $user_data = new UserData($user_id);
  $_SESSION['user_id'] = $user_data->user_id;
  /*$user_id=base64_decode($_GET['aa']);
  $user_data = new UserData($user_id);
  $_SESSION['user_id'] = $user_data->user_id;
  if(empty($user_data->Open_Map)){
      $user_grade = $user_data->grade;
      $_SESSION['user_d3_user_grade'] = $user_grade;
  }else{
      $user_grade = $user_data->Open_Map;
      $_SESSION['user_d3_user_OpenMap'] = $user_grade;
      $user_grade2 = $user_data->grade;
      $_SESSION['user_d3_user_grade'] = $user_grade2;
  }*/

  //如果有收到 grade ，就只秀 1~該年級的星空圖
  if( $_REQUEST[grade]!=null ) $user_grade= $_REQUEST[grade];
  else $user_grade='0';
  //開啟星空圖
  switchMap($user_grade);
  function switchMap($user_grade){

      if( $user_grade>9 OR $user_grade==0 ) $user_grade='';
      //暫時先這麼處理
      if( $_REQUEST[map_sn]==4 OR $_REQUEST[map_sn]==5  OR $_REQUEST[map_sn]==10){
        if( $user_grade==1 OR $user_grade==2 )$user_grade=1;
        elseif( $user_grade==3 OR $user_grade==4 ) $user_grade=2;
        elseif( $user_grade==5 OR $user_grade==6 ) $user_grade=3;
        elseif( $user_grade>6 AND $user_grade<=9 ) $user_grade=4;
      }

      //$_REQUEST[map_sn]=parseInt($_REQUEST[map_sn]);
      if($_REQUEST[map_sn]==3) $openSubject = 'new_MathSVG'.$user_grade;
      elseif($_REQUEST[map_sn]==4) $openSubject = 'scienceSVG'.$user_grade;
      elseif($_REQUEST[map_sn]==5) $openSubject = 'old_chineseSVG'.$user_grade;
      elseif($_REQUEST[map_sn]==10) $openSubject = 'chineseSVG'.$user_grade;
      else $openSubject = 'new_MathSVG';
      //debugBAI( __LINE__,__FILE__,[$user_grade,$_REQUEST[map_sn],$openSubject] );
      //echo('<script> console.log( ["'.__LINE__.__FILE__.'/'.$openSubject.'",'.$_REQUEST[map_sn].']); </script>');
      $fp=fopen('../../../data/map/'.$openSubject.'.svg','r');
      $svgHtml = fread( $fp, filesize('../../../data/map/'.$openSubject.'.svg') );
      fclose($fp);
      echo( '
        <svg class="enable" id="svg1" width="100%" height="100%">
        '.$svgHtml.'
        </svg>
      ' );
      //開圖後，跳到第一個節點


  }

  //載入學生星空圖資訊，此時要載入 view_new.js，否則下面的會出錯
  echo( '<script src="scripts/view_new.js"></script>' );
  //echo( '<script> firstNodes('.$user_grade.'); </script>' );
  //如果有用網頁傳 nodes, indicator
  if( $_REQUEST[find_nodes]!=null ){
    $sChgS=str_replace( 's', 'S', $_GET[find_nodes] );
    $sChgS = str_replace( '-S-', '-s-', $sChgS );
    $searchNodes = explode( '@XX@', $sChgS );
    echo( '<script> $(function(){ showHideNodes( '.json_encode( array_filter($searchNodes) ).' ); }); </script>' );
  }else unset( $_SESSION[stuNodeStatus][sNode] );
  //map_sn設定為1，之後要改 $_POST['map_SN']
  $map_sn = $_REQUEST['map_sn'];
  //debugBAI( __LINE__,__FILE__, [$_SESSION,$user_data->user_id] );
  if( $_SESSION[stuNodeStatus][sNode]!=null ){
    foreach( $_SESSION[stuNodeStatus][sNode] as $sNode=>$status ){
      $sNodeStatus[ $sNode ]=['status:'=>$status];
    }
    foreach ($_SESSION[stuNodeStatus2][sNode] as $bNode=>$status){
    	$bNodeStatus[ $bNode ]=['bstatus:'=>$status];
    }
    echo( '<script> var stuNodesStatus = '.json_encode($sNodeStatus).'; </script>' );
    echo( '<script> var stuNodesStatus2 = '.json_encode($bNodeStatus).'; </script>' );
  }else{
    $sql='
      SELECT *
      FROM map_node_student_status
      WHERE user_id = "'.$user_data->user_id.'"
      AND map_sn = "'.$map_sn.'"
    ';
    //echo json_encode($sql);die();
  	$result = $dbh->query($sql);
    $row = $result->fetch();
    if( $row["sNodes_Status_FR"]==null ) echo('<script> console.log("'.__LINE__.__FILE__.'/no student data./'. $user_data->user_id.'/'.$map_sn.'"); </script>');
    $unseria_data = unserialize($row["sNodes_Status_FR"]);
    //debugBAI( __LINE__,__FILE__, [$sNodeStatus,$unseria_data] );
    echo( '<script> var stuNodesStatus = '.json_encode($unseria_data).'; </script>' );
    $unseria_data2 = unserialize($row["bNodes_Status"]);
    echo( '<script> var stuNodesStatus2 = '.json_encode($unseria_data2).'; </script>' );
    
  }



?>


</body>

</html>
