#!/usr/bin/env ruby -w
require_relative 'ex03'
require_relative 'ex04'

class Page
  def initialize(elem)
    raise TypeError, "Page must be initialized with an Elem instance." unless elem.is_a?(Elem)
    @elem = elem
  end

  def is_valid?
    @valid_output = []
    res = _is_recursive_valid?(@elem)
    puts @valid_output.join("\n") if res
    puts "FILE IS OK" if res
    res
  end

  def _is_recursive_valid?(elem)
    # Node type check
    allowed_types = [Html, Head, Body, Title, Meta, Img, Table, Th, Tr, Td, 
                     Ul, Ol, Li, H1, H2, P, Div, Span, Hr, Br, Text]
    
    # Check if instance of one of the allowed classes
    is_allowed = allowed_types.any? { |t| elem.is_a?(t) }
    return false unless is_allowed

    # If it's Text, it's valid (leaf node)
    if elem.is_a?(Text)
      # @valid_output << "Currently evaluating a Text :\n-Text -> Must contains a simple string\nText content is OK"
      return true
    end

    # Specific rule checks
    @valid_output << "Currently evaluating a #{elem.class} :"
    
    case elem
    when Html
      @valid_output << "- root element of type 'html'" if elem == @elem
      @valid_output << "- Html -> Must contains a Head AND a Body after it"
      return false if elem.content.count != 2
      return false unless elem.content[0].is_a?(Head) && elem.content[1].is_a?(Body)
      @valid_output << "Head is OK" # Example shows this after head check
    when Head
      @valid_output << "- Head should contain only one Title."
      return false if elem.content.count != 1 || !elem.content[0].is_a?(Title)
    when Body, Div
      @valid_output << "- Body and Div should only contain H1, H2, Div, Table, Ul, Ol, Span or Text."
      body_allowed = [H1, H2, Div, Table, Ul, Ol, Span, Text]
      return false unless elem.content.all? { |c| body_allowed.any? { |t| c.is_a?(t) } }
    when Title, H1, H2, Li, Th, Td
      @valid_output << "- Title, H1, H2, Li, Th, Td should only contain one Text."
      return false if elem.content.count != 1 || !elem.content[0].is_a?(Text)
    when P
      @valid_output << "- P should only contain Text elements."
      return false unless elem.content.all? { |c| c.is_a?(Text) }
    when Span
      @valid_output << "- Span should only contain Text or P elements."
      return false unless elem.content.all? { |c| c.is_a?(Text) || c.is_a?(P) }
    when Ul, Ol
      @valid_output << "- Ul and Ol must contain at least one Li and only Li elements."
      return false if elem.content.count < 1 || !elem.content.all? { |c| c.is_a?(Li) }
    when Tr
      @valid_output << "- Tr must contain at least one Th or Td and only Th or Td elements. Th and Td should be mutually exclusive."
      return false if elem.content.count < 1
      first_type = elem.content[0].class
      return false unless [Th, Td].include?(first_type)
      return false unless elem.content.all? { |c| c.is_a?(first_type) }
    when Table
      @valid_output << "- Table should only contain Tr elements."
      return false unless elem.content.all? { |c| c.is_a?(Tr) }
    when Img
        @valid_output << "- Img: should have a src field and its value should be of type Text."
        return false if elem.opt[:src].nil? || !elem.opt[:src].is_a?(Text)
        @valid_output << "Img content is OK"
    end

    # Check content recursively
    elem.content.each do |child|
        @valid_output << "Evaluating a multiple node" if elem.content.count > 1 && !child.is_a?(Text)
        if child.is_a?(Text)
           @valid_output << "Currently evaluating a Text :\n-Text -> Must contains a simple string\nText content is OK"
        end
        return false unless _is_recursive_valid?(child)
    end

    true
  end

  def to_s
    @elem.to_s
  end
end

if $PROGRAM_NAME == __FILE__
  # Example from subject
  toto = Html.new([
    Head.new([Title.new(Text.new("Hello ground!"))]),
    Body.new([
      H1.new(Text.new("Oh no, not again!")),
      Img.new([], {'src': Text.new('http://i.imgur.com/pfp3T.jpg')})
    ])
  ])
  test = Page.new(toto)
  test.is_valid?
end
