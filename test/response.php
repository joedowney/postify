<?php
    echo '<h3>Request Method</h3>';
    echo $_SERVER['REQUEST_METHOD'];

    echo '<h3>GET</h3>';
    echo '<pre>'.print_r($_GET, true).'</pre>';
    
    echo '<h3>POST</h3>';
    echo '<pre>'.print_r($_POST, true).'</pre>';