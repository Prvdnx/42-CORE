# This script handles multiple state/capital lookups from a comma-separated string.
import sys

def all_in():
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

    expr_str = sys.argv[1]
    if ",," in expr_str:
        return

    exprs = [e.strip() for e in expr_str.split(",") if e.strip()]
    if not exprs and "," in expr_str: # Case of just "," or ", ,"
         return

    # Invert dictionaries for search
    # capitals_inv: Capital Name (lower) -> Abbreviation
    capitals_inv = {v.lower(): k for k, v in capital_cities.items()}
    # states_inv: Abbreviation -> Full Name
    states_inv = {v: k for k, v in states.items()}
    # states_lower_inv: State Name (lower) -> Abbreviation
    states_lower_inv = {k.lower(): v for k, v in states.items()}

    for e in exprs:
        found = False
        e_lower = e.lower()
        
        # Check if it's a State
        if e_lower in states_lower_inv:
            abbr = states_lower_inv[e_lower]
            state_full = states_inv[abbr]
            capital = capital_cities[abbr]
            print(f"{capital} is the capital of {state_full}")
            found = True
        
        # Check if it's a Capital
        elif e_lower in capitals_inv:
            abbr = capitals_inv[e_lower]
            state_full = states_inv[abbr]
            capital = [v for k, v in capital_cities.items() if v.lower() == e_lower][0]
            print(f"{capital} is the capital of {state_full}")
            found = True
            
        if not found:
            print(f"{e} is neither a capital city nor a state")

if __name__ == '__main__':
    all_in()
