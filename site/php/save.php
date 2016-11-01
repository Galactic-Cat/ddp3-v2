<?php
    $link = new mysqli($IP,"mastergrid","","c9");
    
    $testcode = $_POST['testcode'];
    $niveau = $_POST['niveau'];
    $jaar = $_POST['jaar'];
    $mhc = $_POST['mhc'];
    $win = $_POST['win'];
    $why = $_POST['why'];
    $why2 = $_POST['why2'];
    
    if (!$link) {
        echo "Error: Unable to connect to MySQL." . PHP_EOL;
        echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
        echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
        exit;
    }
    
    $results = mysqli_query($link,"INSERT INTO results (testcode,niveau,jaar,switch,win,why,why2) VALUES ('$testcode','$niveau','$jaar','$mhc','$win','$why','$why2')");
    //mysqli_multi_query($link,"INSERT INTO results (testcode,niveau,jaar,switch,win,why,why2) VALUES (1,1,1,1,1,1,null)");

    mysqli_close($link);
    
    return $results;
?>