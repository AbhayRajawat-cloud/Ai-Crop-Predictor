import sys
import json
import joblib

# Load trained model
model = joblib.load("backend/ML_model/crop_yield_model.pkl")

# Read input JSON from command-line
input_data = json.loads(sys.argv[1])

# Example expected: {"temperature": 25, "rainfall": 120, "soil_health": 0.8}
X = [[
    input_data["temperature"],
    input_data["rainfall"],
    input_data["soil_health"]
]]

# Predict crop yield
prediction = model.predict(X)

# Send back JSON response
print(json.dumps({"predicted_yield": float(prediction[0])}))
