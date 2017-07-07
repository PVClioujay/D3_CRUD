<?php
    // session_start();
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
    /*$php_startTime = 1;
    $php_endtime = 2;*/

    //$sql = "INSERT INTO useranalysis(StartTime, EndTime) VALUES ('$php_startime','$php_endtime')";
    //$sql = "INSERT INTO d3-map.nodes (circles) VALUES (".$_POST['circles'].");";

require_once "../../config.php";
   
    //require_once "../../../../include/adp_API.php"; 
    // $server = mysql_connect($hostspec, $dbuser, $dbpass);
    // $connection = mysql_select_db($database, $server);
    session_start();
    $ser = serialize($_POST['nodes_connection']);
    
    $date=date("Y-m-d H:i:s");

    if($_POST['x1'] == 0 || $_POST['x2'] == 0 || $_POST['y1'] == 0 || $_POST['y1'] == 0){
        return;
    }else{
        $insertLineData= $dbh->prepare("INSERT INTO map_arrows(x1, y1, x2, y2, map_sn, class, nodes_connection,arrow_creater,date) VALUES (:x1,:y1,:x2,:y2,:map_sn,:class, :nodes_connection, :arrow_creater, :date);");
        $insertLineData -> bindValue(':x1', $_POST['x1'], PDO::PARAM_STR);
        $insertLineData -> bindValue(':y1', $_POST['y1'], PDO::PARAM_STR);
        $insertLineData -> bindValue(':x2', $_POST['x2'], PDO::PARAM_STR);
        $insertLineData -> bindValue(':y2', $_POST['y2'], PDO::PARAM_STR);
        $insertLineData -> bindValue(':class', $_POST['class'], PDO::PARAM_STR);
        $insertLineData -> bindValue(':map_sn', $_POST['map_SN'], PDO::PARAM_INT);
        $insertLineData -> bindValue(':nodes_connection', $_POST['nodes_connection'], PDO::PARAM_STR);
        $insertLineData -> bindValue(':arrow_creater', $_SESSION['user_id'], PDO::PARAM_STR);
        $insertLineData -> bindValue(':date', $date, PDO::PARAM_STR);
        $insertLineData -> execute();

        $stmt = $dbh->query("SELECT LAST_INSERT_ID()");
        $lastId = $stmt->fetch(PDO::FETCH_NUM);
        $lastId = $lastId[0];
        echo json_encode($lastId);
        
    }


    
 ?>
