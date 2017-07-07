<?php

require_once "../../config.php";
   
    //require_once "../../../../include/adp_API.php"; 


    $nodesData = $dbh->prepare("UPDATE map_node SET indicate_id = :indicate_id, indicate_name = :indicate_name WHERE node_sn = :nodeId;");
    $nodesData->bindValue(':nodeId', $_POST['nodeId'], PDO::PARAM_INT);
    $nodesData->bindValue(':indicate_id', $_POST['indicate_id'], PDO::PARAM_STR);
    $nodesData->bindValue(':indicate_name', $_POST['indicate_name'], PDO::PARAM_STR);
    $nodesData->execute();


    //     echo $nodesData->rowCount() . " records UPDATED successfully";
    
    // print_r(array_keys($row[0]));


?>
