# backend/ML_model/crop_model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib

class CropYieldModel:
    def __init__(self):
        self.model = None

    def train(self, data_path: str):
        # Load dataset
        df = pd.read_csv(data_path)

        # Use only numeric features for now
        X = df[['Area', 'Annual_Rainfall', 'Fertilizer', 'Pesticide']]
        y = df['Yield']

        # Train/test split
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        # Train Linear Regression model
        self.model = LinearRegression()
        self.model.fit(X_train, y_train)

        # Save trained model
        joblib.dump(self.model, "backend/ML_model/crop_yield_model.pkl")

        # Return accuracy score
        return self.model.score(X_test, y_test)

    def predict(self, features: dict):
        # Load trained model if not already in memory
        if self.model is None:
            self.model = joblib.load("backend/ML_model/crop_yield_model.pkl")

        input_data = pd.DataFrame([features])
        return self.model.predict(input_data)[0]
