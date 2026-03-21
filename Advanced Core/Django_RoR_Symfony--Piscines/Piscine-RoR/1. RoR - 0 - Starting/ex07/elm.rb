#!/usr/bin/env ruby -w

def elm
  begin
    lines = File.readlines("periodic_table.txt").map(&:strip).reject(&:empty?)
  rescue Errno::ENOENT
    return
  end

  # Parse the data file into a list of [name, attributes]
  elements = []
  lines.each do |line|
    name, data = line.split(" = ")
    parts = data.split(", ")
    attrs = {}
    parts.each do |p|
      k, v = p.split(":")
      attrs[k] = v
    end
    elements << [name, attrs]
  end

  # HTML skeleton with embedded CSS for the table grid
  html = <<~HTML
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Periodic Table</title>
        <style>
            table { border-collapse: collapse; }
            td { border: 1px solid black; padding: 10px; min-width: 100px; vertical-align: top; }
            h4 { margin: 0 0 5px 0; }
            ul { margin: 0; padding-left: 20px; }
        </style>
    </head>
    <body>
        <table>
  HTML

  current_pos = 0
  html << "        <tr>\n"

  elements.each_with_index do |(name, attrs), idx|
    pos = attrs['position'].to_i
    
    # Start a new table row if the element position is 0 (except first element)
    if pos == 0 && idx != 0
        html << "        </tr>\n        <tr>\n"
        current_pos = 0
    end

    # Fill empty cells to preserve the chemical table's layout
    while current_pos < pos
        html << "            <td></td>\n"
        current_pos += 1
    end

    html << <<~CELL
                <td>
                    <h4>#{name}</h4>
                    <ul>
                        <li>No #{attrs['number']}</li>
                        <li>#{attrs['small']}</li>
                        <li>#{attrs['molar']}</li>
                        <li>#{attrs['electron']} electron</li>
                    </ul>
                </td>
    CELL
    current_pos += 1

    if pos == 17
        html << "        </tr>\n"
        html << "        <tr>\n" if idx != elements.length - 1
        current_pos = 0
    end
  end

  html << "        </tr>\n" if current_pos != 0
  html << "    </table>\n</body>\n</html>\n"

  File.write("periodic_table.html", html)
end

if __name__ == $0
  elm
end
