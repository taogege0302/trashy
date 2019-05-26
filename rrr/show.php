<?php
session_start();
$redis = include './conn.php';
$artid = $_GET['artid'];
$artDateKey = 'article:'.$artid;
$redis->hIncrBy($artDateKey,'pv',1);
$data = $redis->hGetAll($artDateKey);
$host_article = 'host_article';
$pv = $data['pv'] ?? 0;
$redis->zAdd($host_article,$pv,$artid);
$redis->close();
?>
 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8" />
     <title>详情</title>
 </head>
 <body>
     <?php echo $data['pv'] ?? 0 ?>
     <hr />
     <?php echo $data['cnt'] ?>
 </body>
 </html>