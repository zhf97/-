<?php
header("Content-Type:text/html;charset=UTF-8");
function get()
{
    $mysql = new mysqli("localhost", "root", "", "cxsy");
    mysqli_set_charset($mysql,"utf8");
    $sql = "SELECT * FROM `exp`";    
    //echo $sql;
    $i=0;
    foreach($mysql->query($sql) as $result)
    {
        $content[$i]["no"]=$result["no"];
        $content[$i]["name"]=$result["name"];
        $content[$i]["con"]=$result["con"];
        $content[$i]["cname"]=$result["cname"];
        $i++;
    }
    return array("count"=>$i,"content"=>$content);
}
function send_json($success,$count=NULL,$content=NULL)
{
    if($success)
    {
        $send["code"]=0;
        $send["msg"]='success';
        $send["count"]=$count;
        $send["content"]=$content;
    }
    else
    {
        $send["code"]=-1;
        $send["msg"]='invalid code';
        $send["count"]=0;
        $send["content"]=$content;
    }
    $json_to_send=json_encode($send);
    echo $json_to_send;
}
$result=get();
send_json(true,$result["count"],$result["content"]);
?>