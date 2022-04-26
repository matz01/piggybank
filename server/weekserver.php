<?php

function handleConnectionError($cn) {
    $myObj = new \stdClass();
    http_response_code(500);
    $myObj->message = $cn->connect_error;
    $myJSON = json_encode($myObj);
    echo $myJSON;
    $cn->close();
    die();
  }

  function consoleLog($msg) {
    echo '<script type="text/javascript">' .
      'console.log(' . $msg . ');</script>';
}




$servername = "62.149.150.249";
$username = "Sql919057";
$password = "cu2oyl110i";
$dbname = "Sql919057_3";


$request = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");

$relativePath = "/week/weekserver.php";

switch ($request) {
    case $relativePath . '/' :
        echo "home";
        break;

    case $relativePath . '/budget' :
        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            handleConnectionError($conn);
        }
        
        $sql = "SELECT * FROM monthly_budgets";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $elements = array();
            while($row = $result->fetch_assoc()) {
                $el = new \stdClass();
                $el->id = $row["id"];
                $el->name = $row["name"];
                $el->m1 = $row["m1"];
                $el->m2 = $row["m2"];
                $el->m3 = $row["m3"];
                $el->m4 = $row["m4"];
                $el->m5 = $row["m5"];
                $el->m6 = $row["m6"];
                $el->m7 = $row["m7"];
                $el->m8 = $row["m8"];
                $el->m9 = $row["m9"];
                $el->m10 = $row["m10"];
                $el->m11 = $row["m11"];
                $el->m12 = $row["m12"];
                array_push($elements, $el);
            }
          }
          
          http_response_code(200);
          $myJSON = json_encode($elements);
          echo $myJSON;
          $conn->close();
        break;


    case $relativePath . '/getTransactions' :
        $q = $_SERVER['QUERY_STRING'];
        parse_str($q, $get_array);
        $category = $get_array["category"];
        $month = $get_array["month"];

        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            handleConnectionError($conn);
        }
        
        $sql = "SELECT SUM(amount) totalTransactions
        FROM transactions
        WHERE month = " . $month . " AND category = " . $category;
        $result = $conn->query($sql);
        if(!$result){
            http_response_code(400);
            echo $conn->error;
            $conn->close();
            break;
        }
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $sum = $row['totalTransactions'];
            }
            http_response_code(200);
            echo $sum;
            $conn->close();
            break;
        }
        echo 0;
        $conn->close();
        break;

    case $relativePath . '/addTransaction' :
        $q = $_SERVER['QUERY_STRING'];
        parse_str($q, $get_array);
        $category = $get_array["category"];
        $amount = $get_array["amount"];
        $month = $get_array["month"];

        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            handleConnectionError($conn);
        }

        $sql = "INSERT INTO transactions (amount, category, day, month)
        VALUES (" . $amount . ", " . $category . ", now(), ". $month .")";
        $result = $conn->query($sql);
        if (!$result) {
            http_response_code(500);
            echo $conn->error;
            $conn->close();
            break;
        }
        
        http_response_code(200);
        $conn->close();
        break;



    case $relativePath . '/monthly' :
    
        $q = $_SERVER['QUERY_STRING'];
        parse_str($q, $get_array);
        $month = $get_array["month"];

        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            handleConnectionError($conn);
        }
        
        $sql = "SELECT category, SUM(amount) totalTransactions
        FROM transactions            
        WHERE month = " . $month . " GROUP BY category";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $elements = array();
            while($row = $result->fetch_assoc()) {
                $el = new \stdClass();
                $el->id = $row["category"];
                $el->total = $row["totalTransactions"];
                array_push($elements, $el);
            }
            http_response_code(200);
            $myJSON = json_encode($elements);
            echo $myJSON;
            $conn->close();
            break;
        }
        echo 0;
        $conn->close();
        
        break;

    default:
        echo "404";
        break;
}