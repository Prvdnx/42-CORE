<?php

class MyException extends Exception
{
}

/**
 * Elem class represents an HTML element.
 * It supports attributes, nested content, and self-closing tags.
 */
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
        'div',
        'table',
        'tr',
        'th',
        'td',
        'ul',
        'ol',
        'li'
    ];

    /**
     * Initializes the Elem.
     * @param string $element The tag name.
     * @param mixed $content Optional initial content.
     * @param array $attributes Optional HTML attributes.
     * @throws MyException If the tag is not in the allowed list.
     */
    public function __construct($element, $content = null, $attributes = [])
    {
        if (!in_array($element, self::$allowed_tags)) {
            throw new MyException("Unauthorized tag: $element");
        }
        $this->element = $element;
        $this->content = [];
        if ($content !== null) {
            $this->content[] = $content;
        }
        $this->attributes = $attributes;
    }

    public function pushElement($elem)
    {
        $this->content[] = $elem;
    }

    /**
     * Renders the element and its content as a valid HTML string.
     * Handles self-closing tags correctly.
     */
    public function getHTML()
    {
        $attr_str = "";
        foreach ($this->attributes as $k => $v) {
            $attr_str .= " $k=\"$v\"";
        }

        $self_closing = ['meta', 'img', 'hr', 'br'];
        if (in_array($this->element, $self_closing)) {
            return "<$this->element$attr_str />";
        }

        $res = "<$this->element$attr_str>";
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
