from crop_model import CropYieldModel
import os

if __name__ == "__main__":
    # Go one directory up, then into data
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_path = os.path.join(base_dir, "data", "crop_yield.csv")

    model = CropYieldModel()
    
    score = model.train(data_path)
    print(f"Model trained successfully! R² Score: {score:.4f}")
    print("Trained model saved as backend/Ml_model/crop_yield_model.pkl")
