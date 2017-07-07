<?php
    session_start();
    
require_once "../../config.php";
   
    //require_once "../../../../include/adp_API.php"; 

    // if( $_SESSION[user_id]==='chinese' AND $_POST[map_SN]==null )
    //   $_POST[map_SN]=5;
    // elseif( $_SESSION[user_id]==='science' AND $_POST[map_SN]==null )
    //   $_POST[map_SN]=4;
      
      
    if($_POST['map_SN'] == null){
        $linesData = $dbh->prepare("SELECT * FROM map_arrows;");
        $linesData -> execute();
    }else{
        $linesData = $dbh->prepare("SELECT * FROM map_arrows;");

        // $linesData->bindValue(':map_sn', $_POST['map_SN'], PDO::PARAM_INT);
        $linesData->execute();
    }
                   //$data = array();
        $row = $linesData -> fetchAll(PDO::FETCH_ASSOC);
        //row['node_relation'] = unserialize($row['node_relation']);
        //$data[] = $row;
        echo json_encode($row);
 ?>
