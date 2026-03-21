<?php

class Text
{
    private $data = [];

    public function __construct($strings = [])
    {
        $this->data = $strings;
    }

    public function append($str)
    {
        $this->data[] = $str;
    }

    public function readData()
    {
        $res = "";
        foreach ($this->data as $s) {
            $res .= "<p>$s</p>\n";
        }
        return $res;
    }
}
