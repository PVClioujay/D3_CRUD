<?php
    header("Content-Type: application/json");
  
require_once "../../config.php";
   
    //require_once "../../../../include/adp_API.php"; 
    session_start();
if (!$dbh){
	die('Could not connect: ' . mysql_error());
}
  // echo $_SESSION['user_id'];
  $date=date("Y-m-d H:i:s");
   $insertdata = $dbh->prepare("INSERT INTO map_node (transform, indicate_id, indicate_name, class, r, cx, cy, map_sn, CR, DA) VALUES (:transform,:indicate_id,:indicate_name,:class,:r,:cx,:cy,:map_sn,:cr,:da);");
   
   $insertdata->bindValue(':transform', $_POST['transform'], PDO::PARAM_STR);
   $insertdata->bindValue(':map_sn', $_POST['map_SN'], PDO::PARAM_INT);
   $insertdata->bindValue(':indicate_id', $_POST['indicate_id'], PDO::PARAM_STR);
   $insertdata->bindValue(':indicate_name', $_POST['indicate_name'], PDO::PARAM_STR);
   $insertdata->bindValue(':class', $_POST['class'], PDO::PARAM_STR);
   $insertdata->bindValue(':r', $_POST['r'], PDO::PARAM_STR);
   $insertdata->bindValue(':cx', $_POST['cx'], PDO::PARAM_STR);
   $insertdata->bindValue(':cy', $_POST['cy'], PDO::PARAM_STR);
   $insertdata->bindValue(':cr', $_POST['CR'], PDO::PARAM_BOOL);
   $insertdata->bindValue(':da', $_POST['DA'], PDO::PARAM_BOOL);
   $insertdata->execute();
    
   $stmt = $dbh->query("SELECT LAST_INSERT_ID()");
   $lastId = $stmt->fetch(PDO::FETCH_NUM);
   $lastId = $lastId[0];
  
   $selectinsertData = $dbh->prepare("SELECT * FROM map_node where map_sn = :lastId;");
   $selectinsertData -> bindValue(':lastId', $lastId, PDO::PARAM_INT);
   $selectinsertData -> execute();
   
   $row = $selectinsertData -> fetch(PDO::FETCH_ASSOC);
        
   echo json_encode($lastId);
    

    
 ?>
