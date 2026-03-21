<?php

function generate_mendeleiev()
{
    $filename = "ex06.txt";
    if (!file_exists($filename))
        return;

    $lines = file($filename, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $elements = [];
    foreach ($lines as $line) {
        list($name, $data) = explode(" = ", $line);
        $parts = explode(", ", $data);
        $attrs = [];
        foreach ($parts as $p) {
            list($k, $v) = explode(":", $p);
            $attrs[$k] = $v;
        }
        $elements[] = ['name' => $name, 'attrs' => $attrs];
    }

    $html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Mendeleiev Table</title>\n    <style>\n        table { border-collapse: collapse; }\n        td { border: 1px solid black; padding: 10px; min-width: 100px; vertical-align: top; }\n        h4 { margin: 0 0 5px 0; }\n        ul { margin: 0; padding-left: 20px; }\n    </style>\n</head>\n<body>\n    <table>\n";

    $current_pos = 0;
    $html .= "        <tr>\n";

    foreach ($elements as $idx => $el) {
        $pos = (int) $el['attrs']['position'];

        if ($pos == 0 && $idx != 0) {
            $html .= "        </tr>\n        <tr>\n";
            $current_pos = 0;
        }

        while ($current_pos < $pos) {
            $html .= "            <td></td>\n";
            $current_pos++;
        }

        $html .= "            <td>\n";
        $html .= "                <h4>{$el['name']}</h4>\n";
        $html .= "                <ul>\n";
        $html .= "                    <li>No {$el['attrs']['number']}</li>\n";
        $html .= "                    <li>{$el['attrs']['small']}</li>\n";
        $html .= "                    <li>{$el['attrs']['molar']}</li>\n";
        $html .= "                    <li>{$el['attrs']['electron']} electron</li>\n";
        $html .= "                </ul>\n";
        $html .= "            </td>\n";
        $current_pos++;

        if ($pos == 17) {
            $html .= "        </tr>\n";
            if ($idx != count($elements) - 1) {
                $html .= "        <tr>\n";
            }
            $current_pos = 0;
        }
    }

    if ($current_pos != 0) {
        $html .= "        </tr>\n";
    }
    $html .= "    </table>\n</body>\n</html>\n";

    file_put_contents("mendeleiev.html", $html);
}

generate_mendeleiev();
