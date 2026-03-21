import sys

def periodic_table():
    try:
        with open("periodic_table.txt", "r") as f:
            lines = [line.strip() for line in f if line.strip()]
    except FileNotFoundError:
        return

    # Parse the text file into a structured list of elements
    elements = []
    for line in lines:
        name, data = line.split(" = ")
        # Split attributes by comma and space
        parts = data.split(", ")
        attrs = {}
        for p in parts:
            k, v = p.split(":")
            attrs[k] = v
        elements.append((name, attrs))

    # Base HTML template with styles for a grid-like periodic table
    html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Periodic Table</title>
    <style>
        table {
            border-collapse: collapse;
        }
        td {
            border: 1px solid black;
            padding: 10px;
            min-width: 100px;
            vertical-align: top;
        }
        h4 {
            margin: 0 0 5px 0;
        }
        ul {
            margin: 0;
            padding-left: 20px;
        }
    </style>
</head>
<body>
    <table>
"""
    
    # Track the current column position (0 to 17)
    current_pos = 0
    html += "        <tr>\n"
    
    for name, attrs in elements:
        pos = int(attrs['position'])
        
        # Rule: Start a new row if position is 0 (except for the first element)
        if pos == 0 and elements.index((name, attrs)) != 0:
            html += "        </tr>\n        <tr>\n"
            current_pos = 0

        # Rule: Fill gaps with empty <td> cells to maintain the table structure
        while current_pos < pos:
            html += "            <td></td>\n"
            current_pos += 1
        
        html += f"""            <td>
                <h4>{name}</h4>
                <ul>
                    <li>No {attrs['number']}</li>
                    <li>{attrs['small']}</li>
                    <li>{attrs['molar']}</li>
                    <li>{attrs['electron']} electron</li>
                </ul>
            </td>
"""
        current_pos += 1
        
        # Close row if we reach position 17
        if pos == 17:
             html += "        </tr>\n"
             if elements.index((name, attrs)) != len(elements) - 1:
                 html += "        <tr>\n"
             current_pos = 0

    if current_pos != 0:
        html += "        </tr>\n"
        
    html += """    </table>
</body>
</html>
"""

    with open("periodic_table.html", "w") as f:
        f.write(html)

if __name__ == '__main__':
    periodic_table()
