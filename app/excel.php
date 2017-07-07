<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
</head>
<body>

<?php 
	require_once '../../../classes/Excel/reader.php';

	$data = new Spreadsheet_Excel_Reader();  
	$data->setOutputEncoding('UTF-8'); 

	$data->read('Excel/2755456e2751f0d36a.xls');  
	error_reporting(E_ALL ^ E_NOTICE);  
	for ($i = 2; $i <= $data->sheets[0]['numRows']; $i++) {
            for ($j =3; $j <= $data->sheets[0]['numCols']; $j++) { 
                  $value[0] = $data->sheets[0]['cells'][$i][$j];
                   // echo "row:".$i."cell:".$j.":".$value[0]."<br>";    
                   if ($value[0] == 1){
                   		$row_indicate = $i;
                   		$cell_indicate = $j;
                   		 $cell_indicate = $data->sheets[0]['cells'][2][$j];
                   		 $row_indicate = $data->sheets[0]['cells'][$row_indicate][2]; 
                   		// echo "i get 1 in row:".$i.",".$j."(row:".$row_indicate."cell:".$cell_indicate .")<br>";
                   		// echo "row:".$i."cell:".$j.":".$row_indicate." are relation with"."$cell_indicate"."<br>";
                   		echo "
							<ul>".$row_indicate."
							 	<li>".$cell_indicate."</li>
							 </ul>
							 
							 <script>
							 	var x = $("."'#".$row_indicate."'".").text()
							 	console.log(x);
							 </script>                   		
							 ";
				}
          	}
     }

	// for ($i = 3; $i <= $data->sheets[0]['numRows']; $i++) {
 //            for ($j =3; $j <= $data->sheets[0]['numCols']; $j++) { 
 //                  $value[0] = $data->sheets[0]['cells'][$i][$j];
 //                   echo "row:".$i."cell:".$j.":".$value[0]."<br>";                
 //          	}
 //     }


 ?>	

 
</body>
</html>
