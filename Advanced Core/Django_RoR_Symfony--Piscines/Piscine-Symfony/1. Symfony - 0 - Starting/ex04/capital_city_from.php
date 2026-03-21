<?php

/** This script takes a state name as a command-line argument and returns its capital. */

function capital_city_from($state)
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

    if (array_key_exists($state, $states)) {
        $abbr = $states[$state];
        if (array_key_exists($abbr, $capitals)) {
            return $capitals[$abbr];
        }
    }
    return "Unknown";
}
