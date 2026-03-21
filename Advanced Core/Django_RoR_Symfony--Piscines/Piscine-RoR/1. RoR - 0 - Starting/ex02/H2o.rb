#!/usr/bin/env ruby -w

# This script converts a flat array of key-value pairs into a hash and prints it.

def h2o
  data = [['Caleb' , 24],
          ['Calixte' , 84],
          ['Calliste', 65],
          ['Calvin' , 12],
          ['Cameron' , 54],
          ['Camil' , 32],
          ['Camille' , 5],
          ['Can' , 52],
          ['Caner' , 56],
          ['Cantin' , 4],
          ['Carl' , 1],
          ['Carlito' , 23],
          ['Carlo' , 19],
          ['Carlos' , 26],
          ['Carter' , 54],
          ['Casey' , 2]]

  # Convert to hash with Integer as key and String(s) as value
  res = {}
  data.each do |name, age|
    if res.key?(age)
        res[age] = res[age] + " " + name
    else
        res[age] = name
    end
  end

  # Display as per example
  # Wait, the example just shows the original order's transformation per line?
  # "24 : Caleb", "84 : Calixte"...
  # If I use a hash, the order might change (in older Ruby) or it might not.
  # But the requirement says "converts it into a hash... Display a message... as follows"
  res.each do |age, names|
     puts "#{age} : #{names}"
  end
end

if __name__ == $0
  h2o
end
