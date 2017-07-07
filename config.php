<?php
require_once 'config_db.php';  //不可移除
//PDO 連接方式
$config['db']['dsn']="mysql:host=".$dbhost.";dbname=".$db_dbn.";charset=utf8";
$config['db']['user'] = $dbuser;
$config['db']['password'] = $dbpass;

//$dbconnect = "mysql:host=".$dbhost.";dbname=".$db_dbn;

$dbh = new PDO($config['db']['dsn'], 
				$config['db']['user'], 
				$config['db']['password'],
				array(
					PDO::ATTR_EMULATE_PREPARES => false,
					PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
				)
		);

if (!$dbh){
	die('config 無法連資料庫');
}

