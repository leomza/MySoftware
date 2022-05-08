<?php
header('Content-Type: application/json; charset=utf-8');
include('../autoload.php');

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

$dataPosts = data::deletePost($data['postId']);
die(json_encode($dataPosts));