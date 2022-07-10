<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
$_POST = json_decode(file_get_contents('php://input'), true);

require('../vendor/autoload.php');

define("APP_KEY", '');
define("APP_SECRET", '');
define("APP_ID", '');

$pusher = new Pusher\Pusher(
    APP_KEY,
    APP_SECRET,
    APP_ID,
    [
        'cluster' => 'ap1',
        'encrypted' => true
    ]
);

if ($_GET['method'] == 'sendMessage') {

    $data['id'] = $_POST['id'];
    $data['username'] = $_POST['username'];
    $data['message'] = $_POST['message'];
    $data['time'] = $_POST['time'];
    $pusher->trigger('chat-channel', 'chat-event', $data);
}
