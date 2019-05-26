<?php
$redis = include './conn.php';
$artid = $_GET['artid'];
$artid = explode(',',$artid);
$artDateKey =[];
foreach($artid as $v){
    $artDateKey[] = 'article:'.$v;
}
// $artDateKey = implode(',',$artDateKey);
var_dump($artDateKey);exit;
$redis->del($artDateKey);

//用户对应发表过的文章 set
$userArticleKey = 'user_article_'.$_SESSION['userid'];
//文章列表集合 zset
$articleListKey = 'article_list';

$redis->sRem($userArticleKey,$artid);
$redis->zAdd($articleListKey,$artid,$artid);
header('location:index.php');
 ?>