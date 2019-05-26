<?php
session_start();
$redis = include './conn.php';
if(!empty($_POST)){
    $_POST['time'] = time();
    //自增长id
    $artid = $redis->incr('articleid');
    //存储文章信息的key hash
    $artDateKey = 'article:'.$artid;
    //用户对应发表过的文章 set
    $userArticleKey = 'user_article_'.$_SESSION['userid'];
    //文章列表集合 zset
    $articleListKey = 'article_list';

    $redis->hMset($artDateKey,$_POST);
    $redis->sAdd($userArticleKey,$artid);
    $redis->zAdd($articleListKey,$artid,$artid);

    header('location:index.php');
}
$redis->close();

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Document</title>
</head>
<body>
    <form action="" method="post">
        <p>
            用户ID: <input type="text" name="userid" value=" <?php echo $_SESSION['userid']; ?>"/>
        </p>
        <p>
            标题: <input type="text" name="title" />
        </p>
        <p>
            内容: <textarea name="cnt" id="" cols="30" rows="10"></textarea>
        </p>
        <p>
            <input type="submit" value="添加文章"/>
        </p>
    </form>
</body>
</html>