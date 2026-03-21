#!/usr/bin/env ruby -w

# This script handles multiple state/capital lookups from a semicolon-separated string.

def whereto
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

  input = ARGV[0]
  if input.include?(",,")
    return
  end

  parts = input.split(",").map(&:strip).reject(&:empty?)
  if parts.empty? && input.include?(",")
     return
  end

  # Prepare search maps
  states_down = {}
  states.each { |name, abbr| states_down[name.downcase] = [name, abbr] }
  
  capitals_down = {}
  capitals_cities.each { |abbr, name| capitals_down[name.downcase] = [name, abbr] }

  parts.each do |p|
    found = false
    p_down = p.downcase

    # Check state
    if states_down.key?(p_down)
      name, abbr = states_down[p_down]
      capital = capitals_cities[abbr]
      puts "#{capital} is the capital of #{name} (akr: #{abbr})"
      found = true
    # Check capital
    elsif capitals_down.key?(p_down)
      name, abbr = capitals_down[p_down]
      state_name = states.invert[abbr]
      puts "#{name} is the capital of #{state_name} (akr: #{abbr})"
      found = true
    end

    puts "#{p} is neither a capital city nor a state" unless found
  end
end

if __name__ == $0
  whereto
end
