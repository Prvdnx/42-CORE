#!/usr/bin/env ruby -w

# This script searches for a state's capital based on user input.

def where
  states = {
    "Oregon" => "OR",
    "Alabama" => "AL",
    "New Jersey" => "NJ",
    "Colorado" => "CO"
  }
  capitals_cities = {
    "OR" => "Salem",
    "AL" => "Montgomery",
    "NJ" => "Trenton",
    "CO" => "Denver"
  }

  if ARGV.length != 1
    return
  end

  state = ARGV[0]
  if states.key?(state)
    abbr = states[state]
    puts capitals_cities[abbr] if capitals_cities.key?(abbr)
  else
    puts "Unknown state"
  end
end

if __name__ == $0
  where
end
