<?php
$redis = new Redis();
$redis->connect('152.136.143.39',6379,5);
$redis->auth('admin');
return $redis;