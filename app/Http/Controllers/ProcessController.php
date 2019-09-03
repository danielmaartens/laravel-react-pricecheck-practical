<?php

namespace App\Http\Controllers;

use App\Util\NumberFilter;
use Illuminate\Http\Request;

class ProcessController extends Controller
{
    public function index(Request $request)
    {
        $numbers = $request->get('numbersToProcess');
        $max = $request->get('maxNumberCount');

        $allNumbers = range(1, $max);

        $missingNumbers = array_values(array_filter($allNumbers, array(new NumberFilter($numbers), 'filter_missing')));

        $missingNumbersString = $this->numberSeriesToString($missingNumbers);

        return $missingNumbersString;
    }

    private function numberSeriesToString($numberSeries)
    {
        $formattedSeries = [];
        $allN = [];
        $consecutiveNumbers = [];
        $previousNumber = -1;

        for ($i = 0; $i <= count($numberSeries); $i++) {

            $number = array_key_exists($i, $numberSeries) ? $numberSeries[$i] : null;

            if ($number != $previousNumber + 1) {

                if (!empty($consecutiveNumbers) && count($consecutiveNumbers) > 1) {
                    $formattedSeries[] = $consecutiveNumbers[0] . '-' . end($consecutiveNumbers);
                }

                $consecutiveNumbers = [];

                if (array_key_exists(($i + 1), $numberSeries) && $number + 1 != $numberSeries[$i + 1]) {
                    $formattedSeries[] = $number;
                }
            }

            $consecutiveNumbers[] = $number;
            $previousNumber = $number;
        }

        return implode(', ', $formattedSeries);
    }

    function debugToConsole($msg)
    {
        echo "<script>console.log(" . json_encode($msg) . ")</script>";
    }
}
