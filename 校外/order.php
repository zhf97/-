<?php
$order=$_POST['barrel'];
$uuid=create_uuid();
$mysql = new mysqli("localhost", "root", "", "cxsy");
$sql = "INSERT INTO `orders`(`list`, `got`, `finish`, `uuid`) VALUES ('".$order . "','". '0'. "','" . '0'. "','".$uuid. "')";    
//echo $sql;
$result = $mysql->query($sql);
echo $uuid;
function create_uuid($prefix="")
{    
    $str = md5(uniqid(mt_rand(), true));   
    $uuid  = substr($str,0,8) . '-';   
    $uuid .= substr($str,8,4) . '-';   
    $uuid .= substr($str,12,4) . '-';   
    $uuid .= substr($str,16,4) . '-';   
    $uuid .= substr($str,20,12);   
    return $prefix . $uuid;
}
?>