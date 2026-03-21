<?php

/** This class implements a recursive HTML element builder with tag and content management. */
class Elem
{
    protected $element;
    protected $content;
    protected $attributes;
    protected static $allowed_tags = [
        'meta',
        'img',
        'hr',
        'br',
        'html',
        'head',
        'body',
        'title',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'span',
        'div'
    ];

    public function __construct($element, $content = null)
    {
        $this->element = $element;
        $this->content = [];
        if ($content !== null) {
            $this->content[] = $content;
        }
    }

    public function pushElement($elem)
    {
        $this->content[] = $elem;
    }

    public function getHTML()
    {
        $res = "<$this->element>";
        foreach ($this->content as $c) {
            if ($c instanceof Elem) {
                $res .= $c->getHTML();
            } else {
                $res .= $c;
            }
        }
        $res .= "</$this->element>";
        return $res;
    }
}
