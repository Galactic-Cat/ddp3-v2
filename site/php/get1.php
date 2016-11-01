<?php
    $link = new mysqli($IP,"mastergrid","","c9");
    
    $query = [
        "SELECT COUNT(*) AS data FROM results WHERE why!=-1;",
        "SELECT COUNT(*) AS data FROM results WHERE switch=1 AND why!=-1;",
        "SELECT COUNT(*) AS data FROM results WHERE switch=1 AND win=1 AND why!=-1;",
        "SELECT COUNT(*) AS data FROM results WHERE switch=0 AND win=1 AND why!=-1;"
    ];
    
    $results = [
        mysqli_query($link,$query[0]),
        mysqli_query($link,$query[1]),
        mysqli_query($link,$query[2]),
        mysqli_query($link,$query[3])
    ];

    $return = [];
    
    for ($i = 0; $i <= 3; $i++) {
        while ($row = mysqli_fetch_assoc($results[$i])) {
            array_push($return,$row['data']);
        }
    };
    echo json_encode($return);
    
    //echo mysqli_error($link);
    
    mysqli_close($link);
    
?>