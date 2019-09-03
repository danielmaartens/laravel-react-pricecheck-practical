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

        // construct an array of all possible numbers.
        $allNumbers = range(1, $max);

        // filter all possibilities with those that have been submitted to find the missing values.
        $missingNumbers = array_values(array_filter($allNumbers, array(new NumberFilter($numbers), 'filter_missing')));

        $missingNumbersString = $this->numberSeriesToString($missingNumbers, $max);

        return $missingNumbersString;
    }

    private function numberSeriesToString($numberSeries, $max)
    {
        $formattedSeries = [];
        $consecutiveNumbers = [];
        $previousNumber = -1;

        for ($i = 0; $i <= count($numberSeries); $i++) {

            $number = array_key_exists($i, $numberSeries) ? $numberSeries[$i] : null;

            // Check if current missing number does not follow the previous number sequentially.
            if ($number != $previousNumber + 1) {

                // only add list of consecutive numbers if it has more than one element.
                if (!empty($consecutiveNumbers) && count($consecutiveNumbers) > 1) {

                    // take the first and last values in the
                    $formattedSeries[] = $consecutiveNumbers[0] . '-' . end($consecutiveNumbers);
                }

                $consecutiveNumbers = [];

                // only add singleton if it is not followed by a sequential value.
                if ((array_key_exists(($i + 1), $numberSeries) && $number + 1 != $numberSeries[$i + 1]) || $number == $max) {
                    $formattedSeries[] = $number;
                }
            }

            // reset list of consecutive numbers.
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
