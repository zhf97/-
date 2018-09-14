<?php
$no=$_GET['no'];
$result=$_GET['result'];
$mysql = new mysqli("localhost", "root", "", "cxsy");
$sql="INSERT INTO `log`(`no`, `result`) VALUES ('". $no . "','" . $result . "')";
$result=$mysql->query($sql);
#echo $a;
?>