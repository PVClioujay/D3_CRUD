<?php

    require_once "../../config.php";
   
    //require_once "../../../../include/adp_API.php"; 

    // 刪除點關連線
    
    //篩選點
    $selectNode = $dbh -> prepare("select indicate_id from map_node where node_sn = :id");
    $selectNode -> bindValue(':id', $_POST['id'], PDO::PARAM_INT);
    $selectNode -> execute();
    
    // print_r($selectNode -> fetchAll(PDO::FETCH_ASSOC));

    $result = $selectNode -> fetchAll(PDO::FETCH_ASSOC);
    
    //刪線
    $deleteData = $dbh->prepare("DELETE FROM map_arrows where nodes_connection like :selectNode");
    $deleteData -> bindValue(':selectNode', "%,".$result[0][indicate_id], PDO::PARAM_STR);
    $deleteData -> execute();

    $deleteData = $dbh->prepare("DELETE FROM map_arrows where nodes_connection like :selectNode");
    $deleteData -> bindValue(':selectNode', $result[0][indicate_id].",%", PDO::PARAM_STR);
    $deleteData -> execute();

    //刪點
	$deleteNodeData = $dbh->prepare("DELETE FROM map_node where node_sn = :arrow_sn");
	$deleteNodeData->bindValue(':arrow_sn', $_POST['id'], PDO::PARAM_INT);
	$deleteNodeData->execute();

	



?>
