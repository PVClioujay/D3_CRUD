<?php
    header("Content-Type:text/html;charset=UTF-8");
require_once "../../config.php";
   
    //require_once "../../../../include/adp_API.php"; 
$indicate_id = $_POST['indicate_id'];
//$indicate_id = '(4-n-11)';
        $nodesData = $dbh->prepare("SELECT * FROM map_node where indicate_id = :indicate_id;");
        $nodesData->bindValue(':indicate_id', $indicate_id, PDO::PARAM_STR);
        $nodesData->execute();

        


        $data = array();
        $row = $nodesData -> fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($row);
 ?>
