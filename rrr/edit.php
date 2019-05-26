<?php
session_start();
$redis = include './conn.php';
    $artid = $_GET['artid'];
    $page = $_GET['page'];
    //存储文章信息的key hash
    $artDateKey = 'article:'.$artid;
    $data =$redis->hGetAll($artDateKey);

    if(!empty($_POST)){
        $_POST['time'] = time();
        $redis->hMset($artDateKey,$_POST);
        header('location:index.php?page='.$page);
    }
$redis->close();

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>文章修改</title>
</head>
<body>
    <form action="" method="post">
        <p>
            用户ID: <input type="text" name="userid" value=" <?php echo $_SESSION['userid']; ?>"/>
        </p>
        <p>
            标题: <input type="text" name="title" value="<?php echo $data['title'] ?>"/>
        </p>
        <p>
            内容: <textarea name="cnt" id="" cols="30" rows="10"><?php echo $data['cnt'] ?></textarea>
        </p>
        <p>
            <input type="submit" value="修改文章"/>
        </p>
    </form>
</body>
</html>