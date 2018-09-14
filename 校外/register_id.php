<?php
header("Content-Type:text/html;charset=UTF-8");
if(!isset($_POST["openid"])&&!isset($_POST["name"])&&!isset($_POST["no"]))
die("no param");
$openid=$_POST["openid"];
$name=$_POST["name"];
$no=$_POST["no"];

function update_openid($name,$no,$openid)
{
    $mysql = new mysqli("localhost", "root", "", "cxsy");
    mysqli_set_charset($mysql,"utf8");
    $sql = "SELECT * FROM `user`" . " WHERE `no` ='" . $no . "' AND `name` ='" . $name . "'";    
    //echo $sql;
    
    $result = $mysql->query($sql);
    //var_dump($result);
    if($result->num_rows!=0)
    {
        $row = $result->fetch_assoc(); 
        //var_dump($row);
        $sql="UPDATE user SET `openid`='" . $openid . "' WHERE `no`='" . $no . "'";
        $result = $mysql->query($sql);
        return $row["role"];
    }
    else
        return -1;
}
function send_json($success,$content=NULL)
{
    if($success)
    {
        $send["code"]=0;
        $send["msg"]='success';
        $send["content"]=$content;
    }
    else
    {
        $send["code"]=-1;
        $send["msg"]='invalid code';
        $send["content"]=$content;
    }
    $json_to_send=json_encode($send);
    echo $json_to_send;
}
$role=update_openid($name,$no,$openid);
if($role!=-1)
{
    $content["role"]=$role;
    send_json(true,$content);
}
else
{
    send_json(false);
}
?>