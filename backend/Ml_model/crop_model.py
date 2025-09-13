# backend/Ml_model/crop_model.py
import os
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score

class CropYieldModel:
    def __init__(self):
        self.model = None
        # Always save/load model in the same folder as this file
        self.model_path = os.path.join(os.path.dirname(__file__), "crop_yield_model.pkl")

    def train(self, data_path):
        # Load dataset
        df = pd.read_csv(data_path)

        # Drop rows with missing target
        df = df.dropna(subset=["Yield"])

        # Features and target
        X = df.drop(columns=["Yield"])
        y = df["Yield"]

        # Identify categorical and numerical columns
        categorical_cols = ["Crop", "Season", "State"]
        numeric_cols = [col for col in X.columns if col not in categorical_cols]

        # Pipelines for preprocessing
        numeric_transformer = Pipeline(steps=[
            ("imputer", SimpleImputer(strategy="median"))
        ])

        categorical_transformer = Pipeline(steps=[
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("encoder", OneHotEncoder(handle_unknown="ignore"))
        ])

        preprocessor = ColumnTransformer(
            transformers=[
                ("num", numeric_transformer, numeric_cols),
                ("cat", categorical_transformer, categorical_cols)
            ]
        )

        # Full pipeline with RandomForest
        self.model = Pipeline(steps=[
            ("preprocessor", preprocessor),
            ("regressor", RandomForestRegressor(n_estimators=100, random_state=42))
        ])

        # Train-test split
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        # Fit model
        self.model.fit(X_train, y_train)

        # Evaluate
        y_pred = self.model.predict(X_test)
        score = r2_score(y_test, y_pred)

        # Save trained model safely
        joblib.dump(self.model, self.model_path)

        return score

    def predict(self, input_data):
        if self.model is None:
            self.model = joblib.load(self.model_path)
        return self.model.predict([input_data])[0]
