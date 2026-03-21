<?php
require_once 'HotBeverage.php';

class Tea extends HotBeverage
{
    private $description;
    private $comment;

    public function __construct()
    {
        $this->name = "Tea";
        $this->price = 1.0;
        $this->resistence = 5;
        $this->description = "Warm and soothing.";
        $this->comment = "Good with honey.";
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
