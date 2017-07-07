<?php
    header("Content-Type:text/html;charset=UTF-8");

    session_start();
    $username = "root";
      $password = "su3cl3";
      $host = "localhost";
      $database="adpbn2007";
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }else{
    $username = "root";
      $password = "su3cl3";
      $host = "localhost";
      $database="adpbn2007";
    }
    $server = mysqli_connect($host, $username, $password);
    mysqli_set_charset($server,'utf8');
    $connection = mysqli_select_db( $server,$database);
    echo $_POST['map_sn'];
        $myquery = "SELECT * from map_node_student_status where map_sn =".$_POST['map_sn'].";";
        //$myquery = "SELECT learning_lv, skilled_lv,node_sn from map_node_student_status where status_sn = 19;";
        $query = mysqli_query($server, $myquery);
        
        if ( ! $query ) {
            echo mysqli_error();
            die;
        }

       while($row = mysqli_fetch_assoc($query)){
       	// echo $row["skilled_lv"];
       	// $x = $row["skilled_lv"];
       	//var_dump (unserialize($row["skilled_lv"]));
       	//$_session['seria'] = $_row['skill']
       	$contractors = unserialize($row['skilled_lv']);
		$unseria_data = unserialize($row["skilled_lv"]);
       		function seria_Data($data){
       			foreach ($data as $key => $val) {
       				$arr = array($key,$val);
       				//$arr = $val;
       				print_r($arr[0].",");
       				print_r($arr[1].";");
       			};
       		};
       		seria_Data($unseria_data);
       }


         //echo json_encode ( $data );
        //echo json_encode($data, JSON_UNESCAPED_UNICODE);

        mysqli_close($server);
        

 ?>
