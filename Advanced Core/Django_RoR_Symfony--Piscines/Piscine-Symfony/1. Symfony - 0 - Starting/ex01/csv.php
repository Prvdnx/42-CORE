<?php

/** This script reads a tab-separated CSV file and displays its content. */

$filename = "ex01.txt";
if (file_exists($filename)) {
    $content = file_get_contents($filename);
    $values = explode(",", trim($content));
    foreach ($values as $v) {
        echo $v . "\n";
    }
}
