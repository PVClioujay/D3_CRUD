<?php
	
	//
	//使用元資料庫學生子傑點資訊
	//
	require_once "../../config.php";
   
    //require_once "../../../../include/adp_API.php"; 
    header("Content-Type:text/html;charset=UTF-8");
    session_start();


// echo $user_id;

	// 
	//notice:
	//this file is different with other php file
	//this file only connect with ntcu-nbnat database
	//
	
	$servername = "localhost";
	$username = "root";
	$password = "sqlcat3636";
	
	error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('display_startup_errors', true);
ini_set('xmlrpc_errors', true);

    	$conn = new PDO("mysql:host=$servername;dbname=nbnat", $username, $password);
    // set the PDO error mode to exception
    	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	echo "Connected successfully"; 
		$node_uuid = $_GET['id'];



		//取得該節點題目類型總數

			$query = $conn->prepare("SELECT id,count(*) FROM `questions` where type='choose' and nodes_uuid = :nodeuuid");
		$query->bindValue(':nodeuuid', $_GET['id'], PDO::PARAM_STR);
        $query->execute();

        $totalQuestionType=$query->fetch();

        // echo $totalQuestionType['count(*)']."<br>";
        $questionCount = $totalQuestionType['count(*)'];	

		


        //取的該解點題目正解
        $query2 = $conn->prepare("select A1.id, B1.nodes_uuid, A1.questions_id, B1.topic, A1.correct from options A1, questions B1 where ((B1.id = A1.questions_id) and A1.correct = true) and B1.nodes_uuid = :uuid");
        $query2 ->bindValue(':uuid',$_GET['id'], PDO::PARAM_STR);
        $query2->execute();

        $questionCorrect = $query2 -> fetchAll(PDO::FETCH_ASSOC);
	
        //
        //$quesionCorrect['id']為該節點正解id值
        //將該節點正解值與學生作答做對比
        //並取得學生最新作答資訊
        //

        $query3 = $conn->prepare("SELECT * FROM (SELECT * FROM answer where nodes_uuid = :nodeuuid ORDER BY time DESC) BIAOMING GROUP BY id ORDER BY time DESC LIMIT 1");
        $query3->bindValue(':nodeuuid', $_GET['id'], PDO::PARAM_STR);
        $query3->execute();

        $questionCorrectAnswer = $query3->fetch(PDO::FETCH_ASSOC);

        $correctAnswer = json_decode($questionCorrectAnswer['answer'], true);
		// echo "<br>";print_r($correctAnswer);
        $rightValue = 0;

function CorrectAnswer($q_id){
			global $correctAnswer;
			global $rightValue;

			foreach ($correctAnswer as $key => $value) {
					foreach ($value as $key2=>$value2) {
						if ($key2 == "ans"){
							foreach($value2 as $val){
					//			echo "correctAnswer:<br>stuans:".$value2."ans:".$val."<br>";
								if ($val == $q_id){
									$rightValue += 1;
								}
							}
						}
					}
			}
		}

        foreach($questionCorrect as $key => $value){
        	foreach($value as $key2 => $value2){
        		if($key2 == "id"){
				//	echo "<br>123".$value2;
        			CorrectAnswer($value2);
        		}
        	}
        }

 
		

		
       //計算練習題分數
       $practiceScore = round(intval($rightValue) / ($questionCount), 2) * 100;
    
		
       //
		//使用uuid取得節點編號
		//
		$quer4 = $conn->prepare("select * from nodes where uuid = :uuid");
		$quer4 -> bindValue(':uuid', $_GET['id'], PDO::PARAM_STR);
		$quer4 -> execute();

		$nodeIindicate = $quer4 -> fetch();
		// echo $nodeIindicate["c_question_num"]."<br>";



     
		if(empty($_POST['map_SN'])){
			$_POST['map_SN'] = 1;
		}

		foreach ($_SESSION as $key => $value) {
			if($key == '_authsession'){
				// echo "_auth:<br>";print_r($value);
				// echo "<br>".$value['username'];
				$userId = $value['username'];
			}
			
		}


		$skillData = $dbh->prepare("SELECT * from map_node_student_status where user_id = :user and map_sn = :map_sn");
			// $user_id = $v;
			$skillData->bindValue(':user', $userId, PDO::PARAM_STR);
			$skillData->bindValue(':map_sn', $_POST['map_SN'], PDO::PARAM_INT);

			$skillData->execute();
			$row = $skillData->fetch();
			// var_dump( $row["sNodes_Status_FR"]);echo"<br>";
			$unseria_data = unserialize($row["sNodes_Status_FR"]);
           // print_r($unseria_data);
         
         // $unseria_data["5-n-05-s05"] =      


		//
		//使原資料庫，中map_node_student_status裡學生的節點資訊
		//並序列化資料
		//        

        	// global $nodeIindicate;
        	// global $unseria_data;
        	// global $practiceScore;
        	// global $dbh;
        	// global $user_id;
echo $userId;
            if(empty($unseria_data) || is_null($unseria_data)){
            	echo "N";
	               // print_r($arr);
	              	//echo $key;
	              		if(!empty($practiceScore)){
	              			$unseria_data[$nodeIindicate["c_question_num"]] = array('status:' => '0', 'practice:' => ''.$practiceScore.'', 'RC:' => '0', 'DA:' => '0'); 
	              			 echo "23".serialize($unseria_data)."<br>";
	              			$userAnserData = $dbh->prepare("INSERT INTO map_node_student_status(sNodes_Status_FR, user_id, map_sn) VALUES (:sNodes_Status_FR,:user_id,:map_sn)");
         					$userAnserData -> bindValue(":sNodes_Status_FR", serialize($unseria_data),PDO::PARAM_STR);
         					$userAnserData -> bindValue(":user_id", $userId,PDO::PARAM_STR);
         					$userAnserData -> bindValue(":map_sn", $_POST['map_SN'],PDO::PARAM_INT);
         					$userAnserData -> execute();
	              		}
            }else{
          echo "y1";  	
	            foreach ($unseria_data as $key => $val) {
	              $arr = array($key,$val);
	              // print_r($arr);
	              	if($key == $nodeIindicate["c_question_num"]){
	              		// echo "y";
	              		if(!empty($practiceScore)){
	              			// echo "y".$key." ".$_POST['map_SN']." ".$user_id."<br>";
	              		//	$unseria_data[$nodeIindicate["c_question_num"]] = array('status:' => '100', 'practice:' => ''.$practiceScore.'', 'RC:' => '60', 'DA:' => '60'); 
	              	echo "status".$unseria_data[$nodeIindicate["c_question_num"]]["status:"];
	
	$unseria_data[$nodeIindicate["c_question_num"]]["practice:"] = strval($practiceScore);
//	 print_r($unseria_data);
	              			$userAnserData = $dbh->prepare("UPDATE map_node_student_status SET sNodes_Status_FR = :sNodes_Status_FR WHERE user_id= :user_id and map_SN = :map_sn");
	              			
					        $userAnserData -> bindValue(":sNodes_Status_FR", serialize($unseria_data),PDO::PARAM_STR);
					        $userAnserData -> bindValue(":user_id",  $userId,PDO::PARAM_STR);
					        $userAnserData -> bindValue(":map_sn", $_POST['map_SN'],PDO::PARAM_INT);
					        $userAnserData -> execute();
	              		}
	              	}else{
echo "y2";
	              		//echo $userId."<br>";
	              			// echo "y".$key." ".$_POST['map_SN']." ".$user_id."<br>";
echo "status".$unseria_data[$nodeIindicate["c_question_num"]]["status:"];
$unseria_data[$nodeIindicate["c_question_num"]]["practice:"] = strval($practiceScore);

              		$unseria_data[$nodeIindicate["c_question_num"]] = array('status:' => ''.strval($unseria_data[$nodeIindicate["c_question_num"]]["status:"]).'' , 'practice:' => ''.strval($practiceScore).'', 'RC:' => '0', 'DA:' => '0'); 
	              			 //echo "223".serialize($unseria_data)."<br>";
	              			$userAnserData = $dbh->prepare("UPDATE map_node_student_status SET sNodes_Status_FR = :sNodes_Status_FR WHERE user_id= :user_id and map_SN = :map_sn");
	              			
					        $userAnserData -> bindValue(":sNodes_Status_FR", serialize($unseria_data),PDO::PARAM_STR);
					        $userAnserData -> bindValue(":user_id", $userId,PDO::PARAM_STR);
					        $userAnserData -> bindValue(":map_sn", $_POST['map_SN'],PDO::PARAM_INT);
					       $userAnserData -> execute();

	              	}
	              }
            }
    

	    // $conn = new PDO("mysql:host=$servername;dbname=nbnat", $username, $password);
	    // set the PDO error mode to exception
	    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	   // echo "Connected successfully"; 
		
		//84e988c3798930a6d67c90d155cb26e6 5-n-05-S06
		//
		


       	 // seria_Data($unseria_data); 
       	  // print_r($unseria_data);
       	  // echo (serialize($unseria_data));
         
         // //寫入資料庫
         // $userAnserData = $dbh->prepare("INSERT INTO map_node_student_status(sNodes_Status_FR, user_id, map_sn) VALUES (:sNodes_Status_FR,:user_id,:map_SN)");
         // $userAnserData -> bindValue(":sNodes_Status_FR", serialize($unseria_data),PDO::PARAM_STR);
         // $userAnserData -> bindValue(":user_id", $user_id,PDO::PARAM_STR);
         // $userAnserData -> bindValue(":map_sn", $_POST['map_SN'],PDO::PARAM_INT);

 ?>
