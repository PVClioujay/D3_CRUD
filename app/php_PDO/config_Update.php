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

   	$updateNode = $dbh->prepare("UPDATE map_node SET transform =:transform where node_sn=:node_sn;");
    $updateNode->bindValue(':transform', $_POST['transform'], PDO::PARAM_STR);
    $updateNode->bindValue(':node_sn', $_POST['id'], PDO::PARAM_INT);
    // $updateNode->bindValue(':x2', $_POST['x2'], PDO::PARAM_STR);
    // $updateNode->bindValue(':y2', $_POST['y2'], PDO::PARAM_STR);
    // $updateNode->bindValue(':class', $_POST['class'], PDO::PARAM_STR);
    // $updateNode->bindValue(':map_sn', $_POST['map_sn'], PDO::PARAM_STR);
    $updateNode->execute();

           $data = array();
        $row = $updateNode -> fetch();
        $data[] = $row;
        echo json_encode($row);
 ?>
