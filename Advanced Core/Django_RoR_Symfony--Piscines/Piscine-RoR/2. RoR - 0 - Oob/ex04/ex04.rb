#!/usr/bin/env ruby -w
# This module defines specialized HTML element classes (Html, Head, Body, etc.).
require_relative 'ex03'

class Html < Elem
  def initialize(content = [], opt = {})
    super('Html', content, 'double', opt)
  end
end

class Head < Elem
  def initialize(content = [], opt = {})
    super('Head', content, 'double', opt)
  end
end

class Body < Elem
  def initialize(content = [], opt = {})
    super('Body', content, 'double', opt)
  end
end

class Title < Elem
  def initialize(content = [], opt = {})
    super('Title', content, 'double', opt)
  end
end

class Meta < Elem
  def initialize(content = [], opt = {})
    super('Meta', content, 'simple', opt)
  end
end

class Img < Elem
  def initialize(content = [], opt = {})
    super('Img', content, 'simple', opt)
  end
end

class Table < Elem
  def initialize(content = [], opt = {})
    super('Table', content, 'double', opt)
  end
end

class Th < Elem
  def initialize(content = [], opt = {})
    super('Th', content, 'double', opt)
  end
end

class Tr < Elem
  def initialize(content = [], opt = {})
    super('Tr', content, 'double', opt)
  end
end

class Td < Elem
  def initialize(content = [], opt = {})
    super('Td', content, 'double', opt)
  end
end

class Ul < Elem
  def initialize(content = [], opt = {})
    super('Ul', content, 'double', opt)
  end
end

class Ol < Elem
  def initialize(content = [], opt = {})
    super('Ol', content, 'double', opt)
  end
end

class Li < Elem
  def initialize(content = [], opt = {})
    super('Li', content, 'double', opt)
  end
end

class H1 < Elem
  def initialize(content = [], opt = {})
    super('H1', content, 'double', opt)
  end
end

class H2 < Elem
  def initialize(content = [], opt = {})
    super('H2', content, 'double', opt)
  end
end

class P < Elem
  def initialize(content = [], opt = {})
    super('P', content, 'double', opt)
  end
end

class Div < Elem
  def initialize(content = [], opt = {})
    super('Div', content, 'double', opt)
  end
end

class Span < Elem
  def initialize(content = [], opt = {})
    super('Span', content, 'double', opt)
  end
end

class Hr < Elem
  def initialize(content = [], opt = {})
    super('Hr', content, 'simple', opt)
  end
end

class Br < Elem
  def initialize(content = [], opt = {})
    super('Br', content, 'simple', opt)
  end
end

if $PROGRAM_NAME == __FILE__
  puts Html.new([
    Head.new([Title.new("Hello ground!")]),
    Body.new([
      H1.new("Oh no, not again!"),
      Img.new([], {'src':'http://i.imgur.com/pfp3T.jpg'})
    ])
  ])
end
