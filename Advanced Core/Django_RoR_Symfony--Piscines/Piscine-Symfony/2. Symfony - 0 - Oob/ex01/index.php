<?php

/** This script demonstrates the use of a Text wrapper class for content manipulation in template rendering. */
require_once 'Text.php';
require_once 'TemplateEngine.php';

$text = new Text(["First line", "Second line"]);
$text->append("Third line");

$engine = new TemplateEngine();
$engine->createFile('output.html', $text);
echo "Generated output.html\n";
