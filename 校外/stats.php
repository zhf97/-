<?php
error_reporting(0);
$type=$_GET["datatype"];
$mysql = new mysqli("localhost", "root", "", "cxsy");
mysqli_set_charset($mysql,"utf8");
function count_day($mysql)
{
    $sql="SELECT * FROM ask";
    foreach($mysql->query($sql) as $result)
    {
        $newdate=date_create_from_format("Y-m-d H#i#s",$result["time"]);
        $content[$result["part"]]["day"][date_format($newdate,'Y-m-d')]++;
        $content[$result["part"]]["month"][date_format($newdate,'Y-m')]++;
        $content[$result["part"]]["year"][date_format($newdate,'Y')]++;
    }
    $json_file=fopen("stats.json","w+");
    fwrite($json_file,json_encode($content));
}
count_day($mysql);
?>