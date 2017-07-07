
<?php
header("Content-Type:text/html;charset=UTF-8");
require_once "../../../../include/config.php";
require_once "../../../../include/adp_API.php";
session_start();
     // echo $_SESSION['user_data'];
if(empty($_POST['map_SN'])){
  $_POST['map_SN'] = 1;
}



     //
     //
//      echo "<pre>";
      // print_r($_SESSION);

// echo "asd:";

foreach ($_SESSION as $key => $value) {
  if($key == '_authsession'){
    // echo "_auth:<br>";print_r($value);
    // echo "<br>".$value['username'];
    $userId = $value['username'];
  }

}


$skillData = $dbh->prepare("SELECT * from map_node_student_status where user_id = :user and map_sn = :map_sn");
$skillData->bindValue(':user', $userId, PDO::PARAM_STR);
$skillData->bindValue(':map_sn', $_POST['map_SN'], PDO::PARAM_INT);
$skillData->execute();
$row = $skillData->fetch();
$unseria_data = unserialize($row["sNodes_Status_FR"]);



seria_Data($unseria_data);

//echo '<script> '.$unseria_data.' </script>';

function seria_Data($data){
  //echo $data;
  if(!empty($data)){
    foreach ($data as $key => $val) {
      $arr = array($key,$val);
      foreach ($val as $key => $value) {
        $arr2 = array($key, $value);
        $test = $arr[0].",".$arr2[1].";";
        echo $test;
      }
    };
  }
  return;
};
// var_dump($skillData);





      // print_r(unserialize($row["bNodes_Status"]));
//
//
        //echo $row["sNodes_Status_FR"];

//

     // echo unserialize($row["sNodes_Status_FR"]);


 ?>
