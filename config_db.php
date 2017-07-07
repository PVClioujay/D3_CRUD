<?php
session_start();
$_SESSION['user_id'] = "test";
//資料庫設定
$dbtype='mysql';
$hostspec='localhost';
$dbuser=$db_user='root';
$dbpass=$db_user_passwd='su3cl3';
$database=$db_dbn='kbnat';  //資料庫名稱
//grant all privileges on kbnat.* to bnatadmin@localhost identified by 'kbcsqlcat3636';

