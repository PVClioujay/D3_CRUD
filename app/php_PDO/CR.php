<?php
    header("Content-Type:text/html;charset=UTF-8");

 require_once "../../config.php";
   
    //require_once "../../../../include/adp_API.php"; 



        $nodesData = $dbh->prepare("SELECT * FROM main_data where c_question_num = :indicate;");
        $nodesData->bindValue(':indicate', $_POST['indicate'], PDO::PARAM_STR);
        $nodesData->execute();
        
        //echo $_POST['indicate'];

        $data = array();
        $row = $nodesData -> fetchAll();
        
        echo json_encode($row);
 ?>
