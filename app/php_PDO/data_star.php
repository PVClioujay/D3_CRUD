<?php
    header("Content-Type:text/html;charset=UTF-8");
    session_start();
require_once "../../config.php";
   
    //require_once "../../../../include/adp_API.php"; 

 foreach ($_SESSION as $key => $value) {
  if($key == '_authsession'){
    // echo "_auth:<br>";print_r($value);
    // echo "<br>".$value['username'];
    $userId = $value['username'];
  }
  
}

    $indicate_id = '%'.$_POST['indicate_id'].'%';
    // $indicate_id = '%4-n-02-S03%';
    
        $starData = $dbh->prepare("select A1.indicator, B1.user_id, Max(B1.finish_rate) finish_rate from video_concept_item A1, video_review_record B1, map_node C1 where A1.video_item_sn = B1.video_item_sn and A1.indicator  = C1.indicate_id and B1.user_id = :userId and A1.indicator like :indicate_id Group by B1.user_id, A1.indicator");
        $starData->bindValue(':userId',$userId, PDO::PARAM_STR);
        $starData->bindValue(':indicate_id', '%'.$_POST['indicate_id'].'%', PDO::PARAM_STR);
        $starData->execute();  

        $data =array();

        $row = $starData -> fetch();
        $data = $row[finish_rate];
        echo json_encode($row[finish_rate]);
        
        
 ?>
