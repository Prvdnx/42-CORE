<?php

/** This script demonstrates basic template rendering using a simple TemplateEngine class. */
require_once 'TemplateEngine.php';

$engine = new TemplateEngine();
$params = [
    'title' => 'The Hitchhiker\'s Guide to the Galaxy',
    'author' => 'Douglas Adams',
    'description' => 'A comedy science fiction series created by Douglas Adams.'
];
$engine->createFile('book.html', 'book_description.html', $params);
echo "Generated book.html\n";
