<?php

// $host = "127.0.0.1";
// $db_Acc = "root";
// $db_pwd = "su3cl3";
// $db = "adpbn2007";

// $conn = new mysqli($host, $db_Acc, $db_pwd, $db);
// mysqli_query($conn, "SET CHARACTER SET UTF8");
// if ($conn->connect_error) {
// 	die("Connection failed: " . $conn->connect_error);
// } else {
// 	$host = "120.108.208.84";
// 	$db_Acc = "root";
// 	$db_pwd = "su3cl3";
// 	$db = "adpbn2007";
// }

require_once "../../config.php";
   
    //require_once "../../../../include/adp_API.php"; 
    // $server = mysql_connect($hostspec, $dbuser, $dbpass);
    // $connection = mysql_select_db($database, $server);

//$sql = "INSERT INTO useranalysis(StartTime, EndTime) VALUES ('$php_startime','$php_endtime')";
//$sql = "INSERT INTO d3-map.nodes (circles) VALUES (".$_POST['circles'].");";
//$sql = "DELETE FROM d3-map.node-test where id =".$_POST['id'].";";
//$sql2 = "DELETE FROM d3-map.link-test where lid =".$_POST['lid'].";";

	$deleteData = $dbh->prepare("DELETE FROM map_arrows where arrow_sn = :arrow_sn");
	//$sql = $dbh->prepare("DELETE FROM kbnat.map_arrows WHERE map_arrows.arrow_sn = 6 and map_sn = 5");
	$deleteData->bindValue(':arrow_sn', $_POST['id'], PDO::PARAM_INT);
	//$deleteData->bindValue(':map_id', $_POST['map_id'], PDO::PARAM_STR);
	$deleteData->execute();
// if ($_POST['lid'] != null || $_POST['lid'] != '') {
// 	$sql = "DELETE FROM kbnat.map_node WHERE map_arrows.node_sn = 6 and map_sn = 5";
// }
?>
