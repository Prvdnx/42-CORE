# This script reads a file of numbers and prints each on a new line.
def read_numbers():
    try:
        with open("numbers.txt", "r") as f:
            content = f.read().strip()
            # Split by comma and strip any whitespace/newlines
            numbers = content.split(",")
            for n in numbers:
                # Subject specifies "display them on the standard output, one per line, without any coma"
                print(n.strip())
    except FileNotFoundError:
        pass

if __name__ == '__main__':
    read_numbers()
