<?php
    $link = new mysqli($IP,"mastergrid","","c9");
    
    $query = [
        "SELECT COUNT(*) AS data FROM results WHERE switch=1 AND why!=-1;",
        "SELECT COUNT(*) AS data FROM results WHERE switch=0 AND why!=-1;",
        "SELECT COUNT(*) AS data FROM results WHERE switch=1 AND why=1;",
        "SELECT COUNT(*) AS data FROM results WHERE switch=1 AND why=2;",
        "SELECT COUNT(*) AS data FROM results WHERE switch=1 AND why=3;",
        "SELECT COUNT(*) AS data FROM results WHERE switch=1 AND why=4;",
        "SELECT COUNT(*) AS data FROM results WHERE switch=0 AND why=1;",
        "SELECT COUNT(*) AS data FROM results WHERE switch=0 AND why=2;",
        "SELECT COUNT(*) AS data FROM results WHERE switch=0 AND why=3;",
        "SELECT COUNT(*) AS data FROM results WHERE switch=0 AND why=4;",
        "SELECT why2 AS data FROM results WHERE switch=1 AND why=4;",
        "SELECT why2 AS data FROM results WHERE switch=0 AND why=4;"
    ];
    
    $results = [
        mysqli_query($link,$query[0]),
        mysqli_query($link,$query[1]),
        mysqli_query($link,$query[2]),
        mysqli_query($link,$query[3]),
        mysqli_query($link,$query[4]),
        mysqli_query($link,$query[5]),
        mysqli_query($link,$query[6]),
        mysqli_query($link,$query[7]),
        mysqli_query($link,$query[8]),
        mysqli_query($link,$query[9])
    ];
    
    $results2 = mysqli_query($link,$query[10]);

    
    $results3 = mysqli_query($link,$query[11]);

    $return = [];
    $return2 = [];
    $return3 = [];
    
    for ($i = 0; $i <= 9; $i++) {
        while ($row = mysqli_fetch_assoc($results[$i])) {
            array_push($return,$row['data']);
        }
    };
    
    while ($row = mysqli_fetch_assoc($results2)) {
        array_push($return2,$row['data']);
    }
    
    while ($row = mysqli_fetch_assoc($results3)) {
        array_push($return3,$row['data']);
    }
    
    echo json_encode([$return,$return2,$return3]);
    
    //echo mysqli_error($link);
    
    mysqli_close($link);
    
?>