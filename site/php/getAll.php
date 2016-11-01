<?php
    $link = new mysqli($IP,"mastergrid","","c9");
    
    $query = [
        "SELECT id AS data FROM results;",
        "SELECT testcode AS data FROM results;",
        "SELECT niveau AS data FROM results;",
        "SELECT jaar AS data FROM results;",
        "SELECT switch AS data FROM results;",
        "SELECT win AS data FROM results;",
        "SELECT why AS data FROM results;",
        "SELECT why2 AS data FROM results;"
        ];
        
    $results = [
        mysqli_query($link,$query[0]),
        mysqli_query($link,$query[1]),
        mysqli_query($link,$query[2]),
        mysqli_query($link,$query[3]),
        mysqli_query($link,$query[4]),
        mysqli_query($link,$query[5]),
        mysqli_query($link,$query[6]),
        mysqli_query($link,$query[7])
        ];
    
    $return = [];
    $return0 = [];
    $return1 = [];
    $return2 = [];
    $return3 = [];
    $return4 = [];
    $return5 = [];
    $return6 = [];
    $return7 = [];
    
    for ($i = 0; $i <= 7; $i++) {
        while ($row = mysqli_fetch_assoc($results[$i])) {
            array_push(${'return'.$i},$row['data']);
        }
    }
    
    echo json_encode([$return0,$return1,$return2,$return3,$return4,$return5,$return6,$return7]);
    
    mysqli_close($link);
    
?>