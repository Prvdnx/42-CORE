import numpy as np
import sys
import matplotlib.pyplot as plt
import json

def load_data():
    try:
        data = np.genfromtxt('data.csv', delimiter=',', skip_header=1)
    except FileNotFoundError:
        print("Error: data.csv not found in current directory")
        exit(1)  
    mileage_raw = data[:, 0]
    price_raw = data[:, 1]
    
    # save original ranges for denormalization
    mileage_min = np.min(mileage_raw)
    mileage_max = np.max(mileage_raw)
    price_min = np.min(price_raw)
    price_max = np.max(price_raw)
    
    # normalize to 0-1 range = x_norm = (x - x_min) / (x_max - x_min)
    mileage_norm = (mileage_raw - mileage_min) / (mileage_max - mileage_min)
    price_norm = (price_raw - price_min) / (price_max - price_min)
    
    return (mileage_norm, price_norm, mileage_raw, price_raw, mileage_min, mileage_max, price_min, price_max)

def gradient_descent(mileage, price, learning_rate, iterations):
    theta0 = 0.0
    theta1 = 0.0
    m = len(mileage)
    
    for _ in range(iterations):
        predictions = theta0 + theta1 * mileage
        error = predictions - price
        
        # grad0 = np.sum(error) / m
        # grad1 = np.sum(error * mileage) / m
        # new_theta0 = theta0 - learning_rate * grad0 
        # new_theta1 = theta1 - learning_rate * grad1 
        # theta0, theta1 = new_theta0, new_theta1

        tmp0 = learning_rate * (np.sum(error) / m)
        tmp1 = learning_rate * (np.sum(error * mileage) / m)
        theta0 -= tmp0
        theta1 -= tmp1

    return theta0, theta1

def plot_data(mileage_raw, price_raw, theta0, theta1):
    plt.scatter(mileage_raw, price_raw, color='blue', label='Data Points')
    
    # plot regression line
    x_line = np.array([min(mileage_raw), max(mileage_raw)])
    y_line = theta0 + theta1 * x_line
    plt.plot(x_line, y_line, 'r-', label=f'y = {theta0:.2f} + {theta1:.4f}x')
    
    plt.xlabel('Mileage (km)')
    plt.ylabel('Price')
    plt.legend()
    plt.grid(True)
    # plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig('regression.png')
    # plt.savefig('regression.png', dpi=150)
    print("Plot saved to regression.png")

if __name__ == "__main__":
    X_norm, y_norm, X_raw, y_raw, X_min, X_max, y_min, y_max = load_data()
    
    theta0_norm, theta1_norm = gradient_descent(X_norm, y_norm, 0.1, 1000) # train on normalized data
    
    # denormalize thetas to their original scale: Formula θ1 = θ1_norm × (y_max - y_min) / (x_max - x_min)
    # Formula θ0 = y_min + θ0_norm × (y_max - y_min) - θ1_norm × (y_max - y_min) × (x_min / (x_max - x_min))
    theta0 = y_min + (y_max - y_min) * theta0_norm - (y_max - y_min) * theta1_norm * (X_min / (X_max - X_min))
    theta1 = theta1_norm * (y_max - y_min) / (X_max - X_min)

    # scale_x = X_max - X_min
    # scale_y = y_max - y_min
    # if scale_x == 0:
    #     raise ValueError("mileage values identical; cannot fit a line (division by zero).")
    # theta1 = theta1_norm * (scale_y / scale_x)
    # theta0 = y_min + scale_y * theta0_norm - scale_y * theta1_norm * (X_min / scale_x)

    with open('theta.json', 'w') as f: # save denormalized data
        json.dump({
            "theta0": float(theta0),
            "theta1": float(theta1)
        }, f, indent=4)
        
    print(f"Training complete. Theta0: {theta0:.6f}, Theta1: {theta1:.6f}")

    if '--plot' in sys.argv:
        plot_data(X_raw, y_raw, theta0, theta1)



# raw_mileage_data = [10000, 50000, 300000]

# Step 1: find the minimum and maximum
# mileage_min = 10000
# mileage_max = 300000

# Step 2: apply the normalization formula to each value
# normalized_value = (raw_value - min) / (max - min)
# 1: (10000 - 10000) / (300000 - 10000) = 0 / 290000 = 0.0
# 2: (50000 - 10000) / (300000 - 10000) = 40000 / 290000 = 0.138
# 5: (300000 - 10000) / (300000 - 10000) = 290000 / 290000 = 1.0