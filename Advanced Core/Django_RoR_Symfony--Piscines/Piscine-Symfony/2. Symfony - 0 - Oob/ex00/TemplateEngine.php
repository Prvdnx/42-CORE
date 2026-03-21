<?php

class TemplateEngine
{
    public function createFile($fileName, $templateName, $parameters)
    {
        if (!file_exists($templateName))
            return;
        $content = file_get_contents($templateName);
        foreach ($parameters as $key => $value) {
            $content = str_replace("{" . $key . "}", $value, $content);
        }
        file_put_contents($fileName, $content);
    }
}
