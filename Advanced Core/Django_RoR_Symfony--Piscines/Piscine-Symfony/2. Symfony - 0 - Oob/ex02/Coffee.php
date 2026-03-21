<?php
require_once 'HotBeverage.php';

class Coffee extends HotBeverage
{
    private $description;
    private $comment;

    public function __construct()
    {
        $this->name = "Coffee";
        $this->price = 1.5;
        $this->resistence = 10;
        $this->description = "Strong and dark.";
        $this->comment = "Perfect for mornings.";
    }

    public function getDescription()
    {
        return $this->description;
    }
    public function getComment()
    {
        return $this->comment;
    }
}
