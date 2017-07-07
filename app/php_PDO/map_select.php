<?php 
	
	switch ($_POST[mapSN]) {
		// case 1:
		// 	$fp = fopen("svg.svg", "r");
        //     echo  fread($fp , filesize("svg.svg"));
        //     fclose($fp);
		// 	break;
		// case 2:
		// 	$fp = fopen("svg2.svg", "r");
        //     echo fread($fp , filesize("svg2.svg"));
        //     fclose($fp);
		// 	break;
		// case 3:
		// 	$fp = fopen("svg3.svg", "r");
        //     echo fread($fp , filesize("svg3.svg"));
        //     fclose($fp);
		// 	break;
		// case 4:
		// 	$fp = fopen("svg4.svg", "r");
        //     echo fread($fp , filesize("svg4.svg"));
        //     fclose($fp);
		// 	break;
		// case 5:
		// 	$fp = fopen("svg5.svg", "r");
        //     echo fread($fp , filesize("svg5.svg"));
        //     fclose($fp);
		// 	break;
		// case 6:
		// 	$fp = fopen("svg6.svg", "r");
        //     echo fread($fp , filesize("svg6.svg"));
        //     fclose($fp);
		// 	break;
		// case 7:
		// 	$fp = fopen("svg7.svg", "r");
        //     echo fread($fp , filesize("svg7.svg"));
        //     fclose($fp);
		// 	break;
		// case 8:
		// 	$fp = fopen("svg8.svg", "r");
        //     echo fread($fp , filesize("svg8.svg"));
        //     fclose($fp);
		// 	break;
		default:
			$fp = fopen("svg2.svg", "r");
            echo fread($fp , filesize("svg2.svg"));
            fclose($fp);
			break;
	
	}

 ?>
