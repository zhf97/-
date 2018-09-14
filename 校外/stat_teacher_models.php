<?php
header("Content-Type:text/html;charset=UTF-8");
error_reporting(0);
$mysql = new mysqli("localhost", "root", "", "cxsy");
mysqli_set_charset($mysql,"utf8");
if(isset($_GET["no"]))
{
    $no=$_GET["no"];
    get_by_no($mysql,$no);
}
if(isset($_GET["name"]))
{
    $name=$_GET["name"];
    get_by_name($mysql,$name);
}
function get_by_no($mysql,$no)
{
    $sql="select * from ask where `no`='" . $no . "'";
    $i=0;
    foreach($mysql->query($sql) as $row)
    {
        $result[$row["part"]]++;
        $i++;
    }
    $sql="select name from user where `no`='" . $no . "'";
    //print $sql;
    $result_sql=$mysql->query($sql);
    $row=$result_sql->fetch_assoc();
    //var_dump($row);
    $result["name"]=$row["name"];
    //$result["count"]=$i;
    $result["no"]=$no;
    $send["code"]=0;
    $send["msg"]='success';
    $content["1"]=$result;
    $send["content"]=$content;
    echo json_encode($send);
}
function get_by_name($mysql,$name)
{
    $sql="select no from user where `name`='" . $name . "'";
    $i=0;
    foreach($mysql->query($sql) as $row)
    {
        $i++;
        $sql="select * from ask where `no`='" . $row["no"] . "'";
        $j=0;
        foreach($mysql->query($sql) as $row_p)
        {
            $j++;
            $result["content"][$row_p["part"]]++;
        }
        $result["name"]=$name;
        $result["no"]=$row["no"];
        //$result["count"]=$j;
        $content[$i]=$result;
    }
    $send["code"]=0;
    $send["msg"]='success';
    $send["content"]=$content;
    $send["count"]=$i;
    echo json_encode($send);
}