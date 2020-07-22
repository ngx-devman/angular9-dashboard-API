<?php
    include('../../config.php');
    $dbCon = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);

    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    $userId = $input['userId'];
    $token = $input['token'];
    $errorResponse['success'] = false;
    require('../verify_token.php');

    $firstName = $input['firstName'];
    $lastName = $input['lastName'];
    $imgUrl = $input['imgUrl'];
    $loginType = $input['loginType'];
    $sql = "UPDATE user SET firstName='$firstName', lastName='$lastName', imgUrl='$imgUrl' WHERE id='$userId'";

    mysqli_query($dbCon, $sql) or die(json_encode($errorResponse));;

    $response['success'] = true;
    echo json_encode($response);
?>