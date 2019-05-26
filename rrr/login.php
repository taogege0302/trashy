<?php
session_start();
$redis = include './conn.php';
if(!empty($_POST)){
    if(false != ($id = $redis->get('user:'.$_POST['username']))){
        $hashuserKey = 'user:id:'.$id;
        $userInfo = $redis->hGetAll($hashuserKey);
        if($userInfo['pwd'] == $_POST['pwd']){
            $_SESSION['userid'] = $id;

            //定义一个发邮件列表
            $sendMailListKey = 'sendMailListKey';
            $redis->lPush('sendMailListKey','1670889276@qq.com');

            header('location:index.php');
            exit;
        }
    }
}

$redis->close();
?>


<!DOCTYPE>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>后台登录</title>
</head>
<body>
<form action="" method="post">
    账号:<input type="text" name="username"><br>
    密码:<input type="text" name="pwd" ><br>
    <input type="submit" value="登录"/>
</form>
</body>
</html>