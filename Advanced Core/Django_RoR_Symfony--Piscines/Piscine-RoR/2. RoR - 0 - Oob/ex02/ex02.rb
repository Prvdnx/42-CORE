#!/usr/bin/env ruby -w

# This script implements custom exception handling for file duplication and closed body tags in HTML generation.
class Dup_file < StandardError
  def initialize(filename)
    @filename = filename
    @new_filename = filename
    super("A file named #{@filename} already exists!")
  end

  def show_state
    puts "A file named #{@filename} was already there: #{Dir.pwd}/#{@filename}"
  end

  def correct
    while File.exist?(@new_filename)
      base, ext = @new_filename.split(".")
      if @new_filename.include?(".new")
         @new_filename = @new_filename.sub(".html", ".new.html")
      else
         @new_filename = @new_filename.sub(".html", ".new.html")
      end
    end
    @new_filename
  end

  def explain
    puts "Appended .new in order to create requested file: #{Dir.pwd}/#{@new_filename}"
  end
end

class Body_closed < StandardError
  def initialize(filename, text)
    @filename = filename
    @text = text
    @line_num = 0
    super("The body has already been closed in #{@filename}")
  end

  def show_state
    content = File.readlines(@filename)
    @line_num = content.index { |l| l.include?("</body>") } + 1
    puts "In #{@filename} body was closed :"
    puts "> ln :#{@line_num} </body>"
  end

  def correct
    content = File.read(@filename)
    # Remove </body> and everything after (</html>)
    new_content = content.sub("</body>\n</html>", "")
    new_content << "<p>#{@text}</p>\n"
    new_content << "</body>\n</html>\n"
    File.write(@filename, new_content)
  end

  def explain
    puts "> ln :#{@line_num} </body> : text has been inserted and tag moved at the end of it."
  end
end

class Html
  attr_reader :page_name

  def initialize(name)
    @page_name = name
    @filename = "#{@page_name}.html"
    begin
        head
    rescue => e
        if e.is_a?(Dup_file)
            e.show_state
            @filename = e.correct
            e.explain
            head # Retrying with new filename
        else
            raise e
        end
    end
  end

  def head
    if File.exist?(@filename) && !@retrying
      @retrying = true
      raise Dup_file.new(@filename)
    end
    @retrying = false
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
    if content.include?("</body>")
      begin
        raise Body_closed.new(@filename, str)
      rescue Body_closed => e
        e.show_state
        e.correct
        e.explain
      end
    else
      File.open(@filename, "a") do |f|
        f.puts "<p>#{str}</p>"
      end
    end
  end

  def finish
    content = File.read(@filename)
    if content.include?("</body>")
       # Already closed, do nothing or raise as per previous ex if needed
    else
      File.open(@filename, "a") do |f|
        f.puts "</body>"
        f.puts "</html>"
      end
    end
  end
end

if $PROGRAM_NAME == __FILE__
  # Test Dup_file
  File.write("test_dup.html", "existing")
  a = Html.new("test_dup")
  
  # Test Body_closed
  a.finish
  a.dump("Added after close")
end
