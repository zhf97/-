<?php
header("Content-Type:text/html;charset=UTF-8");
//error_reporting(0);
$type=$_GET["datatype"];
$mysql = new mysqli("localhost", "root", "", "cxsy");
mysqli_set_charset($mysql,"utf8");
$date=date_create();
$json_file=fopen("stats.json","r");
$json=fread($json_file,filesize("stats.json"));
$stat=json_decode($json,true);
switch($type)
{
    case 0:
    count_part($mysql);
    break;
    case 1:
    count_day($mysql,$date,$stat);
    break;
    case 2:
    count_month($mysql,$date,$stat);
    break;
    case 3:
    count_year($mysql,$date,$stat);
}
function count_part($mysql,$date)
{
    $sql="SELECT part,COUNT(*) AS total FROM ask GROUP BY part";
    $i=0;
    foreach($mysql->query($sql) as $result) 
    {
        $i++;
        $content[$i]["part"]=$result["part"];
        $content[$i]["total"]=$result["total"];
    }
    $send["code"]=0;
    $send["msg"]='success';
    $send["count"]=$i;
    $send["content"]=$content;
    echo json_encode($send);   
}
function count_day($mysql,$date,$stat)
{
    foreach($stat as $part=>$st)
    {
        foreach($st["day"] as $day=>$num )
        {
            $newdate=date_create_from_format("Y-m-d",$day);
            if(date_diff($date,$newdate)->format("%a")<=31)
            {
                $content[$day][$part]=$num;
            }
        }
    }
    echo(json_encode($content));
}
function count_month($mysql,$date,$stat)
{
    foreach($stat as $part=>$st)
    {
        foreach($st["month"] as $day=>$num )
        {
            $newdate=date_create_from_format("Y-m",$day);
            if(date_diff($date,$newdate)->format("%m")<=1)
            {
                $content[$day][$part]=$num;
            }
        }
    }
    echo(json_encode($content));
}
function count_year($mysql,$date,$stat)
{
    foreach($stat as $part=>$st)
    {
        foreach($st["year"] as $day=>$num )
        {
            $newdate=date_create_from_format("Y",$day);
            if(date_diff($date,$newdate)->format("%y")<=1)
            {
                $content[$day][$part]=$num;
            }
        }
    }
    echo(json_encode($content));
}
?>