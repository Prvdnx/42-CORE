#!/usr/bin/env ruby -w

# This script sorts an array of nested arrays representing people and their birth years.

def coffee_croissant
  data = [
    ['Frank', 33],
    ['Stacy', 15],
    ['Juan' , 24],
    ['Dom' , 32],
    ['Steve', 24],
    ['Jill' , 24]
  ]

  # Sort by age (ascending), then by name (alphabetical)
  data.sort_by! { |name, age| [age, name] }

  data.each { |name, age| puts name }
end

if __name__ == $0
  coffee_croissant
end
