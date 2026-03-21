<?php

class TemplateEngine
{
    public function createFile($fileName, $text)
    {
        $body = $text->readData();
        $html = "<!DOCTYPE html>\n<html>\n<body>\n$body</body>\n</html>";
        file_put_contents($fileName, $html);
    }
}
