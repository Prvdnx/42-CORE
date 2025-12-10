# ft_linear_regression

Introduction to machine learning through linear regression implementation.

## Overview
This project implements a linear regression algorithm from scratch to predict car prices based on mileage. It demonstrates fundamental machine learning concepts including gradient descent and data normalization.

## Features
- **Training program** (`train.py`): Learns the relationship between mileage and price
- **Prediction program** (`predict.py`): Predicts car prices based on trained model
- Data visualization with regression line
- Gradient descent optimization
- Model persistence (saves theta values)

## Files
- `train.py`: Training algorithm implementation
- `predict.py`: Price prediction using trained model
- `data.csv`: Training dataset (mileage, price)
- `theta.json`: Saved model parameters
- `regression.png`: Visualization of the regression line
- `requirements.txt`: Python dependencies

## Technologies
- **Python**: Programming language
- **NumPy**: Numerical computations
- **Matplotlib**: Data visualization
- **Pandas**: Data manipulation (if used)

## Usage

### Training the Model
```bash
python train.py
```
This reads `data.csv`, trains the model using gradient descent, and saves parameters to `theta.json`.

### Making Predictions
```bash
python predict.py
```
Enter a mileage value to get a price prediction based on the trained model.

## Mathematical Background
The project implements the linear regression formula:
```
price = θ₀ + θ₁ × mileage
```

Using gradient descent to minimize the cost function and find optimal θ values.

## Learning Objectives
- Understanding linear regression fundamentals
- Implementing gradient descent from scratch
- Data normalization techniques
- Model evaluation and visualization
- Machine learning workflow (train/predict)
