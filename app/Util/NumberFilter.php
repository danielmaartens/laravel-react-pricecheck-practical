<?php


namespace App\Util;


class NumberFilter
{
    private $numbers;

    function __construct($numbers)
    {
        $this->numbers = $numbers;
    }

    function filter_missing($value)
    {
        if (!in_array($value, $this->numbers)) {
            return true;
        }

        return false;
    }

    function debugToConsole($msg)
    {
        echo "<script>console.log(" . json_encode($msg) . ")</script>";
    }
}
