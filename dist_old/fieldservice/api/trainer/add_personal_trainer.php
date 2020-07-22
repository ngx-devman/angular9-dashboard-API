  <?php
    require '../../PHPMailerAutoload.php';
    include("../../config.php");
    $dbCon = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);

    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    
    $userId = $input['userId'];
    $token = $input['token'];
    $trainer = $input['trainer'];
    $errorResponse['success'] = false;
    //require("../verify_token.php");

    $sql = sprintf("UPDATE user SET trainer='%s' WHERE id='%s'", $trainer, $userId);
    mysqli_query($dbCon,$sql) or die(json_encode($errorResponse));

    $sql = "SELECT firstName, lastName, email FROM user WHERE id = '$trainer'";
    $result = mysqli_query($dbCon,$sql);
    $trainerRow = mysqli_fetch_assoc($result);
    $trainerName = $trainerRow['firstName'].' '.$trainerRow['lastName'];
    $trainerEmail = $trainerRow['email'];
    $trainerInfo['email'] = $trainerEmail;
    $trainerInfo['name'] = $trainerName;
    $trainerInfo['trainerId'] = $trainer;

    //-----Get new trainer email
    $sql = "SELECT email FROM user WHERE id = '$trainer'";
    $result = mysqli_query($dbCon,$sql);
    $emailRow = mysqli_fetch_assoc($result);
    $trainerEmail = $emailRow['email'];

    //-----Get original trainer and user first and last name
    $sql = "SELECT trainer, firstName, lastName FROM user WHERE id = '$userId'";
    $result = mysqli_query($dbCon,$sql);
    $userRow = mysqli_fetch_assoc($result);
    $originalTrainer = $userRow['trainer'];
    $firstName = $userRow['firstName'];
    $lastName = $userRow['lastName'];

    if($originalTrainer != 0) {
        $sql = "SELECT email FROM user WHERE id = '$originalTrainer'";
        $result = mysqli_query($dbCon,$sql);
        $originalTrainerRow = mysqli_fetch_assoc($result);
        $originalTrainerEmail = $originalTrainerRow['email'];
        $string = "This email is to inform you that you have been removed as a<br>
        personal trainer to ".$firstName." ".$lastName." \'s account.<br>
        If you feel this was in error, please contact Norton Fitness.<br>
        Thank you";

        $sql = "INSERT INTO email_query (email, content) VALUES ('$originalTrainerEmail', '$string')";
        //echo $sql;
        mysqli_query($dbCon,$sql) or die(json_encode($errorResponse));
        $email_queue_id = mysqli_insert_id($dbCon);
        exec("wget -qO- https://app.blueclerk.com/fieldservice/send_email.php?email_queue_id=".$email_queue_id." &> /dev/null &");
    }

    $string = "This email is to inform you that you have been added as a<br>
    personal trainer to ".$firstName." ".$lastName." \'s account.<br>
    If you feel this was in error, please contact Norton Fitness.<br>
    Thank you";

    $sql = "INSERT INTO email_query (email, content) VALUES ('$trainerEmail', '$string')";
    echo $sql;
    mysqli_query($dbCon,$sql) or die(json_encode($errorResponse));
    $email_queue_id = mysqli_insert_id($dbCon);
    exec("wget -qO- https://app.blueclerk.com/fieldservice/send_email.php?email_queue_id=".$email_queue_id." &> /dev/null &");

    $response['success'] = true;
    $response['trainerInfo'] = $trainerInfo;
    echo json_encode($response);
?>