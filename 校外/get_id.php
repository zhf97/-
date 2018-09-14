<?php
header("Content-Type:text/html;charset=UTF-8");
if(!isset($_POST["code"]))
die("no code");
else
$code=$_POST["code"];

function get_id($code)
{
    $appid="wx02fe39350f1afb14";
    $secret="dd02733d514fb2c539589f4f11c8795a";
    $addr="https://api.weixin.qq.com/sns/jscode2session";
    $curl = curl_init();
    $addr=$addr . "?appid=" . $appid . "&secret=" . $secret . "&js_code=" . $code . "&grant_type=authorization_code";
    //print($addr);
    curl_setopt($curl, CURLOPT_URL, $addr);
    curl_setopt($curl, CURLOPT_HEADER, 0);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $data = curl_exec($curl);
    curl_close($curl);

    $json=json_decode($data,true);
    //var_dump($data);
    if(isset($json["errcode"]))
    return -1;
    else
    return $json["openid"];
    
}

function get_role($openid)
{
    $mysql = new mysqli("localhost", "root", "", "cxsy");
    mysqli_set_charset($mysql,"utf8");
    $sql = "SELECT * FROM `user`" . " WHERE `openid` ='" . $openid . "'";    
    //echo $sql;
    $result = $mysql->query($sql);
    //var_dump($result);
    if($result->num_rows!=0)
    {
        $row = $result->fetch_assoc(); 
        //var_dump($row);
        return [$row["role"],$row["no"],$row["name"]];
    }
    else
        return 0;
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
$openid=get_id($code);
if($openid==-1)
{
    send_json(false);
}
else
{
    $role=get_role($openid);
    $content["role"]=$role[0];
    $content["no"]=$role[1];
    $content["name"]=$role[2];
    $content["openid"]=$openid;
    send_json(true,$content);
}
?>
