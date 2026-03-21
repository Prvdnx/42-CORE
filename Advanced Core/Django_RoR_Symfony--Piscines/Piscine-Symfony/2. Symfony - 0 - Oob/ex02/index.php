<?php

/** This script uses the TemplateEngine to render specific beverage classes into HTML files. */
require_once 'HotBeverage.php';
require_once 'Coffee.php';
require_once 'Tea.php';
require_once 'TemplateEngine.php';

$engine = new TemplateEngine();

$coffee = new Coffee();
$engine->createFile($coffee);

$tea = new Tea();
$engine->createFile($tea);

echo "Generated Coffee.html and Tea.html\n";
