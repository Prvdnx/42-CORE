<?php

class TemplateEngine
{
    public function createFile(HotBeverage $beverage)
    {
        $reflection = new ReflectionClass($beverage);
        $className = $reflection->getShortName();
        $fileName = $className . ".html";
        $template = "template.html";

        if (!file_exists($template))
            return;
        $content = file_get_contents($template);

        $properties = $reflection->getProperties();
        foreach ($properties as $prop) {
            $name = $prop->getName();
            $getter = "get" . ucfirst($name);
            if (method_exists($beverage, $getter)) {
                $value = $beverage->$getter();
                $content = str_replace("{" . $name . "}", $value, $content);
            }
        }

        // Also check parent properties if not included
        $parent = $reflection->getParentClass();
        if ($parent) {
            $parent_props = $parent->getProperties();
            foreach ($parent_props as $prop) {
                $name = $prop->getName();
                $getter = "get" . ucfirst($name);
                if (method_exists($beverage, $getter)) {
                    $value = $beverage->$getter();
                    $content = str_replace("{" . $name . "}", $value, $content);
                }
            }
        }

        file_put_contents($fileName, $content);
    }
}
