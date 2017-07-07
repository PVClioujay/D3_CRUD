<?php
  session_start();
  header("Content-Type:text/html;charset=UTF-8");
  require_once "../../../../include/config.php";
  require_once "../../../../include/adp_API.php";

  $user_data = new UserData( $_SESSION[user_id] );
  //echo( json_encode($user_data) );die();
  $map_sn = $_POST[map_sn];
  //$searchNodesAry = explode( '[', $_POST[searchNodes]);
  //$searchNodes = $searchNodesAry[0];
  $searchNodes=$_POST[searchNodes];
  $nodesSplit = explode('-',$searchNodes);
  //$bigNodes = substr( $searchNodes, 0, -4 );
  if( $map_sn==2 ) $map_sn=3;
  if( $map_sn==1 OR $map_sn==3 ) {$subject=2;$bigNodes=$nodesSplit[0].'-'.$nodesSplit[1].'-'.$nodesSplit[2];}
  elseif( $map_sn==4 ) {$subject=3;$bigNodes=$nodesSplit[0].'-'.$nodesSplit[1];}
  elseif( $map_sn==10 ) {$subject=1;$bigNodes=$nodesSplit[0].'-'.$nodesSplit[1].'-'.$nodesSplit[2];}

  //echo($searchNodes);die();
  /*$sql='
    SELECT a.CR, a.DA, a.video, a.prac, a.teach, b.mapping_sn
    FROM map_node a, publisher_mapping b
    WHERE a.map_sn = :map_sn
    AND a.indicate_id LIKE :idicate_id
    AND b.indicator = :bigNodes
    AND b.sems = :sems
    AND b.publisher_id = :publisher_id
    AND b.subject_id = :subject_id
  ';
  $insertdata = $dbh -> prepare($sql);
  $insertdata->bindValue(':map_sn', $map_sn, PDO::PARAM_INT);
  $insertdata->bindValue(':idicate_id', '%'.$searchNodes.'%', PDO::PARAM_INT);
  $insertdata->bindValue(':bigNodes', $bigNodes, PDO::PARAM_INT);
  $insertdata->bindValue(':sems', $_SESSION[user_data]->semeYear, PDO::PARAM_INT);
  $insertdata->bindValue(':publisher_id', $_SESSION[user_data]->publisher_id[$subject], PDO::PARAM_INT);
  $insertdata->bindValue(':subject_id', $subject, PDO::PARAM_INT);
  $insertdata->execute();
  AND b.publisher_id = "'.$user_data->publisher_id[$subject].'"*/
  $sql='
    SELECT a.CR, a.DA, a.video, a.prac, a.teach, b.mapping_sn
    FROM map_node a, publisher_mapping b
    WHERE a.map_sn = "'.$map_sn.'"
    AND a.indicate_id LIKE "%'.$searchNodes.'%"
    AND b.indicator = "'.$bigNodes.'"

    AND b.subject_id = "'.$subject.'"
  ';
  //debugBAI( __LINE__,__FILE__,$sql );
  //echo json_encode($sql);die();
	$result = $dbh->query($sql);
  while ($row = $result->fetch()) {
    $nodesInfo=array(
      'CR'=>$row[CR],
      'DA'=>$row[DA],
      'media_edu'=>$row[video],
      'practice'=>$row[prac],
      'commponent'=>$row[teach],
      'mapping_sn'=>$row[mapping_sn],
    );
  }
  echo json_encode($nodesInfo, JSON_UNESCAPED_UNICODE);
?>
