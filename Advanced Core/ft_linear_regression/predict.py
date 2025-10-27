import json

def main():

    theta0 = 0.0
    theta1 = 0.0

    try:
        with open("theta.json", "r") as f:
            data = json.load(f)
            theta0 = data["theta0"]
            theta1 = data["theta1"]
    except FileNotFoundError:
        pass

    while True:
        try:
            mileage = float(input("Enter car mileage (km): "))
            price = theta0 + (theta1 * mileage)
            print(f"Price estimated: {price:.2f}")
            break
        except ValueError:
            print("Error: Please enter a valid number")

if __name__ == "__main__":
    main()
            