<?php

/** This script converts an array to a hash and sorts it by keys in descending order. */

function array2hash_sorted($array)
{
    $res = array();
    foreach ($array as $item) {
        $name = $item[0];
        $age = $item[1];
        $res[$name] = $age;
    }
    krsort($res);
    return $res;
}
