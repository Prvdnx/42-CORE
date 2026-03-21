<?php
require_once 'Elem.php';
require_once 'MyException.php';

/**
 * ElemWithValidation extends the base Elem class to provide
 * structural validation for a complete HTML tree.
 */
class ElemWithValidation extends Elem
{
    /**
     * Entry point for validating the entire page structure.
     * @return bool True if the page follows all specified rules.
     */
    public function validPage()
    {
        return $this->_recursive_valid($this);
    }

    /**
     * Recursively traverses the Elem tree and checks against structural rules.
     * @param mixed $elem The element or text node to validate.
     * @return bool
     */
    private function _recursive_valid($elem)
    {
        // If it's a string (Text node), it's always valid as a leaf
        if (!($elem instanceof Elem))
            return true; // Text content

        $tag = $elem->element;
        $content = $elem->content;

        // Apply specific structural rules based on the HTML tag
        switch ($tag) {
            case 'html':
                // Rule: html must contain exactly [head, body]
                if (count($content) != 2)
                    return false;
                if ($content[0]->element != 'head' || $content[1]->element != 'body')
                    return false;
                break;
            case 'head':
                // Rule: head must contain exactly one title and one meta charset
                $titles = 0;
                $charsets = 0;
                foreach ($content as $c) {
                    if ($c instanceof Elem) {
                        if ($c->element == 'title')
                            $titles++;
                        if ($c->element == 'meta' && isset($c->attributes['charset']))
                            $charsets++;
                    }
                }
                if ($titles != 1 || $charsets != 1)
                    return false;
                break;
            case 'p':
                // Rule: p tags cannot contain other tags (only text)
                foreach ($content as $c) {
                    if ($c instanceof Elem)
                        return false;
                }
                break;
            case 'table':
                // Rule: table can only contain tr rows
                foreach ($content as $c) {
                    if ($c instanceof Elem && $c->element != 'tr')
                        return false;
                }
                break;
            case 'tr':
                // Rule: tr can only contain th or td cells
                foreach ($content as $c) {
                    if ($c instanceof Elem && !in_array($c->element, ['th', 'td']))
                        return false;
                }
                break;
            case 'ul':
            case 'ol':
                // Rule: lists can only contain li items
                foreach ($content as $c) {
                    if ($c instanceof Elem && $c->element != 'li')
                        return false;
                }
                break;
        }

        // Recursively validate all children
        foreach ($content as $c) {
            if ($c instanceof Elem && !$this->_recursive_valid($c))
                return false;
        }

        return true;
    }
}
