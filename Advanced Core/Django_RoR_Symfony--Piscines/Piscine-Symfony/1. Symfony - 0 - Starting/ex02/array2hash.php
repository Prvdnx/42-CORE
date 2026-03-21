<?php

/** This script converts a simple array into an associative array (hash). */

function array2hash($array)
{
    $res = array();
    foreach ($array as $item) {
        $name = $item[0];
        $age = $item[1];
        $res[$age] = $name;
    }
    return $res;
}
