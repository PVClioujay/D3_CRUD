<?php

$servername = "localhost";
$username = "bnatadmin";
$password = "kbcsqlcat3636";

try {
    $conn = new PDO("mysql:host=$servername;dbname=kbnat", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    }
catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }

    // 刪除點關連線
    
    //篩選點
    $selectNode = $conn -> prepare("SELECT indicator FROM `concept_item` WHERE  indicator like '%[%';");
    $selectNode -> execute();
    $row = $selectNode -> fetchAll(PDO::FETCH_ASSOC);
    // print_r($row);

    foreach ($row as $key => $val){
        foreach ($val as $key => $value) {
            // echo $key.",".$value."<BR>";
            
            $newStr = split('[[]', $value);
            // echo $value.":".$newStr[0].'<br>';
            $fixText = $conn -> prepare("update concept_item set indicator = :fixtext where indicator = :fuckText");
            $fixText -> bindValue(':fixtext', $newStr, PDO::PARAM_STR);
            $fixText -> bindValue(':fuckText', $value, PDO::PARAM_STR);
            $fixText -> execute();
        }
    }
	



?>
