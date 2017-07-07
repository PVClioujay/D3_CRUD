<?php 
session_start();
require_once "../../../include/config.php";
require_once "../../../include/adp_API.php";
require_once '../../../classes/Excel/reader.php';

$map_sn=$_POST[mapSN];
if( $_POST[grade]!=0 ) $grade = $_POST[grade];
else $grade='';
$svg=$_POST[svg];
//echo( $grade ); die();
switch( $map_sn ){
  case 1:
    $fileName = '../../../data/map/old_MathSVG'.$grade.'.svg';
  break;
  case 3:
    $fileName = '../../../data/map/new_MathSVG'.$grade.'.svg';
  break;
  case 4:
    $fileName = '../../../data/map/scienceSVG'.$grade.'.svg';
  break;
  case 5:
    $fileName = '../../../data/map/chineseSVG'.$grade.'.svg';
  break;
case 10:
    $fileName = '../../../data/map/chineseSVG'.$grade.'.svg';
  break;

}

$file = fopen($fileName,"w");
if( fwrite($file,$svg) ) echo 'success'.$map_sn;
else echo'svg can not save. Please check.'.$map_sn;
//echo fwrite($file,$svg);
fclose($file);

 ?>
