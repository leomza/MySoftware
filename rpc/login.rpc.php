<?php
header('Content-Type: application/json; charset=utf-8');
include('../autoload.php');

$request_body = file_get_contents('php://input');
$data         = json_decode($request_body, true);
$response     = [];

//Verification inputs exist
if (!$data['username'] || !$data['password']) {
    die("Please complete all the fields");
}

$userLogged = login::checkLogin($data['username'], $data['password']);
//var_dump($userLogged); Proporciona informacion sobre el tamano y tipo de datos de la variable
if (sizeof($userLogged) === 1) {
    login::setCookie($data['username']);
    $response = $data;
}

die(json_encode($response));
