<?php

/** This script handles searching for capitals or states from a comma-separated input string. */

function search_by_states($string)
{
    $states = [
        'Oregon' => 'OR',
        'Alabama' => 'AL',
        'New Jersey' => 'NJ',
        'Colorado' => 'CO',
    ];
    $capitals = [
        'OR' => 'Salem',
        'AL' => 'Montgomery',
        'NJ' => 'trenton',
        'KS' => 'Topeka',
    ];

    $parts = explode(",", $string);
    $results = array();

    foreach ($parts as $p) {
        $p = trim($p);
        if ($p === "")
            continue;

        $found = false;

        // Search by state
        if (array_key_exists($p, $states)) {
            $abbr = $states[$p];
            if (array_key_exists($abbr, $capitals)) {
                $results[] = "{$capitals[$abbr]} is the capital of {$p}.";
                $found = true;
            }
        }

        // Search by capital (case-sensitive check based on array content, but subject says 'trenton' in search example)
        // Wait, the search example uses "trenton" (lowercase) which is exactly what's in the array.
        if (!$found) {
            foreach ($capitals as $abbr => $cap) {
                if ($cap === $p) {
                    $state_name = array_search($abbr, $states);
                    if ($state_name) {
                        $results[] = "{$p} is the capital of {$state_name}.";
                        $found = true;
                        break;
                    }
                }
            }
        }

        if (!$found) {
            $results[] = "{$p} is neither a capital nor a state.";
        }
    }

    return $results;
}
