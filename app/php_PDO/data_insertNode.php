<?php
    header("Content-Type:text/html;charset=UTF-8");
    
require_once "../../config.php";
   
    //require_once "../../../../include/adp_API.php"; 


    if($_POST['node_sn'] == null ){
        $nodesData = $dbh->prepare("SELECT * FROM map_node where map_sn = 1;");
        $nodesData->execute();
    }else{
        $nodesData = $dbh->prepare("SELECT * FROM map_node where node_sn = :node_sn;");
        $nodesData->bindValue(':node_sn', $_POST['node_sn'], PDO::PARAM_INT);
        $nodesData->execute();
    }
        

        $data = array();
        $row = $nodesData -> fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($row);
 ?>
