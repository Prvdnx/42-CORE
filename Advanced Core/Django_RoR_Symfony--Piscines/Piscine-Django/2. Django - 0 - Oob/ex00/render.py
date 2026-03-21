# This script renders an HTML template by replacing placeholders with settings.
import sys
import os
import re

def render():
    if len(sys.argv) != 2:
        print("Error: Wrong number of arguments.")
        return
    
    filename = sys.argv[1]
    if not filename.endswith(".template"):
        print("Error: Wrong file extension. Expected .template")
        return
    
    if not os.path.exists(filename):
        print(f"Error: File {filename} does not exist.")
        return

    # To get variables from settings.py, we can import it
    # But since it's in the current directory, we need to ensure it's in path
    sys.path.append(os.getcwd())
    try:
        import settings
    except ImportError:
        print("Error: settings.py not found.")
        return

    try:
        with open(filename, "r") as f:
            template_content = f.read()
    except Exception as e:
        print(f"Error reading template: {e}")
        return

    # Replace patterns like {name} with values from settings
    # We can use .format(**vars(settings)) or a regex
    # vars(settings) contains many internal attributes, we filter them
    context = {k: v for k, v in vars(settings).items() if not k.startswith("__")}
    
    try:
        # Use regex to replace {key} with context[key]
        # This is safer than .format if there are stray braces
        def replace_match(match):
            key = match.group(1)
            return str(context.get(key, match.group(0)))
        
        result = re.sub(r"\{(.*?)\}", replace_match, template_content)
    except Exception as e:
        print(f"Error during rendering: {e}")
        return

    output_filename = filename.replace(".template", ".html")
    try:
        with open(output_filename, "w") as f:
            f.write(result)
    except Exception as e:
        print(f"Error writing output: {e}")

if __name__ == '__main__':
    render()
