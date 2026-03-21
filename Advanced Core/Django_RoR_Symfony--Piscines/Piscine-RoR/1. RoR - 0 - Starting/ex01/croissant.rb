#!/usr/bin/env ruby -w

# This script reads a file of numbers, sorts them, and prints them.

def read_and_sort
  begin
    content = File.read("numbers.txt").strip
    numbers = content.split(",").map(&:to_i)
    numbers.sort.each { |n| puts n }
  rescue Errno::ENOENT
    # File not found, do nothing
  end
end

if __name__ == $0
  read_and_sort
end
