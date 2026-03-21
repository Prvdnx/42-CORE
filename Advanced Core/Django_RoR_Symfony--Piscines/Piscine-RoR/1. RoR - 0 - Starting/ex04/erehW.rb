#!/usr/bin/env ruby -w

# This script searches for a state name based on a capital city input.

def erehW
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

  capital = ARGV[0]
  capitals_inv = capitals_cities.invert
  states_inv = states.invert

  if capitals_inv.key?(capital)
    abbr = capitals_inv[capital]
    puts states_inv[abbr] if states_inv.key?(abbr)
  else
    puts "Unknown capital city"
  end
end

if __name__ == $0
  erehW
end
