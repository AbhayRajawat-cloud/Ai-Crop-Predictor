# backend/Ml_model/predictor.py
import os
import sys
import json
import joblib
import pandas as pd

# Always resolve model path relative to this file (avoids cwd / case issues)
MODEL_PATH = os.path.join(os.path.dirname(__file__), "crop_yield_model.pkl")

# Load the trained pipeline (preprocessor + regressor)
model = joblib.load(MODEL_PATH)

def predict_from_json(json_str: str | None = None):
    """
    If json_str is provided, it's a JSON string of the input dict.
    If not provided, a default example is used.
    The input must contain these keys (or defaults will be used):
      Crop, Crop_Year, Season, State, Area, Production,
      Annual_Rainfall, Fertilizer, Pesticide
    """
    if json_str:
        inp = json.loads(json_str)
    else:
        # Example default input (you can change these values for quick tests)
        inp = {
            "Crop": "Rice",
            "Crop_Year": 2020,
            "Season": "Kharif",
            "State": "Assam",
            "Area": 1000.0,
            "Production": 5000.0,
            "Annual_Rainfall": 1200.0,
            "Fertilizer": 300.0,
            "Pesticide": 50.0
        }

    # Build DataFrame with the same column names used during training
    df = pd.DataFrame([{
        "Crop": inp.get("Crop"),
        "Crop_Year": int(inp.get("Crop_Year", 0)),
        "Season": inp.get("Season"),
        "State": inp.get("State"),
        "Area": float(inp.get("Area", 0.0)),
        "Production": float(inp.get("Production", 0.0)),
        "Annual_Rainfall": float(inp.get("Annual_Rainfall", 0.0)),
        "Fertilizer": float(inp.get("Fertilizer", 0.0)),
        "Pesticide": float(inp.get("Pesticide", 0.0))
    }])

    # The saved pipeline will perform imputation, encoding, scaling as needed
    pred = model.predict(df)[0]
    return float(pred)

if __name__ == "__main__":
    # Accept a JSON string as the first CLI argument (optional)
    arg = None
    if len(sys.argv) > 1:
        arg = sys.argv[1]
    try:
        result = predict_from_json(arg)
        # Print JSON so Node can parse it easily
        print(json.dumps({"predicted_yield": result}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
