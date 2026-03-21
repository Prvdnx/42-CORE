# This script takes a state name as an argument and returns its capital city.
import sys

def capital_city():
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

    state = sys.argv[1]
    if state in states:
        abbr = states[state]
        if abbr in capital_cities:
            print(capital_cities[abbr])
    else:
        print("Unknown state")

if __name__ == '__main__':
    capital_city()
