#!/usr/bin/env ruby -w

# This class handles basic HTML page generation by writing to a file.
class Html
  attr_reader :page_name

  def initialize(name)
    @page_name = name
    @filename = "#{@page_name}.html"
    head
  end

  def head
    File.open(@filename, "w") do |f|
      f.puts "<!DOCTYPE html>"
      f.puts "<html>"
      f.puts "<head>"
      f.puts "<title>#{@page_name}</title>"
      f.puts "</head>"
      f.puts "<body>"
    end
  end

  def dump(str)
    File.open(@filename, "a") do |f|
      f.puts "<p>#{str}</p>"
    end
  end

  def finish
    File.open(@filename, "a") do |f|
      f.puts "</body>"
      f.puts "</html>"
    end
  end
end

if $PROGRAM_NAME == __FILE__
  a = Html.new("test")
  10.times { |x| a.dump("titi_number#{x}") }
  a.finish
end
