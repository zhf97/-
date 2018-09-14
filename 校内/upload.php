<?php
$no=$_GET['no'];
$host="10.106.128.100";
$host2="http://www.jl-lagrange.com.cn/cxsy/upload.php";
#$img_base64=$_POST['iamge'];
if ($_FILES["file"]["error"] == 0)
{
    move_uploaded_file($_FILES["file"]["tmp_name"], $_FILES["file"]["name"]);
}

// $post = array(
// "file"=>"@" . $_FILES["file"]["name"]
// );
// var_dump($post);
// $ch = curl_init();
// curl_setopt($ch, CURLOPT_URL, $host);
// curl_setopt($ch, CURLOPT_POST, true);
// curl_setopt($ch,CURLOPT_HTTPGET,false);
// #curl_setopt($ch, CURLOPT_HEADER, 0);
// curl_setopt($ch, CURLOPT_POSTFIELDS,$post);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 0);
// #curl_setopt($ch, CURLOPT_VERBOSE, 0);
// curl_setopt($ch,CURLOPT_BINARYTRANSFER,true);
// curl_setopt($ch,CURLOPT_UPLOAD,0);
// curl_setopt($ch,CURLOPT_PORT,5001);
//$a=curl_exec($ch);
$a=shell_exec('curl http://10.106.128.100:5001 -F "file=@' .$_FILES['file']['name'] .  '"');
#var_dump($a);
$json=json_decode($a,true);
#curl_close($ch);
#var_dump($json);
$max=0;
foreach($json as $key=>$prediction)
{
    if($prediction>$max)
    {
        $max=$prediction;
        $result=$key;
    }
}
echo $a;
$url=$host2 . "?no=" . $no . "&result=" . $result;
$a=file_get_contents($url);
#var_dump($a);

?>