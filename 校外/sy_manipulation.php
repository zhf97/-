<?php
$type=$_POST["type"];
switch($type){
    case 0:
        new_exp();
        break;
    case 1:
        modify();
        break;
    case 2:
        delete();
        break;
    default:
        die("invalid type");
}
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
function new_exp()
{
    $cname=$_POST["cname"];
    //echo $cname;
    $name=$_POST["name"];
    $content=$_POST["content"];
    $no=create_uuid();
    $mysql = new mysqli("localhost", "root", "", "cxsy");
    mysqli_set_charset($mysql,"utf8");
    $sql="INSERT INTO `exp`(`no`, `cname`, `name`, `con`) VALUES ('" . $no . "','" . $cname . "','" . $name . "','" . $content . "')";
    #echo $sql;
    $result = $mysql->query($sql);
    echo $no;
}
function modify()
{
    $no=$_POST["no"];
    $content=$_POST["content"];
    $mysql = new mysqli("localhost", "root", "", "cxsy");
    mysqli_set_charset($mysql,"utf8");
    $sql="UPDATE `exp` SET `con`='" . $content . "' WHERE `no`='" . $no . "'";
    //echo $sql;
    $result = $mysql->query($sql);
}
function delete()
{
    $no=$_POST["no"];
    $mysql = new mysqli("localhost", "root", "", "cxsy");
    $sql="DELETE FROM `exp` WHERE `no`='" . $no . "'";
    $result = $mysql->query($sql);
}