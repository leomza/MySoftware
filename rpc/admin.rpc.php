<?php
header('Content-Type: application/json; charset=utf-8');
include('../autoload.php');

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

//Verification inputs exist
if (!$data['title'] || !$data['body'] || !$data['userInSessionName'] || !$data['fileName']) {
    die("Please complete all the fields");
}

$postedBlog = admin::insertPost($data['title'], $data['body'], $data['userInSessionName'], $data['fileName']);

die($postedBlog);
