  <?php
    include("../../config.php");
    $dbCon = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);

    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    
    $userId = $input['userId'];
    $token = $input['token'];
    $errorResponse['success'] = false;

    $type = $input['type'];
    //require("../verify_token.php");

    $sql = "SELECT * FROM tech_equipment WHERE type = '$type' ORDER BY id DESC LIMIT 1";
    $result = mysqli_query($dbCon,$sql) or die(json_encode($errorResponse));
    $dbHistories = mysqli_fetch_all($result, MYSQLI_ASSOC);
    $histories = array();
    if(sizeof($dbHistories) > 0) {
        $history = $dbHistories[0];
        $equipmentId = $history['equipment_id'];

        $sql = "SELECT * FROM equipment WHERE id='$equipmentId'";
        $result = mysqli_query($dbCon,$sql);
        $equipments = mysqli_fetch_all($result, MYSQLI_ASSOC);
        if(sizeof($equipments) != 0) {
            $equipment = $equipments[0];

            $templateId = $equipment['template_id'];
            $sql = "SELECT type, machineType, model, name FROM template WHERE id='$templateId' LIMIT 1";
            $result = mysqli_query($dbCon, $sql);
            $row = mysqli_fetch_row($result);
            $history['type'] = $row[0];
            $history['machineType'] = $row[1];
            $history['model'] = $row[2];
            $history['equipmentName'] = $row[3]; 

            $sql = "SELECT gym.name FROM gym, gym_equipment  WHERE gym.id=gym_equipment.gym_id AND gym_equipment.equipment_id='$equipmentId' LIMIT 1";
            $result = mysqli_query($dbCon,$sql) or die(json_encode($errorResponse));
            $gyms = mysqli_fetch_all($result, MYSQLI_ASSOC);
            $gym = $gyms[0];

            $history['gymName'] = $gym['name'];
            $histories[] = $history;
        }
        

        $response['success'] = true;
        $response['data'] = $histories;
        echo json_encode($response);
    }
    else {
        $response['success'] = true;
        $response['data'] = [];
        echo json_encode($response);
    }
?>
