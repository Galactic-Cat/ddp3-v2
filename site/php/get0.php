<?php
    $link = new mysqli($IP,"mastergrid","","c9");
    
    $query = "SELECT code AS data FROM testcode;";
    
    $result = mysqli_query($link,$query);
    
    $return = [];
    
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($return,$row['data']);
    }
    
    echo json_encode($return);
    
    mysqli_close($link);
?>