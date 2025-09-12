# backend/ML_model/train_model.py
from crop_model import CropYieldModel

if __name__ == "__main__":
    data_path = "backend/data/crop_yield.csv"  # path to dataset
    model = CropYieldModel()
    
    score = model.train(data_path)
    print(f"Model trained successfully! R² Score: {score:.4f}")
    print("Trained model saved as backend/ML_model/crop_yield_model.pkl")
