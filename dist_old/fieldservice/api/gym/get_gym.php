<?php
    include("../../config.php");
   
    $dbCon = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);

    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    
    $userId = $input['userId'];
    $token = $input['token'];
    $errorResponse['success'] = false;
    require("../verify_token.php");
    
    $sql = "SELECT * FROM gym ORDER BY name";
    $result = mysqli_query($dbCon,$sql) or die(json_encode($errorResponse));
    $gyms = mysqli_fetch_all($result, MYSQLI_ASSOC);
    
    $response['success'] = true;
    $response['data'] =  $gyms;
    echo json_encode($response);
?>