#!/usr/bin/env ruby -w

# This script demonstrates basic Ruby data types and their classes.

def my_var
  a = 10
  b = "10"
  c = nil
  d = 10.0

  puts "my variables :"
  puts "a contains: #{a} and is a type: #{a.class}"
  puts "b contains: #{b} and is a type: #{b.class}"
  puts "c contains: #{c.inspect} and is a type: #{c.class}"
  puts "d contains: #{d} and is a type: #{d.class}"
end

if __name__ == $0
  my_var
end
