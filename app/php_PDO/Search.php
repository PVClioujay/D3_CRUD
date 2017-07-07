<?php
  session_start();

    header("Content-Type:text/html;charset=UTF-8");
require_once "../../config.php";
   
    //require_once "../../../../include/adp_API.php"; 

    // echo "key".$keyword."<br>";

// echo "term".$_REQUEST["term"]."map".$_REQUEST["map"];

// echo $_SESSION['mapsn'];
// echo $_SESSION['mapsn'];
// 

// echo "<pre>";print_r($_SESSION);
//echo('<script> alert("test"); </script>');
foreach ($_SESSION as $key => $value) {
  if($key == '_authsession'){
    // echo "_auth:<br>";print_r($value);
    // echo "<br>".$value['username'];
    $userId = $value['username'];
  }
}
// echo $userId;
$user_data = new UserData($userId);

    if(empty($user_data->Open_Map)){
      $openMap = $user_data->grade;
    }else{
      $openMap = $user_data->Open_Map;
    }

    if(empty($_GET['map_sn'])){
      $_GET['map_sn'] = 1;
    }



$array = array();
    if(is_numeric($_REQUEST['term'])){
        $sql = "select DISTINCT A1.indicate_id, A1.indicate_name, A1.map_sn from map_node A1, user_info B1 where ((SUBSTR(A1.indicate_id, 1,1) between 1 and :openMap) and A1.map_sn = :map) and indicate_id like :key"
        $insertdata = $dbh -> prepare($sql);
        $insertdata->bindValue(':key','%'.$_REQUEST['term'].'%', PDO::PARAM_STR);
        $insertdata->bindValue(':openMap', $_GET['map_sn'], PDO::PARAM_INT);
        $insertdata->bindValue(':map', intval($_REQUEST['map']), PDO::PARAM_INT);
        $insertdata->execute();
      echo( $sql ); 
      while ($row = $insertdata->fetch(PDO::FETCH_ASSOC)) {
        echo ("<li>".$row['indicate_id'].$row['indicate_name']."</li>" );
        }
    }else{

        //檢查輸入是否為能力指標
        if (preg_match('/(?P<name>\d+)-(?P<digit>\w+)-(?P<digit2>\d+)-(?P<digit3>\w+)/', $_REQUEST['term'], $matches)) {
          $insertdata = $dbh -> prepare("select DISTINCT A1.indicate_id, A1.indicate_name, A1.map_sn from map_node A1, user_info B1 where ((SUBSTR(A1.indicate_id, 1,1) between 1 and :openMap) and A1.map_sn = :map) and indicate_id like :key ");
        }elseif (preg_match('/(?P<name>\d+)-(?P<digit>\w+)-(?P<digit2>\d+)/', $_REQUEST['term'], $matches)) {
          $insertdata = $dbh -> prepare("select DISTINCT A1.indicate_id, A1.indicate_name, A1.map_sn from map_node A1, user_info B1 where ((SUBSTR(A1.indicate_id, 1,1) between 1 and :openMap) and A1.map_sn = :map) and indicate_id like :key ");
        }else{
          $insertdata = $dbh -> prepare("select DISTINCT A1.indicate_id, A1.indicate_name, A1.map_sn from map_node A1, user_info B1 where ((SUBSTR(A1.indicate_id, 1,1) between 1 and :openMap) and A1.map_sn = :map) and indicate_name like :key ");
        }
        $insertdata->bindValue(':key','%'.$_REQUEST['term'].'%', PDO::PARAM_STR);
        $insertdata->bindValue(':openMap', $_GET['map_sn'], PDO::PARAM_INT);
        $insertdata->bindValue(':map', intval($_REQUEST['map']), PDO::PARAM_INT);
        $insertdata->execute();
         while ($row = $insertdata->fetch(PDO::FETCH_ASSOC)) {
          echo ("<li>".$row['indicate_id'].$row['indicate_name']."</li>" );
        }
    }
?>