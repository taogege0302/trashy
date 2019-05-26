<?php
$redis = include './conn.php';
$artid = $_GET['artid'];
$artDateKey = 'article:'.$artid;
$redis->del($artDateKey);

//用户对应发表过的文章 set
$userArticleKey = 'user_article_'.$_SESSION['userid'];
//文章列表集合 zset
$articleListKey = 'article_list';

$redis->sRem($userArticleKey,$artid);
$redis->zRem($articleListKey,$artid,$artid);
header('location:index.php');
 ?>