#!/usr/bin/env ruby -w

# This module implements the recursive Elem class for building HTML elements.
# Text class wraps a string to be compatible with Elem content
class Text
  def initialize(str)
    @str = str
  end

  # Returns the raw string content
  def to_s
    @str
  end
end

# Elem class represents an HTML element as an object
class Elem
  attr_reader :tag, :content, :tag_type, :opt

  # Initializes the element
  # @param tag [String] HTML tag (e.g., 'div')
  # @param content [Array, Elem, Text] Inner content
  # @param tag_type [String] 'double' or 'simple'
  # @param opt [Hash] Tag attributes (e.g., {src: '...' })
  def initialize(tag, content = [], tag_type = 'double', opt = {})
    @tag = tag
    @tag_type = tag_type
    @opt = opt
    @content = []
    add_content(content)
  end

  # Adds content to the element. Handles multiple arguments and arrays.
  def add_content(*args)
    args.each do |c|
      if c.is_a?(Array)
        @content += c
      elsif c != "" && c != nil
        @content << c
      end
    end
  end

  # Generates the HTML string representation recursively
  def to_s
    res = "<#{@tag}"
    # Append attributes with single quotes as per subject requirements
    @opt.each { |k, v| res << " #{k}='#{v}'" }
    
    if @tag_type == 'simple'
      res << " />"
    else
      res << ">"
      # Append content with newlines
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
