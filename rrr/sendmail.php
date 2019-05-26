<?php
set_time_limit(0);
$redis = include './conn.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';
$mail = new PHPMailer(true);
$sendMailListKey = 'sendMailListKey';
while(true){
    sleep(3);
    $email = $redis->rPop($sendMailListKey);
    if($email) continue;
    try {
    //Server settings
    $mail->SMTPDebug = 0;                                       // Enable verbose debug output
    $mail->isSMTP();                                       // Set mailer to use SMTP
    $mail->Host       = 'smtp.qq.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = '1670889276@qq.com';                     // SMTP username
    $mail->Password   = 'oouu2014.11.19.123';                               // SMTP password
    $mail->SMTPSecure = 'ssl';                                  // Enable TLS encryption, `ssl`
    $mail->Port       = 465;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom($email, '管理员');
    $mail->addAddress('1670889276@qq.com', '小明');     // Add a recipient
    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = '登录提示';
    $mail->Body    = '<h3>您现在正在登录后台</h3> <hr /><b>请确认是否本人登录!</b>';
    $mail->send();
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
