<?php
$id=$_GET['id'];
$file=$_FILES['file'];
$filename="mk_upload\\" . $id . ".jpg";
move_uploaded_file($_FILES["file"]["tmp_name"],$filename);
?>
