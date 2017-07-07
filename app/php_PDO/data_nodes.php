<?php
    session_start();
    header("Content-Type:text/html;charset=UTF-8");

    
require_once "../../config.php";
   
    //require_once "../../../../include/adp_API.php"; 

    if( $_SESSION[user_id]==='chinese' AND $_POST[map_SN]==null )
      $_POST[map_SN]=5;
    elseif( $_SESSION[user_id]==='science' AND $_POST[map_SN]==null )
      $_POST[map_SN]=4;


    if($_POST['map_SN'] == null ){
        $nodesData = $dbh->prepare("SELECT * FROM map_node;");
        // $arrowData = $dbh->prepare("SELECT * FROM map_arrows;");
        $nodesData->execute();
        // $arrowData->execute();
    }else{
        $nodesData = $dbh->prepare("SELECT * FROM map_node;");
        $nodesData->execute();
        // $arrowData = $dbh->prepare("SELECT * FROM map_arrows;");
        // $arrowData->execute();
    }
        


        $data = array();
        $row = $nodesData -> fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($row);
 ?>
