<?php
require_once "../../config.php";
   
    //require_once "../../../../include/adp_API.php"; 
    // $server = mysql_connect($hostspec, $dbuser, $dbpass);
    // $connection = mysql_select_db($database, $server);
//$_POST['arrow_SN'] = 64;
        $linesData = $dbh->prepare("SELECT * FROM map_arrows where arrow_sn = :map_sn;");
        //$linesData->bindValue(':map_sn', $_POST['map_SN'], PDO::PARAM_STR);
        // $linesData->bindValue(':y1', $_POST['y1'], PDO::PARAM_INT);
        // $linesData->bindValue(':x2', $_POST['x2'], PDO::PARAM_STR);
        // $linesData->bindValue(':y2', $_POST['y2'], PDO::PARAM_STR);
        // $linesData->bindValue(':class', $_POST['class'], PDO::PARAM_STR);
        $linesData->bindValue(':map_sn', $_POST['arrow_SN'], PDO::PARAM_STR);
        $linesData->execute();
    
        //$data = array();
        $row = $linesData -> fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($row);
 ?>
