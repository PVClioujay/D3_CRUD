<?php
    // $host = "127.0.0.1";
    // $db_Acc = "root";
    // $db_pwd = "su3cl3";
    // $db = "adpbn2007";

    // $conn = new mysqli($host,$db_Acc,$db_pwd,$db);
    // mysqli_query($conn,"SET CHARACTER SET UTF8");
    // if ($conn->connect_error) {
    //     die("Connection failed: " . $conn->connect_error);
    // }else{
    //   $host = "120.108.208.84";
    //   $db_Acc = "root";
    //   $db_pwd = "su3cl3";
    //   $db = "adpbn2007";
    // }

require_once "../../config.php";
   
    //require_once "../../../../include/adp_API.php"; 
    // $server = mysql_connect($hostspec, $dbuser, $dbpass);
    // $connection = mysql_select_db($database, $server);

    //$sql = "INSERT INTO useranalysis(StartTime, EndTime) VALUES ('$php_startime','$php_endtime')";
    //$sql = "INSERT INTO d3-map.nodes (circles) VALUES (".$_POST['circles'].");";

   	$insertMap = $dbh->prepare("INSERT INTO map_info (subject,grade,edu_sys,publisher) VALUES (:subject,:grade,:edu_sys,:publisher);");
    $insertMap->bindValue(':subject', $_POST['subject'], PDO::PARAM_STR);
    $insertMap->bindValue(':grade', $_POST['grade'], PDO::PARAM_INT);
    $insertMap->bindValue(':edu_sys', $_POST['edu_sys'], PDO::PARAM_STR);
    $insertMap->bindValue(':publisher', $_POST['publisher'], PDO::PARAM_STR);
    $insertMap->execute();
    
    $data = array();
    $row = $nodesData -> fetch();
    $data[] = $row;
    echo json_encode($data);
 ?>
