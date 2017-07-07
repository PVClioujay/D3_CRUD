<?php
    header("Content-Type:text/html;charset=UTF-8");


require_once "../../config.php";
   
    //require_once "../../../../include/adp_API.php"; 
    //$_POST['indicate_id'] = 2;

    $videoindicate = $dbh->prepare("select * from map_node where node_sn = :indicate");
    $videoindicate->bindValue(':indicate', $_POST['indicate_id'], PDO::PARAM_INT);
    $videoindicate->execute();
    
         $data = array();
        $row = $videoindicate -> fetchAll(PDO::FETCH_ASSOC);
        //$data[] = $row;
        foreach($row as $row){
            echo json_encode($row['indicate_id']);    
        }

        
 ?>
