<?php
$option=$_POST['option'];
if($option==1)
{
    $uuid=$_POST['uuid'];
    $mysql = new mysqli("localhost", "root", "", "cxsy");
    $sql = "UPDATE `orders` SET `finish`='1' WHERE `uuid`='". $uuid . "'";    
//echo $sql;
    $result = $mysql->query($sql);
}
else if ($option==2)
{
    $mysql = new mysqli("localhost", "root", "", "cxsy");
    $sql = "SELECT * FROM `orders` WHERE `got`='0'";    
    #echo $sql;
    $result=$mysql->query($sql);
    if($result->num_rows>0)
    {
        $result=$result->fetch_assoc();
        $content["uuid"]=$result["uuid"];
        $content["list"]=$result["list"];
        $sql = "UPDATE `orders` SET `got`='1' WHERE `uuid`='". $content['uuid'] . "'";
        $result=$mysql->query($sql);
        echo json_encode($content);
    }
    else 
    echo NULL;
}
