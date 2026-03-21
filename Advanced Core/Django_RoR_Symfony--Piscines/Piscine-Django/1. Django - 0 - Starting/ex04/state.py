# This script takes a capital city name as an argument and returns its state.
import sys

def state():
    states = {
        "Oregon" : "OR",
        "Alabama" : "AL",
        "New Jersey": "NJ",
        "Colorado" : "CO"
    }
    capital_cities = {
        "OR": "Salem",
        "AL": "Montgomery",
        "NJ": "Trenton",
        "CO": "Denver"
    }

    if len(sys.argv) != 2:
        return

    capital = sys.argv[1]
    
    # Invert capital_cities
    capitals_inv = {v: k for k, v in capital_cities.items()}
    # Invert states (abbr to Full name)
    states_inv = {v: k for k, v in states.items()}

    if capital in capitals_inv:
        abbr = capitals_inv[capital]
        if abbr in states_inv:
            print(states_inv[abbr])
    else:
        print("Unknown capital city")

if __name__ == '__main__':
    state()
