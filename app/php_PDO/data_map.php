<?php
    session_start();
    header("Content-Type:text/html;charset=UTF-8");


require_once "../../config.php";
   
    // //require_once "../../../../include/adp_API.php"; 

    // if( $_SESSION[user_id]==='chinese' ){
    //   $sql = 'AND subject_id=1';
    //   $subject_id=1;
    // }elseif( $_SESSION[user_id]==='science' ){
    //   $sql = 'AND subject_id=3';
    //   $subject_id=3;
    // }else
    //   $sql='';

	  //$mapData = $dbh->prepare("select * from map_info where display=1 '.$sql.' ");
    //$mapData->bindValue(':display', '1', PDO::PARAM_STR);
    //$mapData->bindValue(':subject_id', $subject_id, PDO::PARAM_STR);
    //$mapData->execute();
    $mapData = '
      SELECT *
      FROM map_info
      WHERE display=1
    ';
    //echo $mapData; die();
    $result = $dbh->query($mapData);
    $row = $result->fetchAll();
    //$data = array();
    //$row = $mapData -> fetchAll();
    //$data[] = $row;
    echo urldecode(json_encode($row));
 ?>
