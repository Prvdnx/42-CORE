#!/usr/bin/env ruby -w

# This class extends the basic HTML generator with basic error checking for file existence and tags.
class Html
  attr_reader :page_name

  def initialize(name)
    @page_name = name
    @filename = "#{@page_name}.html"
    head
  end

  def head
    if File.exist?(@filename)
      raise RuntimeError, "#{@filename} already exist!"
    end
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
    content = File.read(@filename)
    if !content.include?("<body>")
      raise RuntimeError, "There is no body tag in #{@filename}"
    end
    if content.include?("</body>")
      raise RuntimeError, "The body has already been closed in #{@filename}"
    end
    File.open(@filename, "a") do |f|
      f.puts "<p>#{str}</p>"
    end
  end

  def finish
    content = File.read(@filename)
    if content.include?("</body>")
      raise RuntimeError, "#{@filename} has already been closed"
    end
    File.open(@filename, "a") do |f|
      f.puts "</body>"
      f.puts "</html>"
    end
  end
end

if $PROGRAM_NAME == __FILE__
  # Tests from subject
  begin
    a = Html.new("test")
    # This should fail if test.html exists from previous run
    b = Html.new("test")
  rescue RuntimeError => e
    puts "Caught expected error: #{e}"
  end

  a = Html.new("test_ex01")
  a.dump("Lorem_ipsum")
  a.finish
  begin
    a.finish
  rescue RuntimeError => e
    puts "Caught expected error: #{e}"
  end
end
