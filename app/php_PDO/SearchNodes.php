<?php
  session_start();
  header("Content-Type:text/html;charset=UTF-8");
  require_once "../../../../include/config.php";  
  require_once "../../../../include/adp_API.php";
  
  $map_sn = $_POST[map_sn];
  $searchNodes = $_POST[searchNodes];
  if( $map_sn==2 ) $map_sn=3;
  echo($searchNodes);die();
  $sql='
    SELECT indicate_id, indicate_name, transform
    FROM map_node
    WHERE map_sn = :map_sn
    AND indicate_id LIKE :idicate_id
  ';
  $insertdata = $dbh -> prepare($sql);
  $insertdata->bindValue(':map_sn', $map_sn, PDO::PARAM_INT);
  $insertdata->bindValue(':idicate_id', '%'.$searchNodes.'%', PDO::PARAM_INT);
  $insertdata->execute();
  while ($row = $insertdata->fetch(PDO::FETCH_ASSOC)) {
    //echo ("<li>".$row['indicate_id'].$row['indicate_name']."</li>" );
    $nodesAry[]= '('.$row['indicate_id'].')'.$row['indicate_name'];
  }
  echo json_encode($nodesAry, JSON_UNESCAPED_UNICODE);
?>