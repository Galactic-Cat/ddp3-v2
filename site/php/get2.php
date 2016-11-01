<?php
    $link = new mysqli($IP,"mastergrid","","c9");
    
    $query = [
        "SELECT COUNT(*) AS data FROM results WHERE niveau=3 AND why!=-1",
        "SELECT COUNT(*) AS data FROM results WHERE niveau=2 AND why!=-1",
        "SELECT COUNT(*) AS data FROM results WHERE niveau=1 AND why!=-1",
        "SELECT COUNT(*) AS data FROM results WHERE niveau=3 AND jaar=1 AND why!=-1",
        "SELECT COUNT(*) AS data FROM results WHERE niveau=3 AND jaar=2 AND why!=-1",
        "SELECT COUNT(*) AS data FROM results WHERE niveau=3 AND jaar=3 AND why!=-1",
        "SELECT COUNT(*) AS data FROM results WHERE niveau=3 AND jaar=4 AND why!=-1",
        "SELECT COUNT(*) AS data FROM results WHERE niveau=3 AND jaar=5 AND why!=-1",
        "SELECT COUNT(*) AS data FROM results WHERE niveau=3 AND jaar=6 AND why!=-1",
        "SELECT COUNT(*) AS data FROM results WHERE niveau=2 AND jaar=1 AND why!=-1",
        "SELECT COUNT(*) AS data FROM results WHERE niveau=2 AND jaar=2 AND why!=-1",
        "SELECT COUNT(*) AS data FROM results WHERE niveau=2 AND jaar=3 AND why!=-1",
        "SELECT COUNT(*) AS data FROM results WHERE niveau=2 AND jaar=4 AND why!=-1",
        "SELECT COUNT(*) AS data FROM results WHERE niveau=2 AND jaar=5 AND why!=-1",
        "SELECT COUNT(*) AS data FROM results WHERE niveau=1 AND jaar=1 AND why!=-1",
        "SELECT COUNT(*) AS data FROM results WHERE niveau=1 AND jaar=2 AND why!=-1",
        "SELECT COUNT(*) AS data FROM results WHERE niveau=1 AND jaar=3 AND why!=-1",
        "SELECT COUNT(*) AS data FROM results WHERE niveau=1 AND jaar=4 AND why!=-1"
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
        mysqli_query($link,$query[9]),
        mysqli_query($link,$query[10]),
        mysqli_query($link,$query[11]),
        mysqli_query($link,$query[12]),
        mysqli_query($link,$query[13]),
        mysqli_query($link,$query[14]),
        mysqli_query($link,$query[15]),
        mysqli_query($link,$query[16]),
        mysqli_query($link,$query[17])
    ];
    
    $return = [];
    
    for ($i = 0; $i <= 17; $i++) {
        while ($row = mysqli_fetch_assoc($results[$i])) {
            array_push($return,$row['data']);
        }
    };
    echo json_encode($return);
    
    //echo mysqli_error($link);
    
    mysqli_close($link);
?>