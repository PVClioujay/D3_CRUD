<?php
  session_start();
  $_SESSION[bodyHtml]=$_POST[svgHtml];
  echo($_SESSION[bodyHtml]);
?>