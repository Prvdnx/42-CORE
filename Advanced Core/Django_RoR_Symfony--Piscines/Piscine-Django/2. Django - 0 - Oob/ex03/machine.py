import random
# This module implements a CoffeeMachine that serves beverages and can break down.
from beverages import HotBeverage, Coffee, Tea, Chocolate, Cappuccino

class CoffeeMachine:
    def __init__(self):
        self.served_count = 0
        self.broken = False

    class EmptyCup(HotBeverage):
        def __init__(self):
            super().__init__()
            self.name = "empty cup"
            self.price = 0.90
        
        def description(self):
            return "An empty cup?! Gimme my money back!"

    class BrokenMachineException(Exception):
        def __init__(self):
            super().__init__("This coffee machine has to be repaired.")

    def repair(self):
        self.broken = False
        self.served_count = 0

    def serve(self, beverage: HotBeverage):
        if self.broken:
            raise self.BrokenMachineException()
        
        self.served_count += 1
        if self.served_count >= 10:
            self.broken = True
        
        # Alternatively (randomly) returns instance of parameter or EmptyCup
        if random.random() > 0.5:
            return beverage()
        else:
            return self.EmptyCup()

if __name__ == '__main__':
    machine = CoffeeMachine()
    
    def run_machine(machine):
        drinks = [Coffee, Tea, Chocolate, Cappuccino]
        try:
            for _ in range(15):
                drink = random.choice(drinks)
                print(machine.serve(drink))
                print("-" * 15)
        except machine.BrokenMachineException as e:
            print(e)
    
    # Run until breaks
    print("--- First Run ---")
    run_machine(machine)
    
    # Repair and repeat
    print("\n--- Repairing ---")
    machine.repair()
    print("--- Second Run ---")
    run_machine(machine)
