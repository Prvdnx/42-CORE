#!/usr/bin/env ruby -w

class Text
  def initialize(str)
    @str = str
  end

  def to_s
    @str
  end
end

class Elem
  attr_reader :tag, :content, :tag_type, :opt

  def initialize(tag, content = [], tag_type = 'double', opt = {})
    @tag = tag
    @tag_type = tag_type
    @opt = opt
    @content = []
    add_content(content)
  end

  def add_content(*args)
    args.each do |c|
      if c.is_a?(Array)
        @content += c
      elsif c != "" && c != nil
        @content << c
      end
    end
  end

  def to_s
    res = "<#{@tag}"
    # Sort attributes for consistent testing if needed, though test didn't specify
    @opt.each { |k, v| res << " #{k}='#{v}'" }
    
    if @tag_type == 'simple'
      res << " />"
    else
      res << ">"
      if @content.is_a?(Array)
        @content.each do |c|
           res << "\n" << c.to_s
        end
      else
        res << "\n" << @content.to_s
      end
      res << "\n</#{@tag}>"
    end
    res
  end
end

if $PROGRAM_NAME == __FILE__
  # Basic test from subject
  html = Elem.new('html')
  head = Elem.new('head')
  body = Elem.new('body')
  title = Elem.new('title', Text.new("blah blah"))
  head.add_content(title)
  html.add_content([head, body])
  puts html
end
