<?php
session_start();
$redis = include './conn.php';
include './Page.php';
$userid = $_SESSION['userid'];
$articleLisKey = 'article_list';
$total = $redis->zCard($articleLisKey);
$page = new Page($total,1);

$dataListId = $redis->zRevRange($articleLisKey,$page->offset,$page->offset);
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
        ul li{
            float: left;
            list-style: none;
            margin-left:10px ;
        }
    </style>
</head>
<body>
   <div class="main">
        <h3>文章管理</h3>
        <hr>
        <a href="add.php">添加文章</a>
        <hr>
        <table>
            <tr>
                <th>ID</th>
                <th>标题</th>
                <th>操作</th>
            </tr>
            <?php
            foreach($dataListId as $artid):
                    // 存储文章信息的key  hash
                $artDataKey = 'article:'.$artid;
                $data = $redis->hGetAll($artDataKey);
                ?>
                <tr>
                    <td><?php echo $artid; ?></td>
                    <td>
                        <a href="show.php?artid=<?php echo $artid; ?>" target="_blank"><?php echo $data['title'] ?></a>
                    </td>
                    <td>
                        <a href="edit.php?artid=<?php echo $artid; ?>&page=<?php echo $_GET['page'] ?>">修改</a> |
                        <a href="javascript:del(<?php echo $artid; ?>)">删除</a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </table>
    </div>

    <?php
    echo $page->fpage();
    // 关闭连接
    $redis->close();
    ?>
</body>
<script type="text/javascript">
function del(id){
    if(confirm("确定删除么?")){
        window.location.href="del.php?artid="+id;
    }
}
</script>
</html>